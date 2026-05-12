import styles from '../LandingPage.module.css'

const headline = ['Where', 'imagination', 'becomes', 'ceremony']

export default function HeroSection() {
  return (
    <section id="top" className={`${styles.section} ${styles.heroSection}`}>
      <div className={styles.heroImage} aria-hidden="true">
        <img src="/svgs/background.svg" alt="" />
      </div>
      <div className={styles.heroOverlay}>
        <p className={styles.kicker}>Luxury wedding and event atelier</p>
        <h1 className={styles.heroTitle} aria-label="Where imagination becomes ceremony">
          {headline.map((word, index) => (
            <span key={word} style={{ '--delay': `${index * 120}ms` }}>
              {word}
            </span>
          ))}
        </h1>
        <p className={styles.heroCopy}>
          We design layered, emotionally precise celebrations across intimate estates, destination weekends,
          and high-stakes brand occasions.
        </p>
      </div>
    </section>
  )
}
