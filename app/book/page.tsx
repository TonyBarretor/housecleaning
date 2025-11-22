import { Metadata } from 'next'
import { BookingForm } from '@/components/forms/booking-form'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Book Free Estimate | Premium House Cleaning',
  description: 'Schedule your free in-home estimate for premium cleaning services. Choose your preferred date and time instantly.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--champagne-50)] to-white py-12">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--navy-700)] hover:text-[var(--navy-900)] mb-8 transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--navy-900)] mb-4">
            Book Your Free Estimate
          </h1>
          <p className="text-lg text-[var(--navy-600)] leading-relaxed">
            Schedule a complimentary in-home consultation. We'll assess your needs and
            provide a personalized quote tailored to your home.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-7xl mx-auto">
          <BookingForm />
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-[var(--champagne-300)]">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-[var(--navy-900)] mb-2">100% Secure</h3>
              <p className="text-sm text-[var(--navy-600)]">
                Your information is protected and never shared
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-[var(--navy-900)] mb-2">Instant Booking</h3>
              <p className="text-sm text-[var(--navy-600)]">
                Get confirmation within minutes
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-semibold text-[var(--navy-900)] mb-2">No Commitment</h3>
              <p className="text-sm text-[var(--navy-600)]">
                Free estimate with no obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
