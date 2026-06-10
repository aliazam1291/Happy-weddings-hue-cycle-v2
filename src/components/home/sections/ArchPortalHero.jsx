'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'
import { FloatingDust } from '@/components/home/FloatingDust'

/**
 * Scroll-through arch portal — LIGHT THEME.
 * You stand before a pale carved sandstone archway on a soft cream ground;
 * the opening glows with warm daylight; you push through the arch; an ivory
 * wash dissolves into the next section.
 */
export function ArchPortalHero({ isLoaded }) {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const mandapRef = useRef(null)
  const mandapImgRef = useRef(null)
  const darkenRef = useRef(null)
  const hintRef = useRef(null)
  const introRef = useRef(null)
  const headlineRef = useRef(null)
  const blendRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(frameRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 1, y: 0 })
      gsap.set(darkenRef.current, { opacity: 0.06 })
      gsap.set(mandapImgRef.current, { yPercent: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.set(headlineRef.current, { y: 80, opacity: 0 })
      gsap.set(mandapImgRef.current, { yPercent: 16, scale: 1.32 })
      gsap.set(blendRef.current, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      /* Beat 1 — tagline gives way, the glowing scene rises into the opening */
      tl.to(introRef.current, { opacity: 0, y: -36, duration: 1.4 }, 0)
        .to(hintRef.current, { opacity: 0, duration: 0.8 }, 0)
        .to(
          mandapImgRef.current,
          { yPercent: 0, scale: 1.16, ease: 'power1.out', duration: 3.6 },
          0.4,
        )
        .to(darkenRef.current, { opacity: 0.12, ease: 'none', duration: 3.6 }, 0.4)

      /* Beat 2 — push through the arch */
      tl.to(
        frameRef.current,
        { scale: 9, opacity: 0, ease: 'power1.in', duration: 4 },
        4.2,
      )
        .to(mandapRef.current, { scale: 1.18, ease: 'none', duration: 5 }, 4.2)
        .to(darkenRef.current, { opacity: 0.04, ease: 'none', duration: 3 }, 4.2)

      /* Beat 3 — headline emerges */
      tl.to(headlineRef.current, { y: 0, opacity: 1, ease: 'power2.out', duration: 2.4 }, 7)

      /* Ivory dissolve into the next section */
      tl.to(blendRef.current, { opacity: 1, ease: 'power1.in', duration: 2.2 }, 9.6)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      {/* ── Luminous scene behind the arch — warm daylight, built from the ──
           brand palette so it stays bright and airy ── */}
      <div ref={mandapRef} className="absolute inset-0 will-change-transform">
        <div ref={mandapImgRef} className="absolute inset-0 will-change-transform">
          {/* bright warm ground: soft cream easing to a glowing gold low-centre */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(36 34% 92%) 0%, hsl(36 40% 88%) 44%, hsl(37 48% 80%) 78%, hsl(38 54% 73%) 100%)',
            }}
          />
          {/* the warm light source glowing deep in the opening */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 58% 48% at 50% 70%, hsl(var(--gold-soft) / 0.55) 0%, hsl(var(--gold) / 0.22) 40%, transparent 68%)',
              mixBlendMode: 'screen',
            }}
          />
          {/* the faintest terracotta warmth pooling at the base */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 38% at 50% 100%, hsl(var(--terracotta) / 0.16) 0%, transparent 58%)',
            }}
          />
          {/* a gentle warm halo framing the opening (soft, never dark) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 76% 72% at 50% 62%, transparent 42%, hsl(32 28% 70% / 0.5) 100%)',
            }}
          />
        </div>
      </div>

      {/* Soft warm atmosphere of the archway we stand in (subtle in light) */}
      <div
        ref={darkenRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'hsl(32 26% 64%)', opacity: 0.18, mixBlendMode: 'multiply' }}
      />

      <FloatingDust className="z-10 opacity-70" />

      {/* ── Carved arch frame ──────────────────────────────────────── */}
      <div
        ref={frameRef}
        className="absolute inset-0 z-20 will-change-transform"
        style={{ transformOrigin: '50% 58%' }}
      >
        <ArchFrame />
      </div>

      {/* ── Brand intro inside the opening ─────────────────────────── */}
      <div
        ref={introRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1.2s ease 0.4s',
        }}
      >
        {/* constrained to the doorway so type never sits on the stone */}
        <div className="flex flex-col items-center" style={{ width: 'min(38vw, 360px)' }}>
          <p
            className="font-display italic mb-3"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)', color: 'hsl(32 31% 46%)' }}
          >
            est. 2013
          </p>
          <h1
            className="font-display font-light leading-[0.98] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.2rem, 4.6vw, 4.4rem)', color: 'hsl(24 12% 10%)' }}
          >
            <span className="block">Happy</span>
            <span className="block italic" style={{ color: 'hsl(32 31% 46%)' }}>
              Weddings
            </span>
          </h1>
          <span className="mt-6 block h-px w-12" style={{ backgroundColor: 'hsl(32 31% 51% / 0.65)' }} />
          <p
            className="mt-5 font-sans uppercase leading-[1.8]"
            style={{
              fontSize: 'clamp(0.52rem, 0.85vw, 0.66rem)',
              letterSpacing: '0.36em',
              color: 'hsl(24 12% 10% / 0.6)',
            }}
          >
            Timeless · Intentional
            <br />
            Emotional
          </p>
          <p
            className="mt-5 font-display italic"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)', color: 'hsl(24 12% 10% / 0.45)' }}
          >
            by Shruti Jain
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1.2s ease 0.9s' }}
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: '0.58rem', letterSpacing: '0.34em', color: 'hsl(24 12% 10% / 0.5)' }}
        >
          Scroll to step through
        </span>
        <span className="block h-9 w-px" style={{ background: 'linear-gradient(to bottom, hsl(24 12% 10% / 0.4), transparent)' }} />
      </div>

      {/* ── Emerged headline ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-30 flex items-center justify-center text-center px-6 pointer-events-none">
        <div ref={headlineRef} className="will-change-transform">
          <p
            className="font-sans uppercase mb-7"
            style={{ fontSize: '0.62rem', letterSpacing: '0.4em', color: 'hsl(32 31% 46%)' }}
          >
            — The celebration begins
          </p>
          <h2
            className="font-display font-light leading-[1.02] tracking-[-0.02em] text-balance max-w-5xl"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)', color: 'hsl(24 12% 10%)' }}
          >
            Crafting celebrations that{' '}
            <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>
              stay with you forever.
            </span>
          </h2>
        </div>
      </div>

      {/* ── Ivory dissolve into the next section ───────────────────── */}
      <div
        ref={blendRef}
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, hsl(34 30% 95%) 0%, hsl(34 30% 95%) 55%, hsl(34 30% 95% / 0.85) 100%)',
        }}
      />
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   The carved archway — pale sandstone, lit from upper-left:
   · light wall face with weathering + block coursing
   · visible soffit (inner reveal) showing wall THICKNESS, shaded directionally
   · warm light from the opening; gold ornament (the brand accent)
   · cusped Mughal opening, double pishtaq frame, columns, rosettes
   ────────────────────────────────────────────────────────────────── */
