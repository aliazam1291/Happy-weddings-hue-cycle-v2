'use client'

import { useState } from 'react'

/**
 * FlipCard — 3D flip card. Flips on hover (fine pointers) and on tap/click
 * (touch + keyboard), so it works on web and mobile. Themed by the caller via
 * the `front` / `back` nodes.
 */
export function FlipCard({ front, back, className = '', height = '22rem' }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`group/flip relative cursor-pointer ${className}`}
      style={{ height, perspective: '1400px' }}
      data-cursor="link"
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((f) => !f) } }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-editorial"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </div>
    </div>
  )
}
