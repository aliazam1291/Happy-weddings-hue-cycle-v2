'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ContentHubSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F8F4E9] py-32 px-4 md:px-12 border-t border-[#C9A66B]/10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24"
      >
        
        {/* LEFT COLUMN: FAQ */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div variants={itemVariants}>
            <p className="font-sans text-[#C9A66B] text-xs tracking-[0.4em] uppercase mb-3">Inquiries</p>
            <h3 className="font-display text-4xl md:text-5xl text-[#0E0E10] uppercase tracking-tight">Frequently<br />Asked</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-[#0E0E10]/10">
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx} 
                faq={faq} 
                isOpen={openIndex === idx} 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: BLOGS */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div variants={itemVariants} className="flex justify-between items-end">
            <div>
              <p className="font-sans text-[#C9A66B] text-xs tracking-[0.4em] uppercase mb-3">Journal</p>
              <h3 className="font-display text-4xl md:text-5xl text-[#0E0E10] uppercase tracking-tight">Perspectives</h3>
            </div>
            <button className="font-sans text-xs uppercase tracking-widest text-[#0E0E10] border-b border-[#C9A66B] pb-1 hover:text-[#C9A66B] transition-colors">
              View All
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Sub-component for FAQ items to handle internal state smoothly
function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-[#0E0E10]/10 py-6 overflow-hidden">
      <button onClick={onClick} className="w-full flex justify-between items-center text-left group">
        <span className={`font-sans text-lg transition-colors duration-500 ${isOpen ? 'text-[#C9A66B]' : 'text-[#0E0E10]'}`}>
          {faq.q}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-xl text-[#C9A66B]"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[#0E0E10]/70 pt-4 text-base leading-relaxed max-w-md">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for Blog Cards with smooth hover
function BlogCard({ post }) {
  return (
    <div className="group cursor-pointer space-y-4">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-[#F8F4E9] relative">
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#0E0E10]/0 group-hover:bg-[#0E0E10]/10 transition-colors duration-500 z-10" />
        
        <motion.img 
          src={post.img} 
          alt={post.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          whileHover={{ scale: 1.08 }}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center font-sans text-[10px] tracking-widest uppercase text-[#0E0E10]/50">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h4 className="font-sans text-lg text-[#0E0E10] group-hover:text-[#C9A66B] transition-colors duration-300 leading-snug">
          {post.title}
        </h4>
      </div>
    </div>
  );
}

const faqs = [
  { q: "How early should we lock in our wedding timeline?", a: "We recommend booking 8 to 12 months in advance. Our curated experience pipeline requires careful architectural layout, mapping out everything from the Mehendi warmth to the reception's ambient lighting configurations." },
  { q: "Do you handle destination layouts or local multi-day setups?", a: "Both. Our production team travels globally, maintaining uniform design-system integrity across environments, whether it’s an intimate private estate or a grand coastal venue." },
  { q: "Can we integrate custom cultural programming into the timeline?", a: "Absolutely. Every event is mapped onto a distinct production slot. We synchronize traditional rituals with contemporary pacing to make sure no segment feels rushed." }
];

const blogs = [
  { id: 1, category: "Production", title: "The Pacing Architecture of Modern Indian Weddings", date: "May 2026", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800" },
  { id: 2, category: "Design", title: "The Heritage Warm Palette: Balancing Ink, Paper, and Champagne", date: "April 2026", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" }
];
