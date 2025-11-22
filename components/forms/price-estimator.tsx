'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

export function PriceEstimator() {
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(1)
  const [deepCleaning, setDeepCleaning] = useState(false)

  // Calculate estimated price range
  const calculateEstimate = () => {
    let baseMin = 80
    let baseMax = 100

    // Add per bedroom
    baseMin += bedrooms * 25
    baseMax += bedrooms * 35

    // Add per bathroom
    baseMin += bathrooms * 20
    baseMax += bathrooms * 30

    // Deep cleaning multiplier
    if (deepCleaning) {
      baseMin *= 1.4
      baseMax *= 1.5
    }

    return {
      min: Math.round(baseMin / 10) * 10, // Round to nearest 10
      max: Math.round(baseMax / 10) * 10,
    }
  }

  const estimate = calculateEstimate()

  return (
    <Card className="border-2 border-[var(--gold-300)] bg-gradient-to-br from-[var(--champagne-50)] to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Quick Price Estimate</CardTitle>
          <Badge variant="premium">Instant</Badge>
        </div>
        <p className="text-sm text-[var(--navy-600)] mt-2">
          Get a ballpark range for your cleaning service
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bedrooms */}
        <div>
          <Label className="mb-3 block">Number of Bedrooms</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setBedrooms(num)}
                className={`
                  flex-1 py-3 rounded-lg font-semibold transition-all
                  ${bedrooms === num
                    ? 'bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] text-white shadow-lg scale-105'
                    : 'bg-[var(--champagne-200)] text-[var(--navy-900)] hover:bg-[var(--champagne-300)]'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <Label className="mb-3 block">Number of Bathrooms</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setBathrooms(num)}
                className={`
                  flex-1 py-3 rounded-lg font-semibold transition-all
                  ${bathrooms === num
                    ? 'bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] text-white shadow-lg scale-105'
                    : 'bg-[var(--champagne-200)] text-[var(--navy-900)] hover:bg-[var(--champagne-300)]'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Deep Cleaning Option */}
        <div>
          <button
            type="button"
            onClick={() => setDeepCleaning(!deepCleaning)}
            className={`
              w-full p-4 rounded-lg border-2 transition-all text-left
              ${deepCleaning
                ? 'border-[var(--gold-500)] bg-[var(--gold-50)]'
                : 'border-[var(--champagne-300)] hover:border-[var(--gold-300)]'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[var(--navy-900)] mb-1">
                  Deep Cleaning
                </div>
                <div className="text-sm text-[var(--navy-600)]">
                  Includes baseboards, windows, oven, and fridge
                </div>
              </div>
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${deepCleaning
                    ? 'border-[var(--gold-500)] bg-[var(--gold-500)]'
                    : 'border-[var(--champagne-400)]'
                  }
                `}
              >
                {deepCleaning && <span className="text-white text-sm">✓</span>}
              </div>
            </div>
          </button>
        </div>

        {/* Estimated Price */}
        <motion.div
          key={`${bedrooms}-${bathrooms}-${deepCleaning}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-[var(--navy-900)] to-[var(--navy-800)] rounded-xl p-6 text-center"
        >
          <div className="text-sm text-gray-300 mb-2">Estimated Range</div>
          <div className="text-4xl font-bold text-white mb-2">
            {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
          </div>
          <div className="text-xs text-gray-400">
            Final price determined after in-person estimate
          </div>
        </motion.div>

        <p className="text-xs text-center text-[var(--navy-600)] italic">
          This is an estimate only. Actual pricing will be determined during your free in-home consultation.
        </p>
      </CardContent>
    </Card>
  )
}
