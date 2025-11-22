import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendQuote } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, oneTimePrice, monthlyPrice, twiceMonthlyPrice, notes } = body

    if (!appointmentId || !oneTimePrice || !monthlyPrice || !twiceMonthlyPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get appointment with client details
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { client: true },
    })

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        appointmentId,
        clientId: appointment.clientId,
        oneTimePrice,
        monthlyPrice,
        twiceMonthlyPrice,
        status: 'SENT',
        sentAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        notes: notes || '',
      },
    })

    // Update appointment
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { estimateGiven: true },
    })

    // Send quote email
    const quoteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/quote/${quote.id}`
    try {
      await sendQuote(
        {
          clientName: appointment.client.name,
          quoteId: quote.id,
          oneTimePrice,
          monthlyPrice,
          twiceMonthlyPrice,
          quoteUrl,
        },
        appointment.client.email
      )
    } catch (emailError) {
      console.error('Failed to send quote email:', emailError)
    }

    return NextResponse.json({
      success: true,
      quote: {
        id: quote.id,
        status: quote.status,
      },
    })
  } catch (error) {
    console.error('Quote creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        client: true,
        appointment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ quotes })
  } catch (error) {
    console.error('Fetch quotes error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}
