'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-sans uppercase tracking-[0.28em] transition-colors duration-500 ease-editorial whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border border-ink/15 text-ink/70 bg-transparent',
        gold: 'border border-gold/50 text-[hsl(32_31%_46%)] bg-[hsl(34_30%_95%)]',
        ink: 'bg-ink text-ivory border border-ink',
        solidGold: 'bg-gold text-ivory border border-gold',
        terracotta: 'border border-terracotta/40 text-terracotta bg-transparent',
        dot: 'border-0 bg-transparent text-[hsl(32_31%_46%)] px-0 tracking-[0.28em]',
      },
      size: {
        sm: 'h-6 px-2.5 text-[0.55rem]',
        default: 'h-7 px-3 text-[0.6rem]',
        lg: 'h-8 px-4 text-[0.65rem]',
      },
      shape: {
        square: 'rounded-none',
        soft: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'pill',
    },
  },
)

const Badge = React.forwardRef(
  ({ className, variant, size, shape, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, shape, className }))}
      {...props}
    />
  ),
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
