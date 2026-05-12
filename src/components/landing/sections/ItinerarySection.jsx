'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, MapPin, Sparkles } from 'lucide-react'
import { itineraryDays } from '../landingData'
import styles from '../LandingPage.module.css'

export default function ItinerarySection() {
  return (
    <section id="itinerary" className={`${styles.section} ${styles.itinerarySection}`}>
      <div className={styles.itineraryShell}>
        <div className={styles.itineraryIntro}>
          <p className={styles.kicker}>Event choreography</p>
          <h2>Three days, one continuous guest journey.</h2>
          <p>
            Each day is treated as a production chapter: arrival, emotional build, ceremony, and final reveal.
          </p>
        </div>

        <Tabs.Root defaultValue={itineraryDays[0].day} className={styles.itineraryTabs}>
          <Tabs.List className={styles.itineraryTabList} aria-label="Event days">
            {itineraryDays.map((item) => (
              <Tabs.Trigger className={styles.itineraryTrigger} key={item.day} value={item.day}>
                <span>{item.day}</span>
                <strong>{item.short}</strong>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {itineraryDays.map((item) => (
            <Tabs.Content className={styles.itineraryContent} key={item.day} value={item.day}>
              <AnimatePresence mode="wait">
                <motion.div
                  className={styles.itineraryCard}
                  key={item.day}
                  initial={{ opacity: 0, x: 36, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -36, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.itineraryVisual}>
                    <img src={item.image} alt="" />
                    <div>
                      <Sparkles size={18} />
                      <span>{item.mood}</span>
                    </div>
                  </div>

                  <div className={styles.itineraryDetails}>
                    <div className={styles.itineraryMeta}>
                      <span><MapPin size={15} /> Destination flow</span>
                      <span><Clock size={15} /> Live schedule</span>
                    </div>
                    <h3>{item.title}</h3>
                    <div className={styles.itineraryStats}>
                      {item.stats.map((stat) => <span key={stat}>{stat}</span>)}
                    </div>
                    <ol className={styles.timelineList}>
                      {item.items.map((event) => (
                        <li key={event.time}>
                          <time>{event.time}</time>
                          <div>
                            <strong>{event.title}</strong>
                            <p>{event.note}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  )
}
