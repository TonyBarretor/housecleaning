'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FiCheck, FiStar } from 'react-icons/fi'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--champagne-50)] via-white to-[var(--navy-50)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Badge variant="premium" className="text-sm px-4 py-2">
              <FiStar className="mr-2" />
              Premium Cleaning Service
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-[var(--navy-900)]">Come Home to</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-700)] bg-clip-text text-transparent">
                Peace & Calm
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-[var(--navy-600)] leading-relaxed max-w-xl">
              Premium house cleaning for busy professionals who value their time.
              Experience the luxury of a spotless home without lifting a finger.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-sm text-[var(--navy-700)] font-medium">Background-Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-sm text-[var(--navy-700)] font-medium">Eco-Friendly Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
                  <FiCheck className="text-white text-xs" />
                </div>
                <span className="text-sm text-[var(--navy-700)] font-medium">100% Satisfaction</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/book">
                <Button variant="premium" size="lg" className="w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform">
                  Book Free Estimate
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See Pricing
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-8 border-t border-[var(--champagne-300)]">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-[var(--gold-500)] fill-[var(--gold-500)] w-4 h-4" />
                  ))}
                </div>
                <p className="text-xs text-[var(--navy-600)]">4.9 out of 5 stars</p>
              </div>
              <div className="h-8 w-px bg-[var(--champagne-300)]"></div>
              <div>
                <p className="text-2xl font-bold text-[var(--navy-900)]">500+</p>
                <p className="text-xs text-[var(--navy-600)]">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-[var(--champagne-200)] to-[var(--navy-100)] flex items-center justify-center">
                {/* Placeholder for image - replace with actual image */}
                <div className="text-center p-12">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] flex items-center justify-center">
                    <span className="text-6xl">✨</span>
                  </div>
                  <p className="text-[var(--navy-700)] text-sm italic">
                    Add your premium cleaning service image here
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--navy-600)] mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-[var(--navy-900)]">$120</p>
                  </div>
                  <Badge variant="premium">Free Estimate</Badge>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-600)] rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-[var(--navy-500)] to-[var(--navy-700)] rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
