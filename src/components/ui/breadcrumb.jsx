'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

/**
 * Auto breadcrumb derived from the current path (Home › Section › Sub),
 * themed ivory/gold/ink. Last crumb is the current page (gold, non-link).
 */
export function Breadcrumb() {
  const pathname = usePathname() || '/'
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.22em]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span style={{ color: 'hsl(32 31% 46%)' }} aria-current="page">{c.label}</span>
              ) : (
                <Link
                  href={c.href}
                  data-cursor="link"
                  className="transition-colors duration-300 hover:text-gold"
                  style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                >
                  {c.label}
                </Link>
              )}
              {!last && <ChevronRight className="h-3 w-3" style={{ color: 'hsl(24 12% 10% / 0.3)' }} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
