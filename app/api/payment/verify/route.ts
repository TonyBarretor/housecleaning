import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    const payment = await prisma.payment.findFirst({
      where: {
        stripePaymentId: sessionId,
        status: 'COMPLETED',
      },
      include: {
        client: true,
      },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Map frequency enum to readable string
    const frequencyMap: { [key: string]: string } = {
      ONE_TIME: 'One-Time Service',
      MONTHLY: 'Monthly Service',
      TWICE_MONTHLY: 'Twice-Monthly Service',
    }

    return NextResponse.json({
      payment: {
        ...payment,
        frequency: frequencyMap[payment.frequency] || payment.frequency,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
