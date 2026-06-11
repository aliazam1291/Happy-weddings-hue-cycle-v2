'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, Mail, Share2 } from 'lucide-react'
import { Ornament } from '@/components/motion/Ornament'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { ease } from '@/lib/motion'
import { getPost, getRelated } from '@/lib/posts'
import { BRAND, ABOUT } from '@/lib/content'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function BlogPostPage({ slug }) {
  const data = getPost(slug)
  if (!data) notFound()
  const { post, prev, next } = data
  const related = getRelated(slug)

  return (
    <main className="overflow-x-clip">
      <ReadingProgress />

      {/* Hero — parallax cover + title block below */}
      <header className="relative w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container pt-32 pb-10 md:pt-40 md:pb-14">
          <Link
            href="/blog"
            data-cursor="link"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] mb-10 transition-colors hover:text-gold"
            style={{ color: 'hsl(24 12% 10% / 0.55)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Journal
          </Link>

          <p
            className="font-sans text-[0.62rem] uppercase tracking-[0.32em] mb-6"
            style={{ color: 'hsl(32 31% 46%)' }}
          >
            — {post.category}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: ease.editorial }}
            className="font-display font-light tracking-[-0.02em] leading-[1.02] text-balance max-w-[22ch]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'hsl(24 12% 10%)' }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: ease.editorial }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-[0.7rem] uppercase tracking-[0.22em]"
            style={{ color: 'hsl(24 12% 10% / 0.6)' }}
          >
            <span>By {post.author}</span>
            <span aria-hidden>·</span>
            <span>{fmtDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
          </motion.div>
        </div>

        {/* Cover image with parallax */}
        <div className="relative h-[44vh] md:h-[68vh] w-full overflow-hidden">
          <ParallaxLayer speed={0.18} className="absolute inset-[-12%]">
            <img
              src={post.cover}
              alt=""
              data-cursor="media"
              className="h-full w-full object-cover"
              style={{ filter: 'saturate(0.88) brightness(0.95)' }}
            />
          </ParallaxLayer>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, hsl(34 30% 95%), transparent)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, hsl(34 30% 95%), transparent)' }} />
        </div>
      </header>

      <PostBody post={post} />

      {/* Author bio */}
      <section className="w-full" style={{ backgroundColor: 'hsl(34 33% 83%)' }}>
        <div className="container py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <div
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-1"
              style={{ borderColor: 'hsl(32 31% 51% / 0.4)' }}
            >
              <img
                src="https://picsum.photos/seed/hw-founder-portrait/240/240"
                alt={`${BRAND.founder}, ${BRAND.founderRole}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-9 text-center md:text-left">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] mb-3" style={{ color: 'hsl(32 31% 46%)' }}>
              — Written by
            </p>
            <h3 className="font-display text-2xl md:text-3xl mb-3" style={{ color: 'hsl(24 12% 10%)' }}>
              {post.author}, <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>{BRAND.founderRole}</span>
            </h3>
            <p className="font-sans font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0" style={{ color: 'hsl(24 12% 10% / 0.7)' }}>
              {ABOUT.founderBio.split('.').slice(0, 2).join('.') + '.'}
            </p>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="w-full py-16 md:py-24" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
          <div className="container">
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.32em] text-center mb-4" style={{ color: 'hsl(32 31% 46%)' }}>
              — Keep reading
            </p>
            <h2 className="font-display font-light text-center leading-[1.02] tracking-[-0.02em] mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'hsl(24 12% 10%)' }}>
              Related <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>notes.</span>
            </h2>
            <Ornament className="my-8 md:my-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} data-cursor="link" className="group block">
                  <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '4/3' }}>
                    <img src={p.cover} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]" style={{ filter: 'saturate(0.88) brightness(0.96)' }} />
                  </div>
                  <p className="font-sans text-[0.58rem] uppercase tracking-widest mb-2" style={{ color: 'hsl(32 31% 46%)' }}>
                    {p.category} · {p.readingTime} min
                  </p>
                  <h3 className="font-display text-lg md:text-xl tracking-[-0.01em] leading-[1.25] group-hover:text-gold transition-colors" style={{ color: 'hsl(24 12% 10%)' }}>
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="w-full border-t" style={{ backgroundColor: 'hsl(34 30% 95%)', borderColor: 'hsl(24 12% 10% / 0.08)' }}>
        <div className="container py-10 grid grid-cols-2 gap-6">
          <Link href={`/blog/${prev.slug}`} data-cursor="link" className="group block">
            <span className="flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <p className="font-display text-base md:text-lg leading-snug group-hover:text-gold transition-colors" style={{ color: 'hsl(24 12% 10%)' }}>
              {prev.title}
            </p>
          </Link>
          <Link href={`/blog/${next.slug}`} data-cursor="link" className="group block text-right">
            <span className="flex items-center justify-end gap-2 font-sans text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>
              Next
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <p className="font-display text-base md:text-lg leading-snug group-hover:text-gold transition-colors" style={{ color: 'hsl(24 12% 10%)' }}>
              {next.title}
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}

/* ─── Article body — renders structured blocks ────────────────────── */
function PostBody({ post }) {
  const bodyRef = useRef(null)
  const blocks = withLeadMagnet(post.body)

  return (
    <article
      ref={bodyRef}
      className="relative w-full py-14 md:py-20"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl">
          {blocks.map((b, i) => (
            <Block key={i} block={b} firstParaIndex={firstParaIndex(blocks)} index={i} />
          ))}

          <Ornament className="mt-16 md:mt-20" />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <ShareBar title={post.title} />
            <Link
              href="/contact"
              data-cursor="link"
              className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.22em] px-6 py-3 border border-ink/30 text-ink hover:bg-ink hover:text-ivory transition-all duration-500"
            >
              Begin a conversation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

/** Insert an inline LeadMagnet after ~60% of the body length. */
function withLeadMagnet(body) {
  const insertAt = Math.max(2, Math.floor(body.length * 0.6))
  return [...body.slice(0, insertAt), { type: 'lead' }, ...body.slice(insertAt)]
}

/** First paragraph index — the one to receive the drop cap. */
function firstParaIndex(blocks) {
  return blocks.findIndex((b) => b.type === 'p')
}

function Block({ block, firstParaIndex, index }) {
  if (block.type === 'p') {
    const dropCap = index === firstParaIndex
    return <Paragraph dropCap={dropCap}>{block.text}</Paragraph>
  }
  if (block.type === 'h2') return <SectionHeading>{block.text}</SectionHeading>
  if (block.type === 'quote') return <PullQuote text={block.text} by={block.by} />
  if (block.type === 'image') return <CaptionedImage {...block} />
  if (block.type === 'list') return <List items={block.items} />
  if (block.type === 'lead') return <InlineLeadMagnet />
  return null
}

function Paragraph({ children, dropCap }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: ease.editorial }}
      className="font-sans font-light text-[1.05rem] md:text-[1.15rem] leading-[1.75] my-6"
      style={{ color: 'hsl(24 12% 10% / 0.82)' }}
    >
      {dropCap ? (
        <>
          <span
            className="font-display float-left mr-3 leading-[0.85] mt-1"
            style={{ fontSize: 'clamp(3.6rem, 6vw, 4.8rem)', color: 'hsl(32 31% 46%)' }}
          >
            {String(children).charAt(0)}
          </span>
          {String(children).slice(1)}
        </>
      ) : (
        children
      )}
    </motion.p>
  )
}

function SectionHeading({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: ease.editorial }}
      className="font-display font-light tracking-[-0.01em] mt-14 mb-3"
      style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'hsl(24 12% 10%)' }}
    >
      {children}
    </motion.h2>
  )
}

function PullQuote({ text, by }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: ease.editorial }}
      className="relative my-14 md:my-16 pl-6 md:pl-8 border-l-2"
      style={{ borderColor: 'hsl(32 31% 51% / 0.7)' }}
    >
      <p
        className="font-display italic leading-[1.3] text-balance"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'hsl(24 12% 10% / 0.85)' }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {by && (
        <footer className="mt-4 font-sans text-[0.65rem] uppercase tracking-[0.28em]" style={{ color: 'hsl(32 31% 46%)' }}>
          — {by}
        </footer>
      )}
    </motion.blockquote>
  )
}

function CaptionedImage({ src, caption, alt = '' }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, ease: ease.editorial }}
      className="my-14 md:my-16 -mx-4 md:-mx-12 lg:-mx-20"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" style={{ filter: 'saturate(0.88) brightness(0.95)' }} />
      </div>
      {caption && (
        <figcaption
          className="mt-3 px-4 md:px-12 lg:px-20 font-sans text-[0.7rem] uppercase tracking-[0.22em]"
          style={{ color: 'hsl(24 12% 10% / 0.5)' }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}

function List({ items }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: ease.editorial }}
      className="my-8 space-y-3 font-sans font-light text-[1.05rem] md:text-[1.1rem] leading-[1.7]"
      style={{ color: 'hsl(24 12% 10% / 0.8)' }}
    >
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: 'hsl(32 31% 51%)' }} />
          <span>{it}</span>
        </li>
      ))}
    </motion.ul>
  )
}

/* ─── Inline lead magnet (slots into the article) ────────────────── */
function InlineLeadMagnet() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <motion.aside
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: ease.editorial }}
      className="relative my-16 md:my-20 -mx-4 md:mx-0 p-7 md:p-10 overflow-hidden"
      style={{ backgroundColor: 'hsl(24 12% 10%)', color: 'hsl(34 30% 95%)' }}
    >
      <p className="font-sans text-[0.6rem] uppercase tracking-widest mb-4" style={{ color: 'hsl(32 31% 60%)' }}>
        Free guide · PDF
      </p>
      <h3 className="font-display tracking-[-0.02em] leading-[1.05] mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
        The <span className="italic" style={{ color: 'hsl(32 35% 62%)' }}>planning guide.</span>
      </h3>
      <p className="font-sans text-sm md:text-base leading-relaxed mb-7 max-w-md" style={{ color: 'hsl(34 30% 95% / 0.65)' }}>
        Twelve years of timelines, vendor questions and budget patterns — distilled into a 28-page PDF. We will send it to your inbox.
      </p>
      {sent ? (
        <p className="font-display italic text-lg" style={{ color: 'hsl(32 35% 62%)' }}>
          Sent. Check your inbox in a few minutes.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) setSent(true)
          }}
          className="flex items-center gap-3 max-w-md border-b pb-2"
          style={{ borderColor: 'hsl(34 30% 95% / 0.3)' }}
        >
          <Mail className="h-4 w-4 shrink-0" style={{ color: 'hsl(32 35% 62%)' }} />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none font-sans text-sm placeholder:text-ivory/40"
            style={{ color: 'hsl(34 30% 95%)' }}
          />
          <button
            type="submit"
            data-cursor="link"
            className="font-sans text-[0.6rem] uppercase tracking-[0.22em] hover:text-gold transition-colors"
          >
            Send →
          </button>
        </form>
      )}
      <Download aria-hidden className="absolute -right-3 -bottom-3 h-28 w-28 opacity-10" strokeWidth={0.5} />
    </motion.aside>
  )
}

/* ─── Reading progress (article-scoped, fixed top, gold bar) ────── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      aria-hidden
      className="fixed left-0 top-[2px] z-[55] h-[3px] w-full"
    >
      <div className="h-full w-full" style={{ background: 'linear-gradient(to right, hsl(32 31% 51%), hsl(33 31% 70%))' }} />
    </motion.div>
  )
}

/* ─── Share bar (Web Share API + clipboard fallback) ────────────── */
function ShareBar({ title }) {
  const [copied, setCopied] = useState(false)

  const onShare = async () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      }
    } catch {
      /* user dismissed share sheet — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      data-cursor="link"
      className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] transition-colors hover:text-gold"
      style={{ color: 'hsl(24 12% 10% / 0.6)' }}
    >
      <Share2 className="h-3.5 w-3.5" />
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
