import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { quoteId, frequency } = body

    if (!quoteId || !frequency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get quote with client details
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      include: { client: true },
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      )
    }

    if (quote.status === 'ACCEPTED') {
      return NextResponse.json(
        { error: 'Quote already accepted' },
        { status: 400 }
      )
    }

    // Determine price based on frequency
    let price: number
    switch (frequency) {
      case 'ONE_TIME':
        price = quote.oneTimePrice
        break
      case 'MONTHLY':
        price = quote.monthlyPrice
        break
      case 'TWICE_MONTHLY':
        price = quote.twiceMonthlyPrice
        break
      default:
        return NextResponse.json(
          { error: 'Invalid frequency' },
          { status: 400 }
        )
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        quoteId: quote.id,
        clientId: quote.clientId,
        amount: price,
        frequency,
        status: 'PENDING',
      },
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Premium House Cleaning Service',
              description: `${frequency.replace('_', ' ')} cleaning service`,
            },
            unit_amount: Math.round(price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/quote/${quote.id}`,
      client_reference_id: payment.id,
      customer_email: quote.client!.email,
      metadata: {
        paymentId: payment.id,
        quoteId: quote.id,
        frequency,
      },
    })

    // Update payment with Stripe ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripePaymentId: session.id },
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
    })
  } catch (error) {
    console.error('Quote acceptance error:', error)
    return NextResponse.json(
      { error: 'Failed to process acceptance' },
      { status: 500 }
    )
  }
}
