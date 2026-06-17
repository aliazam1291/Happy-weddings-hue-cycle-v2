'use client'

import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

/**
 * CountUp — ReactBits-style number roll, adapted for the Happy Weddings stack
 * (JS + framer-motion). Counts from `from` to `to` once it scrolls into view,
 * on the editorial easing curve. Thousands separator + prefix/suffix supported.
 */
export function CountUp({
  to,
  from = 0,
  duration = 2,
  separator = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  style,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const format = (v) => {
    let s = decimals ? v.toFixed(decimals) : String(Math.round(v))
    if (separator) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return prefix + s + suffix
  }

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = format(v) },
    })
    return () => controls.stop()
  }, [inView, from, to, duration]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} style={style}>
      {format(from)}
    </span>
  )
}
