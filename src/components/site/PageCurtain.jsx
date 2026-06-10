'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Plays once on mount. Two ink panels split apart vertically,
 * with a Cormorant wordmark fading through the seam.
 */
export function PageCurtain() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Lock scroll while curtain is up
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      document.documentElement.style.overflow = ''
    }, 2200)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top half */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink origin-bottom"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1.2, delay: 1.0, ease: ease.editorial }}
          />
          {/* Bottom half */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink origin-top"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 1.2, delay: 1.0, ease: ease.editorial }}
          />

          {/* Centered wordmark */}
          <div className="absolute inset-0 flex items-center justify-center text-ivory">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: ease.editorial }}
            >
              <p className="eyebrow text-gold mb-4">— A named house since 2013</p>
              <h1 className="font-display text-5xl md:text-7xl text-ivory tracking-editorial">
                Happy <span className="italic text-gold">Weddings</span>
              </h1>
              <motion.div
                className="mx-auto mt-6 h-px bg-gold"
                initial={{ width: 0 }}
                animate={{ width: 220 }}
                transition={{ duration: 0.9, delay: 0.4, ease: ease.editorial }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
