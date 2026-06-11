'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { Ornament } from '@/components/motion/Ornament'
import { ease } from '@/lib/motion'
import { SERVICES } from '@/lib/content'
import { IMAGES } from '@/lib/images'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/* Dummy enriched data layered on top of the existing SERVICES array.
   Replace with CRM data when ready. */
const SERVICE_META = {
  '01': {
    highlights: ['Custom invitation suites', 'Welcome kits & gifts', 'Full entertainment roster', 'MC & compere', 'Live music & DJ'],
    duration: '12–18 months',
    best_for: 'Large celebrations',
  },
  '02': {
    highlights: ['Floral & foliage design', 'Mandap & stage styling', 'Table centrepieces', 'Ambient & accent lighting', 'Installation art'],
    duration: '6–8 months',
    best_for: 'Couples with a strong vision',
  },
  '03': {
    highlights: ['PA & stage systems', 'LED video walls', 'Live streaming', 'Drone photography', 'Backup power & contingency'],
    duration: '3–6 months',
    best_for: 'Any size event',
  },
  '04': {
    highlights: ['Curated caterer shortlisting', 'Tasting sessions', 'Multi-cuisine menus', 'Bar & beverage service', 'Dietary accommodations'],
    duration: '4–6 months',
    best_for: 'Food-forward celebrations',
  },
  '05': {
    highlights: ['Sangeet night programming', 'Bride & groom choreography', 'Family group routines', 'Professional rehearsals', 'Performance styling'],
    duration: '2–4 months',
    best_for: 'Sangeet-focused weddings',
  },
  '06': {
    highlights: ['Flight & train bookings', 'Hotel room blocks', 'Airport transfers', 'Luggage logistics', 'Local ground transport'],
    duration: '4–8 months',
    best_for: 'Destination weddings',
  },
  '07': {
    highlights: ['Cold pyro & sparklers', 'Fog & haze effects', 'Petal showers', 'Confetti cannons', 'Fire acts (licensed)'],
    duration: '1–2 months add-on',
    best_for: 'Any ceremony moment',
  },
}

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Free consultation',
    body: 'A one-hour call — no pitch, no pressure. We listen to your vision, ask the questions the internet won\'t, and tell you honestly what is possible.',
  },
  {
    num: '02',
    title: 'Tailored proposal',
    body: 'Within five working days we send a written proposal: scope, indicative budget ranges, and a timeline. Transparent from the first page.',
  },
  {
    num: '03',
    title: 'Planning & vendor selection',
    body: 'We manage every vendor conversation — shortlisting, negotiating, contracting. You see the options; we do the legwork.',
  },
  {
    num: '04',
    title: 'On-the-day execution',
    body: 'Our team is on-site from setup to strike. You and your family are guests at your own wedding.',
  },
]

export function ServicesPage() {
  return (
    <TooltipProvider delayDuration={120}>
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Everything,"
          accent="under one roof."
          subtitle="From the invitation to the last special effect — we plan, design and run every part of the celebration so you are present for what matters."
          image={IMAGES.services[0]}
        />

        {/* Service rows */}
        <section className="w-full">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} service={s} flip={i % 2 !== 0} />
          ))}
        </section>

        <ProcessSection />

        <CtaBand />
      </main>
    </TooltipProvider>
  )
}

