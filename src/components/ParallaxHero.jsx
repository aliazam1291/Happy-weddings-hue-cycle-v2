'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function ParallaxHero() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  // Layer refs — ordered back → front
  const bgRef = useRef(null)        // z-0  Clip path group (sky + gazebo bg)
  const leftBackRef = useRef(null)  // z-10 Left Element Back (palm back)
  const rightBackRef = useRef(null) // z-10 Right Element Back (palm back)
  const mainArchRef = useRef(null)  // z-20 Main Toumb (the grand archway)
  const mainElRef = useRef(null)    // z-30 Main Element (gazebo / midground)
  const fenceRef = useRef(null)     // z-40 Fence (balustrade)
  const leftFrontRef = useRef(null) // z-50 Left Element Front (banana leaf)
  const rightFrontRef = useRef(null)// z-50 Right Element Front (palm trunk)
  const footerRef = useRef(null)    // z-60 Footer (foreground ground ivy)

  useEffect(() => {
    let ctx
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const scene = sceneRef.current
        if (!scene) return

        // ─── SHARED ScrollTrigger config ───────────────────────────────
        const trigger = {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        }

        // ─── LAYER 0 · Background / Sky ────────────────────────────────
        // Slowest — hardly moves, creates infinite depth
        gsap.fromTo(bgRef.current,
          { yPercent: 0 },
          { yPercent: -8, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 1 · Back Trees (L + R) ──────────────────────────────
        // Slow drift, slight scale-down as we "move past" them
        gsap.fromTo([leftBackRef.current, rightBackRef.current],
          { yPercent: 0, scale: 1 },
          { yPercent: -15, scale: 0.96, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 2 · Main Arch ───────────────────────────────────────
        // Mid speed — the landmark. Subtle scale-up = "walking in"
        gsap.fromTo(mainArchRef.current,
          { yPercent: 0, scale: 1 },
          { yPercent: -22, scale: 1.04, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 3 · Main Element (gazebo mid) ───────────────────────
        gsap.fromTo(mainElRef.current,
          { yPercent: 0 },
          { yPercent: -18, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 4 · Fence / Balustrade ──────────────────────────────
        gsap.fromTo(fenceRef.current,
          { yPercent: 0 },
          { yPercent: -30, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 5 · Front Elements (L + R) ──────────────────────────
        // Faster — sweeps past camera
        gsap.fromTo(leftFrontRef.current,
          { yPercent: 0, xPercent: 0 },
          { yPercent: -42, xPercent: -3, ease: 'none', scrollTrigger: trigger }
        )
        gsap.fromTo(rightFrontRef.current,
          { yPercent: 0, xPercent: 0 },
          { yPercent: -42, xPercent: 3, ease: 'none', scrollTrigger: trigger }
        )

        // ─── LAYER 6 · Footer (foreground ivy / ground) ────────────────
        // Fastest — exits frame first
        gsap.fromTo(footerRef.current,
          { yPercent: 0 },
          { yPercent: -55, ease: 'none', scrollTrigger: trigger }
        )

        // ─── ENTRANCE ANIMATION (page load) ────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.8 } })
        tl.from(bgRef.current, { opacity: 0, scale: 1.06 }, 0)
          .from([leftBackRef.current, rightBackRef.current], { opacity: 0, yPercent: 4 }, 0.2)
          .from(mainArchRef.current, { opacity: 0, yPercent: 3, scale: 0.97 }, 0.35)
          .from(mainElRef.current, { opacity: 0, yPercent: 2 }, 0.5)
          .from(fenceRef.current, { opacity: 0, yPercent: 6 }, 0.55)
          .from([leftFrontRef.current, rightFrontRef.current], { opacity: 0, yPercent: 8 }, 0.65)
          .from(footerRef.current, { opacity: 0, yPercent: 12 }, 0.75)

      }, containerRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '200vh' }}>
      {/* Sticky viewport that pins the scene */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* ── Scene: 16:9 aspect ratio container, centred ── */}
        <div
          ref={sceneRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#d6e8ed' }}
        >
          {/* Aspect-ratio wrapper — always fills viewport, letterboxed if needed */}
          <div
            className="relative w-full h-full"
            style={{ maxHeight: '100vh', aspectRatio: '1920/875', margin: 'auto' }}
          >

            {/* ── z-0 · Background (sky, distant gazebo) ── */}
            <div ref={bgRef} className="absolute inset-0" style={{ zIndex: 0 }}>
              <Image
                src="/svgs/background.svg"
                alt="Garden background"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>

            {/* ── z-10 · Left Back Tree ── */}
            <div
              ref={leftBackRef}
              className="absolute"
              style={{
                zIndex: 10,
                left: '-2%',
                top: '-5%',
                width: '30%',
                height: '110%',
                transformOrigin: 'bottom center',
              }}
            >
              <Image src="/svgs/left-back.svg" alt="Left back palm" fill style={{ objectFit: 'contain', objectPosition: 'bottom left' }} />
            </div>

            {/* ── z-10 · Right Back Tree ── */}
            <div
              ref={rightBackRef}
              className="absolute"
              style={{
                zIndex: 10,
                right: '-2%',
                top: '-5%',
                width: '40%',
                height: '110%',
                transformOrigin: 'bottom center',
              }}
            >
              <Image src="/svgs/right-back.svg" alt="Right back palm" fill style={{ objectFit: 'contain', objectPosition: 'bottom right' }} />
            </div>

            {/* ── z-20 · Main Arch (Grand archway + swan pool) ── */}
            <div
              ref={mainArchRef}
              className="absolute"
              style={{
                zIndex: 20,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '62%',
                height: '110%',
                transformOrigin: 'center bottom',
              }}
            >
              <Image src="/svgs/main-arch.svg" alt="Main archway" fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
            </div>

            {/* ── z-30 · Main Element (gazebo / mid detail) ── */}
            <div
              ref={mainElRef}
              className="absolute"
              style={{
                zIndex: 30,
                left: '50%',
                top: '0%',
                transform: 'translateX(-50%)',
                width: '35%',
                height: '60%',
                transformOrigin: 'center bottom',
              }}
            >
              <Image src="/svgs/main-element.svg" alt="Gazebo" fill style={{ objectFit: 'contain', objectPosition: 'center top' }} />
            </div>

            {/* ── z-40 · Fence / Balustrade ── */}
            <div
              ref={fenceRef}
              className="absolute"
              style={{
                zIndex: 40,
                bottom: '14%',
                left: '0',
                width: '100%',
                height: '30%',
                transformOrigin: 'bottom center',
              }}
            >
              <Image src="/svgs/fence.svg" alt="Garden fence" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            </div>

            {/* ── z-50 · Left Front Element (banana leaves) ── */}
            <div
              ref={leftFrontRef}
              className="absolute"
              style={{
                zIndex: 50,
                left: '-3%',
                bottom: '-5%',
                width: '32%',
                height: '82%',
                transformOrigin: 'bottom left',
              }}
            >
              <Image src="/svgs/left-front.svg" alt="Left foreground foliage" fill style={{ objectFit: 'contain', objectPosition: 'bottom left' }} />
            </div>

            {/* ── z-50 · Right Front Element (palm trunk + leaves) ── */}
            <div
              ref={rightFrontRef}
              className="absolute"
              style={{
                zIndex: 50,
                right: '-3%',
                bottom: '-5%',
                width: '32%',
                height: '95%',
                transformOrigin: 'bottom right',
              }}
            >
              <Image src="/svgs/right-front.svg" alt="Right foreground foliage" fill style={{ objectFit: 'contain', objectPosition: 'bottom right' }} />
            </div>

            {/* ── z-60 · Footer (ground ivy / foreground) ── */}
            <div
              ref={footerRef}
              className="absolute"
              style={{
                zIndex: 60,
                bottom: '-2%',
                left: '0',
                width: '100%',
                height: '28%',
                transformOrigin: 'bottom center',
              }}
            >
              <Image src="/svgs/footer.svg" alt="Foreground ground" fill style={{ objectFit: 'cover', objectPosition: 'center bottom' }} />
            </div>

          </div>
        </div>

        {/* ── Overlay: Headline text ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none"
          style={{ zIndex: 100, paddingBottom: '6vh' }}
        >
          <p
            className="text-center tracking-[0.35em] uppercase"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(10px, 1.1vw, 14px)',
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.4em',
              marginBottom: '0.8rem',
            }}
          >
            Est. 2010 · New Delhi
          </p>
          <h1
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 6.5vw, 96px)',
              lineHeight: 1,
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.18)',
              letterSpacing: '-0.01em',
            }}
          >
            Happy<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Weddings</em>
          </h1>
          <p
            className="text-center mt-4"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(11px, 1vw, 14px)',
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.22em',
            }}
          >
            Scroll to explore
          </p>
          {/* Scroll indicator arrow */}
          <div className="mt-4" style={{ animation: 'bounce 2s infinite' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  )
}
