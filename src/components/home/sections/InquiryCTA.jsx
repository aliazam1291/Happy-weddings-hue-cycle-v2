'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Marquee } from '@/components/motion/Marquee'
import { MagneticButton } from '@/components/motion/MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

export function InquiryCTA() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      {/* Marquee strip top */}
      <div className="py-6 border-b border-ivory/8">
        <Marquee duration={55}>
          {['Timeless', 'Intentional', 'Emotional', 'Bespoke', 'Curated'].map((w, i) => (
            <span
              key={i}
              className="font-display italic px-10 select-none"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                color: i % 3 === 2 ? 'hsl(13 60% 39%)' : 'hsl(34 30% 95% / 0.15)',
                lineHeight: 1,
              }}
            >
              {w}
              <span style={{ color: 'hsl(32 31% 51%)' }}> ✦ </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main content */}
      <div className="container py-28 md:py-40 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-12"
          style={{ color: 'hsl(32 31% 51%)' }}
        >
          — Begin
        </motion.p>

        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display font-light text-ivory tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.95 }}
          >
            Ready to tell
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="font-display italic tracking-[-0.03em] text-balance"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 8rem)',
              lineHeight: 0.95,
              color: 'hsl(32 31% 51%)',
            }}
          >
            your story?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="font-display italic text-xl md:text-2xl mb-16 max-w-lg"
          style={{ color: 'hsl(34 30% 95% / 0.45)' }}
        >
          Every celebration begins with a conversation. We listen first.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <MagneticButton strength={0.35}>
            <Link
              href="/contact"
              data-cursor="link"
              className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-[0.22em] px-10 py-5 border border-ivory/30 text-ivory hover:bg-gold hover:border-gold hover:text-ivory transition-all duration-500"
            >
              Start a conversation
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-14"
        >
          {[
            'hello@happyweddings.in',
            '+91 00000 00000',
            'New Delhi & Nationwide',
          ].map((item) => (
            <span
              key={item}
              className="font-sans text-xs"
              style={{ color: 'hsl(34 30% 95% / 0.35)' }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom brand line */}
      <div className="border-t border-ivory/8 py-6">
        <Marquee duration={80} reverse>
          {['Happy Weddings', '·', 'Est. 2013', '·', 'Shruti Jain', '·', 'India & Beyond', '·'].map((w, i) => (
            <span
              key={i}
              className="font-sans text-[0.6rem] uppercase tracking-[0.3em] px-6"
              style={{ color: 'hsl(34 30% 95% / 0.14)' }}
            >
              {w}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
