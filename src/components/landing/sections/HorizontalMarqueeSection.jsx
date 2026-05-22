'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HorizontalMarqueeSection() {
  const targetRef = useRef(null);
  
  // Track the scroll progress of just this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Moves the text horizontally across the screen as the user scrolls down
  // Starts off-screen right, ends off-screen left
  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-100%"]);
  
  // Fade out the text toward the end of the scroll
  const opacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#F8F4E9]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x, opacity }} className="flex whitespace-nowrap will-change-transform pr-[10vw]">
          <h2 className="font-display text-[5vw] md:text-[4vw] uppercase tracking-tighter text-[#0E0E10] select-none">
            Shaadi hogae kya? <span className="text-[#C9A66B] italic font-body lowercase">nhi hue toh</span> karwa dete hai
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
