'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Star, Award, MapPin, CalendarDays } from 'lucide-react'
import { ease } from '@/lib/motion'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const SIGNALS = [
  { icon: Award, label: 'ThreeBestRated', value: 'No. 2 in Indore' },
  { icon: Star, label: 'Google Reviews', value: '5-star · Verified' },
  { icon: CalendarDays, label: 'Since 2013', value: 'Thirteen years' },
  { icon: MapPin, label: 'Based in', value: 'Indore · Pan-India' },
]

/**
 * Trust strip — lifts above the hero seam with a negative top offset so the
 * card visually intrudes into the cinematic frame, then settles into the
 * ivory tide of the section that follows.
 */
export function TrustBar() {
  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container relative">
        <Card
          variant="default"
          shape="soft"
          className="relative z-20 -mt-12 md:-mt-16 px-4 md:px-8 py-7 md:py-8 shadow-[0_24px_60px_-32px_hsl(24_12%_10%/0.45)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-y-6 gap-x-4">
            {SIGNALS.map((s, i) => {
              const Icon = s.icon
              return (
                <Fragment key={s.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
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
                  {i < SIGNALS.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="hidden md:block h-10 mx-auto"
                    />
                  )}
                </Fragment>
              )
            })}
          </div>
        </Card>
      </div>
    </section>
  )
}
