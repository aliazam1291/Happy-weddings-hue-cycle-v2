'use client'

import { motion } from 'framer-motion'
import { CountUp } from '@/components/reactbits/CountUp'
import { Ornament } from '@/components/motion/Ornament'
import { IMAGES } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1]

const STATS = [
  { value: 13,  suffix: '',    label: 'Years',             sub: 'in craft since 2013' },
  { value: 350, suffix: '+',   label: 'Weddings shaped',   sub: 'India & beyond' },
  { value: 9,   suffix: '',    label: 'Services',          sub: 'under one roof' },
  { value: 24,  suffix: '/7',  label: 'CEO involvement',   sub: 'every celebration' },
]

export function NumbersSection() {
  return (
    <section
      className="relative w-full py-28 md:py-40 overflow-hidden"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      {/* Background photography at low opacity */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={IMAGES.stories[2].src}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12, filter: 'brightness(0.5) saturate(0.6)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, hsl(24 12% 10% / 0.7) 100%)' }}
        />
      </div>

      {/* Large decorative watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        <span
          className="font-display font-light whitespace-nowrap"
          style={{ fontSize: '28vw', color: 'hsl(34 30% 95% / 0.025)', lineHeight: 1, letterSpacing: '-0.02em' }}
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
          <span
            className="inline-flex items-center font-sans uppercase tracking-[0.28em] h-6 px-3.5 text-[0.62rem] rounded-full border"
            style={{ borderColor: 'hsl(32 31% 51% / 0.45)', color: 'hsl(33 34% 62%)' }}
          >
            By the numbers
          </span>
        </motion.div>
        <Ornament tone="ivory" className="mb-16 md:mb-20" />

        {/* Stats grid — alternating vertical offsets for editorial rhythm */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ivory/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
              className="flex flex-col items-center justify-center py-16 md:py-20 px-6 text-center"
              style={{ backgroundColor: 'hsl(24 12% 10%)' }}
            >
              {/* Eyebrow numeral */}
              <p
                className="font-sans uppercase tracking-[0.28em] mb-5"
                style={{ fontSize: '0.6rem', color: 'hsl(34 30% 95% / 0.45)' }}
              >
                0{i + 1} / 0{STATS.length}
              </p>

              {/* Large gold count */}
              <p
                className="font-display italic leading-none mb-4"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', color: 'hsl(32 31% 51%)' }}
              >
                <CountUp to={s.value} suffix={s.suffix} />
              </p>

              {/* Label */}
              <p
                className="font-sans uppercase tracking-widest mb-1"
                style={{ fontSize: '0.65rem', color: 'hsl(34 30% 95% / 0.85)' }}
              >
                {s.label}
              </p>

              {/* Sub */}
              <p
                className="font-sans"
                style={{ fontSize: '0.65rem', color: 'hsl(34 30% 95% / 0.55)' }}
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
