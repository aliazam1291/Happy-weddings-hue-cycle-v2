'use client'

import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SplitTextReveal } from '@/components/motion/SplitTextReveal'
import { RevealOnView } from '@/components/motion/RevealOnView'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Marquee } from '@/components/motion/Marquee'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { NumberCounter } from '@/components/motion/NumberCounter'
import { Placeholder } from '@/components/motion/Placeholder'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

/**
 * Sprint 1 preview — exercises every foundation primitive so the brand
 * direction (palette · type · motion · spacing) can be judged before the
 * full 10-section Home is built.
 */
export function FoundationPreview() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          Hero — cinematic, with split-text + parallax label
          ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        {/* Background placeholder — replace with hero film/photo */}
        <Placeholder label="Hero" tone="beige" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-ivory/0 to-ivory/40" />

        {/* Eyebrow + name in top corner */}
        <div className="absolute top-28 md:top-32 left-0 right-0 container flex items-center justify-between">
          <p className="eyebrow text-ink/60">Designing weddings · since 2013</p>
          <p className="eyebrow text-ink/60 hidden md:block">Estd. 2013 · 350+ weddings</p>
        </div>

        {/* Headline */}
        <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
          <div className="container">
            <SplitTextReveal
              as="h1"
              className="font-display text-display-xl text-ink tracking-editorial text-balance leading-[0.95]"
              stagger={0.08}
              duration={1.05}
            >
              A named house.
            </SplitTextReveal>
            <SplitTextReveal
              as="h1"
              className="font-display italic text-display-xl text-gold tracking-editorial text-balance leading-[0.95] -mt-2 md:-mt-4"
              stagger={0.08}
              delay={0.35}
              duration={1.05}
            >
              Designed with intention.
            </SplitTextReveal>

            <RevealOnView delay={1} className="mt-10 max-w-md">
              <p className="font-sans font-light text-ink/70 text-base md:text-lg leading-relaxed">
                Happy Weddings by Shruti Jain — twelve years of crafting
                celebrations that feel timeless, intentional, emotional.
              </p>
            </RevealOnView>
          </div>
        </div>

        {/* Scroll cue */}
        <ParallaxLayer speed={-0.15} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 text-ink/50">
            <span className="eyebrow">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </ParallaxLayer>
      </section>

      {/* ────────────────────────────────────────────────────────────
          Brand introit — Cormorant statement, image left
          ──────────────────────────────────────────────────────────── */}
      <section className="section bg-ivory">
        <div className="container grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <ImageReveal
              src=""
              className="aspect-[3/4] w-full"
              imgClassName="bg-cream"
            >
              <Placeholder label="Studio" tone="cream" className="absolute inset-0" />
            </ImageReveal>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-start-7 lg:col-span-6">
            <p className="eyebrow-gold mb-8">— The studio</p>
            <SplitTextReveal
              as="h2"
              className="font-display text-display-md text-ink tracking-editorial text-balance"
              stagger={0.05}
            >
              Twelve years. Three hundred and fifty weddings. One quiet conviction —
              that a celebration should look like the people inside it.
            </SplitTextReveal>

            <RevealOnView delay={0.4} className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              <Stat value={350} suffix="+" label="Weddings" />
              <Stat value={12} suffix=" yrs" label="Designing" />
              <Stat value={40} suffix="+" label="Destinations" />
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          Editorial marquee — gold + terracotta punctuation
          ──────────────────────────────────────────────────────────── */}
      <section className="section-tight bg-cream border-y border-ink/5">
        <Marquee duration={50}>
          {['Weddings', 'Editorial', 'Destinations', 'Bespoke', 'Curation'].map((w, i) => (
            <span
              key={i}
              className="font-display italic text-[10vw] leading-none text-ink/85 px-6 md:px-10"
            >
              {w}
              <span className="text-terracotta not-italic">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ────────────────────────────────────────────────────────────
          Service preview grid — hover image reveals
          ──────────────────────────────────────────────────────────── */}
      <section className="section bg-ivory">
        <div className="container">
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <div className="max-w-xl">
              <p className="eyebrow-gold mb-6">— Practice</p>
              <SplitTextReveal
                as="h2"
                className="font-display text-display-md text-ink tracking-editorial text-balance"
              >
                Four ways we work.
              </SplitTextReveal>
            </div>
            <Link
              href="/services"
              data-cursor="link"
              className="group inline-flex items-center gap-2 eyebrow text-ink/70 hover:text-gold transition-colors"
            >
              All services
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
            {[
              ['Full planning', 'A two-year companionship from idea to first dance.'],
              ['Destination', 'A house already in your destination city, ready when you arrive.'],
              ['Design & décor', 'Sets, florals, paper, lighting — a single eye across all of it.'],
              ['Curation', 'Vendors, music, menus, attire — a edit of the very best.'],
            ].map(([title, copy], i) => (
              <RevealOnView
                key={title}
                delay={i * 0.08}
                className="bg-ivory p-10 md:p-14 group hover:bg-cream transition-colors duration-700 ease-editorial"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-display italic text-gold text-2xl">0{i + 1}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ease-editorial" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-ink tracking-editorial mb-4">
                  {title}
                </h3>
                <p className="font-sans font-light text-ink/65 leading-relaxed max-w-sm">
                  {copy}
                </p>
              </RevealOnView>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          FAQ — accordion proof
          ──────────────────────────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="container grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow-gold mb-6">— Frequently asked</p>
            <SplitTextReveal
              as="h2"
              className="font-display text-display-sm text-ink tracking-editorial text-balance"
            >
              Questions, gently answered.
            </SplitTextReveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Accordion type="single" collapsible defaultValue="q1">
              <AccordionItem value="q1">
                <AccordionTrigger>How early should we reach out?</AccordionTrigger>
                <AccordionContent>
                  Twelve to eighteen months is the sweet spot. For destinations, two
                  years is not unusual.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Do you work outside India?</AccordionTrigger>
                <AccordionContent>
                  Yes — Italy, Greece, Turkey, the UAE, Thailand and the Maldives are
                  familiar. New geographies welcome.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>What does an engagement look like?</AccordionTrigger>
                <AccordionContent>
                  A first conversation, a written brief, a season of design, and a
                  production team that arrives ahead of you and leaves after.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          CTA — magnetic button, terracotta punctuation
          ──────────────────────────────────────────────────────────── */}
      <section className="section bg-ivory">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="eyebrow-gold mb-8">— Begin</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-display-lg text-ink tracking-editorial text-balance"
            stagger={0.07}
          >
            Tell us about the celebration.
          </SplitTextReveal>
          <RevealOnView delay={0.4} className="mt-4">
            <p className="font-display italic text-2xl md:text-3xl text-terracotta">
              We listen first.
            </p>
          </RevealOnView>
          <RevealOnView delay={0.7} className="mt-12">
            <MagneticButton>
              <Button asChild variant="ink" size="lg" shape="pill">
                <Link href="/contact">Begin a conversation</Link>
              </Button>
            </MagneticButton>
          </RevealOnView>
        </div>
      </section>

      {/* Foundation note */}
      <section className="bg-ivory pb-16">
        <div className="container">
          <div className="rule mb-6" />
          <p className="eyebrow text-ink/40 text-center">
            Sprint 1 · foundation preview · type · palette · motion primitives
          </p>
        </div>
      </section>
    </>
  )
}

function Stat({ value, suffix, label }) {
  return (
    <div>
      <p className="font-display text-gold text-4xl md:text-5xl leading-none">
        <NumberCounter to={value} suffix={suffix} />
      </p>
      <p className="mt-2 eyebrow text-ink/55">{label}</p>
    </div>
  )
}
