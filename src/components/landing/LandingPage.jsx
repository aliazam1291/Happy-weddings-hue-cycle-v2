'use client'

import LandingNav from './LandingNav'
import LandingExperienceSection from './sections/LandingExperienceSection'
import BrandStorySection from './sections/BrandStorySection'
import ServicesGridSection from './sections/ServicesGridSection'
import VideoGallerySection from './sections/VideoGallerySection'
import FooterSection from './sections/FooterSection'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <main className={styles.pageShell}>
      <LandingNav />
      <LandingExperienceSection />
      <BrandStorySection />
      <ServicesGridSection />
      <VideoGallerySection />
      <FooterSection />
    </main>
  )
}
