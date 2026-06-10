import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CursorProvider } from '@/components/providers/CursorProvider'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Happy Weddings — by Shruti Jain',
  description:
    'A named house since 2013. Designing weddings that are timeless, intentional, emotional. 350+ celebrations across India and beyond.',
  icons: { icon: '/logo.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <SmoothScrollProvider>
          <CursorProvider>
            <SiteNav />
            <main className="relative">{children}</main>
            <SiteFooter />
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