function ArchFrame() {
  // Outer edge of the opening (the face of the wall)
  const outerArch =
    'M395 1010 L395 565 ' +
    'A 42 42 0 0 1 418 488 ' +
    'A 42 42 0 0 1 450 417 ' +
    'A 42 42 0 0 1 494 357 ' +
    'A 42 42 0 0 1 543 311 ' +
    'A 42 42 0 0 1 600 285 ' +
    'A 42 42 0 0 1 657 311 ' +
    'A 42 42 0 0 1 706 357 ' +
    'A 42 42 0 0 1 750 417 ' +
    'A 42 42 0 0 1 782 488 ' +
    'A 42 42 0 0 1 805 565 ' +
    'L805 1010 Z'

  // Inner edge (through the wall's thickness — what you see past the soffit)
  const innerArch =
    'M445 1010 L445 575 ' +
    'A 36 36 0 0 1 464 506 ' +
    'A 36 36 0 0 1 491 444 ' +
    'A 36 36 0 0 1 528 391 ' +
    'A 36 36 0 0 1 568 351 ' +
    'A 36 36 0 0 1 600 337 ' +
    'A 36 36 0 0 1 632 351 ' +
    'A 36 36 0 0 1 672 391 ' +
    'A 36 36 0 0 1 709 444 ' +
    'A 36 36 0 0 1 736 506 ' +
    'A 36 36 0 0 1 755 575 ' +
    'L755 1010 Z'

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {/* pale sandstone face, gently shaded top→bottom */}
        <linearGradient id="stoneWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(36 28% 88%)" />
          <stop offset="45%" stopColor="hsl(34 24% 83%)" />
          <stop offset="100%" stopColor="hsl(31 20% 75%)" />
        </linearGradient>

        {/* soffit — inner reveal, lit directionally from upper-left so the
            wall thickness reads as a real curved tunnel */}
        <linearGradient id="soffit" x1="0" y1="0" x2="1" y2="0.18">
          <stop offset="0%" stopColor="hsl(35 28% 84%)" />
          <stop offset="34%" stopColor="hsl(33 22% 73%)" />
          <stop offset="68%" stopColor="hsl(30 18% 61%)" />
          <stop offset="100%" stopColor="hsl(28 16% 52%)" />
        </linearGradient>

        {/* cylindrical sheen — band of light across the reveal so the soffit
            feels rounded (a curved surface), not a flat ring */}
        <linearGradient id="soffitCurve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(42 42% 95% / 0)" />
          <stop offset="44%" stopColor="hsl(42 44% 96% / 0.6)" />
          <stop offset="60%" stopColor="hsl(42 44% 96% / 0.25)" />
          <stop offset="100%" stopColor="hsl(28 18% 46% / 0.4)" />
        </linearGradient>

        <linearGradient id="columnShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(35 26% 85%)" />
          <stop offset="50%" stopColor="hsl(32 20% 75%)" />
          <stop offset="100%" stopColor="hsl(29 16% 61%)" />
        </linearGradient>

        {/* large soft mottling — cloudy weathering patches across the wall */}
        <filter id="weathering" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="3" seed="3" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.32  0 0 0 0 0.26  0 0 0 0 0.18  0 0 0 0.14 0"
          />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>

        {/* subtle relief — gives the flat wall a sense of carved depth */}
        <filter id="stoneRelief" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="3" seed="11" result="noise" />
          <feDiffuseLighting in="noise" surfaceScale="2" diffuseConstant="1" lightingColor="hsl(36 30% 82%)" result="light">
            <feDistantLight azimuth="235" elevation="58" />
          </feDiffuseLighting>
          <feComposite operator="in" in="light" in2="SourceGraphic" />
        </filter>

        <pattern id="blocks" width="184" height="72" patternUnits="userSpaceOnUse">
          {/* recessed mortar joints (warm shadow, soft on pale stone) */}
          <line x1="0" y1="0" x2="184" y2="0" stroke="hsl(28 22% 34% / 0.26)" strokeWidth="2.5" />
          <line x1="92" y1="0" x2="92" y2="36" stroke="hsl(28 22% 34% / 0.18)" strokeWidth="2.5" />
          <line x1="0" y1="36" x2="184" y2="36" stroke="hsl(28 22% 34% / 0.26)" strokeWidth="2.5" />
          <line x1="0" y1="36" x2="0" y2="72" stroke="hsl(28 22% 34% / 0.18)" strokeWidth="2.5" />
          {/* lit top bevel of each course — sun-catching chiselled edge */}
          <line x1="0" y1="3.2" x2="184" y2="3.2" stroke="hsl(44 44% 97% / 0.55)" strokeWidth="1.4" />
          <line x1="0" y1="39.2" x2="184" y2="39.2" stroke="hsl(44 44% 97% / 0.55)" strokeWidth="1.4" />
        </pattern>

        <radialGradient id="lightSpill" cx="50%" cy="62%" r="48%">
          <stop offset="55%" stopColor="hsl(40 55% 78% / 0.28)" />
          <stop offset="78%" stopColor="hsl(38 50% 70% / 0.1)" />
          <stop offset="100%" stopColor="hsl(38 50% 70% / 0)" />
        </radialGradient>
      </defs>

      {/* ── 1 · Wall face (outer cutout) ── */}
      <path fillRule="evenodd" fill="url(#stoneWall)" d={`M0 0 H1200 V1000 H0 Z ${innerArch}`} />

      {/* ── 2 · Soffit ring — the wall's THICKNESS, lit as a curved reveal ── */}
      <path fillRule="evenodd" fill="url(#soffit)" d={`${outerArch} ${innerArch}`} />
      {/* cylindrical sheen so the reveal reads as rounded, not flat */}
      <path
        fillRule="evenodd"
        fill="url(#soffitCurve)"
        d={`${outerArch} ${innerArch}`}
        style={{ mixBlendMode: 'overlay' }}
      />
      {/* lit chamfer on the OUTER lip (where light first hits the wall face) */}
      <path fill="none" stroke="hsl(44 44% 96% / 0.6)" strokeWidth="2.5" d={outerArch.replace('Z', '')} />
      {/* soft contact shadow where the soffit meets the wall face */}
      <path fill="none" stroke="hsl(28 20% 38% / 0.35)" strokeWidth="4" d={outerArch.replace('Z', '')} style={{ mixBlendMode: 'multiply' }} />

      {/* ── 2b · Gentle seating shadow so the bright opening sits in the wall ── */}
      <path fill="none" stroke="hsl(28 22% 42% / 0.28)" strokeWidth="14" d={innerArch.replace('Z', '')} />
      <path fill="none" stroke="hsl(28 22% 40% / 0.26)" strokeWidth="7" d={innerArch.replace('Z', '')} />
      <path fill="none" stroke="hsl(28 22% 38% / 0.24)" strokeWidth="3" d={innerArch.replace('Z', '')} />

      {/* ── 3 · Stone block coursing on the face only ── */}
      <path fillRule="evenodd" fill="url(#blocks)" d={`M0 0 H1200 V1000 H0 Z ${outerArch}`} />

      {/* ── 4 · Soft weathering + carved relief across the wall ── */}
      <path fillRule="evenodd" fill="hsl(0 0% 50%)" filter="url(#stoneRelief)" d={`M0 0 H1200 V1000 H0 Z ${outerArch}`} style={{ mixBlendMode: 'soft-light', opacity: 0.55 }} />
      <path fillRule="evenodd" fill="hsl(0 0% 50%)" filter="url(#weathering)" d={`M0 0 H1200 V1000 H0 Z ${outerArch}`} />

      {/* ── 5 · Warm light from the opening spilling onto the wall ── */}
      <path
        fillRule="evenodd"
        fill="url(#lightSpill)"
        d={`M150 60 H1050 V1000 H150 Z ${outerArch}`}
        style={{ mixBlendMode: 'screen' }}
      />
      {/* lit inner lip of the soffit — warm highlight */}
      <path
        fill="none"
        stroke="hsl(42 50% 92% / 0.65)"
        strokeWidth="2.5"
        d={innerArch.replace('Z', '')}
      />

      {/* ── 6 · Pishtaq double frame (incised lines) ── */}
      <rect x="318" y="168" width="564" height="842" fill="none" stroke="hsl(30 22% 48% / 0.45)" strokeWidth="2.5" />
      <rect x="340" y="190" width="520" height="820" fill="none" stroke="hsl(32 28% 55% / 0.3)" strokeWidth="1.5" />

      {/* ── 7 · Flanking columns ── */}
      {[{ x: 348 }, { x: 814 }].map(({ x }, i) => (
        <g key={i}>
          {/* soft cast shadow on the wall to the right of the column shaft */}
          <rect x={x + 38} y="600" width="9" height="410" fill="hsl(28 20% 44% / 0.22)" />
          <rect x={x + 38} y="600" width="5" height="410" fill="hsl(28 20% 42% / 0.2)" />
          <rect x={x} y="600" width="38" height="410" fill="url(#columnShade)" />
          {/* lit left edge + core shadow on the right = rounded shaft */}
          <rect x={x} y="600" width="5" height="410" fill="hsl(44 44% 96% / 0.5)" />
          <rect x={x + 30} y="600" width="8" height="410" fill="hsl(28 18% 50% / 0.4)" />
          <line x1={x + 12} y1="610" x2={x + 12} y2="1000" stroke="hsl(28 20% 46% / 0.4)" strokeWidth="2" />
          <line x1={x + 26} y1="610" x2={x + 26} y2="1000" stroke="hsl(28 20% 46% / 0.4)" strokeWidth="2" />
          <rect x={x - 8} y="572" width="54" height="16" fill="hsl(34 26% 80%)" />
          <rect x={x - 4} y="588" width="46" height="12" fill="hsl(31 20% 70%)" />
          <rect x={x - 2} y="760" width="42" height="8" fill="hsl(34 24% 77%)" />
          <rect x={x - 8} y="966" width="54" height="14" fill="hsl(34 26% 80%)" />
          <rect x={x - 12} y="980" width="62" height="20" fill="hsl(31 20% 69%)" />
        </g>
      ))}

      {/* ── 8 · Impost mouldings ── */}
      <rect x="378" y="552" width="48" height="12" fill="hsl(34 26% 82%)" />
      <rect x="774" y="552" width="48" height="12" fill="hsl(34 26% 82%)" />

      {/* ── 9 · Spandrel rosettes — gold ornament ── */}
      {[{ cx: 392, cy: 296 }, { cx: 808, cy: 296 }].map(({ cx, cy }, i) => (
        <g key={i} opacity="0.7">
          <circle cx={cx} cy={cy} r="26" fill="none" stroke="hsl(32 31% 51% / 0.65)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="hsl(32 31% 51% / 0.5)" strokeWidth="1.2" />
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={cx - 26 * Math.cos((a * Math.PI) / 180)}
              y1={cy - 26 * Math.sin((a * Math.PI) / 180)}
              x2={cx + 26 * Math.cos((a * Math.PI) / 180)}
              y2={cy + 26 * Math.sin((a * Math.PI) / 180)}
              stroke="hsl(32 31% 51% / 0.35)"
              strokeWidth="1"
            />
          ))}
          <circle cx={cx} cy={cy} r="3.5" fill="hsl(32 35% 48% / 0.8)" />
        </g>
      ))}

      {/* ── 10 · Keystone finial + cornice — gold ── */}
      <path d="M600 238 L613 262 L600 286 L587 262 Z" fill="hsl(32 33% 50% / 0.9)" />
      <circle cx="600" cy="224" r="4" fill="hsl(32 36% 52% / 0.75)" />
      <rect x="290" y="138" width="620" height="10" fill="hsl(31 22% 70% / 0.95)" />
      <rect x="306" y="152" width="588" height="4" fill="hsl(34 28% 84% / 0.7)" />

      {/* ── 11 · Edge vignette — wall eases into soft warm shade ── */}
      <rect x="0" y="0" width="230" height="1000" fill="hsl(30 22% 60% / 0.22)" />
      <rect x="970" y="0" width="230" height="1000" fill="hsl(30 22% 60% / 0.22)" />
      <rect x="0" y="0" width="1200" height="105" fill="hsl(30 22% 62% / 0.2)" />
    </svg>
  )
}
