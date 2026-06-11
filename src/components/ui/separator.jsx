'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

const Separator = React.forwardRef(
  (
    { className, orientation = 'horizontal', tone = 'ink', decorative = true, ...props },
    ref,
  ) => {
    const toneClass =
      tone === 'gold'
        ? 'bg-gold/40'
        : tone === 'ivory'
        ? 'bg-ivory/20'
        : 'bg-ink/10'
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          'shrink-0',
          toneClass,
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          className,
        )}
        {...props}
      />
    )
  },
)
Separator.displayName = 'Separator'

export { Separator }
