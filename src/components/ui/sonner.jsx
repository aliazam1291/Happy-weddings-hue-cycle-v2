'use client'

import { Toaster as Sonner } from 'sonner'

/**
 * Brand-themed toast surface (ivory card, gold accent, ink text). Mounted once
 * in the root layout; trigger with `import { toast } from 'sonner'`.
 */
export function Toaster(props) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        style: {
          background: 'hsl(34 30% 95%)',
          color: 'hsl(24 12% 10%)',
          border: '1px solid hsl(34 33% 83%)',
          borderRadius: '0.5rem',
          boxShadow: '0 24px 60px -32px hsl(24 12% 10% / 0.45)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
        },
        classNames: {
          title: 'font-display',
          description: 'text-ink/60',
        },
      }}
      {...props}
    />
  )
}
