'use client'

import { SplitTextReveal } from '@/components/motion/SplitTextReveal'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { Rosette } from '@/components/motion/Ornament'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'
import { PlaceholderCover } from '@/components/motion/PlaceholderCover'

/**
 * Shared subpage hero — light theme, editorial. A parallax image band sits
 * behind a big serif title so every subpage opens in one consistent language.
 * Fully responsive: the headline scales with viewport, image height shrinks
 * on mobile, parallax stays gentle on touch.
 *
 * `tone="terracotta"` swaps the ivory ground for a solid terracotta band with
 * ivory type and no photograph — used by the Services page (signed-off design).
 */
export function PageHero({ eyebrow, title, accent, subtitle, image, tone = 'ivory' }) {
  const terra = tone === 'terracotta'

  // Palette per tone
  const c = terra
    ? {
        bg: 'hsl(13 60% 39%)',
        eyebrow: 'hsl(34 30% 95% / 0.8)',
        title: 'hsl(34 30% 95%)',
        accent: 'hsl(33 42% 82%)',
        subtitle: 'hsl(34 30% 95% / 0.82)',
        blend: 'hsl(13 55% 32%)',
      }
    : {
        bg: 'hsl(34 30% 95%)',
        eyebrow: 'hsl(32 31% 46%)',
        title: 'hsl(24 12% 10%)',
        accent: 'hsl(32 31% 51%)',
        subtitle: 'hsl(24 12% 10% / 0.62)',
        blend: 'hsl(34 30% 95%)',
      }

  // On terracotta we never show the photo — it's a flat colour band.
  const showImage = !!image && !terra

  return (
    <header className="relative w-full overflow-hidden" style={{ backgroundColor: c.bg }}>
      {terra && (
        /* subtle depth on the flat terracotta band */
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 80% 10%, hsl(13 62% 46% / 0.55), transparent 60%), radial-gradient(ellipse 60% 70% at 0% 100%, hsl(13 55% 30% / 0.55), transparent 60%)',
          }}
        />
      )}

      <div className={`container relative z-10 pt-28 ${terra ? 'pb-24 md:pb-32' : 'pb-10 md:pb-14'} md:pt-32`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.editorial }}
        >
          <Breadcrumb tone={terra ? 'light' : 'dark'} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.editorial, delay: 0.1 }}
          className="font-sans text-[0.65rem] uppercase tracking-[0.32em] mb-6 md:mb-8"
          style={{ color: c.eyebrow }}
        >
          — {eyebrow}
        </motion.p>

        <SplitTextReveal
          as="h1"
          className="font-display font-light tracking-[-0.02em] leading-[0.95] max-w-[16ch] text-[clamp(2.6rem,8vw,6.25rem)]"
          style={{ color: c.title }}
        >
          {title}
        </SplitTextReveal>
        {accent && (
          <SplitTextReveal
            as="span"
            delay={0.15}
            className="block font-display italic font-light tracking-[-0.02em] leading-[0.95] text-[clamp(2.6rem,8vw,6.25rem)]"
            style={{ color: c.accent }}
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
            style={{ color: c.subtitle }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <ParallaxLayer speed={0.12} className="pointer-events-none absolute right-8 top-16 hidden xl:block opacity-30">
        <Rosette size={60} tone="gold" />
      </ParallaxLayer>

      {showImage && (
        <div className="relative h-[42vh] md:h-[60vh] w-full overflow-hidden">
          <ParallaxLayer speed={0.18} className="absolute inset-[-12%]">
            <PlaceholderCover seed={eyebrow || 'hero'} label={title || ''} />
          </ParallaxLayer>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14" style={{ background: `linear-gradient(to top, ${c.blend}, transparent)` }} />
        </div>
      )}
    </header>
  )
}
