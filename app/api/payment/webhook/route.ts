import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { sendPaymentConfirmation } from '@/lib/email'
import { formatDate } from '@/lib/utils'
import Stripe from 'stripe'
import { addDays, addMonths } from 'date-fns'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const paymentId = session.metadata?.paymentId
      const quoteId = session.metadata?.quoteId
      const frequency = session.metadata?.frequency

      if (!paymentId || !quoteId) {
        console.error('Missing metadata in webhook')
        return NextResponse.json({ received: true })
      }

      // Calculate next service date
      let nextServiceDate = new Date()
      if (frequency === 'MONTHLY') {
        nextServiceDate = addMonths(nextServiceDate, 1)
      } else if (frequency === 'TWICE_MONTHLY') {
        nextServiceDate = addDays(nextServiceDate, 15)
      } else {
        nextServiceDate = addDays(nextServiceDate, 7) // One week for one-time
      }

      // Update payment
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'COMPLETED',
          stripeCustomerId: session.customer as string,
          paidAt: new Date(),
          nextServiceDate,
        },
        include: {
          client: true,
          quote: true,
        },
      })

      // Update quote
      await prisma.quote.update({
        where: { id: quoteId },
        data: {
          status: 'ACCEPTED',
          respondedAt: new Date(),
        },
      })

      // Send confirmation email
      try {
        const frequencyLabel =
          frequency === 'ONE_TIME' ? 'One-Time Service' :
          frequency === 'MONTHLY' ? 'Monthly Service' :
          'Twice-Monthly Service'

        await sendPaymentConfirmation(
          {
            clientName: payment.client.name,
            amount: payment.amount,
            frequency: frequencyLabel,
            nextServiceDate: formatDate(nextServiceDate),
            address: payment.client.address,
          },
          payment.client.email
        )
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
      }

      console.log('Payment processed successfully:', paymentId)
    } catch (error) {
      console.error('Error processing webhook:', error)
      return NextResponse.json(
        { error: 'Processing failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
