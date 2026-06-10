'use client'

import { useState } from 'react'
import { PageLoader } from '@/components/home/PageLoader'
import { FilmGrain } from '@/components/home/FilmGrain'
import { ArchPortalHero } from '@/components/home/sections/ArchPortalHero'
import { PinnedStatement } from '@/components/home/sections/PinnedStatement'
import { FeaturedWork } from '@/components/home/sections/FeaturedWork'
import { OffersSection } from '@/components/home/sections/OffersSection'
import { ProjectsGallery } from '@/components/home/sections/ProjectsGallery'
import { FounderSection } from '@/components/home/sections/FounderSection'
import { NumbersSection } from '@/components/home/sections/NumbersSection'
import { JournalSection } from '@/components/home/sections/JournalSection'
import { InquiryCTA } from '@/components/home/sections/InquiryCTA'

export function HomePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Global film grain — fixed overlay */}
      <FilmGrain opacity={0.038} />

      {/* Entry gate */}
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}

      {/* Sections */}
      <ArchPortalHero isLoaded={loaded} />
      <PinnedStatement />
      <FeaturedWork />
      <OffersSection />
      <ProjectsGallery />
      <NumbersSection />
      <FounderSection />
      <JournalSection />
      <InquiryCTA />
    </>
  )
}
