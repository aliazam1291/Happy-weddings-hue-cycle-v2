'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { ease } from '@/lib/motion'
import { SERVICES } from '@/lib/content'
import { IMAGES } from '@/lib/images'

export function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Services"
        title="Everything,"
        accent="under one roof."
        subtitle="From the invitation to the last special effect — we plan, design and run every part of the celebration so you are present for what matters."
        image={IMAGES.services[0]}
      />

      <section className="w-full">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.num} service={s} flip={i % 2 !== 0} />
        ))}
      </section>
    </main>
  )
}

function ServiceRow({ service, flip }) {
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[70vh] md:min-h-[88vh]`}
    >
      {/* Image */}
      <div className="relative w-full md:w-1/2 overflow-hidden min-h-[44vh] md:min-h-0">
        <motion.div style={{ y: imgY }} className="absolute inset-[-10%] will-change-transform" data-cursor="media">
          <img src={service.src} alt={service.title} className="w-full h-full object-cover" style={{ filter: 'saturate(0.88) brightness(0.96)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display italic select-none" style={{ fontSize: '22vw', color: 'hsl(34 30% 95% / 0.16)', lineHeight: 1 }}>
              {service.num}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center px-7 py-16 md:px-16 lg:px-20 xl:px-24"
        style={{ backgroundColor: flip ? 'hsl(33 32% 90%)' : 'hsl(34 30% 95%)' }}
      >
        <div className="max-w-lg">
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: ease.editorial }}
              className="font-display italic text-6xl md:text-7xl leading-none mb-2"
              style={{ color: 'hsl(32 31% 51% / 0.28)' }}
            >
              {service.num}
            </motion.p>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, delay: 0.05, ease: ease.editorial }}
              className="font-display text-4xl md:text-5xl xl:text-6xl tracking-[-0.02em] leading-[0.98]"
              style={{ color: 'hsl(24 12% 10%)' }}
            >
              {service.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.18, ease: ease.editorial }}
            className="font-display italic text-xl text-gold mb-5"
          >
            {service.sub}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.28, ease: ease.editorial }}
            className="font-sans font-light text-base leading-relaxed mb-9"
            style={{ color: 'hsl(24 12% 10% / 0.66)' }}
          >
            {service.copy}
          </motion.p>
          <Link href="/contact" data-cursor="link" className="group inline-flex items-center gap-3">
            <span className="font-sans text-xs uppercase tracking-wider transition-colors duration-500 group-hover:text-gold" style={{ color: 'hsl(24 12% 10% / 0.7)' }}>
              Enquire about this
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'hsl(24 12% 10% / 0.4)' }} />
          </Link>
        </div>
      </div>
    </div>
  )
}
