import { Suspense } from 'react'
import { PaymentSuccessContent } from '@/components/payment-success-content'

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--champagne-50)] to-white">
        <div className="text-lg text-[var(--navy-700)]">Loading...</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
