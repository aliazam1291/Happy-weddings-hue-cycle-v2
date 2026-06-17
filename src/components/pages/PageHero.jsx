'use client'

import { SplitTextReveal } from '@/components/motion/SplitTextReveal'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { Rosette } from '@/components/motion/Ornament'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Shared subpage hero — light theme, editorial. A parallax image band sits
 * behind a big serif title so every subpage opens in one consistent language.
 * Fully responsive: the headline scales with viewport, image height shrinks
 * on mobile, parallax stays gentle on touch.
 */
export function PageHero({ eyebrow, title, accent, subtitle, image }) {
  return (
    <header className="relative w-full overflow-hidden" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
      <div className="container pt-28 pb-10 md:pt-32 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.editorial }}
        >
          <Breadcrumb />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.editorial, delay: 0.1 }}
          className="font-sans text-[0.65rem] uppercase tracking-[0.32em] mb-6 md:mb-8"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          — {eyebrow}
        </motion.p>

        <SplitTextReveal
          as="h1"
          className="font-display font-light tracking-[-0.02em] leading-[0.95] max-w-[16ch] text-ink text-[clamp(2.6rem,8vw,6.25rem)]"
        >
          {title}
        </SplitTextReveal>
        {accent && (
          <SplitTextReveal
            as="span"
            delay={0.15}
            className="block font-display italic font-light tracking-[-0.02em] leading-[0.95] text-gold text-[clamp(2.6rem,8vw,6.25rem)]"
          >
            {accent}
          </SplitTextReveal>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: ease.editorial, delay: 0.5 }}
            className="mt-8 md:mt-10 font-sans font-light text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'hsl(24 12% 10% / 0.62)' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <ParallaxLayer speed={0.12} className="pointer-events-none absolute right-8 top-16 hidden xl:block opacity-30">
        <Rosette size={60} tone="gold" />
      </ParallaxLayer>

      {image && (
        <div className="relative h-[42vh] md:h-[64vh] w-full overflow-hidden">
          <ParallaxLayer speed={0.18} className="absolute inset-[-12%]">
            <img
              src={image}
              alt=""
              data-cursor="media"
              className="h-full w-full object-cover"
              style={{ filter: 'saturate(0.86) brightness(0.98)' }}
            />
          </ParallaxLayer>
          {/* blend the photo into the cream ground top + bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, hsl(34 30% 95%), transparent)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, hsl(34 30% 95%), transparent)' }} />
          <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: 'hsl(34 40% 60% / 0.22)' }} />
        </div>
      )}
    </header>
  )
}
