'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, ChevronRight, Gem, MessageSquareText, X } from 'lucide-react'
import { conciergeSteps } from '../landingData'
import styles from '../LandingPage.module.css'

export default function ConciergeSection() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const current = conciergeSteps[step]
  const progress = ((step + 1) / conciergeSteps.length) * 100

  function selectOption(option) {
    setAnswers((value) => ({ ...value, [current.label]: option }))
    setStep((value) => Math.min(value + 1, conciergeSteps.length - 1))
  }

  function openDrawer() {
    setStep(0)
    setAnswers({})
    setOpen(true)
  }

  return (
    <section id="concierge" className={`${styles.section} ${styles.conciergeSection}`}>
      <div className={styles.conciergePanel}>
        <div className={styles.conciergeCopy}>
          <p className={styles.kicker}>Private concierge</p>
          <h2>A sharper first conversation.</h2>
          <p>
            Choose the event path, visual direction, and next action before the planning team prepares a bespoke
            response.
          </p>
          <div className={styles.conciergeSignals}>
            <span><Gem size={16} /> Curated brief</span>
            <span><CalendarCheck size={16} /> Consultation-ready</span>
            <span><MessageSquareText size={16} /> No generic form</span>
          </div>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className={styles.primaryButton} type="button" onClick={openDrawer}>
              Build Your Brief <ChevronRight size={16} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal forceMount>
            <AnimatePresence>
              {open && (
                <>
                  <Dialog.Overlay asChild>
                    <motion.div
                      className={styles.drawerBackdrop}
                      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild>
                    <motion.aside
                      className={styles.drawer}
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '100%', opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <Dialog.Close className={styles.iconClose} aria-label="Close">
                        <X size={17} />
                      </Dialog.Close>
                      <div className={styles.drawerProgress} aria-hidden="true">
                        <span style={{ width: `${progress}%` }} />
                      </div>
                      <Dialog.Title className={styles.drawerTitle}>{current.label}</Dialog.Title>
                      <Dialog.Description className={styles.drawerDescription}>
                        Step {step + 1} of {conciergeSteps.length}. Select one direction to shape the consultation.
                      </Dialog.Description>

                      <AnimatePresence mode="wait">
                        <motion.div
                          className={styles.drawerOptions}
                          key={current.label}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -18 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {current.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={answers[current.label] === option ? styles.selectedOption : ''}
                              onClick={() => selectOption(option)}
                            >
                              <span>{option}</span>
                              <ChevronRight size={16} />
                            </button>
                          ))}
                        </motion.div>
                      </AnimatePresence>

                      <dl className={styles.answerSummary}>
                        {Object.entries(answers).map(([label, answer]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd>{answer}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className={styles.drawerActions}>
                        <button type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))}>
                          Back
                        </button>
                        <button type="button" onClick={() => (step === conciergeSteps.length - 1 ? setOpen(false) : setStep(step + 1))}>
                          {step === conciergeSteps.length - 1 ? 'Send Brief' : 'Skip'}
                        </button>
                      </div>
                    </motion.aside>
                  </Dialog.Content>
                </>
              )}
            </AnimatePresence>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  )
}
