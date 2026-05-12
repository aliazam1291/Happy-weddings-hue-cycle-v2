'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../landingData';

const StackCard = ({ service, index, progress, range, targetScale }) => {
  // Each card shrinks slightly to create the "10k" depth effect
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-6">
      <motion.article
        style={{ 
          scale,
          // Cards are stacked with a tighter vertical offset
          top: `calc(10% + ${index * 20}px)`, 
          backgroundColor: "#F5F1E8", // Bone
        }}
        className="relative w-full max-w-5xl h-[550px] border border-[#C9A66B]/20 shadow-2xl p-10 md:p-16 flex flex-col md:flex-row gap-10 origin-top"
      >
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="font-sans text-[#C9A66B] text-[10px] tracking-[0.4em] font-bold uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-4xl md:text-6xl text-[#0E0E10] mt-6 leading-tight">
              {service.title}
            </h3>
          </div>
          <p className="font-body text-[#3A3A42] text-lg leading-relaxed opacity-80 max-w-sm">
            {service.text}
          </p>
        </div>

        {/* Minimalist Divider */}
        <div className="hidden md:block w-px h-full bg-[#C9A66B]/10" />

        <div className="flex-1 flex items-center justify-center italic font-display text-[#C9A66B]/30 text-6xl select-none opacity-20 uppercase tracking-tighter">
          {service.title}
        </div>
      </motion.article>
    </div>
  );
};

export default function ServicesStackSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Headline opacity and scale based on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <section ref={container} className="relative bg-[#F8F4E9]">
      {/* 
        Sticky Header: Instead of a separate 100vh section, 
        this sits inside the same sticky context to eliminate the gap.
      */}
      <motion.div 
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-0 h-[40vh] flex flex-col justify-end items-center text-center z-0 pt-32 pb-10 px-6"
      >
        <p className="font-sans uppercase tracking-[0.3em] text-[#C9A66B] text-[10px] mb-2">Signature Pillars</p>
        <h2 className="font-display text-5xl md:text-7xl text-[#0E0E10] max-w-4xl leading-tight">
          Six pillars for a flawless celebration.
        </h2>
      </motion.div>

      {/* The Stacked Cards */}
      <div className="relative z-10 -mt-[10vh]">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.04);
          return (
            <StackCard 
              key={`p_${i}`} 
              index={i} 
              service={service} 
              progress={scrollYProgress} 
              range={[i * (0.8 / services.length), 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
      
      {/* Spacer to allow enough scroll room for all 6 cards */}
      <div className="h-[300vh]" />
    </section>
  );
}