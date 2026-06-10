'use client'

/**
 * Tasteful image placeholder — used everywhere until real photography lands.
 * Renders a Cormorant numeral and a faint diagonal ruled background.
 */
export function Placeholder({ label = '01', tone = 'cream', className = '', children }) {
  const tones = {
    cream: 'bg-cream text-ink/30',
    beige: 'bg-beige text-ink/35',
    ink: 'bg-ink text-ivory/30',
    gold: 'bg-gold/15 text-gold',
  }
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${tones[tone] || tones.cream} ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--ink) / 0.04) 22px 23px)',
      }}
      data-cursor="media"
    >
      <span className="absolute left-6 top-5 eyebrow opacity-60">{label}</span>
      <span className="absolute inset-0 grid place-items-center font-display text-7xl md:text-9xl opacity-30 select-none">
        ✦
      </span>
      {children}
    </div>
  )
}
