'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, X, Award } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { RevealOnView } from '@/components/motion/RevealOnView'
import { Ornament } from '@/components/motion/Ornament'
import { TiltCard } from '@/components/motion/TiltCard'
import { SpotlightCard } from '@/components/reactbits/SpotlightCard'
import { SplitText } from '@/components/reactbits/SplitText'
import { CountUp } from '@/components/reactbits/CountUp'
import { FlipCard } from '@/components/reactbits/FlipCard'
import { Marquee } from '@/components/motion/Marquee'
import { ease } from '@/lib/motion'
import { PlaceholderCover } from '@/components/motion/PlaceholderCover'
import { ABOUT, BRAND, WEDDING_TYPES, TEAM, MILESTONES, AWARDS, PRESS, IMPACT } from '@/lib/content'
import { IMAGES as IMG } from '@/lib/images'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { CallbackCard } from '@/components/site/CallbackCard'

export function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow={ABOUT.eyebrow}
        title="A named house,"
        accent={`since ${BRAND.since}.`}
        subtitle={`${BRAND.name} is among the most prominent wedding planning houses in ${BRAND.city} — designing celebrations that are lively, colourful and ever-remembering.`}
        image={IMG.statement}
      />

      <Manifesto />
      <JourneyTimeline />
      <FounderBlock />
      <FamilySection />
      <AwardsAndPress />
      <KnownFor />
      <ClosingCTA />
    </main>
  )
}

/* ── 1. Manifesto — interactive philosophy selector + animated stats ─ */
const BELIEFS = [
  { id: 'mission', label: 'Our mission', body: ABOUT.mission },
  { id: 'vision', label: 'Our vision', body: ABOUT.vision },
  { id: 'luxury', label: 'On luxury', body: ABOUT.differentiation },
]

const STATS = [
  { to: IMPACT.years, suffix: '', label: 'Years of practice', sub: `Since ${BRAND.since}` },
  { to: IMPACT.weddings, suffix: '+', label: 'Celebrations & events', sub: 'Verified to date' },
  { to: IMPACT.cities, suffix: '+', label: 'Cities & destinations', sub: 'Across India & abroad' },
  { to: AWARDS.length, suffix: '', label: 'Industry honours', sub: '2015 — 2025' },
]

