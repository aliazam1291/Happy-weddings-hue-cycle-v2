'use client'

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const PALETTES = [
  { bg: 'hsl(24 14% 10%)', accent: 'hsl(32 31% 51%)', text: 'hsl(34 30% 95%)' },
  { bg: 'hsl(33 32% 88%)', accent: 'hsl(32 31% 46%)', text: 'hsl(24 12% 10%)' },
  { bg: 'hsl(13 55% 36%)', accent: 'hsl(34 30% 85%)', text: 'hsl(34 30% 95%)' },
  { bg: 'hsl(28 18% 20%)', accent: 'hsl(32 35% 58%)', text: 'hsl(34 30% 90%)' },
]

/**
 * On-brand editorial placeholder — shown wherever real photography hasn't
 * landed yet. Derives a deterministic palette from `seed` so each card gets
 * a distinct but consistent colour scheme. Rendered as `absolute inset-0`
 * so it drops straight in place of an <img> in the same container.
 */
export function PlaceholderCover({ seed = '', label = '', className = '' }) {
  const pal = PALETTES[hashStr(seed) % PALETTES.length]
  const letter = label.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() || '✦'
  const pid = `pl-${seed.replace(/[^a-z0-9]/gi, '').toLowerCase()}`

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor: pal.bg }}
      aria-hidden
    >
      {/* Diagonal fine-line editorial grid */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern
            id={pid}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0" y1="0" x2="0" y2="28"
              stroke={pal.accent}
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>

      {/* Radial depth glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 44%, ${pal.accent}1f, transparent 72%)`,
        }}
      />

      {/* Ghost initial — oversized typographic texture */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ color: pal.text, opacity: 0.065, userSelect: 'none' }}
      >
        <span className="font-display leading-none" style={{ fontSize: 'clamp(8rem, 25vw, 18rem)' }}>
          {letter}
        </span>
      </div>

      {/* Centre diamond ornament */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="40" height="40" viewBox="0 0 40 40"
        aria-hidden
        style={{ color: pal.accent, opacity: 0.5 }}
      >
        <rect
          x="10" y="10" width="20" height="20"
          transform="rotate(45 20 20)"
          fill="none" stroke="currentColor" strokeWidth="0.7"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Inset frame */}
      <div
        className="absolute inset-[10px] border pointer-events-none"
        style={{ borderColor: `${pal.accent}20` }}
      />
    </div>
  )
}
