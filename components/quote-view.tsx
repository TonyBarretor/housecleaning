'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { FiCheck, FiX, FiClock, FiStar } from 'react-icons/fi'

interface QuoteViewProps {
  quote: any
}

export function QuoteView({ quote }: QuoteViewProps) {
  const router = useRouter()
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const isExpired = quote.expiresAt && new Date(quote.expiresAt) < new Date()
  const canAccept = quote.status !== 'ACCEPTED' && quote.status !== 'DECLINED' && !isExpired

  const pricingOptions = [
    {
      id: 'ONE_TIME',
      name: 'One-Time Service',
      price: quote.oneTimePrice,
      description: 'Perfect for special occasions',
      badge: null,
    },
    {
      id: 'MONTHLY',
      name: 'Monthly Service',
      price: quote.monthlyPrice,
      description: 'Save 10% with monthly cleaning',
      badge: 'Popular',
      savings: quote.oneTimePrice - quote.monthlyPrice,
    },
    {
      id: 'TWICE_MONTHLY',
      name: 'Twice-Monthly Service',
      price: quote.twiceMonthlyPrice,
      description: 'Best value - Save 15%',
      badge: 'Best Value',
      savings: quote.oneTimePrice - quote.twiceMonthlyPrice,
    },
  ]

  const handleAccept = async () => {
    if (!selectedFrequency) {
      alert('Please select a service frequency')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/quotes/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId: quote.id,
          frequency: selectedFrequency,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl
      } else {
        alert('Failed to process your request')
      }
    } catch (error) {
      console.error('Accept quote error:', error)
      alert('An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDecline = async () => {
    if (!confirm('Are you sure you want to decline this quote?')) {
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/quotes/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: quote.id }),
      })

      if (response.ok) {
        alert('Quote declined. Thank you for your time.')
        router.push('/')
      } else {
        alert('Failed to decline quote')
      }
    } catch (error) {
      console.error('Decline quote error:', error)
      alert('An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--champagne-50)] to-white py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
            <FiStar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-900)] mb-4">
            Your Personalized Quote
          </h1>
          <p className="text-lg text-[var(--navy-600)]">
            Hello {quote.client.name}, here's your custom cleaning service quote
          </p>
        </motion.div>

        {/* Status Badge */}
        {isExpired && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800 font-medium">
              This quote has expired. Please contact us for a new quote.
            </p>
          </div>
        )}

        {quote.status === 'DECLINED' && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-800 font-medium">
              This quote has been declined.
            </p>
          </div>
        )}

        {/* Pricing Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => canAccept && setSelectedFrequency(option.id)}
              className="cursor-pointer"
            >
              <Card
                className={`h-full relative transition-all ${
                  selectedFrequency === option.id
                    ? 'border-2 border-[var(--gold-500)] shadow-xl scale-105'
                    : 'border-2 hover:border-[var(--gold-300)] hover:shadow-lg'
                } ${!canAccept ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {option.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="premium">{option.badge}</Badge>
                  </div>
                )}

                <CardHeader className="pb-4 pt-8">
                  <CardTitle className="text-xl mb-2">{option.name}</CardTitle>
                  <p className="text-sm text-[var(--navy-600)]">{option.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-[var(--navy-900)]">
                      {formatPrice(option.price)}
                    </div>
                    {option.id !== 'ONE_TIME' && (
                      <div className="text-sm text-[var(--navy-600)]">per visit</div>
                    )}
                  </div>

                  {option.savings && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="text-sm text-green-800 font-semibold">
                        Save {formatPrice(option.savings)} per visit!
                      </div>
                    </div>
                  )}

                  {selectedFrequency === option.id && (
                    <div className="flex items-center justify-center gap-2 text-[var(--gold-600)] font-semibold">
                      <FiCheck className="w-5 h-5" />
                      <span>Selected</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Details */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="font-semibold text-xl text-[var(--navy-900)] mb-4">
              What's Included
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Professional, background-checked cleaners',
                'Premium eco-friendly products',
                '100% satisfaction guarantee',
                'Flexible rescheduling',
                'Fully insured service',
                'Consistent quality every visit',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-white text-xs" />
                  </div>
                  <span className="text-[var(--navy-700)]">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quote Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-[var(--navy-600)] mb-1">Service Address</div>
                <div className="font-medium text-[var(--navy-900)]">{quote.client.address}</div>
              </div>
              {quote.expiresAt && (
                <div>
                  <div className="text-sm text-[var(--navy-600)] mb-1">Quote Valid Until</div>
                  <div className="font-medium text-[var(--navy-900)] flex items-center gap-2">
                    <FiClock className="text-[var(--gold-500)]" />
                    {formatDate(quote.expiresAt)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {canAccept && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleAccept}
              variant="premium"
              size="lg"
              className="text-lg px-12"
              disabled={isProcessing || !selectedFrequency}
            >
              {isProcessing ? 'Processing...' : 'Accept & Pay'}
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              size="lg"
              className="text-lg px-12"
              disabled={isProcessing}
            >
              <FiX className="mr-2" />
              Decline
            </Button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-[var(--champagne-300)]">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--navy-600)]">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💯</span>
              <span>Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
