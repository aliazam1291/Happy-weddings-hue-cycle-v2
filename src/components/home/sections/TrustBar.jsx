'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

const SIGNALS = [
  { value: '350+', label: 'Celebrations shaped', sub: 'across India & beyond' },
  { value: '13', label: 'Years in craft', sub: 'est. 2013 · still going' },
  { value: '5 ★', label: 'Google rating', sub: 'verified client reviews' },
  { value: '#2', label: 'ThreeBestRated™', sub: 'Indore wedding planners' },
]

/**
 * Editorial stat strip — four large numbers separated by hairline rules.
 * Replaces the old card-based layout for a more luxury editorial feel.
 */
export function TrustBar() {
  return (
    <section
      className="relative w-full border-b"
      style={{ backgroundColor: 'hsl(34 30% 95%)', borderColor: 'hsl(24 12% 10% / 0.08)' }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft: '1px solid hsl(24 12% 10% / 0.08)' }}>
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: ease.editorial }}
              className="flex flex-col px-8 py-12 md:py-16"
              style={{
                borderRight: '1px solid hsl(24 12% 10% / 0.08)',
                borderBottom: i < 2 ? '1px solid hsl(24 12% 10% / 0.08)' : undefined,
              }}
            >
              {/* Large editorial number */}
              <p
                className="font-display italic leading-none mb-4"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  color: 'hsl(32 31% 51%)',
                }}
              >
                {s.value}
              </p>

              {/* Label */}
              <p
                className="font-sans uppercase tracking-[0.2em] mb-1"
                style={{ fontSize: '0.62rem', color: 'hsl(24 12% 10%)' }}
              >
                {s.label}
              </p>

              {/* Sub-label */}
              <p
                className="font-sans"
                style={{ fontSize: '0.58rem', color: 'hsl(24 12% 10% / 0.45)' }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
