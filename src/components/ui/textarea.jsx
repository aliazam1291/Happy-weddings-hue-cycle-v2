'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={4}
    className={cn(
      'w-full bg-transparent border-0 border-b border-ink/20 py-3 font-sans font-light text-base text-ink placeholder:text-ink/40 resize-none transition-colors duration-500 ease-editorial focus:outline-none focus:border-gold',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
