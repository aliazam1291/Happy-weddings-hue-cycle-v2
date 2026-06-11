'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ChevronDown, MessageCircle, Sparkles, X } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { Ornament } from '@/components/motion/Ornament'
import { ease } from '@/lib/motion'
import { SERVICES, PROJECTS, BUDGET_SAMPLE, CONTACT } from '@/lib/content'
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ProjectDialog } from '@/components/projects/ProjectDialog'
import { SeasonStrip } from '@/components/site/SeasonStrip'

/* Maps each service to a flagship project that demonstrates it.
   Lets us cross-link from the Services page into the ProjectDialog. */
const SERVICE_PROJECT_LINK = {
  '01': 'theme-indore',         // Production & Entertainment → Theme wedding
  '02': 'palace-jaipur',        // Décor & Lighting → Heritage palette
  '03': 'lakeside-udaipur',     // Technical & Production → Destination logistics
  '04': 'classic-bhopal',       // Food & Beverages → Classic feasts
  '05': 'sangeet-goa',          // Choreography → Sangeet on the beach
  '06': 'lakeside-udaipur',     // Travel & Logistics → Destination travel
  '07': 'theme-indore',         // Special Effects → Theme reveal
}

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
  const [openProject, setOpenProject] = useState(null)

  const openProjectById = (id) => {
    const p = PROJECTS.find((x) => x.id === id)
    if (p) setOpenProject(p)
  }

  return (
    <TooltipProvider delayDuration={120}>
      <main>
        <SeasonStrip />
        <PageHero
          eyebrow="Our Services"
          title="Everything,"
          accent="under one roof."
          subtitle="From the invitation to the last special effect — we plan, design and run every part of the celebration so you are present for what matters."
          image={IMAGES.services[0]}
        />

        <ServiceNavStrip />

        {/* Service rows */}
        <section className="w-full">
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.num}
              service={s}
              flip={i % 2 !== 0}
              onSeeInAction={openProjectById}
            />
          ))}
        </section>

        <BudgetAnatomy />

        <ProcessSection />

        <CtaBand />

        {/* Sticky "Tailor my package" floating CTA */}
        <TailorMyPackagePill />

        {/* Project quick-view dialog (cross-link from service rows) */}
        <ProjectDialog
          project={openProject}
          open={!!openProject}
          onOpenChange={(v) => !v && setOpenProject(null)}
        />
      </main>
    </TooltipProvider>
  )
}

