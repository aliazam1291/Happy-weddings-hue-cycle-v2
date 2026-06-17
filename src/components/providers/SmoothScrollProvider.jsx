'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

export let lenis = null

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (prefersReducedMotion()) return

    lenis = new Lenis({
      // lerp gives a more responsive, frame-rate independent glide than a fixed
      // duration — the wheel feels connected to the page instead of floaty.
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native momentum scrolling on touch devices is smoother than JS-driven
      // smoothing — let mobile use the browser's own scroller.
      syncTouch: false,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    if (typeof window !== 'undefined') window.__lenis = lenis

    const rafCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCb)
      lenis.destroy()
      lenis = null
    }
  }, [])

  return children
}
