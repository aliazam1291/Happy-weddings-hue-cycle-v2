'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { ease } from '@/lib/motion'
import { PROJECTS } from '@/lib/content'
import { IMAGES } from '@/lib/images'

// split projects across three columns for the parallax grid
const COLS = [[], [], []]
PROJECTS.forEach((p, i) => COLS[i % 3].push(p))
const SPEEDS = [0.12, -0.1, 0.1]

export function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Projects"
        title="Celebrations that capture"
        accent="the imagination."
        subtitle="Theme, destination and classic Indian weddings — each one staged as its own world. A selection of recent work."
        image={IMAGES.stories[0].src}
      />

      <section className="relative w-full overflow-hidden py-16 md:py-24" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 items-start">
          {COLS.map((col, ci) => (
            <ParallaxLayer
              key={ci}
              speed={SPEEDS[ci]}
              className={`flex flex-col gap-5 md:gap-7 ${ci === 1 ? 'lg:mt-16' : ''} ${ci === 2 ? 'lg:mt-8 hidden sm:flex' : ''}`}
            >
              {col.map((p) => (
                <Tile key={p.id} p={p} />
              ))}
            </ParallaxLayer>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="w-full py-24 text-center" style={{ backgroundColor: 'hsl(33 32% 90%)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: ease.editorial }}
          className="font-display font-light tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'hsl(24 12% 10%)' }}
        >
          Imagine yours with us.
        </motion.h2>
        <Link href="/contact" data-cursor="link" className="mt-8 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.22em] px-9 py-4 border border-ink/30 text-ink hover:bg-gold hover:border-gold hover:text-ivory transition-all duration-500">
          Start a conversation
          <span>→</span>
        </Link>
      </section>
    </main>
  )
}

function Tile({ p }) {
  return (
    <Link href="/contact" data-cursor="media" className="group relative block overflow-hidden">
      <ImageReveal src={p.src} alt={`${p.title} — ${p.place}`} className="w-full" imgClassName="transition-transform duration-1000 ease-editorial group-hover:scale-[1.05]" style={{ aspectRatio: '4 / 5' }}>
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: 'linear-gradient(180deg, transparent 45%, hsl(28 30% 22% / 0.5) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-ivory/70 mb-1">{p.type} · {p.place}</p>
          <p className="font-display text-xl md:text-2xl text-ivory leading-none">{p.title}</p>
        </div>
        <ArrowUpRight className="absolute top-5 right-5 h-4 w-4 text-ivory/0 group-hover:text-gold transition-all duration-500" />
      </ImageReveal>
    </Link>
  )
}
