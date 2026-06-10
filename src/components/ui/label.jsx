'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/cn'

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'eyebrow block mb-3 text-ink/60',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
