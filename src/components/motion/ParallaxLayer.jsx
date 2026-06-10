'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Translates the child on Y as its parent scrolls past the viewport.
 * `speed` of 0.2 ≈ subtle, 0.6 ≈ pronounced. Negative speeds invert direction.
 */
export function ParallaxLayer({ children, speed = 0.25, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
