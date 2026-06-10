'use client'

import { PageTransition } from '@/components/site/PageTransition'

/**
 * template.js re-mounts on every navigation (unlike layout.js), which is what
 * lets the ink curtain replay each time you move between pages.
 */
export default function Template({ children }) {
  // TEMP: bypass PageTransition to isolate the client-nav removeChild crash
  return children
  // return <PageTransition>{children}</PageTransition>
}
