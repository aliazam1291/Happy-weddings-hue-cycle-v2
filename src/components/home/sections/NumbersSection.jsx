'use client'

import { motion } from 'framer-motion'
import { NumberCounter } from '@/components/motion/NumberCounter'

const EASE = [0.22, 1, 0.36, 1]

const STATS = [
  { value: 350, suffix: '+', label: 'Celebrations', sub: 'since 2013' },
  { value: 12, suffix: ' yrs', label: 'Designing', sub: 'as a house' },
  { value: 40, suffix: '+', label: 'Destinations', sub: 'across the world' },
  { value: 98, suffix: '%', label: 'Referred', sub: 'by past families' },
]

export function NumbersSection() {
  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      {/* Large decorative background text */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        <span
          className="font-display font-light whitespace-nowrap"
          style={{
            fontSize: '28vw',
            color: 'hsl(24 12% 10% / 0.035)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Since 2013
        </span>
      </div>

      <div className="container relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-20 text-center"
          style={{ color: 'hsl(32 31% 51%)' }}
        >
          — By the numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: 'hsl(24 12% 10% / 0.08)' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: i * 0.09, ease: EASE }}
              className="flex flex-col items-center justify-center py-14 md:py-20 px-6"
              style={{ backgroundColor: 'hsl(33 32% 90%)' }}
            >
              <p
                className="font-display italic leading-none mb-3"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: 'hsl(32 31% 51%)' }}
              >
                <NumberCounter to={s.value} suffix={s.suffix} />
              </p>
              <p
                className="font-sans text-sm uppercase tracking-widest mb-1"
                style={{ color: 'hsl(24 12% 10%)' }}
              >
                {s.label}
              </p>
              <p
                className="font-sans text-xs"
                style={{ color: 'hsl(24 12% 10% / 0.45)' }}
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
