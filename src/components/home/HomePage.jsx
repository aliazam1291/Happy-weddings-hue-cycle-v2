'use client'

import { useState } from 'react'
import { PageLoader } from '@/components/home/PageLoader'
import { FilmGrain } from '@/components/home/FilmGrain'
import { ArchPortalHero } from '@/components/home/sections/ArchPortalHero'
import { TrustBar } from '@/components/home/sections/TrustBar'
import { PinnedStatement } from '@/components/home/sections/PinnedStatement'
import { FeaturedWork } from '@/components/home/sections/FeaturedWork'
import { OffersSection } from '@/components/home/sections/OffersSection'
import { ProjectsGallery } from '@/components/home/sections/ProjectsGallery'
import { FounderSection } from '@/components/home/sections/FounderSection'
import { NumbersSection } from '@/components/home/sections/NumbersSection'
import { CitiesMarquee } from '@/components/home/sections/CitiesMarquee'
import { VideoReel } from '@/components/home/sections/VideoReel'
import { Testimonials } from '@/components/home/sections/Testimonials'
import { JournalSection } from '@/components/home/sections/JournalSection'
import { FaqSection } from '@/components/home/sections/FaqSection'
import { InquiryCTA } from '@/components/home/sections/InquiryCTA'
import { Ornament } from '@/components/motion/Ornament'

/**
 * Homepage section flow — mirrors the approved brand flow diagram:
 * Hero → Trust → Conviction → Selected work → Services → Projects → Numbers
 *      → House (Shruti) → Testimonials → Journal → FAQ → Enquire → Footer
 */
export function HomePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <FilmGrain opacity={0.038} />
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}

      <ArchPortalHero isLoaded={loaded} />
      <TrustBar />
      <PinnedStatement />
      <CitiesMarquee />
      <FeaturedWork />

      {/* gold breath between dense narrative + dense service rows */}
      <div className="py-10 md:py-14" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <Ornament size="lg" />
      </div>

      <OffersSection />
      <ProjectsGallery />
      <VideoReel />
      <NumbersSection />
      <FounderSection />
      <Testimonials />
      <JournalSection />
      <FaqSection />
      <InquiryCTA />
    </>
  )
}
