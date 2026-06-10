'use client'

/**
 * Pure CSS marquee — duplicates children once for seamless loop.
 * Set `--marquee-duration` via prop for speed control.
 */
export function Marquee({ children, duration = 40, className = '', reverse = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-12 will-change-transform"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex gap-12 items-center shrink-0">{children}</div>
        <div className="flex gap-12 items-center shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
