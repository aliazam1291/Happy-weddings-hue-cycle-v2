'use client';

import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const scenes = [
  {
    id: '01',
    title: 'Haldi',
    sub: 'Golden rituals & intimate laughter',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000',
  },
  {
    id: '02',
    title: 'Sangeet',
    sub: 'Rhythm, movement & celebration',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000',
  },
  {
    id: '03',
    title: 'Wedding',
    sub: 'A timeless union of souls',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000',
  },
  {
    id: '04',
    title: 'Reception',
    sub: 'An elegant modern soirée',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000',
  },
];

export default function BrandStorySection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * ACTIVE CARD DETECTION
   */

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      scenes.length - 1,
      Math.floor(latest * scenes.length)
    );

    setActiveIndex(index);
  });

  /**
   * CARD HELPERS
   */

  const getCardStyles = (index) => {
    const relative = index - activeIndex;

    /**
     * HIDDEN
     */

    if (relative < -1 || relative > 1) {
      return {
        opacity: 0,
        scale: 0.2,
        x: '120%',
        y: '120%',
        zIndex: 0,
      };
    }

    /**
     * HERO
     */

    if (relative === 0) {
      return {
        opacity: 1,
        scale: 0.96,
        x: '0%',
        y: '0%',
        zIndex: 30,
      };
    }

    /**
     * PREVIOUS / ARCHIVE
     */

    if (relative === -1) {
      return {
        opacity: 1,
        scale: 0.22,
        x: '-40%',
        y: '-40%',
        zIndex: 10,
      };
    }

    /**
     * NEXT
     */

    return {
      opacity: 1,
      scale: 0.22,
      x: '40%',
      y: '40%',
      zIndex: 20,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ECE7DC]"
      style={{
        height: `${scenes.length * 100}vh`,
      }}
    >
      {/* STICKY */}

      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* LABELS */}

        <div className="absolute top-[8%] left-[calc(50%-36vw)] z-[100] max-w-[28rem]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-px bg-[#B7A38B]" />

            <p
              className="
                text-[#8D7B68]
                uppercase
                tracking-[0.45em]
                text-[10px]
              "
            >
              Archive
            </p>
          </div>
        </div>

        <div className="absolute bottom-[8%] left-[calc(50%+36vw)] z-[100] max-w-[28rem] text-right">
          <div className="flex items-center gap-4 justify-end">
            <p
              className="
                text-[#8D7B68]
                uppercase
                tracking-[0.45em]
                text-[10px]
              "
            >
              Next Scene
            </p>

            <div className="w-14 h-px bg-[#B7A38B]" />
          </div>
        </div>

        {/* LEFT NAV */}

        <div className="absolute left-[calc(50%-36vw)] top-1/2 -translate-y-1/2 z-[100]">
          <div className="flex flex-col gap-4">
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                className="flex items-center gap-3"
              >
                <span
                  className={`
                    text-sm transition-all duration-300
                    ${
                      activeIndex === i
                        ? 'text-[#C9A66B]'
                        : 'text-[#9B8A77]'
                    }
                  `}
                >
                  {scene.id}
                </span>

                {activeIndex === i && (
                  <div className="w-6 h-px bg-[#C9A66B]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CARDS */}

        <div className="relative w-full h-full flex items-center justify-center">
          
          {scenes.map((scene, index) => {
            const styles = getCardStyles(index);

            return (
              <motion.div
                key={scene.id}
                animate={styles}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: styles.zIndex,
                  willChange: 'transform',
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="
                    relative
                    w-[70vw]
                    max-w-5xl
                    aspect-[16/9]
                    overflow-hidden
                    rounded-[20px]
                    shadow-[0_40px_120px_rgba(0,0,0,0.22)]
                  "
                >
                  {/* IMAGE */}

                  <Image
                    src={scene.img}
                    alt={scene.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-transparent" />

                  {/* CONTENT */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      justify-end
                      items-start
                      p-6
                      md:p-14
                    "
                  >
                    {/* NUMBER */}

                    <div className="mb-6">
                      <p
                        className="
                          text-[#C9A66B]
                          text-3xl
                          md:text-5xl
                          font-light
                        "
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                        }}
                      >
                        {scene.id}
                      </p>

                      <div className="w-12 h-px bg-[#C9A66B] mt-3" />
                    </div>

                    {/* TITLE */}

                    <h2
                      className="
                        text-[#F8F4E9]
                        text-5xl
                        md:text-8xl
                        leading-none
                        tracking-tight
                        font-extralight
                      "
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                      }}
                    >
                      {scene.title}
                    </h2>

                    {/* SUBTEXT */}

                    <p
                      className="
                        text-[#E7DED1]
                        text-lg
                        md:text-2xl
                        italic
                        mt-5
                        max-w-lg
                        leading-relaxed
                      "
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                      }}
                    >
                      {scene.sub}
                    </p>

                    {/* CTA */}

                    <button
                      className="
                        mt-8
                        px-8
                        py-3
                        rounded-full
                        border
                        border-[#C9A66B]
                        text-[#F8F4E9]
                        uppercase
                        tracking-[0.18em]
                        text-xs
                        transition-all
                        duration-300
                        hover:bg-[#C9A66B]
                        hover:text-black
                      "
                    >
                      Explore Story →
                    </button>
                  </div>

                  {/* CORNERS */}

                  <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-[#F8F4E9]/40 rounded-tl-2xl" />

                  <div className="absolute top-5 right-5 w-14 h-14 border-r border-t border-[#F8F4E9]/40 rounded-tr-2xl" />

                  <div className="absolute bottom-5 left-5 w-14 h-14 border-l border-b border-[#F8F4E9]/40 rounded-bl-2xl" />

                  <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-[#F8F4E9]/40 rounded-br-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}