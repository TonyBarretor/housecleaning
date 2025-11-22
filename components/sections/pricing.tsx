'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FiCheck } from 'react-icons/fi'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'One-Time Service',
    description: 'Perfect for special occasions or deep cleaning',
    price: '120',
    period: 'per visit',
    features: [
      'Professional deep cleaning',
      'Eco-friendly products',
      'Background-checked staff',
      'Satisfaction guarantee',
      'Flexible scheduling',
    ],
    popular: false,
    badge: null,
    discount: null,
  },
  {
    name: 'Monthly Service',
    description: 'Regular cleaning for a consistently fresh home',
    price: '108',
    period: 'per visit',
    features: [
      'Everything in One-Time',
      'Priority scheduling',
      'Same cleaner every time',
      'Save 10% per visit',
      'Easy online management',
      'Cancel anytime',
    ],
    popular: true,
    badge: 'Most Popular',
    discount: '10% OFF',
  },
  {
    name: 'Twice-Monthly',
    description: 'Best value for pristine home maintenance',
    price: '102',
    period: 'per visit',
    features: [
      'Everything in Monthly',
      'Highest priority booking',
      'VIP customer support',
      'Save 15% per visit',
      'Free add-ons quarterly',
      'Loyalty rewards program',
    ],
    popular: false,
    badge: 'Best Value',
    discount: '15% OFF',
  },
]

export function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[var(--champagne-50)] to-white relative overflow-hidden">
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
            Flexible Service Plans
          </h2>
          <p className="text-lg text-[var(--navy-600)] leading-relaxed">
            Choose the cleaning frequency that fits your lifestyle.
            All plans include our premium service and satisfaction guarantee.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge variant="premium" className="px-4 py-1.5 text-sm shadow-lg">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full relative overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[var(--gold-500)] shadow-2xl scale-105'
                    : 'border-2 hover:border-[var(--gold-300)] hover:shadow-xl'
                }`}
              >
                {plan.discount && (
                  <div className="absolute top-6 right-6">
                    <Badge variant="secondary" className="bg-[var(--gold-100)] text-[var(--gold-800)] border border-[var(--gold-300)]">
                      {plan.discount}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-8 pt-12">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[var(--navy-900)]">
                        ${plan.price}
                      </span>
                      <span className="text-[var(--navy-600)]">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck className="text-white text-xs" />
                        </div>
                        <span className="text-sm text-[var(--navy-700)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/book" className="block">
                    <Button
                      variant={plan.popular ? 'premium' : 'outline'}
                      className="w-full"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Membership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[var(--navy-900)] to-[var(--navy-800)] border-none text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">VIP Membership Benefits</h3>
              <div className="grid md:grid-cols-3 gap-8 mt-6">
                <div>
                  <div className="text-3xl font-bold text-[var(--gold-400)] mb-2">Priority</div>
                  <p className="text-sm text-gray-300">Booking & Scheduling</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--gold-400)] mb-2">Exclusive</div>
                  <p className="text-sm text-gray-300">Discounts & Offers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--gold-400)] mb-2">Dedicated</div>
                  <p className="text-sm text-gray-300">Support Team</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