/* ── Sticky service number strip under the hero ─────────────────── */
function ServiceNavStrip() {
  const onJump = (num) => {
    const el = document.getElementById(`service-${num}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
  return (
    <section
      className="w-full sticky top-20 md:top-24 z-30 border-b backdrop-blur-md"
      style={{
        backgroundColor: 'hsl(34 30% 95% / 0.88)',
        borderColor: 'hsl(24 12% 10% / 0.06)',
      }}
    >
      <div className="container py-3 md:py-4 -mx-4 md:mx-0">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex flex-nowrap items-center gap-5 md:gap-8 px-4 md:px-0">
            <p
              className="shrink-0 font-sans text-[0.58rem] uppercase tracking-[0.32em] hidden md:block"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              Jump to —
            </p>
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s.num}
                onClick={() => onJump(s.num)}
                data-cursor="link"
                className="group shrink-0 inline-flex items-center gap-2 py-2 transition-colors duration-300"
                style={{ color: 'hsl(24 12% 10% / 0.7)' }}
              >
                <span
                  className="font-display italic text-base"
                  style={{ color: 'hsl(32 31% 51%)' }}
                >
                  {s.num}
                </span>
                <span className="font-sans text-[0.62rem] uppercase tracking-[0.22em] group-hover:text-gold transition-colors duration-300">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Floating "Tailor my package" pill + Sheet ─────────────────── */
function TailorMyPackagePill() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          data-cursor="link"
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3.5 shadow-2xl transition-all duration-500 ease-editorial hover:scale-[1.03]"
          style={{
            backgroundColor: 'hsl(24 12% 10%)',
            color: 'hsl(34 30% 95%)',
          }}
          aria-label="Tailor my package"
        >
          <Sparkles className="h-4 w-4" style={{ color: 'hsl(32 35% 62%)' }} />
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.24em]">
            Tailor my package
          </span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto p-7 md:p-9">
        <TailorMyPackageForm onSent={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

function TailorMyPackageForm({ onSent }) {
  const [picks, setPicks] = useState({})
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')

  const togglePick = (num) =>
    setPicks((p) => ({ ...p, [num]: !p[num] }))

  const selected = SERVICES.filter((s) => picks[s.num])
  const waNumber = (CONTACT.phones[0] || '+91 88271-88884').replace(/[^\d]/g, '')

  const buildLink = () => {
    const list = selected.map((s) => `• ${s.title}`).join('\n')
    const msg = `Hi Happy Weddings, I would like to tailor a package.\n\nServices I'm interested in:\n${list || '• (no services picked yet)'}\n\nMy contact: ${phone || '(not given)'}\nEvent date: ${date || '(flexible)'}`
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div>
      <SheetHeader className="mb-6">
        <SheetTitle className="font-display font-light tracking-[-0.01em]" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2rem)' }}>
          Tailor your celebration.
        </SheetTitle>
        <SheetDescription
          className="font-sans font-light text-sm"
          style={{ color: 'hsl(24 12% 10% / 0.6)' }}
        >
          Pick the services you'd like to talk about. We'll WhatsApp you back with a tailored proposal — no long form, no waiting.
        </SheetDescription>
      </SheetHeader>

      <p
        className="font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-3"
        style={{ color: 'hsl(32 31% 46%)' }}
      >
        — Services
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {SERVICES.map((s) => {
          const active = picks[s.num]
          return (
            <button
              type="button"
              key={s.num}
              onClick={() => togglePick(s.num)}
              data-cursor="link"
              className="inline-flex items-center gap-1.5 px-3 py-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] transition-colors duration-300"
              style={{
                backgroundColor: active ? 'hsl(24 12% 10%)' : 'transparent',
                color: active ? 'hsl(34 30% 95%)' : 'hsl(24 12% 10% / 0.75)',
                border: `1px solid ${active ? 'transparent' : 'hsl(24 12% 10% / 0.15)'}`,
              }}
            >
              <span className="font-display italic" style={{ color: active ? 'hsl(32 35% 62%)' : 'hsl(32 31% 51%)' }}>
                {s.num}
              </span>
              {s.title.replace(/ &.*$/, '').replace(/ \(.*$/, '')}
            </button>
          )
        })}
      </div>

      <p
        className="font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-3"
        style={{ color: 'hsl(32 31% 46%)' }}
      >
        — Your details
      </p>
      <div className="flex flex-col gap-4 mb-8">
        <Input
          type="tel"
          placeholder="Your phone (with country code)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Event date or window (e.g. Dec 2026)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <a
        href={buildLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setTimeout(onSent, 300)}
        data-cursor="link"
        className="group flex items-center justify-center gap-2.5 w-full py-4 font-sans text-[0.7rem] uppercase tracking-[0.24em] transition-colors duration-500"
        style={{ backgroundColor: 'hsl(32 31% 51%)', color: 'hsl(34 30% 95%)' }}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp my picks
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>

      <p
        className="mt-5 font-sans text-[0.58rem] uppercase tracking-[0.22em] text-center"
        style={{ color: 'hsl(24 12% 10% / 0.45)' }}
      >
        {selected.length} {selected.length === 1 ? 'service' : 'services'} selected · We reply within 24 hours
      </p>
    </div>
  )
}

/* ── Budget anatomy preview ────────────────────────────────────── */
function BudgetAnatomy() {
  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: ease.editorial }}
            className="lg:col-span-5"
          >
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — Budget anatomy
            </p>
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[0.98] mb-6"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', color: 'hsl(24 12% 10%)' }}
            >
              Where the{' '}
              <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                money goes.
              </span>
            </h2>
            <p
              className="font-sans font-light text-base leading-relaxed mb-6 max-w-md"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              An indicative breakdown for {BUDGET_SAMPLE.headline.toLowerCase()}. Real numbers differ by city, season and scope — this is a starting point for the conversation.
            </p>
            <p
              className="font-display italic text-2xl mb-8"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              {BUDGET_SAMPLE.total}
            </p>
            <a
              href={`https://wa.me/${(CONTACT.phones[0] || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hi Happy Weddings, please share the full budget breakdown PDF.')}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-3"
            >
              <span
                className="font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-500 group-hover:text-gold"
                style={{ color: 'hsl(24 12% 10% / 0.75)' }}
              >
                WhatsApp us for the full PDF
              </span>
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: ease.editorial, delay: 0.1 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            {/* Horizontal stacked bar — pure CSS */}
            <div
              className="flex h-12 md:h-14 w-full overflow-hidden"
              style={{ border: '1px solid hsl(24 12% 10% / 0.1)' }}
            >
              {BUDGET_SAMPLE.segments.map((seg) => (
                <Tooltip key={seg.label}>
                  <TooltipTrigger asChild>
                    <div
                      style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
                      className="transition-opacity duration-300 hover:opacity-80 cursor-help"
                      aria-label={`${seg.label}: ${seg.pct}%`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {seg.label} · {seg.pct}%
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {BUDGET_SAMPLE.segments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span
                    className="font-sans text-[0.7rem]"
                    style={{ color: 'hsl(24 12% 10% / 0.75)' }}
                  >
                    {seg.label}
                  </span>
                  <span
                    className="ml-auto font-sans text-[0.7rem] tabular-nums"
                    style={{ color: 'hsl(24 12% 10% / 0.5)' }}
                  >
                    {seg.pct}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Service row — alternating image/text, deep editorial spacing ── */
function ServiceRow({ service, flip, onSeeInAction }) {
  const rowRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const meta = SERVICE_META[service.num]
  const linkedProjectId = SERVICE_PROJECT_LINK[service.num]

  return (
    <div
      ref={rowRef}
      id={`service-${service.num}`}
      className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[70vh] md:min-h-[90vh] scroll-mt-32`}
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.45, ease: ease.editorial }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
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
            {linkedProjectId && onSeeInAction && (
              <button
                type="button"
                onClick={() => onSeeInAction(linkedProjectId)}
                data-cursor="link"
                className="group inline-flex items-center gap-3"
              >
                <span
                  className="font-sans text-xs uppercase tracking-wider transition-colors duration-500 group-hover:text-gold"
                  style={{ color: 'hsl(32 31% 51%)' }}
                >
                  See it in a wedding →
                </span>
              </button>
            )}
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
