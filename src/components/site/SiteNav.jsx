'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { NAV } from '@/lib/content'

export function SiteNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // On home page: navbar appears after arch scroll (3200px)
    // On other pages: navbar is always visible
    const isHome = pathname === '/'
    if (!isHome) {
      setScrolled(true)
      return
    }
    
    // Desktop runs the 3200px pinned arch scroll; mobile shows a static hero
    // (~one viewport), so reveal the nav after the hero on each.
    const fn = () => {
      const threshold = window.innerWidth < 1024 ? window.innerHeight * 0.85 : 3200
      setScrolled(window.scrollY > threshold)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [pathname])

  // Hero artwork is light (sky) — ink type reads everywhere
  const lightMode = false
  const textClass = lightMode ? 'text-ivory/90' : 'text-ink/80'
  const logoAccent = lightMode ? 'text-gold' : 'text-gold'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-editorial',
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-ink/5 opacity-100'
            : 'pointer-events-none opacity-0',
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
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative font-sans text-[0.68rem] uppercase tracking-wider transition-colors duration-500',
                    textClass,
                    active ? 'opacity-100' : 'hover:opacity-100 opacity-80',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ease-editorial',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              )
            })}
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
              Enquire
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
