'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, MapPin, Users } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { Ornament } from '@/components/motion/Ornament'
import { TiltCard } from '@/components/motion/TiltCard'
import { ease } from '@/lib/motion'
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/content'
import { IMAGES } from '@/lib/images'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectDialog } from '@/components/projects/ProjectDialog'
import { SeasonStrip } from '@/components/site/SeasonStrip'

export function ProjectsPage() {
  const [cat, setCat] = useState('All')
  const [openProject, setOpenProject] = useState(null)

  const filtered = useMemo(
    () => (cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.type === cat)),
    [cat],
  )

  // Pull a flagship to insert as a wide editorial break
  const flagship = useMemo(() => PROJECTS.find((p) => p.featured), [])

  return (
    <main>
      <SeasonStrip />
      <PageHero
        eyebrow="Our Projects"
        title="Celebrations that capture"
        accent="the imagination."
        subtitle="Theme, destination and classic Indian weddings — each one staged as its own world. A selection of recent work."
        image={IMAGES.stories[0].src}
      />

      {/* Category filter — sticky tabs */}
      <section
        className="w-full sticky top-20 md:top-24 z-30 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'hsl(34 30% 95% / 0.85)',
          borderColor: 'hsl(24 12% 10% / 0.06)',
        }}
      >
        <div className="container py-3 md:py-4 -mx-4 md:mx-0">
          <div className="flex items-center justify-between gap-6">
            <Tabs value={cat} onValueChange={setCat} className="flex-1 min-w-0">
              <div className="overflow-x-auto no-scrollbar">
                <TabsList className="flex flex-nowrap gap-6 md:gap-10 border-b-0 px-4 md:px-0">
                  {PROJECT_CATEGORIES.map((c) => (
                    <TabsTrigger
                      key={c}
                      value={c}
                      className="shrink-0 py-3 md:py-4 tracking-[0.22em]"
                    >
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
            <p
              className="hidden md:block shrink-0 font-sans text-[0.58rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(24 12% 10% / 0.5)' }}
            >
              {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full py-16 md:py-24" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container">
          <LayoutGroup id="projects-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-y-20">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: ease.editorial }}
                    /* Offset rhythm */
                    className={
                      i % 3 === 1
                        ? 'lg:-translate-y-12'
                        : i % 3 === 2
                          ? 'lg:translate-y-8'
                          : ''
                    }
                  >
                    <ProjectTile project={p} onOpen={() => setOpenProject(p)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p
                className="font-display italic text-2xl"
                style={{ color: 'hsl(24 12% 10% / 0.5)' }}
              >
                Nothing in this category yet — try another.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Flagship feature band */}
      {flagship && cat === 'All' && (
        <FeatureBand project={flagship} onOpen={() => setOpenProject(flagship)} />
      )}

      {/* Foot CTA */}
      <CtaBand />

      {/* Dialog */}
      <ProjectDialog
        project={openProject}
        open={!!openProject}
        onOpenChange={(v) => !v && setOpenProject(null)}
      />
    </main>
  )
}

