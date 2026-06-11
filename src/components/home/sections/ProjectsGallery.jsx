'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { IMAGES, img } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1]

/**
 * "Our Projects" — an editorial parallax gallery with a filter bar.
 * Three columns drift at different speeds as you scroll. Filter chips
 * (All · Theme · Destination · Classic · Sangeet) re-shard the flat item
 * list into the columns and animate the re-layout. Single column on mobile.
 */
const ITEMS = [
  { src: img('proj-theme-1', 900, 1200), label: 'Theme Wedding', place: 'Indore', type: 'Theme' },
  { src: IMAGES.stories[0].src, label: 'Destination', place: 'Udaipur', type: 'Destination' },
  { src: img('proj-classic-1', 900, 1100), label: 'Classic Indian', place: 'Indore', type: 'Classic' },
  { src: IMAGES.services[1], label: 'Sangeet Night', place: 'Goa', type: 'Sangeet' },
  { src: img('proj-theme-2', 900, 1300), label: 'Theme Wedding', place: 'Jaipur', type: 'Theme' },
  { src: IMAGES.journal[1], label: 'Varmala', place: 'Indore', type: 'Classic' },
  { src: img('proj-dest-2', 900, 1150), label: 'Destination', place: 'Kerala', type: 'Destination' },
  { src: IMAGES.services[2], label: 'Décor & Lighting', place: 'Indore', type: 'Sangeet' },
  { src: img('proj-classic-2', 900, 1250), label: 'Ring Ceremony', place: 'Bhopal', type: 'Classic' },
]

const FILTERS = ['All', 'Theme', 'Destination', 'Classic', 'Sangeet']
const COLUMN_SPEEDS = [0.14, -0.1, 0.1]

export function ProjectsGallery() {
  const [filter, setFilter] = useState('All')

  // Re-shard the filtered list into three balanced columns.
  const columns = useMemo(() => {
    const filtered = filter === 'All' ? ITEMS : ITEMS.filter((i) => i.type === filter)
    const out = [[], [], []]
    filtered.forEach((item, i) => out[i % 3].push(item))
    return out
  }, [filter])

  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      {/* Header */}
      <div className="container mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
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

      {/* Filter chips */}
      <div className="container mb-10 md:mb-14 -mx-2 md:mx-0 overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap items-center gap-2.5 md:gap-3 px-2 md:px-0">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                data-cursor="link"
                className="relative shrink-0 inline-flex items-center font-sans text-[0.65rem] md:text-xs uppercase tracking-[0.22em] px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-400 ease-editorial"
                style={{
                  color: active ? 'hsl(34 30% 95%)' : 'hsl(24 12% 10% / 0.7)',
                }}
              >
                {active && (
                  <motion.span
                    layoutId="filter-chip"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'hsl(24 12% 10%)' }}
                    transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Parallax columns */}
      <LayoutGroup>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 items-start">
          {columns.map((col, ci) => (
            <ParallaxLayer
              key={ci}
              speed={COLUMN_SPEEDS[ci]}
              className={[
                'flex flex-col gap-5 md:gap-7',
                ci === 1 ? 'lg:mt-16' : '',
                ci === 2 ? 'lg:mt-8 hidden sm:flex' : '',
              ].join(' ')}
            >
              <AnimatePresence mode="popLayout">
                {col.map((item) => (
                  <motion.div
                    key={item.src}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <GalleryTile item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ParallaxLayer>
          ))}
        </div>
      </LayoutGroup>

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
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{ background: 'linear-gradient(180deg, transparent 45%, hsl(28 30% 22% / 0.5) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ background: 'hsl(34 40% 60% / 0.25)' }}
        />
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
        <div className="absolute left-5 right-5 bottom-4 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial bg-gold/60" />
      </ImageReveal>
    </Link>
  )
}
