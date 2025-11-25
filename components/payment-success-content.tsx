'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDate } from '@/lib/utils'
import { FiCheckCircle, FiCalendar, FiMail, FiHome } from 'react-icons/fi'
import Link from 'next/link'

export function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      fetchPaymentData(sessionId)
    }
  }, [sessionId])

  const fetchPaymentData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/payment/verify?session_id=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setPaymentData(data.payment)
      }
    } catch (error) {
      console.error('Error fetching payment data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--champagne-50)] to-white">
        <div className="text-lg text-[var(--navy-700)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-2xl"
            >
              <FiCheckCircle className="w-14 h-14 text-white" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-900)] mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-[var(--navy-600)]">
              Welcome to Premium House Cleaning
            </p>
          </div>

          {/* Payment Summary Card */}
          {paymentData && (
            <Card className="mb-8 border-2 border-green-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[var(--navy-900)] mb-6">
                  Payment Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-[var(--champagne-300)]">
                    <span className="text-[var(--navy-700)]">Amount Paid</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(paymentData.amount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[var(--champagne-300)]">
                    <span className="text-[var(--navy-700)]">Service Plan</span>
                    <span className="font-semibold text-[var(--navy-900)]">
                      {paymentData.frequency}
                    </span>
                  </div>

                  {paymentData.nextServiceDate && (
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--champagne-300)]">
                      <span className="text-[var(--navy-700)]">Next Service Date</span>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-[var(--gold-500)]" />
                        <span className="font-semibold text-[var(--navy-900)]">
                          {formatDate(paymentData.nextServiceDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <span className="text-[var(--navy-700)]">Service Address</span>
                    <span className="font-medium text-[var(--navy-900)] text-right max-w-xs">
                      {paymentData.client?.address || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* What's Next */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-[var(--navy-900)] mb-6">
                What Happens Next?
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--navy-900)] mb-1">
                      Check Your Email
                    </h4>
                    <p className="text-[var(--navy-600)] text-sm">
                      We've sent a detailed confirmation with all your service details and what to expect.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--navy-900)] mb-1">
                      24-Hour Reminder
                    </h4>
                    <p className="text-[var(--navy-600)] text-sm">
                      You'll receive an SMS reminder the day before your scheduled cleaning.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                    <FiHome className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--navy-900)] mb-1">
                      Professional Service
                    </h4>
                    <p className="text-[var(--navy-600)] text-sm">
                      Our background-checked team will arrive on time and deliver exceptional results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Satisfaction Guarantee */}
          <Card className="mb-8 bg-gradient-to-r from-[var(--navy-900)] to-[var(--navy-800)] text-white border-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                100% Satisfaction Guarantee
              </h3>
              <p className="text-gray-300">
                If you're not completely satisfied with our service, we'll make it right - for free.
                Your happiness is our priority.
              </p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-[var(--navy-600)] mb-2">
              Questions or need to reschedule?
            </p>
            <p className="text-[var(--navy-900)] font-semibold">
              support@premiumcleaning.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
