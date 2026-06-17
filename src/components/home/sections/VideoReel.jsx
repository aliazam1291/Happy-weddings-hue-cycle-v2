'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { ease } from '@/lib/motion'
import { Ornament } from '@/components/motion/Ornament'
import { SplitText } from '@/components/reactbits/SplitText'
import { IMAGES } from '@/lib/images'
import { CONTACT } from '@/lib/content'

/**
 * A poster + play moment that opens a YouTube lightbox. When we have a real
 * highlight reel ID, drop it into VIDEO_ID. Until then the play opens the
 * @happyweddingsofficial channel in a modal iframe so visitors can browse
 * the real reels.
 *
 * On scroll into view the poster's overlay lifts to reveal the play target;
 * on click an ink overlay slides in and the iframe loads (no autoplay until
 * the user opts in).
 */
const VIDEO_ID = '' // ← drop a real YouTube video id here when ready
const POSTER = IMAGES.stories[0].src

export function VideoReel() {
  const [open, setOpen] = useState(false)
  const embed = VIDEO_ID
    ? `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/?listType=user_uploads&list=happyweddingsofficial&autoplay=1`
  const channelHref = CONTACT.socials.find((s) => s.label === 'YouTube')?.href || '#'

  return (
    <section
      className="relative w-full py-20 md:py-28"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ease.editorial }}
          className="font-sans text-[0.62rem] uppercase tracking-[0.32em] text-center mb-4"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          — Watch the reel
        </motion.p>
        <SplitText
          as="h2"
          by="words"
          text="Ninety seconds of our work."
          accentWords={['of', 'our', 'work']}
          accentColor="hsl(32 31% 46%)"
          className="block font-display font-light leading-[1.02] tracking-[-0.02em] text-center text-[clamp(2rem,5vw,3.6rem)]"
          style={{ color: 'hsl(24 12% 10%)' }}
        />

        <Ornament className="my-8 md:my-10" />

        {/* Poster */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play highlight reel"
          data-cursor="link"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: ease.editorial }}
          className="group relative block w-full max-w-4xl mx-auto overflow-hidden"
          style={{ aspectRatio: '16 / 9' }}
        >
          <img
            src={POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
            style={{ filter: 'saturate(0.85) brightness(0.82)' }}
          />
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: 'linear-gradient(180deg, hsl(24 14% 14% / 0.25), hsl(24 14% 14% / 0.55))' }}
          />
          {/* play button — rings pulse on hover */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="relative inline-flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full transition-transform duration-500 ease-editorial group-hover:scale-110"
              style={{ backgroundColor: 'hsl(34 30% 95% / 0.92)' }}
            >
              <Play className="h-7 w-7 md:h-8 md:w-8 translate-x-0.5" style={{ color: 'hsl(24 12% 10%)' }} fill="hsl(24 12% 10%)" strokeWidth={0} />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 transition-all duration-700 ease-editorial group-hover:scale-125 group-hover:opacity-0"
                style={{ borderColor: 'hsl(34 30% 95% / 0.5)' }}
              />
            </span>
          </span>
          <p
            className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 font-sans text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.32em] whitespace-nowrap"
            style={{ color: 'hsl(34 30% 95% / 0.75)' }}
          >
            Highlight reel · 90 sec
          </p>
        </motion.button>

        {/* Tiny fallback link to the YouTube channel for accessibility */}
        <p className="mt-6 text-center font-sans text-xs" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>
          Or browse more on{' '}
          <a
            href={channelHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="underline decoration-gold/50 underline-offset-4 hover:text-gold transition-colors"
          >
            our YouTube channel
          </a>
          .
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.editorial }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
            style={{ backgroundColor: 'hsl(24 14% 6% / 0.92)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: ease.editorial }}
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: '16 / 9' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={embed}
                title="Happy Weddings — highlight reel"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                data-cursor="link"
                className="absolute -top-12 right-0 inline-flex items-center gap-2 text-ivory hover:text-gold transition-colors text-sm uppercase tracking-widest"
              >
                Close <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