/* ── Tile ──────────────────────────────────────────────────────── */
function ProjectTile({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="media"
      className="group block text-left w-full"
    >
      <TiltCard intensity={5} glare={false} perspective={1200} scale={1.015}>
        <div
          className="relative overflow-hidden mb-5"
          style={{ aspectRatio: '4 / 5' }}
        >
          <img
            src={project.src}
            alt={`${project.title} — ${project.place}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
            style={{ filter: 'saturate(0.88) brightness(0.96)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{ background: 'linear-gradient(180deg, transparent 50%, hsl(28 30% 22% / 0.55) 100%)' }}
          />
          {/* Type chip */}
          <span
            className="absolute top-4 left-4 inline-flex items-center font-sans text-[0.56rem] uppercase tracking-[0.28em] px-2.5 py-1"
            style={{ backgroundColor: 'hsl(34 30% 95% / 0.92)', color: 'hsl(24 12% 10%)' }}
          >
            {project.type}
          </span>
          {/* Year */}
          <span
            className="absolute top-4 right-4 font-sans text-[0.56rem] uppercase tracking-[0.28em]"
            style={{ color: 'hsl(34 30% 95% / 0.7)' }}
          >
            {project.year}
          </span>
          {/* Footer block on image */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-3">
            <div>
              <p
                className="font-sans text-[0.56rem] uppercase tracking-[0.22em] mb-1"
                style={{ color: 'hsl(34 30% 95% / 0.75)' }}
              >
                {project.place}
              </p>
              <p
                className="font-display text-lg md:text-xl leading-[1.15]"
                style={{ color: 'hsl(34 30% 95%)' }}
              >
                {project.title}
              </p>
            </div>
            <ArrowUpRight
              className="h-4 w-4 transition-all duration-500 ease-editorial group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: 'hsl(34 30% 95% / 0.7)' }}
            />
          </div>
        </div>
      </TiltCard>
      {/* Below-image meta */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.22em]"
          style={{ color: 'hsl(24 12% 10% / 0.55)' }}
        >
          <Users className="h-3 w-3" />
          {project.stats?.guests} guests
        </span>
        <span
          className="font-sans text-[0.6rem] uppercase tracking-[0.22em] transition-colors group-hover:text-gold"
          style={{ color: 'hsl(24 12% 10% / 0.55)' }}
        >
          Open the story →
        </span>
      </div>
    </button>
  )
}

/* ── Flagship feature band ─────────────────────────────────────── */
function FeatureBand({ project, onOpen }) {
  return (
    <section
      className="w-full py-20 md:py-32"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      <div className="container">
        <Ornament className="mb-12 md:mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: ease.editorial }}
            className="lg:col-span-7 relative"
          >
            <button
              type="button"
              onClick={onOpen}
              data-cursor="media"
              className="group block w-full overflow-hidden"
              style={{ aspectRatio: '5 / 4' }}
            >
              <img
                src={project.gallery?.[0] || project.src}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
                style={{ filter: 'saturate(0.88) brightness(0.95)' }}
              />
              <span
                className="absolute top-5 left-5 inline-flex items-center font-sans text-[0.58rem] uppercase tracking-[0.28em] px-3 py-1.5"
                style={{ backgroundColor: 'hsl(34 30% 95%)', color: 'hsl(24 12% 10%)' }}
              >
                Flagship · {project.type}
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: ease.editorial, delay: 0.1 }}
            className="lg:col-span-5 lg:pl-2 lg:pt-6"
          >
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              {project.year} · {project.stats.city}
            </p>
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[0.98] mb-6"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', color: 'hsl(24 12% 10%)' }}
            >
              {project.title}
            </h2>
            <p
              className="font-display italic text-lg md:text-xl leading-snug mb-6"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              {project.brief}
            </p>
            <p
              className="font-sans font-light text-base leading-relaxed mb-8"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              {project.outcome}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.vendors?.slice(0, 3).map((v) => (
                <Badge key={v} variant="outline" size="sm">{v}</Badge>
              ))}
              {project.vendors?.length > 3 && (
                <Badge variant="outline" size="sm">+{project.vendors.length - 3} more</Badge>
              )}
            </div>

            <button
              type="button"
              onClick={onOpen}
              data-cursor="link"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-500 group-hover:text-gold"
                style={{ color: 'hsl(24 12% 10% / 0.75)' }}
              >
                Read the case study
              </span>
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Foot CTA ──────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section
      className="w-full py-24 md:py-40"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <Ornament className="mb-12 md:mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="lg:col-span-7 lg:col-start-2">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — Imagine yours with us
            </p>
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[0.95] text-balance"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', color: 'hsl(24 12% 10%)' }}
            >
              Your celebration deserves a world{' '}
              <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                of its own.
              </span>
            </h2>
            <p
              className="mt-8 max-w-lg font-sans font-light text-base leading-relaxed"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              Tell us your date, your guest count and one thing you don't want at your wedding. We will reply within twenty-four hours.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-3">
            <Button asChild variant="ink" size="lg" shape="soft">
              <Link href="/contact">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="default" size="lg" shape="soft">
              <Link href="/services">
                See our services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
