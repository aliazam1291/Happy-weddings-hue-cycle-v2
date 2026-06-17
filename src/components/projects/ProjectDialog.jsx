'use client'

import { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, MapPin, Users, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'

const DialogPortal = DialogPrimitive.Portal
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CallbackCard } from '@/components/site/CallbackCard'
import { Ornament } from '@/components/motion/Ornament'

/**
 * Project quick-view dialog. Full-screen on mobile, large modal on desktop.
 * Renders the project's editorial story + lead-grab CallbackCard at the foot.
 *
 * Props:
 *   - project: the selected project object (see PROJECTS in content.js)
 *   - open, onOpenChange: controlled by parent
 */
export function ProjectDialog({ project, open, onOpenChange }) {
  const [imgIdx, setImgIdx] = useState(0)

  if (!project) return null

  const gallery = project.gallery?.length ? project.gallery : [project.src]
  const cur = gallery[imgIdx]

  const next = () => setImgIdx((i) => (i + 1) % gallery.length)
  const prev = () => setImgIdx((i) => (i - 1 + gallery.length) % gallery.length)

  return (
    <Dialog open={open} onOpenChange={(v) => { setImgIdx(0); onOpenChange(v) }}>
      <DialogPortal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{
            backgroundColor: 'hsl(34 30% 95%)',
            maxWidth: 'min(73.75rem, 96vw)',
            maxHeight: '92vh',
          }}
        >
          {/* Close */}
          <DialogPrimitive.Close
            data-cursor="link"
            aria-label="Close"
            className="fixed md:absolute right-3 top-3 md:right-5 md:top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 backdrop-blur border border-ink/10 text-ink/70 hover:text-gold hover:border-gold transition"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>

          {/* Hidden a11y title */}
          <DialogPrimitive.Title className="sr-only">{project.title}</DialogPrimitive.Title>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left — image carousel */}
            <div className="relative lg:col-span-6 bg-ink/5" style={{ minHeight: '50vh' }}>
              <div className="relative h-full" style={{ aspectRatio: '4 / 5' }}>
                <img
                  key={cur}
                  src={cur}
                  alt={`${project.title} — frame ${imgIdx + 1}`}
                  data-cursor="media"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  style={{ filter: 'saturate(0.88) brightness(0.96)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, hsl(24 12% 10% / 0.45) 100%)' }}
                />

                {/* Category + place chip — top left */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center font-sans text-[0.58rem] uppercase tracking-[0.28em] px-3 py-1.5"
                    style={{ backgroundColor: 'hsl(34 30% 95%)', color: 'hsl(24 12% 10%)' }}
                  >
                    {project.type}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 font-sans text-[0.58rem] uppercase tracking-[0.28em] px-3 py-1.5"
                    style={{ backgroundColor: 'hsl(24 12% 10% / 0.7)', color: 'hsl(34 30% 95%)' }}
                  >
                    <MapPin className="h-3 w-3" />
                    {project.place}
                  </span>
                </div>

                {/* Gallery controls — only show if >1 image */}
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      data-cursor="link"
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/85 backdrop-blur border border-ink/10 text-ink/70 hover:text-gold hover:border-gold transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      data-cursor="link"
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/85 backdrop-blur border border-ink/10 text-ink/70 hover:text-gold hover:border-gold transition"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setImgIdx(i)}
                          aria-label={`Go to image ${i + 1}`}
                          className="h-1.5 transition-all"
                          style={{
                            width: i === imgIdx ? '1.25rem' : '0.375rem',
                            backgroundColor:
                              i === imgIdx
                                ? 'hsl(34 30% 95%)'
                                : 'hsl(34 30% 95% / 0.5)',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right — editorial story */}
            <div className="lg:col-span-6 p-7 md:p-10 lg:p-12 overflow-y-auto" style={{ maxHeight: '92vh' }}>
              <p
                className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-4"
                style={{ color: 'hsl(32 31% 46%)' }}
              >
                {project.year} · Case study
              </p>
              <h2
                className="font-display font-light tracking-[-0.02em] leading-[0.98] mb-6"
                style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', color: 'hsl(24 12% 10%)' }}
              >
                {project.title}
              </h2>

              {/* Stats line */}
              <div
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 pb-6 border-b"
                style={{ borderColor: 'hsl(24 12% 10% / 0.1)' }}
              >
                {project.stats?.guests && (
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.26em]"
                    style={{ color: 'hsl(24 12% 10% / 0.65)' }}
                  >
                    <Users className="h-3 w-3" />
                    {project.stats.guests} guests
                  </span>
                )}
                {project.stats?.days && (
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.26em]"
                    style={{ color: 'hsl(24 12% 10% / 0.65)' }}
                  >
                    <CalendarDays className="h-3 w-3" />
                    {project.stats.days} {project.stats.days === 1 ? 'day' : 'days'}
                  </span>
                )}
                {project.stats?.city && (
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.26em]"
                    style={{ color: 'hsl(24 12% 10% / 0.65)' }}
                  >
                    <MapPin className="h-3 w-3" />
                    {project.stats.city}
                  </span>
                )}
              </div>

              {/* Three editorial blocks */}
              <Block label="The brief" body={project.brief} />
              <Block label="Our mindset" body={project.mindset} accent />
              <Block label="What we did" body={project.outcome} />

              {/* Vendor credits */}
              {project.vendors?.length > 0 && (
                <div className="mt-8">
                  <p
                    className="font-sans text-[0.58rem] uppercase tracking-[0.28em] mb-3"
                    style={{ color: 'hsl(32 31% 46%)' }}
                  >
                    — Vendors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.vendors.map((v) => (
                      <Badge key={v} variant="outline" size="sm">{v}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <Ornament className="my-10" />

              {/* Lead-grab footer */}
              <CallbackCard
                context={`I'd like a wedding like "${project.title}" (${project.type}, ${project.place})`}
                compact
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

function Block({ label, body, accent = false }) {
  return (
    <div className="mb-7">
      <p
        className="font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-3"
        style={{ color: 'hsl(32 31% 46%)' }}
      >
        — {label}
      </p>
      <p
        className={`font-sans font-light text-base leading-relaxed ${accent ? 'italic font-display text-lg md:text-xl' : ''}`}
        style={{
          color: accent ? 'hsl(24 12% 10%)' : 'hsl(24 12% 10% / 0.72)',
        }}
      >
        {body}
      </p>
    </div>
  )
}
