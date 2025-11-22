'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { FiShield, FiClock, FiAward, FiHeart, FiStar, FiTrendingUp } from 'react-icons/fi'

const features = [
  {
    icon: FiShield,
    title: 'Background-Checked Professionals',
    description: 'Every team member undergoes rigorous screening and verification for your peace of mind.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: FiHeart,
    title: 'Eco-Friendly Products',
    description: 'Premium, non-toxic cleaning solutions that are safe for your family and pets.',
    gradient: 'from-green-500 to-green-600',
  },
  {
    icon: FiClock,
    title: 'Always On Time',
    description: 'We respect your schedule. Punctual service with real-time arrival notifications.',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: FiAward,
    title: '100% Satisfaction Guarantee',
    description: 'If you\'re not completely satisfied, we\'ll make it right - for free.',
    gradient: 'from-[var(--gold-500)] to-[var(--gold-600)]',
  },
  {
    icon: FiStar,
    title: 'Premium Service',
    description: 'White-glove treatment and attention to detail in every corner of your home.',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: FiTrendingUp,
    title: 'Flexible Plans',
    description: 'One-time, monthly, or twice-monthly options that fit your lifestyle.',
    gradient: 'from-pink-500 to-pink-600',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gold-500)] to-transparent opacity-50"></div>

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
            Why Choose Us
          </h2>
          <p className="text-lg text-[var(--navy-600)] leading-relaxed">
            We combine professionalism, reliability, and premium quality to deliver
            an exceptional cleaning experience every time.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-[var(--gold-500)] transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--navy-600)] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
