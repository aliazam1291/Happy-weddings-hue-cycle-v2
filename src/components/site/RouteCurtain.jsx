'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, prefersReducedMotion } from '@/lib/motion'

/**
 * Themed route transition — a brand "curtain" that reveals each new page.
 *
 * Mounted ONCE in the root layout as a fixed overlay. It never wraps the page
 * tree (the earlier `template.js` approach wrapped children in a component that
 * re-mounted on every navigation, which caused React `removeChild` crashes).
 * Because this is a self-contained overlay, mounting/unmounting only ever
 * touches its own subtree — safe across rapid client navigations.
 *
 * Flow on each route change (after the first load — the home PageLoader owns
 * that): two ivory panels start covering the freshly-rendered page, the
 * wordmark + a drawn gold thread hold for a beat, then the panels split apart
 * to reveal the new page.
 */
export function RouteCurtain() {
  const pathname = usePathname()
  const firstRun = useRef(true)
  const [key, setKey] = useState(null)

  useEffect(() => {
    // Snap to top on every route change (drive Lenis if present, else native).
    const lenis = typeof window !== 'undefined' ? window.__lenis : null
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => {
      try { ScrollTrigger.refresh() } catch {}
    })

    // Skip the initial mount (first paint) and reduced-motion users.
    if (firstRun.current) {
      firstRun.current = false
      return () => cancelAnimationFrame(raf)
    }
    if (prefersReducedMotion()) return () => cancelAnimationFrame(raf)

    setKey(pathname)
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  if (!key) return null
  return <Curtain key={key} onDone={() => setKey(null)} />
}

function Curtain({ onDone }) {
  const bg = 'hsl(34 30% 95%)' // ivory
  const HOLD = 0.5 // beat the wordmark holds before the panels open
  const SPLIT = 0.85

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" aria-hidden>
      {/* Top ivory panel */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ backgroundColor: bg }}
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: SPLIT, delay: HOLD, ease: ease.editorial }}
      />
      {/* Bottom ivory panel — last to finish, so it owns the cleanup */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ backgroundColor: bg }}
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: SPLIT, delay: HOLD, ease: ease.editorial }}
        onAnimationComplete={onDone}
      />

      {/* Hairline gold seam along the split line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{ backgroundColor: 'hsl(32 31% 51% / 0.6)' }}
        initial={{ scaleX: 1, opacity: 0.6 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: SPLIT, delay: HOLD, ease: ease.editorial }}
      />

      {/* Centre wordmark + drawn gold thread */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, delay: HOLD + 0.05, ease: ease.editorial }}
      >
        <motion.span
          className="font-display italic tracking-editorial"
          style={{ fontSize: 'clamp(1.75rem, 6vw, 3.25rem)', color: 'hsl(24 12% 10%)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.editorial }}
        >
          Happy <span style={{ color: 'hsl(32 31% 46%)' }}>Weddings</span>
        </motion.span>
        <motion.span
          className="block h-px"
          style={{ width: '7rem', backgroundColor: 'hsl(32 31% 51%)', transformOrigin: 'center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: ease.editorial }}
        />
      </motion.div>
    </div>
  )
}
