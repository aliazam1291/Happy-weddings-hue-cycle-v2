'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-light uppercase tracking-wider transition-all duration-500 ease-editorial focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary — gold border on ivory, ink type, fills on hover
        default:
          'border border-gold/60 text-ink bg-transparent hover:bg-gold hover:text-ivory',
        // Solid — gold fill (use sparingly per 60·24·8·4·3·1)
        solid:
          'bg-gold text-ivory hover:bg-ink',
        // Ghost — ink type, thin underline that grows
        ghost:
          'text-ink hover:text-gold',
        // Ink — charcoal pill, ivory type
        ink:
          'bg-ink text-ivory hover:bg-gold hover:text-ivory',
        // Accent — terracotta, the 1% punctuation
        accent:
          'bg-terracotta text-ivory hover:bg-ink',
        // Outline-light for dark backgrounds
        outlineLight:
          'border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink',
      },
      size: {
        default: 'h-12 px-7 text-[0.72rem]',
        sm: 'h-10 px-5 text-[0.68rem]',
        lg: 'h-14 px-9 text-[0.78rem]',
        pill: 'h-12 px-8 text-[0.72rem] rounded-full',
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
      shape: 'soft',
    },
  },
)

const Button = React.forwardRef(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        data-cursor="link"
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
