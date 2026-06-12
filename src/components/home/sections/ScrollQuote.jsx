'use client'

import { RevealOnView } from '@/components/motion/RevealOnView'
import { ScrollTextFill } from '@/components/motion/ScrollTextFill'
import { Ornament } from '@/components/motion/Ornament'

const QUOTE =
  'We believe a wedding should feel like stepping into a world created just for you — where traditions dance with modernity, where every corner tells a story, and where every guest becomes part of something unforgettable.'

/**
 * Full-width dark section with a scroll-driven word-fill quote.
 * Each word transitions from near-invisible to fully lit as the reader
 * scrolls through — accent words illuminate in gold.
 */
export function ScrollQuote() {
  return (
    <section
      className="relative w-full overflow-hidden py-28 md:py-44"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      {/* Ghost closing quotation mark — purely decorative */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden pr-[4vw] pb-[1vw]"
      >
        <span
          className="font-display italic leading-none"
          style={{ fontSize: '48vw', color: 'hsl(34 30% 95% / 0.022)' }}
        >
          &rdquo;
        </span>
      </div>

      <div className="container relative z-10">
        <RevealOnView className="text-center mb-12 md:mb-16">
          <p
            className="font-sans text-[0.6rem] uppercase tracking-[0.36em]"
            style={{ color: 'hsl(32 35% 62%)' }}
          >
            — On every wedding we create
          </p>
        </RevealOnView>

        <ScrollTextFill
          as="p"
          className="font-display font-light text-center text-balance leading-[1.25] mx-auto max-w-5xl"
          style={{ fontSize: 'clamp(1.65rem, 3.5vw, 3.2rem)' }}
          dim="hsl(34 30% 95% / 0.14)"
          bright="hsl(34 30% 95%)"
          accent="hsl(32 35% 62%)"
          accentWords={['traditions', 'story', 'unforgettable', 'world']}
          start="top 75%"
          end="bottom 25%"
        >
          {QUOTE}
        </ScrollTextFill>

        <Ornament tone="ivory" className="mt-14 md:mt-20" />
      </div>
    </section>
  )
}
