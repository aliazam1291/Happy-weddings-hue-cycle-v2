'use client'

import { useEffect, useRef } from 'react'
import { useIsTouch } from '@/lib/motion'

/**
 * Custom cursor — dot + ring.
 * - Listen for [data-cursor="link" | "media" | "drag"] hover targets to switch state.
 * - Disabled entirely on coarse pointers (touch).
 * - Uses CSS variables on the root to drive position so it works without React re-render.
 */
export function CursorProvider({ children }) {
  const isTouch = useIsTouch()
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.dataset.customCursor = 'on'

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const lerp = (a, b, n) => a + (b - a) * n

    const tick = () => {
      dotX = lerp(dotX, mouseX, 0.5)
      dotY = lerp(dotY, mouseY, 0.5)
      ringX = lerp(ringX, mouseX, 0.18)
      ringY = lerp(ringY, mouseY, 0.18)
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) {
        ring.dataset.state = 'idle'
        return
      }
      ring.dataset.state = target.dataset.cursor || 'link'
    }
    const onOut = () => (ring.dataset.state = 'idle')
    const onDown = () => (ring.dataset.pressed = 'true')
    const onUp = () => (ring.dataset.pressed = 'false')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      delete document.body.dataset.customCursor
    }
  }, [isTouch])

  return (
    <>
      {children}
      {!isTouch && (
        <>
          <span
            ref={dotRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-ink mix-blend-multiply"
          />
          <span
            ref={ringRef}
            aria-hidden
            data-state="idle"
            className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-ink/40 transition-[width,height,background,border-color,opacity] duration-300 ease-editorial
                       data-[state=link]:h-14 data-[state=link]:w-14 data-[state=link]:border-gold
                       data-[state=media]:h-20 data-[state=media]:w-20 data-[state=media]:bg-gold/15 data-[state=media]:border-gold/0
                       data-[state=drag]:h-24 data-[state=drag]:w-24 data-[state=drag]:bg-ink data-[state=drag]:border-ink/0
                       data-[pressed=true]:scale-90"
          />
        </>
      )}
    </>
  )
}
