'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { navItems } from './landingData'

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Make the navbar background more opaque and drop shadow appear when scrolling
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(248, 244, 233, 0)', 'rgba(245, 241, 232, 0.9)'] // Transparent to Bone glassy
  )
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  )
  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ['1px solid rgba(201, 166, 107, 0)', '1px solid rgba(201, 166, 107, 0.15)']
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.08)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header 
      style={{ backgroundColor, backdropFilter, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-24 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="font-display text-2xl md:text-3xl text-[#0E0E10] tracking-tight hover:text-[#C9A66B] transition-colors duration-300" href="#top" aria-label="Happy Weddings home">
        Happy Weddings
      </a>
      <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
        {navItems.map((item, i) => (
          <motion.a 
            key={item.href} 
            href={item.href}
            className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0E0E10] hover:text-[#C9A66B] transition-colors duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>
    </motion.header>
  )
}
