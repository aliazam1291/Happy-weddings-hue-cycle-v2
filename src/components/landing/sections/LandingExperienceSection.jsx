import ParallaxScene from '../../ParallaxScene'
import styles from '../LandingPage.module.css'

export default function LandingExperienceSection() {
  return (
    <section id="top" className={styles.experienceSection}>
      <ParallaxScene />
      <div className={styles.experienceOverlay}>
        <p className={styles.kicker}>Happy Weddings</p>
        <h1>
          Designed like a destination.
          <span>Remembered like home.</span>
        </h1>
        <p>
          Immersive wedding production, heritage hospitality, and event architecture for celebrations that move
          with intention.
        </p>
      </div>
      <div className={styles.sceneBridge} aria-hidden="true" />
    </section>
  )
}
