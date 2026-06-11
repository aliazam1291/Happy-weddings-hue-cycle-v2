'use client'

import { motion } from 'framer-motion'
import { Star, Award, MapPin, CalendarDays } from 'lucide-react'
import { ease } from '@/lib/motion'

const SIGNALS = [
  { icon: Award, label: 'ThreeBestRated', value: 'No. 2 in Indore' },
  { icon: Star, label: 'Google Reviews', value: '5-star · Verified' },
  { icon: CalendarDays, label: 'Since 2013', value: 'Eleven years' },
  { icon: MapPin, label: 'Based in', value: 'Indore · Pan-India' },
]

/**
 * Above-the-fold trust strip. Small, restrained, four signals only.
 * Animates in as you cross the boundary out of the hero portal.
 */
export function TrustBar() {
  return (
    <section
      className="relative w-full border-y"
      style={{
        backgroundColor: 'hsl(34 30% 95%)',
        borderColor: 'hsl(24 12% 10% / 0.08)',
      }}
    >
      <div className="container py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        {SIGNALS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: ease.editorial }}
              className="flex items-center gap-3 md:gap-4 md:justify-center"
            >
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color: 'hsl(32 31% 46%)' }}
                strokeWidth={1.5}
              />
              <div className="leading-tight">
                <p
                  className="font-sans text-[0.55rem] uppercase tracking-[0.22em] mb-0.5"
                  style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                >
                  {s.label}
                </p>
                <p
                  className="font-display text-sm md:text-[0.95rem]"
                  style={{ color: 'hsl(24 12% 10% / 0.85)' }}
                >
                  {s.value}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
