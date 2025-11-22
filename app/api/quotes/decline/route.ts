import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { quoteId } = body

    if (!quoteId) {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      )
    }

    // Update quote status
    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        status: 'DECLINED',
        respondedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      quote: {
        id: quote.id,
        status: quote.status,
      },
    })
  } catch (error) {
    console.error('Quote decline error:', error)
    return NextResponse.json(
      { error: 'Failed to decline quote' },
      { status: 500 }
    )
  }
}
