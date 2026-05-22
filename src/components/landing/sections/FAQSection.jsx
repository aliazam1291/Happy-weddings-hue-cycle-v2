'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ══════════════════════════════════════════════════════════════
   THE EXPERIENCE — Stack & Roll Cards
   Cards stack on top of each other (like services),
   with a large rolling counter, question, and answer inside each card.
   Right side shows a stacked image collage.
══════════════════════════════════════════════════════════════ */

const experiences = [
  {
    question: 'How personalized is the experience?',
    answer: 'Every wedding begins with your story. We map heritage, aesthetic, and ritual into a living design system — from bespoke invitation suites to custom monograms, every artifact is crafted exclusively for you.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800',
    imageAlt: 'Invitation Suite',
  },
  {
    question: 'What does the timeline look like?',
    answer: 'We recommend 8 to 12 months for a fully curated production. Every milestone is mapped — venue walkthroughs, rehearsal dinners, the final reveal. Our approach ensures nothing feels rushed.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800',
    imageAlt: 'Venue Architecture',
  },
  {
    question: 'Do you handle destination celebrations?',
    answer: 'Globally. From palace grounds in Rajasthan to coastal estates in Amalfi. Our production team maintains design-system integrity across any environment — intimate or grand.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800',
    imageAlt: 'Palace Estate',
  },
  {
    question: 'Can we integrate cultural rituals?',
    answer: 'Absolutely. Every event is mapped onto a distinct production slot. We synchronize traditional rituals with contemporary pacing so that every ceremony segment flows with intention and grace.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    imageAlt: 'Cultural Ceremony',
  },
];

const TOTAL = experiences.length;

/* ── Single Stacking Card ────────────────────────────────────── */
function ExperienceCard({ exp, index, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(8% + ${index * 28}px)`,
        }}
        className="relative w-full max-w-6xl h-[520px] md:h-[560px] bg-[#F5F1E8] border border-[#C9A66B]/15 shadow-[0_12px_60px_rgba(0,0,0,0.08)] origin-top overflow-hidden flex"
      >
        {/* ── LEFT: Counter + Question + Answer ─────────────────── */}
        <div className="w-full lg:w-[55%] h-full flex flex-col justify-between p-8 md:p-12 lg:p-14 relative z-10">
          {/* Top: Kicker + Counter */}
          <div>
            <div className="flex items-baseline gap-4 mb-8">
              {/* Large rolling counter number */}
              <span className="font-display text-[7rem] md:text-[9rem] leading-none text-[#C9A66B]/10 select-none tracking-tighter font-normal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A66B] font-bold self-end mb-4">
                / {String(TOTAL).padStart(2, '0')}
              </span>
            </div>

            {/* Question */}
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-[#0E0E10] leading-[1.15] max-w-md">
              {exp.question}
            </h3>
          </div>

          {/* Bottom: Answer + Decorative line */}
          <div className="space-y-6">
            <div className="w-12 h-px bg-[#C9A66B]/30" />
            <p className="font-body text-[#3A3A42] text-sm md:text-base leading-relaxed max-w-sm opacity-80">
              {exp.answer}
            </p>
          </div>
        </div>

        {/* ── RIGHT: Image ──────────────────────────────────────── */}
        <div className="hidden lg:block w-[45%] h-full relative">
          {/* Diagonal clip overlay for premium edge */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, #F5F1E8 2%, transparent 18%)',
            }}
          />
          <img
            src={exp.image}
            alt={exp.imageAlt}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0E0E10]/25 to-transparent z-10" />
          {/* Caption */}
          <span className="absolute bottom-5 right-6 font-sans text-[9px] tracking-[0.25em] uppercase text-white/50 z-20">
            {exp.imageAlt}
          </span>
        </div>

        {/* ── Corner decorations ────────────────────────────────── */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#C9A66B]/15 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#C9A66B]/15 pointer-events-none" />
      </motion.div>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────── */
export default function FAQSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative bg-[#F8F4E9]">
      {/* ── Section Header ───────────────────────────────────── */}
      <div className="sticky top-0 h-[50vh] flex flex-col justify-end items-center text-center z-0 pb-8 px-6">
        <p className="font-sans text-[#C9A66B] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">
          Before the Celebration
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-[#0E0E10] uppercase tracking-tight leading-none">
          The Experience
        </h2>
      </div>

      {/* ── Stacking Cards ───────────────────────────────────── */}
      <div className="relative z-10 -mt-[5vh]">
        {experiences.map((exp, i) => {
          const targetScale = 1 - (TOTAL - i) * 0.03;
          return (
            <ExperienceCard
              key={i}
              exp={exp}
              index={i}
              progress={scrollYProgress}
              range={[i * (0.8 / TOTAL), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Scroll room for all cards to stack */}
      <div className="h-[200vh]" />
    </section>
  );
}
