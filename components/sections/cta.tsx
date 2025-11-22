'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--navy-900)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold-500)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gold-600)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center shadow-2xl">
              <FiCalendar className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready for a Spotless Home?
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              Book your free estimate today and experience the luxury of professional cleaning.
              No commitment required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button
                  variant="premium"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-transform"
                >
                  Book Free Estimate
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent text-white border-2 border-white hover:bg-white hover:text-[var(--navy-900)]"
              >
                Call Us Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
