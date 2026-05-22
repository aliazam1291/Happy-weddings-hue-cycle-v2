'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const blogs = [
  { id: 1, category: "Production", title: "The Pacing Architecture of Modern Indian Weddings", date: "May 2026", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800" },
  { id: 2, category: "Design", title: "The Heritage Warm Palette: Balancing Ink, Paper, and Champagne", date: "April 2026", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" }
];

export default function BlogSection() {
  return (
    <section className="bg-[#F8F4E9] py-32 px-4 md:px-12 border-t border-[#C9A66B]/10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto space-y-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <p className="font-sans text-[#C9A66B] text-xs tracking-[0.4em] uppercase mb-3">Journal</p>
            <h3 className="font-display text-4xl md:text-5xl text-[#0E0E10] uppercase tracking-tight">Perspectives</h3>
          </div>
          <button className="font-sans text-xs uppercase tracking-widest text-[#0E0E10] border-b border-[#C9A66B] pb-1 hover:text-[#C9A66B] transition-colors">
            View All
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function BlogCard({ post }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax shift for the image
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={cardRef} className="group cursor-pointer space-y-6">
      <div className="aspect-[4/5] md:aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#F8F4E9] relative">
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#0E0E10]/0 group-hover:bg-[#0E0E10]/15 transition-colors duration-500 z-10 pointer-events-none" />
        
        {/* Inner container to hold parallax so we don't scale the transformed element directly */}
        <motion.div style={{ y, height: "124%", top: "-12%" }} className="absolute w-full left-0">
          <motion.img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </div>
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center font-sans text-[10px] tracking-widest uppercase text-[#0E0E10]/50">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h4 className="font-sans text-2xl text-[#0E0E10] group-hover:text-[#C9A66B] transition-colors duration-300 leading-snug">
          {post.title}
        </h4>
      </div>
    </div>
  );
}
