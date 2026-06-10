'use client'

import { ScrollTextFill } from '@/components/motion/ScrollTextFill'
import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Pinned brand statement — large Cormorant text whose words light up
 * one-by-one as the section scrolls through the viewport.
 */
export function BrandStatement() {
  return (
    <section className="relative bg-ivory">
      <div className="container py-[18vh] md:py-[24vh]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: ease.editorial }}
          className="eyebrow-gold mb-10"
        >
          — Our quiet conviction
        </motion.p>

        <ScrollTextFill
          as="h2"
          className="font-display text-display-md md:text-display-lg tracking-editorial text-balance leading-[1.04] max-w-6xl"
          accentWords={['timeless', 'intentional', 'emotional', '✦']}
        >
          We design weddings the way you remember them — timeless, intentional, emotional. A single eye across the brief, the design, the music, the menu, the room you walk into.
        </ScrollTextFill>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: ease.editorial }}
          className="mt-20 flex items-center gap-8"
        >
          <div className="h-px w-24 bg-gold" />
          <p className="font-display italic text-lg md:text-xl text-ink/60">
            ✦ Shruti Jain · founder
          </p>
        </motion.div>
      </div>
    </section>
  )
}