function Manifesto() {
  const [active, setActive] = useState(0)
  const belief = BELIEFS[active]

  return (
    <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
      <div className="container py-24 md:py-36">
        <p
          className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-12 md:mb-16"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          — Our manifesto
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left: interactive belief selector */}
          <div className="lg:col-span-4">
            <p
              className="font-display italic leading-snug max-w-[16ch] mb-10 md:mb-12"
              style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', color: 'hsl(24 12% 10% / 0.6)' }}
            >
              What we believe a wedding should feel like.
            </p>
            <ul>
              {BELIEFS.map((b, i) => (
                <li key={b.id}>
                  <button
                    type="button"
                    data-cursor="link"
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="relative flex w-full items-baseline gap-4 py-4 pl-5 text-left"
                  >
                    {active === i && (
                      <motion.span
                        layoutId="belief-bar"
                        className="absolute left-0 top-1 bottom-1 w-[2px]"
                        style={{ backgroundColor: 'hsl(32 31% 51%)' }}
                        transition={{ duration: 0.4, ease: ease.editorial }}
                      />
                    )}
                    <span
                      className="font-display italic text-sm w-7 shrink-0 transition-colors duration-300"
                      style={{ color: active === i ? 'hsl(32 31% 51%)' : 'hsl(24 12% 10% / 0.3)' }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="font-display tracking-[-0.01em] transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                        color: active === i ? 'hsl(24 12% 10%)' : 'hsl(24 12% 10% / 0.4)',
                      }}
                    >
                      {b.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: selected belief + founder quote */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="min-h-[16rem] md:min-h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={belief.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: ease.editorial }}
                  className="font-display font-light tracking-[-0.01em] leading-[1.2]"
                  style={{ fontSize: 'clamp(1.35rem, 2.5vw, 2.05rem)', color: 'hsl(24 12% 10%)' }}
                >
                  {belief.body}
                </motion.p>
              </AnimatePresence>
            </div>

            <Ornament className="my-12" />

            <RevealOnView delay={0.1}>
              <blockquote className="border-l-2 pl-6" style={{ borderColor: 'hsl(32 31% 51%)' }}>
                <p
                  className="font-display italic leading-snug"
                  style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', color: 'hsl(32 31% 51%)' }}
                >
                  &ldquo;{ABOUT.quote}&rdquo;
                </p>
                <footer
                  className="mt-4 font-sans text-[0.62rem] uppercase tracking-[0.28em]"
                  style={{ color: 'hsl(24 12% 10% / 0.5)' }}
                >
                  — {BRAND.founder}, {BRAND.founderRole}
                </footer>
              </blockquote>
            </RevealOnView>
          </div>
        </div>

        {/* Animated stats strip — counts up on scroll */}
        <div
          className="mt-20 md:mt-28 pt-12 md:pt-16 border-t"
          style={{ borderColor: 'hsl(24 12% 10% / 0.1)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease.editorial }}
                className="text-center lg:text-left"
              >
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  className="block font-display font-light leading-none"
                  style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', color: 'hsl(32 31% 51%)' }}
                />
                <p
                  className="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.26em]"
                  style={{ color: 'hsl(24 12% 10%)' }}
                >
                  {s.label}
                </p>
                <p className="mt-1 font-display italic text-sm" style={{ color: 'hsl(24 12% 10% / 0.45)' }}>
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Journey — vertical timeline with a scroll-fill gold rail ──── */
function JourneyTimeline() {
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 80%'],
  })
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="w-full" style={{ backgroundColor: 'hsl(33 32% 90%)' }}>
      <div className="container py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — The journey
            </p>
            <SplitText
              as="h2"
              by="words"
              text="Thirteen years, in chapters."
              accentWords={['in', 'chapters']}
              className="block font-display font-light tracking-[-0.02em] leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)]"
              style={{ color: 'hsl(24 12% 10%)' }}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <RevealOnView delay={0.1}>
              <p
                className="font-sans font-light text-base leading-relaxed"
                style={{ color: 'hsl(24 12% 10% / 0.65)' }}
              >
                We didn't set out to be the biggest planner in central India. We set out to be the most considered. Here are the thirteen years that shaped the studio.
              </p>
            </RevealOnView>
          </div>
        </div>

        {/* Timeline with a gold rail that fills as you scroll */}
        <div ref={railRef} className="relative pl-7 md:pl-12">
          {/* Rail track + fill */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'hsl(24 12% 10% / 0.12)' }}
          >
            <motion.div
              className="absolute left-0 top-0 w-px origin-top"
              style={{ height: '100%', scaleY: fillScale, backgroundColor: 'hsl(32 31% 51%)' }}
            />
          </div>

          <Accordion type="single" collapsible defaultValue="m-0" className="border-t" style={{ borderColor: 'hsl(24 12% 10% / 0.1)' }}>
            {MILESTONES.map((m, i) => (
              <AccordionItem key={m.year} value={`m-${i}`}>
                <AccordionTrigger className="py-7 md:py-8">
                  <span className="flex items-baseline gap-6 md:gap-10">
                    <span
                      className="font-display italic shrink-0"
                      style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'hsl(32 31% 51%)' }}
                    >
                      {m.year}
                    </span>
                    <span className="font-display tracking-[-0.01em]" style={{ color: 'hsl(24 12% 10%)' }}>
                      {m.title}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-0 md:pl-32 pr-0 md:pr-24">
                  <p
                    className="font-sans font-light text-base leading-relaxed max-w-2xl"
                    style={{ color: 'hsl(24 12% 10% / 0.7)' }}
                  >
                    {m.body}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

/* ── 3. Founder block — portrait + bio + signature ─────────────── */
function FounderBlock() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: 'hsl(34 33% 83%)' }}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="relative lg:w-[45%] overflow-hidden min-h-[55vh] lg:min-h-0">
          <ParallaxLayer speed={0.16} className="absolute inset-[-12%]">
            <PlaceholderCover seed="shruti-jain" label="Shruti Jain" />
          </ParallaxLayer>
          <p
            className="absolute bottom-6 left-6 font-sans text-[0.6rem] uppercase tracking-widest"
            style={{ color: 'hsl(24 12% 10% / 0.55)' }}
          >
            {BRAND.founder} · {BRAND.founderRole}
          </p>
        </div>

        <div className="relative lg:w-[55%] flex flex-col justify-center px-7 py-20 md:px-16 lg:px-20 xl:px-28">
          <p
            className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-8"
            style={{ color: 'hsl(32 31% 46%)' }}
          >
            — The founder
          </p>

          <RevealOnView>
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'hsl(24 12% 10%)' }}
            >
              {BRAND.founder}.
            </h2>
            <p
              className="font-sans font-light text-base md:text-lg leading-relaxed max-w-lg mb-10"
              style={{ color: 'hsl(24 12% 10% / 0.72)' }}
            >
              {ABOUT.founderBio}
            </p>
          </RevealOnView>

          {/* Signature row */}
          <RevealOnView delay={0.15}>
            <div className="flex items-center gap-6 mt-4">
              <div
                className="h-px flex-1 max-w-[6.25rem]"
                style={{ backgroundColor: 'hsl(32 31% 51% / 0.5)' }}
              />
              <p
                className="font-display italic"
                style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2rem)', color: 'hsl(32 31% 51%)' }}
              >
                — Shruti
              </p>
            </div>
            <p
              className="mt-2 font-sans text-[0.58rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(24 12% 10% / 0.5)' }}
            >
              Founder · still on every wedding day
            </p>
          </RevealOnView>
        </div>
      </div>
    </section>
  )
}

