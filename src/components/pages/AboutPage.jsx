'use client'

import { motion } from 'framer-motion'
import { PageHero } from '@/components/pages/PageHero'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { RevealOnView } from '@/components/motion/RevealOnView'
import { ease } from '@/lib/motion'
import { ABOUT, BRAND, WEDDING_TYPES } from '@/lib/content'
import { IMAGES as IMG } from '@/lib/images'

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

      {/* Mission / Vision */}
      <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <RevealOnView>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] mb-6" style={{ color: 'hsl(32 31% 46%)' }}>
              — Our mission
            </p>
            <p className="font-display text-2xl md:text-3xl leading-[1.3] tracking-[-0.01em]" style={{ color: 'hsl(24 12% 10%)' }}>
              {ABOUT.mission}
            </p>
          </RevealOnView>
          <RevealOnView delay={0.12}>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] mb-6" style={{ color: 'hsl(32 31% 46%)' }}>
              — Our vision
            </p>
            <p className="font-display text-2xl md:text-3xl leading-[1.3] tracking-[-0.01em]" style={{ color: 'hsl(24 12% 10%)' }}>
              {ABOUT.vision}
            </p>
          </RevealOnView>
        </div>
      </section>

      {/* Founder — portrait + bio */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: 'hsl(34 33% 83%)' }}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="relative lg:w-[45%] overflow-hidden min-h-[55vh] lg:min-h-0">
            <ParallaxLayer speed={0.16} className="absolute inset-[-12%]">
              <img src={IMG.founder} alt={`${BRAND.founder}, ${BRAND.founderRole}`} data-cursor="media" className="h-full w-full object-cover" style={{ filter: 'saturate(0.9) brightness(0.95)' }} />
            </ParallaxLayer>
            <p className="absolute bottom-6 left-6 font-sans text-[0.6rem] uppercase tracking-widest" style={{ color: 'hsl(24 12% 10% / 0.55)' }}>
              {BRAND.founder} · {BRAND.founderRole}
            </p>
          </div>

          <div className="relative lg:w-[55%] flex flex-col justify-center px-7 py-20 md:px-16 lg:px-20 xl:px-28">
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] mb-8" style={{ color: 'hsl(32 31% 46%)' }}>
              — The founder
            </p>
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: ease.editorial }}
              className="border-l-2 pl-6 mb-10"
              style={{ borderColor: 'hsl(32 31% 51% / 0.6)' }}
            >
              <p className="font-display italic text-2xl md:text-3xl leading-relaxed" style={{ color: 'hsl(24 12% 10% / 0.85)' }}>
                &ldquo;{ABOUT.quote}&rdquo;
              </p>
            </motion.blockquote>
            <RevealOnView>
              <p className="font-sans font-light text-base leading-relaxed max-w-md" style={{ color: 'hsl(24 12% 10% / 0.7)' }}>
                {ABOUT.founderBio}
              </p>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* What we're known for */}
      <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container py-20 md:py-28">
          <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] mb-12 text-center" style={{ color: 'hsl(32 31% 46%)' }}>
            — What we are known for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'hsl(24 12% 10% / 0.08)' }}>
            {WEDDING_TYPES.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: ease.editorial }}
                className="flex flex-col items-center text-center py-14 px-8"
                style={{ backgroundColor: 'hsl(34 30% 95%)' }}
              >
                <span className="font-display italic text-5xl mb-4" style={{ color: 'hsl(32 31% 51% / 0.4)' }}>
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color: 'hsl(24 12% 10%)' }}>{t.title}</h3>
                <p className="font-sans font-light text-sm leading-relaxed max-w-xs" style={{ color: 'hsl(24 12% 10% / 0.6)' }}>{t.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
