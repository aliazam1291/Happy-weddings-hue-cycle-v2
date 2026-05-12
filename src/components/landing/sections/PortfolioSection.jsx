'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolioItems } from '../landingData'
import styles from '../LandingPage.module.css'

const filters = ['Social', 'Corporate']

export default function PortfolioSection() {
  const [filter, setFilter] = useState('Social')
  const visibleItems = useMemo(() => portfolioItems.filter((item) => item.type === filter), [filter])

  return (
    <section id="portfolio" className={`${styles.section} ${styles.portfolioSection}`}>
      <div className={styles.portfolioHeader}>
        <div>
          <p className={styles.kicker}>Vision portfolio</p>
          <h2>Selected environments, not generic galleries.</h2>
        </div>
        <div className={styles.filterGroup} aria-label="Portfolio filters">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? styles.activeFilter : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.portfolioBoard}>
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.article
              layout
              className={`${styles.portfolioTile} ${item.tall ? styles.tallTile : ''} ${item.wide ? styles.wideTile : ''}`}
              key={item.title}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.asset} alt="" />
              <div className={styles.portfolioScrim} />
              <div className={styles.portfolioTileTop}>
                <span>{item.type}</span>
                <ArrowUpRight size={18} />
              </div>
              <div className={styles.portfolioTileBody}>
                <p>{item.tone}</p>
                <h3>{item.title}</h3>
                <small>{item.scope}</small>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
