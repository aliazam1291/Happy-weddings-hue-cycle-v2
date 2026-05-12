'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
  { id: 'weddings', title: 'Weddings', desc: 'Curated heritage celebrations that feel expansive on camera and intimate in the room.' },
  { id: 'corporate', title: 'Corporate', desc: 'Seamless logistics meets brand storytelling for high-stakes professional environments.' },
  { id: 'launch', title: 'Product Launch', desc: 'High-production discipline designed to translate brand vision into immersive physical reality.' },
  { id: 'social', title: 'Baby Showers', desc: 'Intimate, family-centric gatherings focused on warmth, tradition, and quiet luxury.' },
];

export default function CategoryStorySection() {
  const [expanded, setExpanded] = useState('weddings');

  return (
    <section id="philosophy" className="py-24 bg-[#F8F4E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <p className="font-sans uppercase tracking-[0.3em] text-[#C9A66B] text-[10px] mb-4">Our Expertise</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#0E0E10]">Crafting diverse experiences.</h2>
        </header>

        <div className="flex flex-col md:flex-row h-[500px] gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              layout
              onMouseEnter={() => setExpanded(cat.id)}
              className={`relative cursor-pointer overflow-hidden rounded-sm border border-[#E5D2A6]/30 transition-all duration-500 ease-out ${
                expanded === cat.id ? 'flex-[3]' : 'flex-1'
              }`}
            >
              {/* Background Glassmorphism */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${
                expanded === cat.id ? 'bg-[#F5F1E8]' : 'bg-[#FAF7F0]'
              }`} />
              
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h3 className={`font-display transition-all duration-500 ${
                    expanded === cat.id ? 'text-4xl text-[#0E0E10]' : 'text-xl text-[#8A6F3A] [writing-mode:vertical-lr] md:[writing-mode:vertical-rl]'
                  }`}>
                    {cat.title}
                  </h3>
                  {expanded === cat.id && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="w-12 h-px bg-[#C9A66B]" 
                    />
                  )}
                </div>

                {expanded === cat.id && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="font-body text-[#3A3A42] text-xl leading-relaxed max-w-md">
                      {cat.desc}
                    </p>
                    <button className="mt-8 font-sans text-[10px] uppercase tracking-widest text-[#C9A66B] border-b border-[#C9A66B] pb-1 hover:text-[#0E0E10] hover:border-[#0E0E10] transition-colors">
                      View Portfolio
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}