/* ── Service row — alternating image/text, deep editorial spacing ── */
function ServiceRow({ service, flip }) {
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const meta = SERVICE_META[service.num]

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[70vh] md:min-h-[90vh]`}
    >
      {/* Image half */}
      <div className="relative w-full md:w-1/2 overflow-hidden min-h-[50vw] md:min-h-0">
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-[-10%] will-change-transform"
          data-cursor="media"
        >
          <img
            src={service.src}
            alt={service.title}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.88) brightness(0.96)' }}
          />
          {/* Giant ghost number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-display italic select-none"
              style={{ fontSize: '22vw', color: 'hsl(34 30% 95% / 0.16)', lineHeight: 1 }}
            >
              {service.num}
            </span>
          </div>
          {/* Duration badge — floats bottom-right on the image */}
          {meta && (
            <div className="absolute bottom-5 right-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="inline-flex items-center font-sans text-[0.58rem] uppercase tracking-[0.26em] px-3 py-1.5 cursor-default"
                    style={{ backgroundColor: 'hsl(34 30% 95% / 0.92)', color: 'hsl(24 12% 10%)' }}
                  >
                    {meta.duration}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Recommended planning lead-time</TooltipContent>
              </Tooltip>
            </div>
          )}
        </motion.div>
      </div>

      {/* Text half */}
      <div
        className="relative w-full md:w-1/2 flex flex-col justify-center px-7 py-16 md:px-14 lg:px-20 xl:px-24"
        style={{ backgroundColor: flip ? 'hsl(33 32% 90%)' : 'hsl(34 30% 95%)' }}
      >
        <div className="max-w-lg">
          {/* Number + badge row */}
          <div className="flex items-start justify-between mb-2">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: ease.editorial }}
                className="font-display italic leading-none"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: 'hsl(32 31% 51% / 0.28)' }}
              >
                {service.num}
              </motion.p>
            </div>
            {meta && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: ease.editorial }}
              >
                <Badge variant="gold" size="sm">{meta.best_for}</Badge>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.95, delay: 0.05, ease: ease.editorial }}
              className="font-display tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', color: 'hsl(24 12% 10%)' }}
            >
              {service.title}
            </motion.h2>
          </div>

          {/* Italic sub */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease: ease.editorial }}
            className="font-display italic text-lg md:text-xl text-gold mb-5"
          >
            {service.sub}
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.25, ease: ease.editorial }}
            className="font-sans font-light text-base leading-relaxed mb-8"
            style={{ color: 'hsl(24 12% 10% / 0.66)' }}
          >
            {service.copy}
          </motion.p>

          {/* Highlights — shadcn Accordion */}
          {meta && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35, ease: ease.editorial }}
              className="mb-10"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="highlights" className="border-b-0">
                  <AccordionTrigger
                    className="py-3 text-xs uppercase tracking-widest hover:no-underline"
                    style={{ color: 'hsl(24 12% 10% / 0.55)', fontSize: '0.65rem' }}
                  >
                    What's included
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <ul className="space-y-2 pt-1">
                      {meta.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 mt-0.5"
                            style={{ color: 'hsl(32 31% 51%)' }}
                          />
                          <span
                            className="font-sans text-sm leading-relaxed"
                            style={{ color: 'hsl(24 12% 10% / 0.7)' }}
                          >
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator tone="gold" className="mt-3" />
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.45, ease: ease.editorial }}
          >
            <Link href="/contact" data-cursor="link" className="group inline-flex items-center gap-3">
              <span
                className="font-sans text-xs uppercase tracking-wider transition-colors duration-500 group-hover:text-gold"
                style={{ color: 'hsl(24 12% 10% / 0.7)' }}
              >
                Enquire about this
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-500 ease-editorial group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'hsl(24 12% 10% / 0.4)' }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── How we work — 4-step process, asymmetric quadrant ────────── */
function ProcessSection() {
  return (
    <section
      className="w-full py-24 md:py-40"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: ease.editorial }}
            >
              <Badge variant="outline" size="sm" className="border-ivory/30 text-ivory/60 mb-6">
                How we work
              </Badge>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '108%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.0, ease: ease.editorial }}
                className="font-display font-light leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', color: 'hsl(34 30% 95%)' }}
              >
                Four steps from{' '}
                <span className="italic" style={{ color: 'hsl(32 35% 62%)' }}>
                  hello to done.
                </span>
              </motion.h2>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: ease.editorial }}
              className="font-sans font-light text-base leading-relaxed"
              style={{ color: 'hsl(34 30% 95% / 0.55)' }}
            >
              We work with a fixed number of couples each year so we can give every celebration the attention it deserves. Here is what working with us looks like.
            </motion.p>
          </div>
        </div>

        {/* Steps grid — offset rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ backgroundColor: 'hsl(34 30% 95% / 0.06)' }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: ease.editorial }}
              className={`flex flex-col p-8 md:p-10 ${i % 2 === 1 ? 'lg:translate-y-10' : ''}`}
              style={{ backgroundColor: 'hsl(24 12% 10%)' }}
            >
              <p
                className="font-display italic mb-6 leading-none"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'hsl(32 35% 62% / 0.35)' }}
              >
                {step.num}
              </p>
              <h3
                className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.15] mb-4"
                style={{ color: 'hsl(34 30% 95%)' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans font-light text-sm leading-relaxed mt-auto"
                style={{ color: 'hsl(34 30% 95% / 0.55)' }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Bottom CTA band — ivory background, editorial negative space ─ */
function CtaBand() {
  return (
    <section
      className="w-full py-24 md:py-40 border-t"
      style={{
        backgroundColor: 'hsl(34 30% 95%)',
        borderColor: 'hsl(24 12% 10% / 0.08)',
      }}
    >
      <div className="container">
        <Ornament className="mb-16 md:mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="lg:col-span-7 lg:col-start-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: ease.editorial }}
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — Book a free consultation
            </motion.p>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '108%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.0, ease: ease.editorial }}
                className="font-display font-light tracking-[-0.02em] leading-[0.95] text-balance"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', color: 'hsl(24 12% 10%)' }}
              >
                Let's plan a wedding that{' '}
                <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                  captures the imagination.
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease: ease.editorial }}
              className="font-sans font-light text-base leading-relaxed max-w-lg"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              The first conversation is free, no-obligation, and one hour long. We will tell you what is possible, what it will cost, and whether we are the right team for your celebration.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3, ease: ease.editorial }}
            className="lg:col-span-3 lg:col-start-10 flex flex-col gap-4"
          >
            <Button asChild variant="ink" size="lg" shape="soft">
              <Link href="/contact">
                Book a consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="default" size="lg" shape="soft">
              <Link href="/projects">
                View our work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <p
              className="font-sans text-[0.58rem] uppercase tracking-[0.22em] mt-2"
              style={{ color: 'hsl(24 12% 10% / 0.45)' }}
            >
              We take on a limited number of weddings each year
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
