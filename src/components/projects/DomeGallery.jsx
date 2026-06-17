'use client'

import { useRef, useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * DomeGallery — wedding photographs wrapped around a rotating 3D drum you can
 * drag (mouse + touch). Front frames face you and read large; the sides curve
 * away and back frames are culled, with a vignette focusing the centre. Idle
 * auto-rotates gently; flick to spin with inertia; tap a frame to open it.
 *
 * Geometry: tiles sit on a cylinder. Tile size is derived from the column count
 * so neighbours abut with a small gap (never overlap), and the radius is fit to
 * BOTH the stage width and height so the drum always sits cleanly in frame.
 * Sizes live in CSS vars so a resize reflows without recomputing transforms.
 * Motion is written straight to the DOM in a rAF loop (no per-frame re-render).
 */
const ROWS = 3

export function DomeGallery({ items = [], onSelect }) {
  const stageRef = useRef(null)
  const sphereRef = useRef(null)
  const rot = useRef({ x: -3, y: 0 })
  const target = useRef({ x: -3, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const moved = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  const N = items.length
  const COLS = Math.max(8, Math.ceil(N / ROWS))

  // Spherical layout: columns step around (longitude), rows arc up/down
  // (latitude) so the grid bulges into a dome. Tile size from column spacing.
  const LAT_STEP = 38 // degrees between rows — must exceed a tile's angular height
  const twF = (2 * Math.PI / COLS) * 0.82 // width fits the arc per column, with a gap
  const thF = twF * 1.16                  // portrait frames, short enough to clear LAT_STEP
  // Vertical extent of the dome (fraction of radius) for fitting the radius
  const latMax = ((ROWS - 1) / 2) * LAT_STEP
  const extentF = 2 * (Math.sin((latMax * Math.PI) / 180) + (thF / 2) * Math.cos((latMax * Math.PI) / 180)) + 0.12

  useEffect(() => {
    const stage = stageRef.current
    const sphere = sphereRef.current
    if (!stage || !sphere) return

    const reduced = prefersReducedMotion()

    const setSize = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      // radius limited by width (drum reads ~0.42·W) and height (must fit extentF)
      const r = Math.max(240, Math.min(520, Math.min(w * 0.42, (h * 0.9) / extentF)))
      sphere.style.setProperty('--r', `${r}px`)
      sphere.style.setProperty('--tw', `${r * twF}px`)
      sphere.style.setProperty('--th', `${r * thF}px`)
    }
    setSize()
    setReady(true)
    window.addEventListener('resize', setSize)

    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!dragging.current) {
        target.current.y += vel.current.y
        target.current.x += vel.current.x
        vel.current.x *= 0.93
        vel.current.y *= 0.93
        if (!reduced && Math.abs(vel.current.y) < 0.03 && Math.abs(vel.current.x) < 0.03) {
          target.current.y += 0.035 // gentle idle drift
        }
      }
      target.current.x = Math.max(-20, Math.min(20, target.current.x))
      rot.current.x += (target.current.x - rot.current.x) * 0.12
      rot.current.y += (target.current.y - rot.current.y) * 0.12
      sphere.style.transform =
        `translateZ(calc(var(--r) * -1)) rotateX(${rot.current.x.toFixed(2)}deg) rotateY(${rot.current.y.toFixed(2)}deg)`
    }
    raf = requestAnimationFrame(tick)

    const pt = (e) => ({ x: e.clientX, y: e.clientY })
    const onDown = (e) => {
      dragging.current = true
      moved.current = false
      vel.current = { x: 0, y: 0 }
      last.current = pt(e)
      try { stage.setPointerCapture(e.pointerId) } catch {}
    }
    const onMove = (e) => {
      if (!dragging.current) return
      const p = pt(e)
      const dx = p.x - last.current.x
      const dy = p.y - last.current.y
      last.current = p
      if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true
      const f = 0.18
      target.current.y += dx * f
      target.current.x -= dy * f
      vel.current.y = dx * f
      vel.current.x = -dy * f
    }
    const onUp = (e) => {
      dragging.current = false
      try { stage.releasePointerCapture(e.pointerId) } catch {}
    }

    stage.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
      stage.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [N, COLS, twF, thF, extentF])

  return (
    <div
      ref={stageRef}
      data-cursor="drag"
      data-cursor-label="Drag"
      className="relative w-full overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ height: 'clamp(22rem, 56vh, 36rem)', perspective: '1300px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        ref={sphereRef}
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {ready && items.map((item, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const theta = col * (360 / COLS) + (row % 2) * (180 / COLS) // honeycomb offset
          const lat = (row - (ROWS - 1) / 2) * LAT_STEP
          const cosLat = Math.max(0.5, Math.cos((lat * Math.PI) / 180))
          return (
            <button
              key={item.key}
              type="button"
              aria-label={item.project?.title || 'Project photo'}
              onClick={() => { if (!moved.current) onSelect?.(item.project) }}
              className="dome-tile group absolute block overflow-hidden"
              style={{
                width: `calc(var(--tw) * ${cosLat.toFixed(3)})`,
                height: 'var(--th)',
                marginLeft: `calc(var(--tw) * ${cosLat.toFixed(3)} / -2)`,
                marginTop: 'calc(var(--th) / -2)',
                transform: `rotateY(${theta}deg) rotateX(${(-lat).toFixed(2)}deg) translateZ(var(--r))`,
                backfaceVisibility: 'hidden',
                borderRadius: '0.5rem',
                boxShadow: '0 1.25rem 2.5rem -1.25rem hsl(24 14% 4% / 0.7)',
                outline: '1px solid hsl(32 31% 51% / 0.22)',
                outlineOffset: '-1px',
              }}
            >
              <img
                src={item.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                /* Warm brand monochrome — unifies every photo into the gold/sepia palette */
                style={{ filter: 'grayscale(1) sepia(0.55) saturate(1.35) hue-rotate(-6deg) brightness(0.9) contrast(1.04)' }}
              />
              {/* Persistent gold tint so frames sit in the ivory/gold/ink world */}
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'hsl(32 31% 51% / 0.14)', mixBlendMode: 'multiply' }}
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(180deg, transparent 40%, hsl(24 14% 6% / 0.82) 100%)' }}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="block font-sans text-[0.5rem] uppercase tracking-[0.22em] text-ivory/70">
                  {item.project?.place}
                </span>
                <span className="block font-display italic text-sm leading-tight text-ivory">
                  {item.project?.title}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Vignette — focuses the centre, fades the drum edges into the ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 66% 70% at 50% 50%, transparent 48%, hsl(24 14% 7% / 0.5) 80%, hsl(24 14% 7% / 0.92) 100%)' }}
      />
    </div>
  )
}
