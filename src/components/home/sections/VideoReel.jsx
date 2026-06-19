'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { ease } from '@/lib/motion'
import { Ornament } from '@/components/motion/Ornament'
import { Eyebrow } from '@/components/motion/Eyebrow'
import { SplitText } from '@/components/reactbits/SplitText'
import { CONTACT, YOUTUBE, ytThumb } from '@/lib/content'

/**
 * Films section — plays the studio's real YouTube uploads. We embed the
 * channel's uploads playlist (channel "UC…" → uploads "UU…") so the latest
 * films play without hand-maintaining video ids. A featured film card can
 * carry its own id to deep-link a specific video; an empty id falls back to
 * the live uploads playlist.
 *
 * Clicking the poster or any film card opens an ink lightbox with the iframe
 * (no autoplay until the user opts in).
 */
const FLAGSHIP = YOUTUBE.featured[0]?.id
const POSTER = ytThumb(FLAGSHIP, 'max')

const embedFor = (id) =>
  id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/videoseries?list=${YOUTUBE.uploadsPlaylist}&autoplay=1&rel=0`

export function VideoReel() {
  const [playId, setPlayId] = useState(null) // null = closed; '' = uploads playlist
  const open = playId !== null
  const channelHref = CONTACT.socials.find((s) => s.label === 'YouTube')?.href || YOUTUBE.channelUrl

  return (
    <section
      className="relative w-full py-20 md:py-28"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <Eyebrow tone="gold" className="text-center mb-4">Films from our channel</Eyebrow>
        <SplitText
          as="h2"
          by="words"
          text="Our work, in motion."
          accentWords={['in', 'motion']}
          accentColor="hsl(32 31% 46%)"
          className="block font-display font-light leading-[1.02] tracking-[-0.02em] text-center text-[clamp(2rem,5vw,3.6rem)]"
          style={{ color: 'hsl(24 12% 10%)' }}
        />

        <Ornament className="my-8 md:my-10" />

        {/* Poster */}
        <motion.button
          type="button"
          onClick={() => setPlayId('')}
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
            onError={(e) => { e.currentTarget.src = ytThumb(FLAGSHIP, 'hq') }}
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
            Latest films · live from YouTube
          </p>
        </motion.button>

        {/* Film-type cards — each opens the channel films in the lightbox */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {YOUTUBE.featured.map((v, i) => (
            <motion.button
              key={v.title}
              type="button"
              onClick={() => setPlayId(v.id || '')}
              data-cursor="link"
              aria-label={`Play: ${v.title}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: ease.editorial }}
              className="group relative block overflow-hidden text-left"
              style={{ aspectRatio: '4 / 3' }}
            >
              <img
                src={ytThumb(v.id, 'max')}
                alt=""
                onError={(e) => { e.currentTarget.src = ytThumb(v.id, 'hq') }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
                style={{ filter: 'saturate(0.85) brightness(0.78)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 35%, hsl(24 14% 8% / 0.82) 100%)' }}
              />
              <span className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-editorial group-hover:scale-110"
                style={{ backgroundColor: 'hsl(34 30% 95% / 0.9)' }}
              >
                <Play className="h-3.5 w-3.5 translate-x-px" style={{ color: 'hsl(24 12% 10%)' }} fill="hsl(24 12% 10%)" strokeWidth={0} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-base md:text-lg leading-tight" style={{ color: 'hsl(34 30% 95%)' }}>
                  {v.title}
                </p>
                <p className="mt-1 font-sans text-[0.56rem] uppercase tracking-[0.22em]" style={{ color: 'hsl(34 30% 95% / 0.7)' }}>
                  {v.note}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fallback link to the YouTube channel */}
        <p className="mt-8 text-center font-sans text-xs" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>
          Browse every film on{' '}
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
            onClick={() => setPlayId(null)}
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
                src={embedFor(playId)}
                title="Happy Weddings — films"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              <button
                type="button"
                onClick={() => setPlayId(null)}
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