/* ── 4. The family — 4 team cards in 2x2 quadrant ──────────────── */
function FamilySection() {
  const [openMember, setOpenMember] = useState(null)

  return (
    <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
      <div className="container py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div className="lg:col-span-6">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — The family
            </p>
            <SplitText
              as="h2"
              by="words"
              text="Fewer than twenty — by design."
              accentWords={['by', 'design']}
              className="block font-display font-light tracking-[-0.02em] leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)]"
              style={{ color: 'hsl(24 12% 10%)' }}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <RevealOnView delay={0.1}>
              <p
                className="font-sans font-light text-base leading-relaxed"
                style={{ color: 'hsl(24 12% 10% / 0.65)' }}
              >
                Every wedding is led by someone whose name you will know, whose number you will have, who has personally read your brief. Small team — on purpose.
              </p>
            </RevealOnView>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 lg:gap-x-12 lg:gap-y-20">
          {TEAM.map((m, i) => (
            <motion.button
              type="button"
              key={m.id}
              onClick={() => setOpenMember(m)}
              data-cursor="link"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: ease.editorial }}
              className={`text-left group ${i % 2 === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <TiltCard intensity={4} glare={false} perspective={1200} scale={1.012}>
                <SpotlightCard
                  className="overflow-hidden mb-5"
                  style={{ aspectRatio: '4 / 5' }}
                >
                  <PlaceholderCover
                    seed={m.id}
                    label={m.name}
                    className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply"
                    style={{ background: 'linear-gradient(180deg, transparent 55%, hsl(28 30% 22% / 0.5) 100%)' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p
                      className="font-sans text-[0.56rem] uppercase tracking-[0.22em] mb-1"
                      style={{ color: 'hsl(34 30% 95% / 0.75)' }}
                    >
                      {m.role}
                    </p>
                    <p
                      className="font-display text-xl md:text-2xl leading-[1.15]"
                      style={{ color: 'hsl(34 30% 95%)' }}
                    >
                      {m.name}
                    </p>
                  </div>
                </SpotlightCard>
              </TiltCard>
              <p
                className="font-display italic text-base md:text-lg leading-snug"
                style={{ color: 'hsl(32 31% 51%)' }}
              >
                &ldquo;{m.philosophy}&rdquo;
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <TeamDialog
        member={openMember}
        open={!!openMember}
        onOpenChange={(v) => !v && setOpenMember(null)}
      />
    </section>
  )
}

function TeamDialog({ member, open, onOpenChange }) {
  if (!member) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-ivory shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{ backgroundColor: 'hsl(34 30% 95%)', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <DialogPrimitive.Close
            data-cursor="link"
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:text-gold hover:border-gold transition"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
          <DialogPrimitive.Title className="sr-only">{member.name}</DialogPrimitive.Title>
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 relative" style={{ aspectRatio: '4 / 5', minHeight: '40vh' }}>
              <PlaceholderCover seed={member.id} label={member.name} />
            </div>
            <div className="md:col-span-3 p-8 md:p-10">
              <p
                className="font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-3"
                style={{ color: 'hsl(32 31% 46%)' }}
              >
                {member.role}
              </p>
              <h3
                className="font-display font-light tracking-[-0.02em] leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'hsl(24 12% 10%)' }}
              >
                {member.name}
              </h3>
              <p
                className="font-display italic text-lg md:text-xl leading-snug mb-6"
                style={{ color: 'hsl(32 31% 51%)' }}
              >
                &ldquo;{member.philosophy}&rdquo;
              </p>
              <p
                className="font-sans font-light text-base leading-relaxed"
                style={{ color: 'hsl(24 12% 10% / 0.7)' }}
              >
                {member.note}
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  )
}

/* ── 5. Awards & press ─────────────────────────────────────────── */
function AwardsAndPress() {
  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      <div className="container">
        <div className="text-center mb-14 md:mb-20">
          <p
            className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
            style={{ color: 'hsl(32 35% 62%)' }}
          >
            — Recognised by
          </p>
          <h2
            className="font-display font-light tracking-[-0.02em] leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'hsl(34 30% 95%)' }}
          >
            A house with a{' '}
            <span className="italic" style={{ color: 'hsl(32 35% 62%)' }}>
              reputation.
            </span>
          </h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px mb-16 md:mb-20" style={{ backgroundColor: 'hsl(34 30% 95% / 0.08)' }}>
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: ease.editorial }}
              className="flex flex-col items-center text-center p-8 md:p-10"
              style={{ backgroundColor: 'hsl(24 12% 10%)' }}
            >
              <Award
                className="h-7 w-7 mb-5"
                strokeWidth={0.9}
                style={{ color: 'hsl(32 35% 62%)' }}
              />
              <p
                className="font-display tracking-[-0.01em] mb-2"
                style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', color: 'hsl(34 30% 95%)' }}
              >
                {a.name}
              </p>
              <p
                className="font-sans text-[0.62rem] uppercase tracking-[0.22em] mb-3"
                style={{ color: 'hsl(34 30% 95% / 0.55)' }}
              >
                {a.subtitle}
              </p>
              <p
                className="font-display italic text-sm"
                style={{ color: 'hsl(32 35% 62%)' }}
              >
                {a.year}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Press marquee */}
        <p
          className="text-center font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-6"
          style={{ color: 'hsl(34 30% 95% / 0.5)' }}
        >
          — As featured in
        </p>
        <Marquee duration={45}>
          <div className="flex items-center gap-12 md:gap-20 px-6">
            {PRESS.concat(PRESS).map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-display italic shrink-0"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', color: 'hsl(34 30% 95% / 0.4)' }}
              >
                {p}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

/* ── 6. What we are known for — TiltCard grid ──────────────────── */
function KnownFor() {
  return (
    <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
      <div className="container py-24 md:py-32">
        <p
          className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-10 md:mb-14 text-center"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          — What we are known for
        </p>
        <p
          className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-center mb-8"
          style={{ color: 'hsl(24 12% 10% / 0.4)' }}
        >
          Hover or tap a card to turn it
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {WEDDING_TYPES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: ease.editorial }}
              className={i === 1 ? 'md:-translate-y-8' : ''}
            >
              <FlipCard
                height="clamp(18rem, 26vw, 22rem)"
                front={
                  <div
                    className="flex h-full flex-col items-center justify-center text-center p-10 md:p-12"
                    style={{ backgroundColor: 'hsl(33 32% 90%)' }}
                  >
                    <span
                      className="font-display italic mb-5 leading-none"
                      style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'hsl(32 31% 51% / 0.4)' }}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className="font-display tracking-[-0.01em]"
                      style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: 'hsl(24 12% 10%)' }}
                    >
                      {t.title}
                    </h3>
                    <div className="mt-6 h-px w-12" style={{ backgroundColor: 'hsl(32 31% 51%)' }} />
                  </div>
                }
                back={
                  <div
                    className="flex h-full flex-col items-center justify-center text-center p-10 md:p-12"
                    style={{ backgroundColor: 'hsl(24 12% 10%)' }}
                  >
                    <span
                      className="font-sans text-[0.55rem] uppercase tracking-[0.3em] mb-5"
                      style={{ color: 'hsl(32 35% 62%)' }}
                    >
                      {t.title}
                    </span>
                    <p
                      className="font-display italic leading-snug"
                      style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', color: 'hsl(34 30% 95%)' }}
                    >
                      {t.copy}
                    </p>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 7. Closing CTA ────────────────────────────────────────────── */
function ClosingCTA() {
  return (
    <section
      className="w-full py-24 md:py-36 border-t"
      style={{
        backgroundColor: 'hsl(34 30% 95%)',
        borderColor: 'hsl(24 12% 10% / 0.08)',
      }}
    >
      <div className="container">
        <Ornament className="mb-14 md:mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-6 lg:col-start-2">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — Begin a conversation
            </p>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '108%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.0, ease: ease.editorial }}
                className="font-display font-light tracking-[-0.02em] leading-[0.95] text-balance"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'hsl(24 12% 10%)' }}
              >
                We work with very few couples each year.{' '}
                <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                  By design.
                </span>
              </motion.h2>
            </div>
            <p
              className="font-sans font-light text-base leading-relaxed max-w-lg mb-8"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              If you've read this far, the next step is one phone call. We'll ask three questions, you'll ask any of yours, and we'll both know within an hour if this is the right fit.
            </p>
            <Button asChild variant="ink" size="lg" shape="soft">
              <Link href="/contact">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <CallbackCard
              context="I just read your About page and would like to talk."
              compact
            />
          </div>
        </div>
      </div>
    </section>
  )
}
