'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { IMAGES, img } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1]

/**
 * "Our Projects" — an editorial parallax gallery. Three columns drift at
 * different speeds as you scroll, so the images feel layered and blend into
 * the cream ground. Collapses to a single column on mobile with gentler motion.
 *
 * Real brand framing: theme · destination · classic Indian weddings.
 */
const COLUMNS = [
  {
    speed: 0.14,
    items: [
      { src: img('proj-theme-1', 900, 1200), label: 'Theme Wedding', place: 'Indore' },
      { src: IMAGES.stories[0].src, label: 'Destination', place: 'Udaipur' },
      { src: img('proj-classic-1', 900, 1100), label: 'Classic Indian', place: 'Indore' },
    ],
  },
  {
    speed: -0.1,
    items: [
      { src: IMAGES.services[1], label: 'Sangeet Night', place: 'Goa' },
      { src: img('proj-theme-2', 900, 1300), label: 'Theme Wedding', place: 'Jaipur' },
      { src: IMAGES.journal[1], label: 'Varmala', place: 'Indore' },
    ],
  },
  {
    speed: 0.1,
    items: [
      { src: img('proj-dest-2', 900, 1150), label: 'Destination', place: 'Kerala' },
      { src: IMAGES.services[2], label: 'Décor & Lighting', place: 'Indore' },
      { src: img('proj-classic-2', 900, 1250), label: 'Ring Ceremony', place: 'Bhopal' },
    ],
  },
]

export function ProjectsGallery() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      {/* Header */}
      <div className="container mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-6"
            style={{ color: 'hsl(32 31% 46%)' }}
          >
            — Our Projects
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '108%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.0, ease: EASE }}
              className="font-display font-light leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', color: 'hsl(24 12% 10%)' }}
            >
              Weddings that capture{' '}
              <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>the imagination.</span>
            </motion.h2>
          </div>
        </div>
        <Link
          href="/projects"
          data-cursor="link"
          className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider transition-colors duration-500 hover:text-gold shrink-0"
          style={{ color: 'hsl(24 12% 10% / 0.6)' }}
        >
          View all projects
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Parallax columns */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 items-start">
        {COLUMNS.map((col, ci) => (
          <ParallaxLayer
            key={ci}
            speed={col.speed}
            className={[
              'flex flex-col gap-5 md:gap-7',
              // nudge middle/last columns down so the drift reads as staggered depth
              ci === 1 ? 'lg:mt-16' : '',
              ci === 2 ? 'lg:mt-8 hidden sm:flex' : '',
            ].join(' ')}
          >
            {col.items.map((item, ii) => (
              <GalleryTile key={ii} item={item} />
            ))}
          </ParallaxLayer>
        ))}
      </div>

      {/* soft top/bottom blend into the cream ground */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: 'linear-gradient(to bottom, hsl(33 32% 90%), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: 'linear-gradient(to top, hsl(33 32% 90%), transparent)' }}
      />
    </section>
  )
}

function GalleryTile({ item }) {
  return (
    <Link href="/projects" data-cursor="media" className="group relative block overflow-hidden">
      <ImageReveal
        src={item.src}
        alt={`${item.label} — ${item.place}`}
        className="w-full"
        imgClassName="transition-transform duration-1000 ease-editorial group-hover:scale-[1.05]"
        style={{ aspectRatio: '4 / 5' }}
      >
        {/* warm wash so photos sit in the brand palette */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{ background: 'linear-gradient(180deg, transparent 45%, hsl(28 30% 22% / 0.5) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ background: 'hsl(34 40% 60% / 0.25)' }}
        />
        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between">
          <div>
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-ivory/70 mb-1">
              {item.place}
            </p>
            <p className="font-display text-xl md:text-2xl text-ivory leading-none">
              {item.label}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-ivory/0 group-hover:text-gold transition-all duration-500 translate-x-2 group-hover:translate-x-0" />
        </div>
        {/* hover underline */}
        <div className="absolute left-5 right-5 bottom-4 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial bg-gold/60" />
      </ImageReveal>
    </Link>
  )
}
