'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, prefersReducedMotion } from '@/lib/motion'

/**
 * Ink-curtain page transition, recoloured ivory so it blends with the light
 * theme. Rendered from app/template.js. The curtain is created entirely on the
 * client *after* a real navigation (never during SSR/first paint — the home
 * PageLoader owns that), which avoids any hydration mismatch.
 *
 * On every route change we also snap the scroll to top (Lenis-aware) and
 * refresh ScrollTrigger so pinned sections re-measure.
 */
export function PageTransition({ children }) {
  const pathname = usePathname()
  const firstRun = useRef(true)
  const [curtainKey, setCurtainKey] = useState(null)

  useEffect(() => {
    // snap to top on each route change (drive Lenis if present, else native)
    const lenis = typeof window !== 'undefined' ? window.__lenis : null
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => {
      try { ScrollTrigger.refresh() } catch {}
    })

    // skip the very first mount (initial load) — no curtain there
    if (firstRun.current) {
      firstRun.current = false
      return () => cancelAnimationFrame(raf)
    }
    if (prefersReducedMotion()) {
      return () => cancelAnimationFrame(raf)
    }

    setCurtainKey(pathname)
    const done = setTimeout(() => setCurtainKey(null), 1200)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [pathname])

  return (
    <>
      {children}
      {curtainKey && <Curtain key={curtainKey} />}
    </>
  )
}

function Curtain() {
  const panel = 'absolute inset-x-0 h-1/2'
  const bg = 'hsl(34 30% 95%)'
  return (
    <div className="fixed inset-0 z-[120] pointer-events-none" aria-hidden>
      <motion.div
        className={`${panel} top-0 origin-bottom`}
        style={{ backgroundColor: bg }}
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.85, delay: 0.12, ease: ease.editorial }}
      />
      <motion.div
        className={`${panel} bottom-0 origin-top`}
        style={{ backgroundColor: bg }}
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 0.85, delay: 0.12, ease: ease.editorial }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.55, ease: ease.editorial }}
      >
        <span className="font-display italic text-2xl md:text-4xl tracking-editorial" style={{ color: 'hsl(24 12% 10%)' }}>
          Happy <span style={{ color: 'hsl(32 31% 46%)' }}>Weddings</span>
        </span>
      </motion.div>
    </div>
  )
}
