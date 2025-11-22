import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'
import { format } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, preferredDate, preferredTime, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !address || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create or find client
    let client = await prisma.client.findUnique({
      where: { email },
    })

    if (!client) {
      client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          address,
        },
      })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clientId: client.id,
        preferredDate: new Date(preferredDate),
        preferredTime,
        notes: notes || '',
        status: 'PENDING',
      },
    })

    // Send confirmation email
    try {
      await sendBookingConfirmation(
        {
          clientName: name,
          appointmentDate: format(new Date(preferredDate), 'MMMM d, yyyy'),
          appointmentTime: preferredTime,
          address,
        },
        email
      )
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        preferredDate: appointment.preferredDate,
        preferredTime: appointment.preferredTime,
      },
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Fetch appointments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
