'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * CardSwap — ReactBits-style 3D card stack that cycles through its cards,
 * adapted for this stack and themed to ivory/gold/ink. Auto-advances, pauses
 * on hover, and exposes gold arrow controls + dots. Each card recedes in depth
 * (z/scale/blur) so the front one reads while the rest stack behind.
 *
 * Props:
 *   cards          ReactNode[]  card bodies (the visible card markup)
 *   interval       ms between auto-advances (0 disables auto-play)
 *   height         CSS height for the stack area
 *   className      wrapper classes
 */
const OFFSETS = [
  { y: 0, x: 0, z: 0, scale: 1, rotate: 0, opacity: 1, blur: 0 },
  { y: 22, x: 16, z: -70, scale: 0.95, rotate: 2.6, opacity: 0.72, blur: 0.4 },
  { y: 44, x: 32, z: -140, scale: 0.9, rotate: 5.2, opacity: 0.4, blur: 0.9 },
  { y: 66, x: 48, z: -210, scale: 0.86, rotate: 7.8, opacity: 0, blur: 1.4 },
]

export function CardSwap({ cards = [], interval = 4600, height = '24rem', className = '' }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = cards.length

  const go = (dir) => setActive((a) => (a + dir + n) % n)

  useEffect(() => {
    if (paused || !interval || n <= 1) return
    const t = setInterval(() => setActive((a) => (a + 1) % n), interval)
    return () => clearInterval(t)
  }, [paused, interval, n])

  return (
    <div className={className}>
      <div
        className="relative mx-auto"
        style={{ height, perspective: 1500 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
      >
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {cards.map((card, i) => {
            const depth = (i - active + n) % n
            const o = OFFSETS[Math.min(depth, OFFSETS.length - 1)]
            return (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{ zIndex: n - depth, transformStyle: 'preserve-3d' }}
                initial={false}
                animate={{
                  y: o.y, x: o.x, z: o.z,
                  scale: o.scale, rotate: o.rotate,
                  opacity: o.opacity, filter: `blur(${o.blur}px)`,
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {card}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous"
          data-cursor="link"
          onClick={() => go(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 hover:border-gold hover:text-gold"
          style={{ borderColor: 'hsl(24 12% 10% / 0.18)', color: 'hsl(24 12% 10% / 0.6)' }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              data-cursor="link"
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === active ? '1.6rem' : '0.375rem',
                backgroundColor: i === active ? 'hsl(32 31% 51%)' : 'hsl(24 12% 10% / 0.2)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          data-cursor="link"
          onClick={() => go(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 hover:border-gold hover:text-gold"
          style={{ borderColor: 'hsl(24 12% 10% / 0.18)', color: 'hsl(24 12% 10% / 0.6)' }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
