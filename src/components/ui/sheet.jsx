'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

const SheetContent = React.forwardRef(
  ({ side = 'right', className, children, ...props }, ref) => {
    const sideClasses = {
      top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
        'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-md border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
      right:
        'inset-y-0 right-0 h-full w-full sm:max-w-md border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      full: 'inset-0 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    }
    return (
      <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed z-50 gap-4 bg-ivory shadow-2xl border-border transition ease-editorial data-[state=open]:animate-in data-[state=closed]:animate-out duration-500',
            sideClasses[side],
            className,
          )}
          {...props}
        >
          {children}
          <SheetPrimitiveClose />
        </DialogPrimitive.Content>
      </SheetPortal>
    )
  },
)
SheetContent.displayName = 'SheetContent'

function SheetPrimitiveClose() {
  return (
    <DialogPrimitive.Close
      data-cursor="link"
      className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/70 transition hover:border-gold hover:text-gold focus:outline-none"
      aria-label="Close"
    >
      <X className="h-4 w-4" />
    </DialogPrimitive.Close>
  )
}

const SheetHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-left', className)} {...props} />
)
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-2xl text-ink', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}
