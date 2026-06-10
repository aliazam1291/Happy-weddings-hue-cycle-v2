'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = 'HAPPY WEDDINGS'.split('')

export function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0=init 1=monogram 2=name 3=tagline 4=exit
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 100)
    const t1 = setTimeout(() => setPhase(2), 600)
    const t2 = setTimeout(() => setPhase(3), 1500)
    // start the exit; onComplete fires from onExitComplete below, so it can
    // never be lost to the unmount/timer race that left the page "unloaded"
    const t3 = setTimeout(() => { setPhase(4); setVisible(false) }, 2700)
    return () => [t0, t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'hsl(34 30% 95%)' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-5xl md:text-7xl leading-none"
            style={{ color: 'hsl(32 31% 51%)' }}
          >
            HW
          </motion.div>

          {/* Expanding line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'center', backgroundColor: 'hsl(32 31% 51% / 0.5)' }}
            className="w-20 h-px my-6"
          />

          {/* Letter-by-letter brand name */}
          <div className="flex overflow-hidden gap-[0.05em]">
            {CHARS.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '120%' }}
                animate={{ y: phase >= 2 ? '0%' : '120%' }}
                transition={{
                  duration: 0.55,
                  delay: phase >= 2 ? i * 0.038 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans font-light text-xs md:text-sm tracking-[0.36em]"
                style={{ color: 'hsl(24 12% 10%)' }}
              >
                {ch === ' ' ? '  ' : ch}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display italic text-base md:text-lg"
            style={{ color: 'hsl(24 12% 10% / 0.45)' }}
          >
            Timeless · Intentional · Emotional
          </motion.p>

          {/* Progress */}
          <div className="absolute bottom-10 flex items-center gap-0">
            <div className="w-28 h-px overflow-hidden" style={{ backgroundColor: 'hsl(24 12% 10% / 0.08)' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.55, ease: 'linear' }}
                style={{ transformOrigin: 'left', height: '100%', backgroundColor: 'hsl(32 31% 51% / 0.7)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
