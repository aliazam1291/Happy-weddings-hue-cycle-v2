'use client'

/**
 * ParallaxScene.jsx — Wedding Garden: Walk Through The Arch
 *
 * ═══════════════════════════════════════════════════════════════
 * Z-ORDER — matches Figma "Frame 59" layer panel exactly
 * (Top of Figma panel = frontmost = highest z-index)
 *
 *   z:9  left-front     Left Element Front   ← FRONTMOST
 *   z:8  main-arch      Main Toumb
 *   z:7  main-element   Main / Element (gazebo)
 *   z:6  right-front    Right element front
 *   z:5  fence          Fense
 *   z:4  left-back      Left Element Back
 *   z:3  right-back     Right Element Back
 *   z:2  footer         Footer
 *   z:1  background     Clip path group      ← BACKMOST
 *
 * WHY THIS MATTERS:
 *   • Arch (z:8) is nearly frontmost — as it scales it covers fence,
 *     palms, footer, bg. Its transparent SVG opening reveals
 *     gazebo (z:7) and right-front (z:6) through the arch hole.
 *   • Left-front (z:9) is always IN FRONT of the arch — it's the
 *     closest foliage to camera, overlapping the arch's left column.
 *   • Footer (z:2) is BEHIND both back palms — it's the ground path,
 *     partially tucked under the palm bases.
 *
 * ═══════════════════════════════════════════════════════════════
 * CANVAS — 1920 × 875 (Figma frame size)
 *   Aspect ratio wrapper forces correct proportions on any viewport.
 *   Letterbox color matches grass/ground so gaps are invisible.
 *
 * ═══════════════════════════════════════════════════════════════
 * SCROLL PHYSICS — walking forward toward the mandap
 *
 *   background    → y:-30, scale:1.06   barely drifts (infinite depth)
 *   left-back     → x:-120, y:-40       spreads left (camera passes it)
 *   right-back    → x:+120, y:-40       spreads right
 *   main-arch ★  → scale:2.6, y:-60    grows from base, fills viewport
 *   main-element  → scale:2.0, y:-200   destination zooms toward you
 *   fence         → y:+260              exits DOWN (you step over it)
 *   right-front   → x:+160, y:+280      exits lower-right ↘
 *   left-front    → x:-180, y:+300      exits lower-left  ↙  (fastest)
 *   footer/lawn   → y:+450              exits DOWN fastest (floor)
 *
 * ═══════════════════════════════════════════════════════════════
 * SEAM FIX:
 *   overflow:hidden does NOT clip GSAP-transformed children unless
 *   the container itself has transform:translateZ(0).
 *   Applied to: sticky wrapper + scene + aspect-ratio container.
 *
 * GSAP RULES:
 *   • No CSS transform on GSAP-animated elements
 *   • Center via marginLeft (not translateX)
 *   • transformOrigin inside gsap.fromTo() only
 *   • scrub:true = 1:1 scroll, no lag
 *   • willChange:'transform' on layer imgs only (not containers)
 * ═══════════════════════════════════════════════════════════════
 */

import { useRef, useEffect } from 'react'

