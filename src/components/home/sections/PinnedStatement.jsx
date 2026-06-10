'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

const STATEMENTS = [
  { line1: 'We don\'t', line2: 'plan weddings.' },
  { line1: 'We craft', line2: 'celebrations.' },
  { line1: 'That stay with you', line2: 'forever.' },
]

export function PinnedStatement() {
  const sectionRef = useRef(null)
  const s1 = useRef(null), s2 = useRef(null), s3 = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const [stmt1, stmt2, stmt3] = [s1.current, s2.current, s3.current]
      if (!stmt1 || !stmt2 || !stmt3) return

      gsap.set(stmt2, { opacity: 0, y: 40 })
      gsap.set(stmt3, { opacity: 0, y: 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
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
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=280%',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      {/* Background decorative large letter */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
      >
        <span
          className="font-display italic text-[40vw] leading-none"
          style={{ color: 'hsl(32 31% 51% / 0.04)' }}
        >
          HW
        </span>
      </div>

      {/* Statements — stacked, each absolute positioned over the other */}
      <div className="relative z-10 container text-center">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-14" style={{ color: 'hsl(32 31% 51%)' }}>
          — Our conviction
        </p>

        <div className="relative h-[22vw] md:h-[16vw] flex items-center justify-center">
          {STATEMENTS.map((s, i) => (
            <div
              key={i}
              ref={[s1, s2, s3][i]}
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
            >
              <span
                className="block font-display font-light text-[9vw] md:text-[7vw] lg:text-[6vw] tracking-[-0.02em] leading-[1.0]"
                style={{ color: 'hsl(24 12% 10%)' }}
              >
                {s.line1}
              </span>
              <span
                className="block font-display italic text-[9vw] md:text-[7vw] lg:text-[6vw] tracking-[-0.02em] leading-[1.0]"
                style={{ color: 'hsl(32 31% 51%)' }}
              >
                {s.line2}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll progress dots */}
        <div className="mt-16 flex items-center justify-center gap-3">
          {STATEMENTS.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'hsl(24 12% 10% / 0.2)' }}
            />
          ))}
        </div>
      </div>

      {/* Bottom progress line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px overflow-hidden"
        style={{ backgroundColor: 'hsl(24 12% 10% / 0.06)' }}
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
  )
}
