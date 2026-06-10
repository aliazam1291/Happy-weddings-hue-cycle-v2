'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { ease } from '@/lib/motion'

/**
 * Cinematic hero —
 * • Layered SVG ornament + warm gradient ground (no real photo yet)
 * • Two-line Cormorant headline with double-mask staggered word reveal
 * • A central "viewfinder" frame whose scale + clip follow scroll
 * • Parallax credit-block and eyebrow elements
 * • Animated thin gold rule that draws on load
 */
export function HeroCinematic() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Viewfinder scale + clip
  const viewfinderScale = useTransform(scrollYProgress, [0, 1], [1, 1.45])
  const viewfinderClip = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0% 0% 0% 0%)', 'inset(20% 0% 20% 0%)'],
  )
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Headline lines
  const line1 = ['A', 'named', 'house.']
  const line2 = ['Designed', 'with', 'intention.']

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ivory"
    >
      {/* ─── Background warmth: warm beige -> ivory gradient with grain ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 65% at 50% 100%, hsl(var(--beige)) 0%, hsl(var(--cream)) 40%, hsl(var(--ivory)) 75%)',
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ─── Top frame: vertical rules ─── */}
      <div className="absolute inset-y-0 left-6 md:left-10 w-px bg-ink/10" />
      <div className="absolute inset-y-0 right-6 md:right-10 w-px bg-ink/10" />

      {/* ─── Centre viewfinder — an ornamental tall arch frame ─── */}
      <motion.div
        style={{ scale: viewfinderScale, clipPath: viewfinderClip, y: heroY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative h-[70vh] aspect-[3/4] max-h-[78vh]">
          {/* Arch silhouette */}
          <svg
            viewBox="0 0 600 800"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="archFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(32, 31%, 51%)" stopOpacity="0.18" />
                <stop offset="60%" stopColor="hsl(33, 32%, 90%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(34, 33%, 83%)" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="archStroke" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(32, 31%, 51%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(32, 31%, 51%)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Outer arch */}
            <motion.path
              d="M 60 800 L 60 300 Q 60 60 300 60 Q 540 60 540 300 L 540 800 Z"
              fill="url(#archFill)"
              stroke="url(#archStroke)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, delay: 1.7, ease: ease.editorial }}
            />
            {/* Inner arch outline */}
            <motion.path
              d="M 120 800 L 120 320 Q 120 120 300 120 Q 480 120 480 320 L 480 800"
              fill="none"
              stroke="hsl(32, 31%, 51%)"
              strokeOpacity="0.35"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, delay: 2, ease: ease.editorial }}
            />
            {/* Centre ornament */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.6 }}
              fill="hsl(32, 31%, 51%)"
              fillOpacity="0.85"
            >
              <circle cx="300" cy="420" r="3" />
              <path d="M 300 380 L 304 416 L 340 420 L 304 424 L 300 460 L 296 424 L 260 420 L 296 416 Z" />
              <circle cx="300" cy="340" r="1.5" fillOpacity="0.5" />
              <circle cx="300" cy="500" r="1.5" fillOpacity="0.5" />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      {/* ─── Top labels ─── */}
      <motion.div
        className="absolute inset-x-0 top-28 md:top-32 z-10"
        style={{ opacity: fade }}
      >
        <div className="container flex items-center justify-between">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease: ease.editorial }}
            className="eyebrow text-ink/60"
          >
            ✦ Happy Weddings · by Shruti Jain
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.0, ease: ease.editorial }}
            className="eyebrow text-ink/60 hidden md:block"
          >
            Estd. 2013 · 350+ weddings
          </motion.p>
        </div>
      </motion.div>

      {/* ─── Headline — two-line stagger with mask ─── */}
      <motion.div
        className="absolute inset-0 flex items-end pb-28 md:pb-32 z-10"
        style={{ y: heroY, opacity: fade }}
      >
        <div className="container">
          <HeroLine words={line1} baseDelay={1.7} />
          <HeroLine
            words={line2}
            baseDelay={2.1}
            italic
            className="text-gold -mt-2 md:-mt-4"
          />

          <motion.div
            className="mt-10 max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.9, ease: ease.editorial }}
          >
            <div className="h-px w-16 bg-gold mb-6" />
            <p className="font-sans font-light text-ink/70 text-base md:text-lg leading-relaxed">
              Twelve years of crafting celebrations that feel timeless,
              intentional, emotional. A named house — quietly, deliberately.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Scroll cue ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.2, ease: ease.editorial }}
        style={{ opacity: fade }}
      >
        <div className="flex flex-col items-center gap-3 text-ink/55">
          <span className="eyebrow">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Bottom-left corner credit, parallax ─── */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 container hidden md:flex items-end justify-between z-10 pointer-events-none"
        style={{ opacity: fade }}
      >
        <div className="opacity-0" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.3, ease: ease.editorial }}
          className="text-right"
        >
          <p className="eyebrow text-ink/50">— Mumbai · Delhi · everywhere your story is</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function HeroLine({ words, baseDelay = 0, italic = false, className = '' }) {
  return (
    <h1
      className={`font-display text-display-xl tracking-editorial leading-[0.95] text-balance text-ink ${
        italic ? 'italic' : ''
      } ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.05,
              delay: baseDelay + i * 0.08,
              ease: ease.editorial,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