export default function ParallaxScene() {
  const sectionRef     = useRef(null)
  const sceneRef       = useRef(null)
  const backgroundRef  = useRef(null)
  const footerRef      = useRef(null)       // z:2 — behind back palms
  const rightBackRef   = useRef(null)       // z:3
  const leftBackRef    = useRef(null)       // z:4
  const fenceRef       = useRef(null)       // z:5
  const rightFrontRef  = useRef(null)       // z:6
  const mainElementRef = useRef(null)       // z:7 — gazebo/mandap
  const mainArchRef    = useRef(null)       // z:8 — the arch
  const leftFrontRef   = useRef(null)       // z:9 — FRONTMOST
  const midgroundRef   = useRef(null)       // Shared wrapper for gazebo & fence
  const swanLeftRef    = useRef(null)       // z:7 — left swan
  const swanRightRef   = useRef(null)       // z:7 — right swan

  useEffect(() => {
    let ctx

    async function init() {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {

        const st = {
          trigger : sectionRef.current,
          start   : 'top top',
          end     : 'bottom bottom',
          scrub   : true,
        }

        const mm = gsap.matchMedia()

        // ── DESKTOP ≥ 768px ─────────────────────────────────────────────
        mm.add('(min-width: 768px)', () => {

          const st = {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
          const tl = gsap.timeline({ scrollTrigger: st })

          // PHASE 1: Swans swim to center
          tl.fromTo(swanLeftRef.current, { x: '-10vw', y: 0, scale: 1 }, { x: 0, y: 0, scale: 1, ease: 'power1.out', duration: 1 }, 0)
          tl.fromTo(swanRightRef.current, { x: '10vw', y: 0, scale: 1 }, { x: 0, y: 0, scale: 1, ease: 'power1.out', duration: 1 }, 0)

          // PHASE 2: Entire scene parallax
          const pStart = 1
          const pDur = 2

          tl.to(swanLeftRef.current, { y: '150vh', scale: 4.5, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.to(swanRightRef.current, { y: '150vh', scale: 4.5, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)

          tl.fromTo(backgroundRef.current, { y: 0, scale: 1 }, { y: -50, scale: 1.15, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(rightBackRef.current, { x: 0, y: 0 }, { x: 200, y: -60, ease: 'none', duration: pDur }, pStart)
          tl.fromTo(leftBackRef.current, { x: 0, y: 0 }, { x: -200, y: -60, ease: 'none', duration: pDur }, pStart)
          tl.fromTo(midgroundRef.current, { scale: 1, y: 0 }, { scale: 1.6, y: '5vh', transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(rightFrontRef.current, { x: 0, y: 0 }, { x: '30vw', y: '20vh', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(mainArchRef.current, { scale: 1, y: 0 }, { scale: 4.5, y: 0, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(leftFrontRef.current, { x: 0, y: 0 }, { x: '-30vw', y: '20vh', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(footerRef.current, { y: 0 }, { y: '20vh', ease: 'none', duration: pDur }, pStart)

          ScrollTrigger.refresh()
        })

        // ── MOBILE < 768px ───────────────────────────────────────────────
        mm.add('(max-width: 767px)', () => {

          const st = {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
          const tl = gsap.timeline({ scrollTrigger: st })

          // PHASE 1: Swans swim to center
          tl.fromTo(swanLeftRef.current, { x: '-40vw', y: 0, scale: 1 }, { x: 0, y: 0, scale: 1, ease: 'power1.out', duration: 1 }, 0)
          tl.fromTo(swanRightRef.current, { x: '40vw', y: 0, scale: 1 }, { x: 0, y: 0, scale: 1, ease: 'power1.out', duration: 1 }, 0)

          // PHASE 2: Entire scene parallax
          const pStart = 1
          const pDur = 2

          tl.to(swanLeftRef.current, { y: '150vh', scale: 4.5, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.to(swanRightRef.current, { y: '150vh', scale: 4.5, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)

          tl.fromTo(backgroundRef.current, { y: 0, scale: 1 }, { y: -25, scale: 1.08, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(rightBackRef.current, { x: 0, y: 0 }, { x: 50, y: -20, ease: 'none', duration: pDur }, pStart)
          tl.fromTo(leftBackRef.current, { x: 0, y: 0 }, { x: -50, y: -20, ease: 'none', duration: pDur }, pStart)
          tl.fromTo(midgroundRef.current, { scale: 1, y: 0 }, { scale: 1.4, y: '5vh', transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(rightFrontRef.current, { x: 0, y: 0 }, { x: '30vw', y: '20vh', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(mainArchRef.current, { scale: 1, y: 0 }, { scale: 4.5, y: 0, transformOrigin: '50% 50%', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(leftFrontRef.current, { x: 0, y: 0 }, { x: '-30vw', y: '20vh', ease: 'none', duration: pDur }, pStart)
          tl.fromTo(footerRef.current, { y: 0 }, { y: '10vh', ease: 'none', duration: pDur }, pStart)

          ScrollTrigger.refresh()
        })

      })
    }

    init()
    return () => ctx?.revert()
  }, [])

  // ── Clip fix: containers with overflow:hidden MUST also have
  //    transform:translateZ(0) to actually clip GSAP-transformed children
  const clipContainer = {
    overflow : 'hidden',
    transform: 'translateZ(0)',
  }

  return (
    // 400vh = scroll distance
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '400vh', width: '100%' }}
    >

      {/* ── Sticky pin ─────────────────────────────────────────────────── */}
      <div
        style={{
          position       : 'sticky',
          top            : 0,
          left           : 0,
          width          : '100%',
          height         : '100vh',
          display        : 'flex',
          alignItems     : 'center',
          justifyContent : 'center',
          // Dark background for letterbox areas when scene AR < viewport AR
          background     : '#0e0e0e',
          ...clipContainer,
        }}
      >

        {/* ── Aspect-ratio scene container — matches Figma 1920×875 ───── */}
        {/*    width: 100%  but capped so height never exceeds 100vh       */}
        {/*    max-width: 100vh × (1920/875) = viewport-height-constrained */}
        <div
          ref={sceneRef}
          style={{
            position  : 'relative',
            width     : '100%',
            // If viewport is taller than 1920:875 ratio, scene is width-constrained
            // If viewport is wider than 1920:875 ratio, scene is height-constrained
            maxWidth  : 'calc(100vh * 2.194)',   // 1920/875 = 2.194
            aspectRatio: '1920 / 875',
            // Grass-green letterbox matches the scene ground tone
            background: '#8fa876',
            ...clipContainer,
          }}
        >

          {/* ════════════════════════════════════════════════════════════
              ALL LAYERS — positioned as % of 1920×875 scene canvas
              z-index matches Figma layer order exactly
          ════════════════════════════════════════════════════════════ */}

          {/* ── z:1 · BACKGROUND (clip path group) ──────────────────────
              Full scene sky + distant garden. Bleeds slightly to
              prevent edge gaps during scale animation.               */}
          <img
            ref={backgroundRef}
            src="/svgs/background.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              inset     : '-4%',
              width     : '108%',
              height    : '108%',
              objectFit : 'cover',
              zIndex    : 1,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── z:2 · FOOTER (stone path + ivy urns) ────────────────────
              Behind back palms! The lawn/ground path at scene base.
              width:108% + left:-4% = full bleed on sides.
              bottom:0 = sits at scene floor.                         */}
          <img
            ref={footerRef}
            src="/svgs/footer.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              bottom    : 0,
              left      : '0%',
              width     : '150%',
              height    : 'auto',
              zIndex    : 8,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── z:3 · RIGHT BACK PALM (719×868) ─────────────────────────
              37.4% wide (719/1920). Behind left-back (z:4).          */}
          <img
            ref={rightBackRef}
            src="/svgs/right-back.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              bottom    : 0,
              right     : '-2%',
              width     : '37.4%',
              height    : 'auto',
              zIndex    : 1,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── z:4 · LEFT BACK PALM (535×847) ──────────────────────────
              27.9% wide (535/1920). In front of right-back.          */}
          <img
            ref={leftBackRef}
            src="/svgs/left-back.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              bottom    : 0,
              left      : '-2%',
              width     : '27.9%',
              height    : 'auto',
              zIndex    : 4,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── MIDGROUND GROUP (Fence & Gazebo) ──
              Wrapped together so they zoom as a single locked unit,
              preventing the stairs from sliding off the balustrade.  */}
          <div ref={midgroundRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5, willChange: 'transform' }}>
            
            {/* z:5 · Fence / Pool */}
            <img
              ref={fenceRef}
              src="/svgs/fence.svg"
              alt=""
              draggable={false}
              style={{
                position  : 'absolute',
                bottom    : '14%',
                left      : 0,
                width     : '100%',
                height    : 'auto',
                display   : 'block',
                userSelect: 'none',
              }}
            />

            {/* z:7 · Gazebo/Mandap 
                Initial bottom: 24% perfectly sits the stairs ON the balustrade */}
            <img
              ref={mainElementRef}
              src="/svgs/main-element.svg"
              alt=""
              draggable={false}
              style={{
                position  : 'absolute',
                bottom    : '20%',
                left      : '50%',
                marginLeft: '-17.5%',
                width     : '35%',
                height    : 'auto',
                display   : 'block',
                userSelect: 'none',
              }}
            />
          </div>

          {/* ── z:6 · RIGHT FRONT FOLIAGE (518×762) ─────────────────────
              Behind arch but in front of fence.
              Shows through arch's transparent right-side opening.    */}
          <img
            ref={rightFrontRef}
            src="/svgs/right-front.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              bottom    : '-8%',
              right     : '-2%',
              width     : '32%',
              height    : 'auto',
              zIndex    : 6,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── z:10 · SWANS (Visible above the main arch) ── */}
          <div
            ref={swanLeftRef}
            style={{
              position  : 'absolute',
              bottom    : '10%',
              left      : '50%',
              marginLeft: '-4.6%',
              width     : '5%',
              height    : 'auto',
              display   : 'block',
              zIndex    : 10,
              willChange: 'transform',
            }}
          >
            {/* Left Swan faces right */}
            <img src="/svgs/swan.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block', transform: 'scaleX(-1)' }} draggable={false} />
          </div>

          <div
            ref={swanRightRef}
            style={{
              position  : 'absolute',
              bottom    : '10%',
              left      : '50%',
              marginLeft: '-0.4%', // Overlap for beaks
              width     : '5%',
              height    : 'auto',
              display   : 'block',
              zIndex    : 10,
              willChange: 'transform',
            }}
          >
            {/* Right Swan faces left */}
            <img src="/svgs/swan.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} draggable={false} />
          </div>

          {/* ── z:8 · MAIN ARCH ★★★ (1064×1078) ────────────────────────
              55.4% wide (1064/1920). Bottom-anchored — base grounded.
              SVG height 1078px > 875px canvas: transparent top 203px
              extends above scene (clipped). Arch content visible in
              lower 875px of SVG — matches Frame 59 exactly.

              ⚠ CENTERING: left:50% + marginLeft:-27.7% (half of 55.4%)
                NO CSS transform — GSAP owns the entire matrix.
              GSAP: scale 1→2.6 from transformOrigin:'50% 100%'        */}
          <img
            ref={mainArchRef}
            src="/svgs/main-arch.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              top       : '-15%',
              left      : '50%',
              marginLeft: '-31%',
              width     : '62%',
              height    : 'auto',
              zIndex    : 8,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

          {/* ── z:9 · LEFT FRONT FOLIAGE (518×627) ──────────────────────
              THE FRONTMOST LAYER — in front of the arch!
              Closest foliage to camera, overlaps arch left column.
              bottom:0, left:-2%, width:27%.
              Exits lower-left ↙ fastest during scroll.               */}
          <img
            ref={leftFrontRef}
            src="/svgs/left-front.svg"
            alt=""
            draggable={false}
            style={{
              position  : 'absolute',
              bottom    : 0,
              left      : '-2%',
              width     : '27%',
              height    : 'auto',
              zIndex    : 9,
              display   : 'block',
              userSelect: 'none',
              willChange: 'transform',
            }}
          />

        </div>
        {/* ── end scene container ── */}

      </div>
      {/* ── end sticky ── */}

    </section>
  )
}
