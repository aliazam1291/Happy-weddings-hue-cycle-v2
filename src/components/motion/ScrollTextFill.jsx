'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Word-by-word colour scrub. As the section scrolls through the viewport,
 * each word transitions from `dim` to `bright` in sequence — driven by
 * scrubbed ScrollTrigger.
 *
 * Use for the pinned brand statement: large Cormorant text where each word
 * "lights up" as the reader passes it.
 */
export function ScrollTextFill({
  children,
  className = '',
  as: Tag = 'p',
  dim = 'hsl(var(--ink) / 0.18)',
  bright = 'hsl(var(--ink))',
  accent = 'hsl(var(--gold))',
  accentWords = [],
  start = 'top 80%',
  end = 'bottom 30%',
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const spans = el.querySelectorAll('[data-fill-word]')
    if (!spans.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { color: dim },
        {
          color: (_i, target) =>
            target.dataset.accent === 'true' ? accent : bright,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.8,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [dim, bright, accent, start, end])

  const text = String(children)
  const words = text.split(/(\s+)/)

  return (
    <Tag ref={ref} className={className} style={{ color: dim }}>
      {words.map((w, i) => {
        if (!w.trim()) return <span key={i}>{w}</span>
        const isAccent = accentWords.some(
          (a) => w.toLowerCase().replace(/[.,—·]/g, '') === a.toLowerCase(),
        )
        return (
          <span
            key={i}
            data-fill-word
            data-accent={isAccent}
            className={isAccent ? 'italic' : ''}
            style={{ color: dim }}
          >
            {w}
          </span>
        )
      })}
    </Tag>
  )
}
