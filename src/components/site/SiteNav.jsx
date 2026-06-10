'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

const NAV = [
  { href: '/experiences', label: 'Experiences' },
  { href: '/stories', label: 'Stories' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/house', label: 'House' },
  { href: '/journal', label: 'Journal' },
]

export function SiteNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // On the homepage the nav stays hidden through the pinned arch-portal hero
    // (~3200px of scroll) and slides in once you've stepped through it.
    // On every other page it behaves as a normal sticky nav.
    const revealAt = isHome ? 3000 : 60
    const fn = () => {
      const y = window.scrollY
      setRevealed(y > revealAt)
      setScrolled(y > 60)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [isHome])

  // Hero artwork is light (sky) — ink type reads everywhere
  const lightMode = false
  const textClass = lightMode ? 'text-ivory/90' : 'text-ink/80'
  const logoAccent = lightMode ? 'text-gold' : 'text-gold'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-editorial',
          revealed
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none',
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-ink/5'
            : 'bg-transparent',
        )}
      >
        <div className="container flex items-center justify-between h-20 md:h-24">
          <Link
            href="/"
            data-cursor="link"
            className={cn('font-display text-xl md:text-2xl tracking-editorial leading-none transition-colors duration-700', textClass)}
          >
            Happy{' '}
            <span className={cn('italic', logoAccent)}>Weddings</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="link"
                className={cn(
                  'group relative font-sans text-[0.68rem] uppercase tracking-wider transition-colors duration-500',
                  textClass,
                  'hover:opacity-100 opacity-80',
                )}
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-editorial group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              data-cursor="link"
              className={cn(
                'hidden md:inline-flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-wider px-6 py-3 border transition-all duration-500',
                lightMode
                  ? 'border-ivory/40 text-ivory hover:bg-ivory hover:text-ink'
                  : 'border-ink/30 text-ink hover:bg-ink hover:text-ivory',
              )}
            >
              Begin
            </Link>

            <button
              data-cursor="link"
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className={cn(
                'md:hidden inline-flex h-11 w-11 items-center justify-center border transition-all duration-500',
                lightMode ? 'border-ivory/30 text-ivory' : 'border-ink/20 text-ink',
              )}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-ink flex flex-col"
          >
            <div className="container flex items-center justify-between h-20 md:h-24">
              <Link href="/" onClick={() => setOpen(false)} className="font-display text-xl text-ivory italic text-gold">
                Happy <span className="italic text-gold">Weddings</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                data-cursor="link"
                className="inline-flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="container flex-1 flex flex-col justify-center gap-0.5 -mt-16">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 py-4 border-b border-ivory/10"
                  >
                    <span className="font-sans text-xs text-gold/70 w-6">0{i + 1}</span>
                    <span className="font-display text-5xl sm:text-6xl text-ivory tracking-editorial group-hover:text-gold transition-colors duration-500">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="container pb-12">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 font-display italic text-2xl text-ivory border-b border-gold/40 pb-1"
              >
                Start a Conversation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
