'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/lib/images'
import { Eyebrow } from '@/components/motion/Eyebrow'

const EASE = [0.22, 1, 0.36, 1]

export function FounderSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1.12, 1])

  // Mouse-parallax: portrait image drifts gently with horizontal cursor
  const mouseXMV = useMotionValue(0)
  const portraitX = useSpring(mouseXMV, { stiffness: 55, damping: 18 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left - rect.width / 2) / rect.width
    mouseXMV.set(nx * 18)
  }
  const handleMouseLeave = () => mouseXMV.set(0)

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'hsl(34 33% 83%)' }}
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left — portrait */}
        <div className="relative lg:w-[45%] overflow-hidden min-h-[60vh] lg:min-h-0">
          <motion.div
            style={{ y: imgY, scale: imgScale, x: portraitX }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="w-full h-full relative" data-cursor="media">
              <img
                src={IMAGES.founder}
                alt="Shruti Jain, Founder of Happy Weddings"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-ink/15" />
              <p className="absolute bottom-6 right-6 font-sans text-[0.62rem] uppercase tracking-widest text-ivory/60 z-10">
                Shruti Jain · Founder
              </p>
            </div>
          </motion.div>

        </div>

        {/* Right — editorial text */}
        <div className="relative lg:w-[55%] flex flex-col justify-center px-8 py-20 md:py-28 lg:px-20 xl:px-28">
          <Eyebrow tone="gold" className="mb-10">The House</Eyebrow>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: '108%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="font-display font-light text-5xl md:text-6xl xl:text-7xl tracking-[-0.02em] leading-[0.95]"
              style={{ color: 'hsl(24 12% 10%)' }}
            >
              A quiet conviction,
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: '108%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
              className="font-display italic text-5xl md:text-6xl xl:text-7xl tracking-[-0.02em] leading-[0.95]"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              since 2013.
            </motion.h2>
          </div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="border-l-2 pl-6 mb-10"
            style={{ borderColor: 'hsl(32 31% 51% / 0.6)' }}
          >
            <p className="font-display italic text-xl md:text-2xl leading-relaxed" style={{ color: 'hsl(24 12% 10% / 0.8)' }}>
              &ldquo;A wedding should look like the people inside it — not like a wedding.&rdquo;
            </p>
          </motion.blockquote>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
            className="font-sans font-light text-base leading-relaxed mb-12 max-w-md"
            style={{ color: 'hsl(24 12% 10% / 0.74)' }}
          >
            Shruti Jain founded Happy Weddings in 2013 with one belief: that the people planning the most important day of your life should be artists first, operators second. Thirteen years later, that belief has shaped over 350 celebrations across India and the world.
          </motion.p>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            <Link
              href="/about"
              data-cursor="link"
              className="group inline-flex items-center gap-3"
            >
              <span className="font-display italic text-2xl border-b border-gold/50 pb-0.5 group-hover:border-gold transition-colors duration-500" style={{ color: 'hsl(24 12% 10% / 0.8)' }}>
                The full story
              </span>
              <ArrowUpRight className="h-5 w-5 text-gold transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
