'use client'

import { useEffect, useState } from 'react'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Width-based mobile check — used to swap heavy pinned/scrub scroll sections
// for clean stacked layouts on phones/tablets. Defaults to the Tailwind `lg`
// breakpoint (1024px).
export function useIsMobile(maxWidth = 1023) {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    setMobile(mq.matches)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [maxWidth])
  return mobile
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setTouch(mq.matches)
    const onChange = (e) => setTouch(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return touch
}

// Easing curves used across the site
export const ease = {
  editorial: [0.22, 1, 0.36, 1],
  soft: [0.16, 1, 0.3, 1],
  snappy: [0.33, 1, 0.68, 1],
}
