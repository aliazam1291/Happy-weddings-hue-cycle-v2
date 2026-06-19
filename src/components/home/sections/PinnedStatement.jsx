'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, useIsMobile } from '@/lib/motion'
import { Eyebrow } from '@/components/motion/Eyebrow'

// Deterministic ambient petal data — no Math.random to avoid hydration mismatch
const AMBIENT_PETALS = Array.from({ length: 11 }, (_, i) => ({
  id: i,
  left: `${6 + (i * 9) % 86}%`,
  delay: (i * 0.55) % 5.5,
  duration: 4.2 + (i * 0.42) % 3,
  size: 4 + (i * 3) % 6,
  opacity: 0.07 + (i % 5) * 0.022,
  driftX: ((i * 61) % 40) - 20,
  startRotate: (i * 37) % 360,
}))

const STATEMENTS = [
  { line1: 'We don\'t', line2: 'plan weddings.' },
  { line1: 'We craft', line2: 'celebrations.' },
  { line1: 'That stay with you', line2: 'forever.' },
]

export function PinnedStatement() {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null)
  const barRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Mobile renders a static stacked poem (below) — skip the pinned scrub.
    if (isMobile || prefersReducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ctx = gsap.context(() => {
      const [stmt1, stmt2, stmt3] = [s1.current, s2.current, s3.current]
      if (!stmt1 || !stmt2 || !stmt3) return

      gsap.set(stmt2, { opacity: 0, y: 40 })
      gsap.set(stmt3, { opacity: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
        },
      })

      // Statement 1 → 2
      tl.to(stmt1, { opacity: 0, y: -40, duration: 0.25 }, 0.2)
        .to(stmt2, { opacity: 1, y: 0, duration: 0.25 }, 0.28)
        // Statement 2 → 3
        .to(stmt2, { opacity: 0, y: -40, duration: 0.25 }, 0.58)
        .to(stmt3, { opacity: 1, y: 0, duration: 0.25 }, 0.66)

      // Progress bar
      if (barRef.current) {
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [isMobile])

  // ── Mobile: elegant scroll-revealed statements (no pinned scrub) ──
  if (isMobile) {
    return (
      <section
        className="relative w-full overflow-hidden py-24"
        style={{ backgroundColor: 'hsl(24 14% 8%)' }}
      >
        {/* Soft radial warmth instead of a clashing letter watermark */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 42%, hsl(32 31% 51% / 0.14), transparent 70%)' }}
        />

        <div className="relative z-10 container">
          <Eyebrow tone="gold" className="text-center mb-12">Our conviction</Eyebrow>

          <div className="flex flex-col items-center gap-12">
            {STATEMENTS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span className="block font-display font-light text-[clamp(2.4rem,10vw,3.6rem)] tracking-[-0.02em] leading-[1.04]" style={{ color: 'hsl(34 30% 95%)' }}>
                  {s.line1}
                </span>
                <span className="block font-display italic text-[clamp(2.4rem,10vw,3.6rem)] tracking-[-0.02em] leading-[1.04]" style={{ color: 'hsl(33 36% 60%)' }}>
                  {s.line2}
                </span>
                {i < STATEMENTS.length - 1 && (
                  <span aria-hidden className="mt-12 mx-auto block text-base" style={{ color: 'hsl(32 33% 56% / 0.6)' }}>✦</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div ref={wrapperRef} className="relative h-[240vh] md:h-[380vh]">
    <section
      ref={sectionRef}
      className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'hsl(24 14% 8%)' }}
    >
      {/* Warm vignette glow — gives the dark chapter depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 45%, hsl(32 31% 51% / 0.1), transparent 72%)' }}
      />

      {/* Floating ambient rose petals */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {AMBIENT_PETALS.map(p => (
          <motion.span
            key={p.id}
            className="absolute"
            style={{
              left: p.left,
              bottom: '8%',
              width: p.size,
              height: p.size * 1.62,
              backgroundColor: 'hsl(32 31% 51%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              rotate: `${p.startRotate}deg`,
            }}
            animate={{
              y: [0, -170],
              opacity: [0, p.opacity, 0],
              x: [0, p.driftX],
              rotate: [`${p.startRotate}deg`, `${p.startRotate + 160}deg`],
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Background decorative large letter */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="font-display italic leading-none text-[clamp(12rem,28vw,24rem)]"
          style={{ color: 'hsl(34 30% 95% / 0.04)' }}
        >
          HW
        </span>
      </div>

      {/* Statements — stacked, each absolute positioned over the other */}
      <div className="relative z-10 container text-center">
        <Eyebrow tone="gold" animate={false} className="mb-8 md:mb-12">Our conviction</Eyebrow>

        <div className="relative h-[clamp(6rem,18vw,13rem)] flex items-center justify-center">
          {STATEMENTS.map((s, i) => (
            <div
              key={i}
              ref={[s1, s2, s3][i]}
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
            >
              <span
                className="block font-display font-light text-[clamp(2.25rem,8vw,5.5rem)] tracking-[-0.02em] leading-[1.0]"
                style={{ color: 'hsl(34 30% 95%)' }}
              >
                {s.line1}
              </span>
              <span
                className="block font-display italic text-[clamp(2.25rem,8vw,5.5rem)] tracking-[-0.02em] leading-[1.0]"
                style={{ color: 'hsl(33 36% 60%)' }}
              >
                {s.line2}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll progress dots */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-3">
          {STATEMENTS.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'hsl(34 30% 95% / 0.25)' }}
            />
          ))}
        </div>
      </div>

      {/* Bottom progress line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px overflow-hidden"
        style={{ backgroundColor: 'hsl(34 30% 95% / 0.1)' }}
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left"
          style={{
            backgroundColor: 'hsl(32 31% 51%)',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
    </div>
  )
}
