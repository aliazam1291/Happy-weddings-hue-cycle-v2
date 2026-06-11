'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const cardVariants = cva(
  'relative overflow-hidden transition-all duration-700 ease-editorial',
  {
    variants: {
      variant: {
        // Default — ivory paper, hairline border
        default: 'bg-[hsl(34_30%_95%)] border border-ink/10',
        // Cream — warmer paper for nested cards
        cream: 'bg-[hsl(33_32%_90%)] border border-ink/10',
        // Ink — charcoal card, ivory type
        ink: 'bg-ink text-ivory border border-ink',
        // Ghost — no fill, just hairline
        ghost: 'bg-transparent border border-ink/15',
        // Gold-lined — emphasis accent
        gold: 'bg-[hsl(34_30%_95%)] border border-gold/50',
      },
      shape: {
        square: 'rounded-none',
        soft: 'rounded-sm',
        md: 'rounded-md',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_-24px_hsl(24_12%_10%/0.35)]',
        glow: 'hover:border-gold/70',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'soft',
      hover: 'none',
    },
  },
)

const Card = React.forwardRef(({ className, variant, shape, hover, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, shape, hover, className }))}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5 p-7 md:p-8', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.2] text-balance',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardEyebrow = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'font-sans text-[0.6rem] uppercase tracking-[0.28em] text-[hsl(32_31%_51%)]',
      className,
    )}
    {...props}
  />
))
CardEyebrow.displayName = 'CardEyebrow'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('font-sans font-light text-sm leading-relaxed text-ink/65', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-7 md:p-8 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-7 md:p-8 pt-0 gap-3', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardEyebrow,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
