'use client'

import { useEffect, useRef } from 'react'
import { useIsTouch } from '@/lib/motion'

/**
 * Custom cursor — a lagging ring + dot, tuned for the editorial brand.
 *
 * Upgrades over a plain dot/ring:
 *  - Velocity stretch: the ring elongates into a "comet" in the direction of
 *    travel and relaxes back to a circle at rest.
 *  - Contextual labels: hover targets can show a word inside the ring
 *    (`data-cursor="media"` → "View", `="drag"` → "Drag", or a custom
 *    `data-cursor-label`). The dot hides while a label is shown.
 *  - State styling via `[data-cursor]`: link / media / drag, plus a press state.
 *  - Disabled on touch; positions written straight to the DOM (no re-render).
 */
const DEFAULT_LABELS = { media: 'View', drag: 'Drag', link: '' }

export function CursorProvider({ children }) {
  const isTouch = useIsTouch()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const ringInnerRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    const inner = ringInnerRef.current
    const label = labelRef.current
    if (!dot || !ring || !inner) return

    document.body.dataset.customCursor = 'on'

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX, dotY = mouseY
    let ringX = mouseX, ringY = mouseY
    let prevX = mouseX, prevY = mouseY
    let visible = false
    let raf

    const lerp = (a, b, n) => a + (b - a) * n

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
    }

    const tick = () => {
      dotX = lerp(dotX, mouseX, 0.55)
      dotY = lerp(dotY, mouseY, 0.55)
      ringX = lerp(ringX, mouseX, 0.16)
      ringY = lerp(ringY, mouseY, 0.16)

      // velocity → comet stretch (clamped)
      const vx = ringX - prevX
      const vy = ringY - prevY
      prevX = ringX
      prevY = ringY
      const speed = Math.min(Math.hypot(vx, vy) / 22, 0.32)
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      inner.style.transform = `rotate(${angle}deg) scale(${1 + speed}, ${1 - speed})`

      raf = requestAnimationFrame(tick)
    }
    tick()

    const setState = (state, text) => {
      ring.dataset.state = state
      dot.dataset.hidden = state === 'media' || state === 'drag' ? 'true' : 'false'
      if (label) {
        label.textContent = text || ''
        label.dataset.show = text ? 'true' : 'false'
      }
    }

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      if (!target) { setState('idle', ''); return }
      const state = target.dataset.cursor || 'link'
      const text = target.dataset.cursorLabel ?? DEFAULT_LABELS[state] ?? ''
      setState(state, text)
    }
    const onOut = (e) => { if (!e.relatedTarget) setState('idle', '') }
    const onLeave = () => { visible = false; ring.style.opacity = '0'; dot.style.opacity = '0' }
    const onDown = () => { ring.dataset.pressed = 'true' }
    const onUp = () => { ring.dataset.pressed = 'false' }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      delete document.body.dataset.customCursor
    }
  }, [isTouch])

  return (
    <>
      {children}
      {!isTouch && (
        <>
          {/* Dot — a gold sparkle (ring/solitaire glint) */}
          <span
            ref={dotRef}
            aria-hidden
            data-hidden="false"
            style={{ opacity: 0 }}
            className="pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-300 data-[hidden=true]:opacity-0"
          >
            <svg className="cursor-sparkle" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 1.5 C12 6.5 6.5 12 1.5 12 C6.5 12 12 17.5 12 22.5 C12 17.5 17.5 12 22.5 12 C17.5 12 12 6.5 12 1.5 Z"
                fill="hsl(32 31% 51%)"
              />
            </svg>
          </span>

          {/* Ring (position) */}
          <span
            ref={ringRef}
            aria-hidden
            data-state="idle"
            data-pressed="false"
            style={{ opacity: 0 }}
            className="group pointer-events-none fixed left-0 top-0 z-[9998] flex h-9 w-9 items-center justify-center transition-[width,height,opacity] duration-300 ease-editorial
                       data-[state=link]:h-14 data-[state=link]:w-14
                       data-[state=media]:h-24 data-[state=media]:w-24
                       data-[state=drag]:h-24 data-[state=drag]:w-24
                       data-[pressed=true]:scale-90"
          >
            {/* Visual circle (gets the velocity stretch) — fine gold band with a warm glow */}
            <span
              ref={ringInnerRef}
              className="absolute inset-0 rounded-full border border-gold/55 transition-[background,border-color,box-shadow] duration-300 ease-editorial
                         shadow-[0_0_0.75rem_hsl(32_31%_51%/0.18)]
                         group-data-[state=link]:border-gold group-data-[state=link]:shadow-[0_0_1.25rem_hsl(32_31%_51%/0.35)]
                         group-data-[state=media]:border-transparent group-data-[state=media]:bg-gold group-data-[state=media]:shadow-[0_0_1.5rem_hsl(32_31%_51%/0.4)]
                         group-data-[state=drag]:border-transparent group-data-[state=drag]:bg-ink group-data-[state=drag]:shadow-[0_0_1.5rem_hsl(24_12%_10%/0.35)]"
            />
            {/* Contextual label */}
            <span
              ref={labelRef}
              data-show="false"
              className="relative z-10 font-display italic text-[0.7rem] tracking-[0.04em] text-ivory opacity-0 transition-opacity duration-200 data-[show=true]:opacity-100"
            />
          </span>
        </>
      )}
    </>
  )
}
