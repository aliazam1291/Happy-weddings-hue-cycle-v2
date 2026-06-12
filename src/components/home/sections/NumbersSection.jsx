'use client'

import { motion } from 'framer-motion'
import { NumberCounter } from '@/components/motion/NumberCounter'
import { Ornament } from '@/components/motion/Ornament'
import { Card, CardEyebrow } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TiltCard } from '@/components/motion/TiltCard'

const EASE = [0.22, 1, 0.36, 1]

const STATS = [
  { value: 13, suffix: ' yrs', label: 'A named house', sub: 'since 2013' },
  { value: 350, suffix: '+', label: 'Weddings shaped', sub: 'India & beyond' },
  { value: 7, suffix: '', label: 'Services', sub: 'under one roof' },
  { value: 24, suffix: '/7', label: 'CEO involved', sub: 'every celebration' },
]

// Negative vertical offsets per index — odd cards drop, even cards lift,
// creating a staggered editorial dance instead of a flat grid.
const OFFSETS = ['md:-translate-y-6', 'md:translate-y-6', 'md:-translate-y-2', 'md:translate-y-8']

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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex justify-center mb-4"
        >
          <Badge variant="gold" size="sm" shape="pill">
            By the numbers
          </Badge>
        </motion.div>
        <Ornament className="mb-12 md:mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: i * 0.09, ease: EASE }}
              className={`transform ${OFFSETS[i]}`}
            >
              <TiltCard intensity={7} perspective={900} scale={1.03}>
                <Card
                  variant={i % 2 === 0 ? 'default' : 'cream'}
                  shape="soft"
                  hover="glow"
                  className="flex flex-col items-center justify-center py-14 md:py-20 px-6 text-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <CardEyebrow
                    className="mb-4 hidden md:block"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    0{i + 1} / 0{STATS.length}
                  </CardEyebrow>
                  <p
                    className="font-display italic leading-none mb-3"
                    style={{
                      fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                      color: 'hsl(32 31% 51%)',
                      transform: 'translateZ(50px)',
                    }}
                  >
                    <NumberCounter to={s.value} suffix={s.suffix} />
                  </p>
                  <p
                    className="font-sans text-sm uppercase tracking-widest mb-1"
                    style={{ color: 'hsl(24 12% 10%)', transform: 'translateZ(25px)' }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="font-sans text-xs"
                    style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                  >
                    {s.sub}
                  </p>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
