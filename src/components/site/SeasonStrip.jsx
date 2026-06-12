'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ease } from '@/lib/motion'

const DISMISS_KEY = 'hw-season-strip-dismissed'

/**
 * Dismissable urgency strip — Indian wedding season runs ~Nov to Feb.
 * Calendar-driven urgency without being sleazy. Sits above PageHero on
 * Projects + Services. State is per-session (sessionStorage) so a user
 * who dismissed it earlier in their visit doesn't see it every page.
 */
export function SeasonStrip({
  label = 'Wedding season Nov 2026 — Feb 2027',
  cta = '11 slots left this year',
  href = '/contact',
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(DISMISS_KEY)
      if (!dismissed) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {}
    setOpen(false)
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: ease.editorial }}
          className="w-full border-b"
          style={{
            backgroundColor: 'hsl(24 12% 10%)',
            color: 'hsl(34 30% 95%)',
            borderColor: 'hsl(34 30% 95% / 0.08)',
          }}
        >
          <div className="container py-3 md:py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: 'hsl(32 35% 62%)' }}
                />
                <p
                  className="font-sans text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.22em] md:tracking-[0.28em] truncate"
                  style={{ color: 'hsl(34 30% 95% / 0.75)' }}
                >
                  <span style={{ color: 'hsl(32 35% 62%)' }}>Booking now</span>
                  <span className="hidden sm:inline"> — {label}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-5 shrink-0">
                <Link
                  href={href}
                  data-cursor="link"
                  className="group inline-flex items-center gap-1.5 font-sans text-[0.6rem] md:text-[0.62rem] uppercase tracking-[0.22em] transition-colors hover:text-gold"
                  style={{ color: 'hsl(34 30% 95% / 0.75)' }}
                >
                  <span className="hidden sm:inline">{cta}</span>
                  <span className="sm:hidden">Book</span>
                  <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <button
                  type="button"
                  onClick={dismiss}
                  data-cursor="link"
                  aria-label="Dismiss"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-ivory/5"
                  style={{ color: 'hsl(34 30% 95% / 0.5)' }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
