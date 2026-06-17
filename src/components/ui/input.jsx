'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'w-full bg-transparent border-0 border-b border-ink/20 py-3 font-sans font-light text-base text-ink placeholder:text-ink/40 transition-colors duration-500 ease-editorial focus:outline-none focus:border-gold aria-[invalid=true]:border-terracotta',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
