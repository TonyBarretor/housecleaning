'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { BookingCalendar } from './booking-calendar'
import { PriceEstimator } from './price-estimator'
import { FiCheck, FiClock } from 'react-icons/fi'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  preferredTime: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
]

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const preferredTime = watch('preferredTime')

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          preferredDate: selectedDate.toISOString(),
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-[var(--gold-500)]">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <FiCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--navy-900)] mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-lg text-[var(--navy-600)] mb-6">
              Thank you for choosing our premium cleaning service. We've sent a confirmation email with all the details.
            </p>
            <div className="bg-[var(--champagne-100)] rounded-lg p-6 mb-6">
              <div className="text-sm text-[var(--navy-600)] mb-2">Your Appointment</div>
              <div className="text-xl font-semibold text-[var(--navy-900)]">
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
              </div>
              <div className="text-[var(--navy-700)]">{preferredTime}</div>
            </div>
            <p className="text-sm text-[var(--navy-600)]">
              Our team will contact you within 24 hours to confirm the details.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-4">
                Your Information
              </h3>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="John Doe"
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="(555) 123-4567"
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Service Address *</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  placeholder="123 Main St, City, State, ZIP"
                  className="mt-2"
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Any specific requirements or areas of focus?"
                  className="mt-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Price Estimator */}
          <PriceEstimator />
        </div>

        {/* Right Column - Calendar & Time */}
        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-4">
              Select Date *
            </h3>
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* Time Selection */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="text-[var(--gold-500)]" />
                <h3 className="text-xl font-semibold text-[var(--navy-900)]">
                  Preferred Time *
                </h3>
              </div>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setValue('preferredTime', slot)}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all text-left font-medium
                      ${preferredTime === slot
                        ? 'border-[var(--gold-500)] bg-[var(--gold-50)] text-[var(--navy-900)]'
                        : 'border-[var(--champagne-300)] hover:border-[var(--gold-300)] text-[var(--navy-700)]'
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.preferredTime && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.preferredTime.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          variant="premium"
          size="lg"
          className="w-full max-w-md text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Book Free Estimate'}
        </Button>
      </div>

      <p className="text-center text-sm text-[var(--navy-600)]">
        By submitting, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
