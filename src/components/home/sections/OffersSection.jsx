'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SplitText } from '@/components/reactbits/SplitText'
import { Eyebrow } from '@/components/motion/Eyebrow'
import { SERVICES as ALL_SERVICES } from '@/lib/content'

const EASE = [0.22, 1, 0.36, 1]

// Four showcase services for the home page — indices from the full SERVICES list
const SERVICE_TAGS = ['Most requested', 'Destinations: 40+', 'Bespoke', 'Sangeet & more']
const HOME_SERVICE_INDICES = [0, 1, 2, 3]

const SERVICES = HOME_SERVICE_INDICES.map((idx, i) => ({
  ...ALL_SERVICES[idx],
  tag: SERVICE_TAGS[i],
  tone: i % 2 === 0 ? 'cream' : 'ivory',
}))

function ServiceRow({ service, flip, i }) {
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
  )

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[80vh] md:min-h-screen`}
    >
      {/* Image half */}
      <div className="relative w-full md:w-1/2 overflow-hidden min-h-[50vh] md:min-h-0">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-[-10%] will-change-transform"
            data-cursor="media"
          >
            <img
              src={service.src}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.2) brightness(0.92)' }}
            />
            {/* Numeral overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display italic select-none"
                style={{ fontSize: '24vw', color: 'hsl(34 30% 95% / 0.18)', lineHeight: 1 }}
              >
                {service.num}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text half */}
      <div
        className={`relative w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:py-24 ${flip ? 'md:pl-20 md:pr-24 xl:pl-24 xl:pr-32' : 'md:pl-20 md:pr-16 xl:pl-24 xl:pr-24'}`}
        style={{ backgroundColor: flip ? 'hsl(33 32% 90%)' : 'hsl(34 30% 95%)' }}
      >
        <div className="max-w-lg">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="font-sans text-[0.6rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              {service.tag}
            </span>
          </motion.div>

          {/* Numeral + Title */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, ease: EASE }}
            >
              <p
                className="font-display italic text-7xl md:text-8xl leading-none mb-3"
                style={{ color: 'hsl(32 31% 51% / 0.25)' }}
              >
                {service.num}
              </p>
            </motion.div>
          </div>

          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, delay: 0.06, ease: EASE }}
            >
              <h3
                className="font-display text-5xl md:text-6xl xl:text-7xl tracking-[-0.02em] leading-[0.95]"
                style={{ color: 'hsl(24 12% 10%)' }}
              >
                {service.title}
              </h3>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="font-display italic text-xl text-gold mb-6"
          >
            {service.sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="font-sans font-light text-base leading-relaxed mb-10"
            style={{ color: 'hsl(24 12% 10% / 0.65)' }}
          >
            {service.copy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          >
            <Link
              href="/services"
              data-cursor="link"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="font-sans text-xs uppercase tracking-wider transition-colors duration-500 group-hover:text-gold"
                style={{ color: 'hsl(24 12% 10% / 0.7)' }}
              >
                Learn more
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'hsl(24 12% 10% / 0.4)' }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function OffersSection() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div
        className="container py-20 md:py-28 flex flex-col md:flex-row md:items-end justify-between gap-8"
        style={{ backgroundColor: 'hsl(34 30% 95%)' }}
      >
        <div>
          <Eyebrow tone="gold" className="mb-6">Experiences</Eyebrow>
          <SplitText
            as="h2"
            by="words"
            text="What we celebrate."
            accentWords={['celebrate']}
            className="block font-display font-light text-[10vw] md:text-[6vw] tracking-[-0.02em] leading-[0.95]"
            style={{ color: 'hsl(24 12% 10%)' }}
          />
        </div>
        <p
          className="font-sans font-light text-base leading-relaxed max-w-xs"
          style={{ color: 'hsl(24 12% 10% / 0.6)' }}
        >
          Every engagement begins differently. Every one ends the same way — with a celebration that felt inevitable.
        </p>
      </div>

      {/* Service rows */}
      {SERVICES.map((s, i) => (
        <ServiceRow key={s.num} service={s} flip={i % 2 !== 0} i={i} />
      ))}
    </section>
  )
}
