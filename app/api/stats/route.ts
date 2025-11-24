import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfMonth, endOfMonth } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const [
      totalClients,
      pendingAppointments,
      pendingQuotes,
      monthlyPayments,
    ] = await Promise.all([
      prisma.client.count(),
      prisma.appointment.count({
        where: { status: 'PENDING' },
      }),
      prisma.quote.count({
        where: { status: { in: ['SENT', 'VIEWED'] } },
      }),
      prisma.payment.findMany({
        where: {
          status: 'COMPLETED',
          paidAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ])

    const monthlyRevenue = monthlyPayments.reduce((sum: number, payment: any) => sum + payment.amount, 0)

    return NextResponse.json({
      stats: {
        totalClients,
        pendingAppointments,
        pendingQuotes,
        monthlyRevenue,
        completedPayments: monthlyPayments.length,
      },
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
