'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Executive',
    image: '👩‍💼',
    rating: 5,
    content: 'Absolutely exceptional service! The team is professional, thorough, and always on time. My home has never looked better. Worth every penny!',
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: '👨‍💻',
    rating: 5,
    content: 'As a busy professional, this service is a lifesaver. The quality is consistently outstanding, and I love that they use eco-friendly products.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Business Owner',
    image: '👩‍💼',
    rating: 5,
    content: 'I\'ve tried many cleaning services, but this is truly premium. The attention to detail is remarkable, and the staff is incredibly trustworthy.',
  },
  {
    name: 'David Thompson',
    role: 'Real Estate Agent',
    image: '👨‍💼',
    rating: 5,
    content: 'I recommend them to all my clients. They make properties shine! The booking process is seamless, and they never disappoint.',
  },
  {
    name: 'Jessica Lee',
    role: 'Doctor',
    image: '👩‍⚕️',
    rating: 5,
    content: 'With my hectic schedule, having a reliable cleaning service is essential. They\'re flexible, professional, and do an amazing job every time.',
  },
  {
    name: 'Robert Martinez',
    role: 'Consultant',
    image: '👨‍💼',
    rating: 5,
    content: 'The twice-monthly plan has been perfect for our family. Our home always feels fresh and welcoming. Highly recommend!',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--navy-900)] mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[var(--navy-600)] leading-relaxed">
            Join hundreds of satisfied clients who trust us with their homes.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--gold-300)]">
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-5 h-5 text-[var(--gold-500)] fill-[var(--gold-500)]"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-[var(--navy-700)] leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--champagne-300)]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--champagne-200)] to-[var(--champagne-300)] flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--navy-900)]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[var(--navy-600)]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 px-12 py-6 bg-gradient-to-r from-[var(--champagne-100)] to-[var(--champagne-50)] rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--navy-900)] mb-1">500+</div>
              <div className="text-sm text-[var(--navy-600)]">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-[var(--champagne-300)]"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--navy-900)] mb-1">4.9★</div>
              <div className="text-sm text-[var(--navy-600)]">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-[var(--champagne-300)]"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--navy-900)] mb-1">5 Years</div>
              <div className="text-sm text-[var(--navy-600)]">In Business</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
