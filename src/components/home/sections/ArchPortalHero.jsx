'use client'

import { useRef, useEffect, useId } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'
import { FloatingDust } from '@/components/home/FloatingDust'

/**
 * Scroll-through arch portal — LIGHT THEME.
 * Desktop: Monumental freestanding portal.
 * Mobile: Crops gracefully to frame the arch.
 * Lighting: True photorealistic volumetric rendering.
 */
export function ArchPortalHero({ isLoaded = true }) {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const mandapRef = useRef(null)
  const mandapImgRef = useRef(null)
  const darkenRef = useRef(null)
  const hintRef = useRef(null)
  const introRef = useRef(null)
  const headlineRef = useRef(null)
  const blendRef = useRef(null)

  // "Begin the journey" — glide through the arch using Lenis when present
  // (desktop), falling back to native smooth scroll (mobile / reduced motion).
  const handleBegin = () => {
    if (typeof window === 'undefined') return
    const target = window.innerWidth < 1024 ? window.innerHeight * 0.92 : 3300
    const l = window.__lenis
    if (l && typeof l.scrollTo === 'function') l.scrollTo(target, { duration: 1.8 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  // Luxury Layers
  const floralContainerRef = useRef(null)
  const floralSwayRef = useRef(null)
  const floralRightContainerRef = useRef(null)
  const floralRightSwayRef = useRef(null)
  const treeShadowContainerRef = useRef(null)
  const shadowSwayRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(frameRef.current, { opacity: 0 })
      gsap.set(headlineRef.current, { opacity: 1, y: 0 })
      gsap.set(darkenRef.current, { opacity: 0.06 })
      gsap.set(mandapImgRef.current, { yPercent: 0 })
      gsap.set([floralContainerRef.current, floralRightContainerRef.current, treeShadowContainerRef.current], { opacity: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    // ── Mobile: clean static hero (no 3200px pinned scroll-through) ──
    // Show the intro branding + arch in a single viewport and let the page
    // scroll normally to the next section. The scroll-scrub choreography is
    // desktop-only — it's janky and shows a lot of empty scroll on phones.
    if (window.innerWidth < 1024) {
      const ctx = gsap.context(() => {
        gsap.set(introRef.current, { opacity: 1, y: 0 })
        gsap.set(hintRef.current, { opacity: 1 })
        gsap.set(headlineRef.current, { opacity: 0 })
        gsap.set(frameRef.current, { opacity: 1, scale: 1 })
        gsap.set(mandapImgRef.current, { yPercent: 0, scale: 1.05 })
        gsap.set(darkenRef.current, { opacity: 0.1 })
        gsap.set([floralContainerRef.current, floralRightContainerRef.current], { opacity: 0.4, y: 0 })
        gsap.set(treeShadowContainerRef.current, { opacity: 0.08, y: 0 })
        gsap.set(blendRef.current, { opacity: 0 })

        // Keep the gentle ambient sway — it's cheap and adds life.
        gsap.to(floralSwayRef.current, { rotation: 1.5, transformOrigin: 'top left', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to(floralRightSwayRef.current, { rotation: -1.5, transformOrigin: 'top right', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }, sectionRef)
      return () => ctx.revert()
    }

    const wrapper = wrapperRef.current
    if (!wrapper) return
    wrapper.style.height = `calc(3200px + 100vh)`

    const ctx = gsap.context(() => {
      gsap.set(headlineRef.current, { y: 80, opacity: 0 })
      gsap.set(mandapImgRef.current, { yPercent: 12, scale: 1.32 })
      gsap.set(blendRef.current, { opacity: 0 })

      // ── 1. Continuous Gentle Wind Animation (Independent of Scroll) ──
      // Left Floral Sway
      gsap.to(floralSwayRef.current, {
        rotation: 1.5,
        transformOrigin: 'top left',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Right Floral Sway
      gsap.to(floralRightSwayRef.current, {
        rotation: -1.5,
        transformOrigin: 'top right',
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Shadows Sway (Over the arch)
      gsap.to(shadowSwayRef.current, {
        x: 25,
        y: 15,
        scale: 1.05,
        rotation: 1,
        transformOrigin: 'center top',
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // ── 2. Scroll-Triggered Journey Animation ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=3200',
          scrub: 1,
        },
      })

      /* Beat 1 — Editorial gives way, shadows vanish, the glowing scene rises */
      tl.to(introRef.current, { opacity: 0, y: -36, duration: 1.4 }, 0)
        .to(hintRef.current, { opacity: 0, duration: 0.8 }, 0)
        // Shadows & florals vanish as you begin the journey through the arch
        .to([floralContainerRef.current, floralRightContainerRef.current], { y: -120, opacity: 0, ease: 'none', duration: 4.1 }, 0)
        .to(treeShadowContainerRef.current, { y: -80, opacity: 0, ease: 'none', duration: 3.5 }, 0)
        .to(
          mandapImgRef.current,
          { yPercent: 0, scale: 1.16, ease: 'power1.out', duration: 3.6 },
          0.4,
        )
        .to(darkenRef.current, { opacity: 0.12, ease: 'none', duration: 3.6 }, 0.4)

      /* Beat 2 — push through the arch into the narrative */
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
    <div ref={wrapperRef} className="relative">
    <section
      ref={sectionRef}
      className="sticky top-0 h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: '#F7F4EF' }} // Base schema color
    >
      {/* ── Bright Sunlight Atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 15% 20%, rgba(255,245,220,.55), transparent 55%)',
          zIndex: 1,
        }}
      />

      {/* ── Layer 1A: Clean Botanical Watermark (Left Side) ── */}
      <div
        ref={floralContainerRef}
        className="absolute top-0 left-0 w-[clamp(11.25rem,38vw,34.375rem)] pointer-events-none z-10 text-[#C2A582]"
        style={{ opacity: 0.4, mixBlendMode: 'multiply' }} // Reduced opacity to 0.40
      >
        <div ref={floralSwayRef} className="w-full h-auto will-change-transform">
          <BotanicalIllustration idPrefix="left" />
        </div>
      </div>

      {/* ── Layer 1B: Clean Botanical Watermark (Right Side - Mirrored) ── */}
      <div
        ref={floralRightContainerRef}
        className="absolute top-0 right-0 w-[clamp(11.25rem,38vw,34.375rem)] pointer-events-none z-10 text-[#C2A582]"
        style={{ opacity: 0.4, mixBlendMode: 'multiply', transform: 'scaleX(-1)' }} // Reduced opacity to 0.40
      >
        <div ref={floralRightSwayRef} className="w-full h-auto will-change-transform">
          <BotanicalIllustration idPrefix="right" />
        </div>
      </div>

      {/* ── Narrative Scene Behind the Arch ── */}
      <div ref={mandapRef} className="absolute inset-0 will-change-transform z-0">
        <div ref={mandapImgRef} className="absolute inset-0 flex items-center justify-center will-change-transform bg-[#F0EBE1]">
          {/* Sky gradient — warm golden hour atmosphere */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, #D4C4A8 0%, #F5EDD9 35%, #FDF8EF 58%, #EFE5D1 100%)' }}
          />
          {/* Upper sun glow */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(255,240,195,0.55), transparent 62%)' }}
          />

          {/* Glowing distant horizon — warm golden band */}
          <div
            className="absolute w-full pointer-events-none"
            style={{
              bottom: '40%',
              height: '80px',
              background: 'linear-gradient(0deg, transparent 0%, rgba(240,205,130,0.32) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute w-full pointer-events-none"
            style={{
              bottom: '40%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 8%, rgba(210,175,100,0.45) 25%, rgba(252,218,138,0.7) 50%, rgba(210,175,100,0.45) 75%, transparent 92%)',
            }}
          />

          {/* Golden perspective courtyard floor */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '40%',
              background: 'linear-gradient(180deg, rgba(220,190,140,0.1) 0%, rgba(198,165,112,0.38) 58%, rgba(170,138,88,0.55) 100%)',
            }}
          />

          {/* Perspective tile lines receding to horizon */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '40%' }}>
            <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden>
              <g stroke="rgba(155,120,68,0.16)" strokeWidth="1" fill="none">
                <line x1="500" y1="0" x2="0" y2="400" />
                <line x1="500" y1="0" x2="200" y2="400" />
                <line x1="500" y1="0" x2="400" y2="400" />
                <line x1="500" y1="0" x2="600" y2="400" />
                <line x1="500" y1="0" x2="800" y2="400" />
                <line x1="500" y1="0" x2="1000" y2="400" />
                <line x1="0" y1="140" x2="1000" y2="140" />
                <line x1="0" y1="260" x2="1000" y2="260" />
                <line x1="0" y1="360" x2="1000" y2="360" />
              </g>
            </svg>
          </div>

          {/* Backlit golden halo — the couple steps into the light */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              bottom: '34%',
              width: 'clamp(11rem, 24vw, 21rem)',
              height: 'clamp(11rem, 24vw, 21rem)',
              background: 'radial-gradient(circle at 50% 64%, rgba(255,238,188,0.8), rgba(250,222,150,0.3) 34%, transparent 62%)',
            }}
          />

          {/* Indian wedding couple — high-contrast backlit silhouette at the horizon */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ bottom: '39%', width: 'clamp(4rem, 8.5vw, 7.5rem)' }}
          >
            <svg viewBox="0 0 200 210" fill="none" className="w-full h-auto" aria-hidden>
              {/* Ground shadow */}
              <ellipse cx="100" cy="206" rx="62" ry="6.5" fill="rgba(70,46,12,0.30)" />

              {/* Bridal veil — dupatta flowing behind, drawn first so the body sits over it */}
              <path d="M150 58 Q167 106 173 158 Q177 184 181 202 L152 202 Q150 150 147 104 Q150 82 146 62 Z" fill="hsl(24 16% 7% / 0.82)" />

              {/* ════════ GROOM (left) ════════ */}
              {/* Neck */}
              <path d="M63 73 L62 82 L72 82 L71 73 Z" fill="hsl(24 16% 7%)" />
              {/* Sherwani — single flowing silhouette, shoulders to mid-calf flare */}
              <path d="M57 79 C50 81 47 95 46 118 C45 145 46 166 48 184 L86 184 C88 166 89 145 88 118 C87 95 84 81 77 79 Z" fill="hsl(24 16% 7%)" />
              {/* Collar V */}
              <path d="M61 79 L67 98 L73 79 Z" fill="hsl(24 14% 3%)" />
              {/* Center button seam */}
              <line x1="67" y1="98" x2="67" y2="182" stroke="hsl(34 30% 92% / 0.14)" strokeWidth="1" />
              {/* Churidar — ankles below the sherwani */}
              <path d="M58 184 L56 202" stroke="hsl(24 16% 7%)" strokeWidth="9" strokeLinecap="round" />
              <path d="M76 184 L78 202" stroke="hsl(24 16% 7%)" strokeWidth="9" strokeLinecap="round" />
              {/* Far arm — relaxed at side */}
              <path d="M49 89 Q42 110 41 132" stroke="hsl(24 16% 7%)" strokeWidth="8" strokeLinecap="round" />
              {/* Near arm — reaching toward the bride */}
              <path d="M83 89 Q93 108 99 126" stroke="hsl(24 16% 7%)" strokeWidth="8" strokeLinecap="round" />
              {/* Head */}
              <circle cx="67" cy="66" r="10" fill="hsl(24 16% 7%)" />
              {/* Turban — sleek dome with a front fold */}
              <path d="M51 59 Q47 33 67 30 Q87 33 83 59 Q78 51 71 52 Q68 44 64 46 Q59 47 56 53 Q53 56 51 59 Z" fill="hsl(24 16% 7%)" />
              {/* Turban band */}
              <path d="M51 58 Q67 65 83 58 Q83 62 82 63 Q67 70 52 63 Q51 61 51 58 Z" fill="hsl(24 14% 2% / 0.6)" />
              {/* Kalgi plume — gold */}
              <path d="M81 51 Q90 40 85 28" stroke="hsl(32 46% 56%)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <circle cx="85" cy="27" r="3.2" fill="hsl(32 46% 56%)" />
              {/* Rim light — gold edge facing the light */}
              <path d="M88 92 C89 118 88 150 85 183" stroke="hsl(38 60% 70% / 0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />

              {/* ════════ BRIDE (right) ════════ */}
              {/* Neck */}
              <path d="M130 73 L129 82 L139 82 L138 73 Z" fill="hsl(24 16% 7%)" />
              {/* Lehenga — smooth A-line skirt */}
              <path d="M120 102 C110 123 103 162 101 202 L177 202 C173 162 158 123 148 102 Z" fill="hsl(24 16% 7%)" />
              {/* Lehenga hem shimmer — gold */}
              <path d="M101 201 Q139 191 177 201" stroke="hsl(32 46% 56% / 0.4)" strokeWidth="1.6" fill="none" />
              {/* Choli / fitted blouse */}
              <path d="M124 80 L120 103 L150 103 L146 80 Z" fill="hsl(24 16% 7%)" />
              {/* Near arm — reaching toward the groom */}
              <path d="M123 90 Q111 108 101 126" stroke="hsl(24 16% 7%)" strokeWidth="7.5" strokeLinecap="round" />
              {/* Far arm */}
              <path d="M146 90 Q158 108 164 130" stroke="hsl(24 16% 7%)" strokeWidth="7.5" strokeLinecap="round" />
              {/* Head */}
              <circle cx="134" cy="66" r="9.5" fill="hsl(24 16% 7%)" />
              {/* Ghoonghat — sheer veil draped over the crown */}
              <path d="M123 62 Q121 38 134 36 Q149 39 148 63 Q141 76 134 76 Q127 76 123 62 Z" fill="hsl(24 16% 7% / 0.78)" />
              {/* Maang tikka — gold dot at the forehead */}
              <circle cx="134" cy="56" r="2.3" fill="hsl(32 46% 56%)" />
              {/* Rim light — gold edge facing the light */}
              <path d="M120 90 C113 120 108 160 106 200" stroke="hsl(38 60% 70% / 0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />

              {/* Union — joined hands with a soft gold glow */}
              <circle cx="100" cy="126" r="11" fill="hsl(38 60% 64% / 0.28)" />
              <ellipse cx="100" cy="126" rx="6.5" ry="5" fill="hsl(24 16% 7%)" />
            </svg>
          </div>

          {/* Corner atmospheric warmth */}
          <div
            className="absolute bottom-0 left-0 w-2/5 h-3/5 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom left, rgba(188,148,88,0.22), transparent 58%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-2/5 h-3/5 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom right, rgba(188,148,88,0.22), transparent 58%)' }}
          />
        </div>
      </div>

      <div ref={darkenRef} className="absolute inset-0 pointer-events-none z-10" style={{ backgroundColor: 'hsl(32 26% 64%)', opacity: 0.18, mixBlendMode: 'multiply' }} />

      <FloatingDust className="z-10 opacity-[0.35]" />

      {/* ── Carved Arch Frame ── */}
      <div ref={frameRef} className="absolute inset-0 z-20 flex items-end justify-center pb-[10vh] lg:items-center lg:pb-0 will-change-transform" style={{ transformOrigin: '50% 58%' }}>
        <div className="relative w-[82vw] sm:w-[60vw] md:w-[54vw] lg:w-[min(52vw,47.5rem)] max-h-[40vh] lg:max-h-none aspect-[12/10]">
          <ArchFrame />
        </div>
      </div>

      {/* ── Layer 2: Moving Tree Canopy Shadows (Z-30: Casts ON the Arch) ── */}
      <div
        ref={treeShadowContainerRef}
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        style={{ opacity: 0.08, mixBlendMode: 'multiply' }}
      >
        <div ref={shadowSwayRef} className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] will-change-transform">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full text-[#1A1108]" style={{ filter: 'blur(10px)' }}>
            <g fill="currentColor">
              <path d="M 0 0 L 300 0 C 250 100 150 150 50 120 Z" />
              <path d="M 100 0 C 150 150 250 250 350 200 C 300 100 250 50 200 0 Z" />
              <path d="M 250 0 C 350 100 450 150 550 100 C 450 50 350 20 300 0 Z" />
              <path d="M 0 150 C 100 200 150 250 200 350 C 100 300 50 250 0 200 Z" />
              <path d="M 0 300 C 150 350 200 450 250 550 C 150 500 50 450 0 400 Z" />
              <path d="M 1000 0 L 700 0 C 750 100 850 150 950 120 Z" />
              <path d="M 900 0 C 850 150 750 250 650 200 C 700 100 750 50 800 0 Z" />
              <path d="M 1000 250 C 850 300 750 400 800 500 C 900 450 950 350 1000 300 Z" />
              <path d="M 1000 550 C 900 600 850 700 900 800 C 950 750 980 650 1000 600 Z" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── Brand Intro (Mobile Responsive Editorial Layer) ── */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="relative h-full max-w-[100rem] mx-auto px-6 lg:px-12">
          {/* Mobile: Stacked at top. Desktop: Left aligned grid */}
          <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_40.625rem] items-start lg:items-center pt-[9vh] lg:pt-0">
            
            <div
              ref={introRef}
              className="relative flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto mx-auto lg:mx-0 lg:ml-[8vw] max-w-[32.5rem]"
            >
              <p className="font-display italic mb-3 text-[#A88661]" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)' }}>
                est. 2013
              </p>
              
              <h1 className="font-display font-light leading-[0.98] tracking-[-0.01em] text-[#1A1510]" style={{ fontSize: 'clamp(2.75rem, 12vw, 5.5rem)' }}>
                <span className="block">Happy</span>
                <span className="block italic text-[#A88661]">Weddings</span>
              </h1>
              
              <p className="mt-4 lg:mt-8 font-sans uppercase leading-[1.8] text-[#1A1510]/60" style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.7rem)', letterSpacing: '0.36em' }}>
                Timeless • Intentional • Emotional
              </p>

              <p className="mt-2 lg:mt-4 font-display italic text-[#1A1510]/50" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)' }}>
                by Shruti Jain
              </p>

              <div className="mt-6 lg:mt-12 flex items-center">
                <button
                  type="button"
                  onClick={handleBegin}
                  data-cursor="link"
                  className="font-sans uppercase text-[#1A1510]/80 tracking-[0.25em] text-[0.65rem] border-b border-[#1A1510]/20 pb-1 hover:text-[#A88661] hover:border-[#A88661] transition-colors cursor-pointer"
                >
                  [ Begin The Journey ]
                </button>
              </div>
            </div>

            <div className="hidden lg:block h-full" />
            
          </div>
        </div>
      </div>

      {/* Scroll Hint (Bottom Center) — realistic animated mouse indicator */}
      <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3.5 pointer-events-none">
        <span className="font-sans uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.34em', color: 'hsl(24 12% 10% / 0.55)' }}>Scroll to step through</span>
        {/* Mouse body */}
        <span
          className="relative block"
          style={{
            width: '1.45rem',
            height: '2.35rem',
            borderRadius: '0.9rem',
            border: '1.5px solid hsl(24 12% 10% / 0.38)',
            boxShadow: 'inset 0 0 8px hsl(34 30% 95% / 0.4), 0 2px 10px hsl(24 12% 10% / 0.08)',
            background: 'linear-gradient(180deg, hsl(34 30% 96% / 0.45), transparent)',
          }}
        >
          {/* Scrolling wheel dot */}
          <span
            className="absolute left-1/2 block"
            style={{
              top: '0.45rem',
              marginLeft: '-0.1rem',
              width: '0.2rem',
              height: '0.45rem',
              borderRadius: '0.1rem',
              backgroundColor: 'hsl(32 31% 46%)',
              animation: 'hwScrollWheel 1.7s cubic-bezier(0.65,0,0.35,1) infinite',
            }}
          />
        </span>
        {/* Animated chevrons */}
        <span className="relative block" style={{ width: '0.85rem', height: '0.9rem' }}>
          <svg viewBox="0 0 24 28" className="w-full h-full" fill="none" aria-hidden>
            <path d="M4 4 L12 11 L20 4" stroke="hsl(24 12% 10% / 0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'hwChevron 1.7s ease-in-out infinite' }} />
            <path d="M4 13 L12 20 L20 13" stroke="hsl(24 12% 10% / 0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'hwChevron 1.7s ease-in-out 0.2s infinite' }} />
          </svg>
        </span>
        <style>{`
          @keyframes hwScrollWheel {
            0%   { opacity: 0; transform: translateY(0); }
            25%  { opacity: 1; }
            55%  { opacity: 1; transform: translateY(0.7rem); }
            100% { opacity: 0; transform: translateY(0.85rem); }
          }
          @keyframes hwChevron {
            0%, 100% { opacity: 0.25; }
            50%      { opacity: 0.85; }
          }
        `}</style>
      </div>

      {/* ── Emerged headline (Post-Arch Journey) ── */}
      <div className="absolute inset-0 z-40 flex items-center justify-center text-center px-6 pointer-events-none">
        <div ref={headlineRef} className="will-change-transform">
          <p className="font-sans uppercase mb-7" style={{ fontSize: '0.62rem', letterSpacing: '0.4em', color: 'hsl(32 31% 46%)' }}>— The celebration begins</p>
          <h2 className="font-display font-light leading-[1.02] tracking-[-0.02em] text-balance max-w-5xl" style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)', color: 'hsl(24 12% 10%)' }}>
            Crafting celebrations that <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>stay with you forever.</span>
          </h2>
        </div>
      </div>

      <div ref={blendRef} className="absolute inset-0 z-50 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(34 30% 95%) 0%, hsl(34 30% 95%) 55%, hsl(34 30% 95% / 0.85) 100%)' }} />
    </section>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Clean, Minimalist Botanical Illustration
   ────────────────────────────────────────────────────────────────── */
function BotanicalIllustration({ idPrefix }) {
  return (
    <svg viewBox="0 0 600 900" className="w-full h-auto drop-shadow-sm">
      <defs>
        <g id={`${idPrefix}-clean-leaf`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 0 C 15 -25 40 -25 50 -5 C 40 15 15 15 0 0 Z" />
          <path d="M 0 0 Q 25 -10 45 -5" strokeWidth="1" />
        </g>
        <g id={`${idPrefix}-berry`} fill="currentColor">
          <circle cx="0" cy="0" r="3" />
        </g>
      </defs>

      <path d="M -50 850 C 100 750 150 500 200 350 C 250 200 350 50 500 -50" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 170 450 C 120 350 50 250 -20 200" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 230 250 C 350 200 450 150 550 200" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 100 650 C 50 600 20 500 -30 450" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <use href={`#${idPrefix}-clean-leaf`} x="50" y="700" transform="rotate(-30 50 700) scale(1.2)" />
      <use href={`#${idPrefix}-clean-leaf`} x="130" y="580" transform="rotate(15 130 580) scale(1.1)" />
      <use href={`#${idPrefix}-clean-leaf`} x="180" y="420" transform="rotate(-45 180 420) scale(0.9)" />
      <use href={`#${idPrefix}-clean-leaf`} x="220" y="280" transform="rotate(20 220 280)" />
      <use href={`#${idPrefix}-clean-leaf`} x="300" y="150" transform="rotate(-35 300 150) scale(0.85)" />
      <use href={`#${idPrefix}-clean-leaf`} x="420" y="30" transform="rotate(10 420 30) scale(0.7)" />
      <use href={`#${idPrefix}-clean-leaf`} x="120" y="350" transform="rotate(-70 120 350) scale(0.9)" />
      <use href={`#${idPrefix}-clean-leaf`} x="60" y="270" transform="rotate(-15 60 270) scale(0.8)" />
      <use href={`#${idPrefix}-clean-leaf`} x="10" y="220" transform="rotate(-50 10 220) scale(0.7)" />
      <use href={`#${idPrefix}-clean-leaf`} x="300" y="220" transform="rotate(60 300 220)" />
      <use href={`#${idPrefix}-clean-leaf`} x="400" y="180" transform="rotate(30 400 180) scale(0.9)" />
      <use href={`#${idPrefix}-clean-leaf`} x="480" y="170" transform="rotate(80 480 170) scale(0.8)" />
      <use href={`#${idPrefix}-clean-leaf`} x="60" y="580" transform="rotate(-50 60 580) scale(1)" />
      <use href={`#${idPrefix}-clean-leaf`} x="10" y="500" transform="rotate(-10 10 500) scale(0.8)" />

      <use href={`#${idPrefix}-berry`} x="185" y="400" />
      <use href={`#${idPrefix}-berry`} x="195" y="390" />
      <use href={`#${idPrefix}-berry`} x="310" y="130" />
      <use href={`#${idPrefix}-berry`} x="410" y="160" />
      <use href={`#${idPrefix}-berry`} x="420" y="170" />
      <use href={`#${idPrefix}-berry`} x="50" y="250" />
      <use href={`#${idPrefix}-berry`} x="120" y="560" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────
   The carved archway — PHOTOREALISTIC FREESTANDING MONUMENT
   ────────────────────────────────────────────────────────────────── */
function ArchFrame() {
  const filterIdGrain = useId()
  const filterIdCastShadow = useId()

  const pathMonumentFace = 'M 340 1000 L 340 140 L 860 140 L 860 1000 Z'
  const pathOuterCCW = 'M 840 1000 L 840 650 A 30 30 0 0 0 815 625 C 790 550, 720 500, 600 420 C 480 500, 410 550, 385 625 A 30 30 0 0 0 360 650 L 360 1000 Z'
  const pathOuterCW = 'M 360 1000 L 360 650 A 30 30 0 0 1 385 625 C 410 550, 480 500, 600 420 C 720 500, 790 550, 815 625 A 30 30 0 0 1 840 650 L 840 1000 Z'
  const pathInnerCCW = 'M 760 1000 L 760 680 A 15 15 0 0 0 750 665 C 730 610, 680 580, 600 520 C 520 580, 470 610, 450 665 A 15 15 0 0 0 440 680 L 440 1000 Z'

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 1000" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="facadeLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF5E5" />   
          <stop offset="50%" stopColor="#DCC7A8" />  
          <stop offset="100%" stopColor="#9D7B5A" /> 
        </linearGradient>
        <linearGradient id="tunnelLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A281B" />   
          <stop offset="30%" stopColor="#7A5C42" />  
          <stop offset="70%" stopColor="#B39372" />  
          <stop offset="100%" stopColor="#D7C4A8" /> 
        </linearGradient>
        <radialGradient id="tunnelDarken" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="#180C04" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#180C04" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="columnLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF5E5" />
          <stop offset="25%" stopColor="#DCC7A8" />
          <stop offset="70%" stopColor="#7A5C42" />
          <stop offset="90%" stopColor="#3A281B" />
          <stop offset="100%" stopColor="#5A3E2A" /> 
        </linearGradient>
        <linearGradient id="bevelLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFF5E5" />
          <stop offset="70%" stopColor="#9D7B5A" stopOpacity="0" />
        </linearGradient>
        <filter id={filterIdCastShadow} x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="18" dy="28" stdDeviation="16" floodColor="#110803" floodOpacity="0.8" />
        </filter>
        <filter id={filterIdGrain} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.40   0 0 0 0 0.35   0 0 0 0 0.30  0 0 0 0.12 0" result="coloredNoise" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>

      <path d={`${pathOuterCW} ${pathInnerCCW}`} fill="url(#tunnelLight)" />
      <path d={`${pathOuterCW} ${pathInnerCCW}`} fill="url(#tunnelDarken)" style={{ mixBlendMode: 'multiply' }} />

      <g>
        <path d={`${pathMonumentFace} ${pathOuterCCW}`} fill="url(#facadeLight)" filter={`url(#${filterIdCastShadow})`} />
        <path d={`${pathMonumentFace} ${pathOuterCCW}`} fill="#C8B296" filter={`url(#${filterIdGrain})`} style={{ mixBlendMode: 'multiply', opacity: 0.9 }} />

        {/* Subtle Elegant Masonry Joints */}
        <g opacity="0.25" style={{ mixBlendMode: 'multiply' }}>
          {/* Top Horizontal (Above the arch hole completely) */}
          <line x1="340" y1="350" x2="860" y2="350" stroke="#4A321D" strokeWidth="2" />
          
          {/* Middle Horizontal (Cut in half around the arch) */}
          <line x1="340" y1="550" x2="400" y2="550" stroke="#4A321D" strokeWidth="2" />
          <line x1="800" y1="550" x2="860" y2="550" stroke="#4A321D" strokeWidth="2" />
          
          {/* Bottom Horizontal (Cut in half around the arch) */}
          <line x1="340" y1="750" x2="360" y2="750" stroke="#4A321D" strokeWidth="2" />
          <line x1="840" y1="750" x2="860" y2="750" stroke="#4A321D" strokeWidth="2" />

          {/* Vertical Lines */}
          <line x1="450" y1="140" x2="450" y2="350" stroke="#4A321D" strokeWidth="1.5" />
          <line x1="750" y1="140" x2="750" y2="350" stroke="#4A321D" strokeWidth="1.5" />
          <line x1="400" y1="350" x2="400" y2="550" stroke="#4A321D" strokeWidth="1.5" />
          <line x1="800" y1="350" x2="800" y2="550" stroke="#4A321D" strokeWidth="1.5" />
        </g>

        <path d={pathOuterCW.replace('Z', '')} fill="none" stroke="url(#bevelLight)" strokeWidth="4" style={{ mixBlendMode: 'overlay' }} />
      </g>

      <g filter={`url(#${filterIdCastShadow})`}>
        <rect x="330" y="120" width="540" height="15" fill="url(#facadeLight)" />
        <rect x="340" y="135" width="520" height="10" fill="url(#tunnelLight)" />
        <line x1="330" y1="120" x2="870" y2="120" stroke="#FFF5E5" strokeWidth="2" opacity="0.8" />
      </g>

      {[{ x: 350 }, { x: 822 }].map(({ x }, i) => (
        <g key={i}>
          <rect x={x - 6} y="580" width="40" height="420" fill="#180C04" opacity="0.4" filter="blur(6px)" />
          <rect x={x} y="600" width="28" height="400" fill="url(#columnLight)" filter={`url(#${filterIdCastShadow})`} />
          <g filter={`url(#${filterIdCastShadow})`}>
            <rect x={x - 8} y="580" width="44" height="12" fill="url(#columnLight)" />
            <path d={`M${x - 8} 580 L${x + 36} 580 L${x + 28} 565 L${x} 565 Z`} fill="url(#columnLight)" />
            <line x1={x - 8} y1="580" x2={x + 36} y2="580" stroke="#FFF5E5" strokeWidth="1.5" opacity="0.7" />
          </g>
          <g filter={`url(#${filterIdCastShadow})`}>
            <rect x={x - 10} y="960" width="48" height="40" fill="url(#columnLight)" />
            <rect x={x - 6} y="950" width="40" height="10" fill="url(#columnLight)" />
            <line x1={x - 10} y1="960" x2={x + 38} y2="960" stroke="#FFF5E5" strokeWidth="1.5" opacity="0.7" />
          </g>
        </g>
      ))}

      <g filter={`url(#${filterIdCastShadow})`}>
        <rect x="330" y="980" width="540" height="20" fill="url(#facadeLight)" />
        <line x1="330" y1="980" x2="870" y2="980" stroke="#FFF5E5" strokeWidth="2" opacity="0.6" />
      </g>
    </svg>
  )
}