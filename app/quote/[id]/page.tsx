import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { QuoteView } from '@/components/quote-view'

interface QuotePageProps {
  params: {
    id: string
  }
}

async function getQuote(id: string) {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        client: true,
        appointment: true,
        payment: true,
      },
    })

    if (!quote) {
      return null
    }

    // Update viewed status
    if (quote.status === 'SENT') {
      await prisma.quote.update({
        where: { id },
        data: {
          status: 'VIEWED',
          viewedAt: new Date(),
        },
      })
    }

    return quote
  } catch (error) {
    console.error('Error fetching quote:', error)
    return null
  }
}

export default async function QuotePage({ params }: QuotePageProps) {
  const quote = await getQuote(params.id)

  if (!quote) {
    notFound()
  }

  if (quote.status === 'ACCEPTED' && quote.payment) {
    redirect(`/payment/success?id=${quote.payment.id}`)
  }

  return <QuoteView quote={quote} />
}
