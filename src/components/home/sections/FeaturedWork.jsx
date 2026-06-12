'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/lib/images'

const STORIES = [
  { id: 1, location: 'Udaipur', year: '2024', title: 'A Palace on the Water', src: IMAGES.stories[0].src, tag: 'Destination' },
  { id: 2, location: 'Goa', year: '2024', title: 'Golden Afternoon', src: IMAGES.stories[1].src, tag: 'Intimate' },
  { id: 3, location: 'Jaipur', year: '2023', title: 'The Pink City Story', src: IMAGES.stories[2].src, tag: 'Heritage' },
  { id: 4, location: 'Kerala', year: '2023', title: 'Backwater Evening', src: IMAGES.stories[3].src, tag: 'Destination' },
  { id: 5, location: 'Delhi', year: '2023', title: 'An Old Delhi Garden', src: IMAGES.stories[4].src, tag: 'Garden' },
]

export function FeaturedWork() {
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)

    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!track || !wrapper) return

    const getDistance = () => track.scrollWidth - window.innerWidth

    const updateHeight = () => {
      wrapper.style.height = getDistance() + window.innerHeight + 'px'
    }
    updateHeight()

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: 0.85,
          invalidateOnRefresh: true,
          onRefresh: updateHeight,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <section
        ref={sectionRef}
        className="sticky top-0 overflow-hidden"
        style={{ backgroundColor: 'hsl(33 32% 90%)', height: '100vh' }}
      >
      <div
        ref={trackRef}
        className="flex h-full items-stretch will-change-transform"
      >
        {/* Intro panel */}
        <div className="shrink-0 w-screen md:w-[50vw] flex flex-col justify-between p-10 md:p-16 xl:p-20 border-r border-ink/10">
          <div>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-10" style={{ color: 'hsl(32 31% 46%)' }}>
              — Selected Stories
            </p>
            <h2 className="font-display font-light text-[10vw] md:text-[7vw] tracking-[-0.02em] leading-[0.95]" style={{ color: 'hsl(24 12% 10%)' }}>
              Weddings<br />
              <span style={{ color: 'hsl(32 31% 46%)' }} className="italic">we&apos;ve had</span><br />
              the honour<br />
              of shaping.
            </h2>
          </div>
          <div className="flex items-end justify-between">
            <Link
              href="/projects"
              data-cursor="link"
              className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-wider transition-colors duration-500 hover:text-gold"
              style={{ color: 'hsl(24 12% 10% / 0.7)' }}
            >
              View all stories
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <p className="font-display italic text-gold text-2xl">350+</p>
          </div>
        </div>

        {/* Story cards */}
        {STORIES.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}

        {/* Trailing spacer */}
        <div className="shrink-0 w-16 md:w-24" />
      </div>
      </section>
    </div>
  )
}

function StoryCard({ story, index }) {
  return (
    <Link
      href="/projects"
      data-cursor="media"
      className="group relative shrink-0 w-[80vw] sm:w-[60vw] md:w-[42vw] lg:w-[36vw] border-r border-ink/10 overflow-hidden flex flex-col"
    >
      {/* Dummy image background */}
      <img
        src={story.src}
        alt={story.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
        style={{ filter: 'grayscale(0.25) brightness(0.85)' }}
      />

      {/* Decorative numeral */}
      <span
        className="absolute bottom-6 right-6 font-display italic text-8xl md:text-9xl leading-none select-none pointer-events-none z-10 text-ivory/20"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-30 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="flex items-start justify-between">
          <span className="font-sans text-[0.62rem] uppercase tracking-widest text-ivory/60">{story.tag}</span>
          <ArrowUpRight
            className="h-4 w-4 text-ivory/0 group-hover:text-gold transition-all duration-500 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </div>

        <div>
          <p className="font-sans text-[0.62rem] uppercase tracking-widest text-gold mb-3">
            {story.location} · {story.year}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory tracking-[-0.01em] leading-[1.0] text-balance">
            {story.title}
          </h3>

          {/* Hover line */}
          <div className="mt-6 h-px bg-ivory/0 group-hover:bg-gold/50 transition-all duration-700 ease-editorial origin-left scale-x-0 group-hover:scale-x-100" />
        </div>
      </div>
    </Link>
  )
}
