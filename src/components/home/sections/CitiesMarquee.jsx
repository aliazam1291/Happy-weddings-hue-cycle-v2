'use client'

import { Marquee } from '@/components/motion/Marquee'

const CITIES = [
  'Indore',
  'Udaipur',
  'Goa',
  'Jaipur',
  'Kerala',
  'Bhopal',
  'Delhi',
  'Mumbai',
  'Rishikesh',
  'Pondicherry',
]

/**
 * A quiet ribbon of cities we work in — pure CSS marquee, infinite loop.
 * Mobile-safe (single height row), reduced-motion safe (Marquee uses CSS
 * `animation`, which the OS pauses when prefers-reduced-motion is on if
 * the user has it system-wide; for extra safety the container scrolls
 * regardless of viewport width).
 */
export function CitiesMarquee() {
  return (
    <section
      className="relative w-full overflow-hidden border-y py-5 md:py-7"
      style={{
        backgroundColor: 'hsl(34 33% 83%)',
        borderColor: 'hsl(24 12% 10% / 0.08)',
      }}
      aria-label="Cities we work in"
    >
      <Marquee duration={62}>
        {CITIES.map((city, i) => (
          <span
            key={i}
            className="font-display italic select-none flex items-center gap-8"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', color: 'hsl(24 12% 10% / 0.82)' }}
          >
            {city}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1 L9 6 L7 7 L5 6 Z M7 13 L5 8 L7 7 L9 8 Z" stroke="hsl(32 31% 51%)" strokeWidth="0.8" fill="none" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
