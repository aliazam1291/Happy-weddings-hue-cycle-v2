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

const faqs = [
  { q: "How early should we lock in our wedding timeline?", a: "We recommend booking 8 to 12 months in advance. Our curated experience pipeline requires careful architectural layout, mapping out everything from the Mehendi warmth to the reception's ambient lighting configurations." },
  { q: "Do you handle destination layouts or local multi-day setups?", a: "Both. Our production team travels globally, maintaining uniform design-system integrity across environments, whether it’s an intimate private estate or a grand coastal venue." },
  { q: "Can we integrate custom cultural programming into the timeline?", a: "Absolutely. Every event is mapped onto a distinct production slot. We synchronize traditional rituals with contemporary pacing to make sure no segment feels rushed." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F8F4E9] py-32 px-4 md:px-12 border-t border-[#C9A66B]/10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto space-y-16"
      >
        <motion.div variants={itemVariants} className="text-center">
          <p className="font-sans text-[#C9A66B] text-xs tracking-[0.4em] uppercase mb-3">Inquiries</p>
          <h3 className="font-display text-4xl md:text-5xl text-[#0E0E10] uppercase tracking-tight">Frequently Asked</h3>
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
      </motion.div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <motion.div 
      className="border-b border-[#0E0E10]/10 overflow-hidden transition-colors duration-500 rounded-sm"
      animate={{ backgroundColor: isOpen ? "rgba(201, 166, 107, 0.04)" : "transparent" }}
    >
      <button onClick={onClick} className="w-full flex justify-between items-center text-left group py-6 px-4 md:px-6">
        <span className={`font-sans text-lg md:text-xl transition-colors duration-500 ${isOpen ? 'text-[#C9A66B]' : 'text-[#0E0E10] group-hover:text-[#C9A66B]'}`}>
          {faq.q}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 135 : 0, color: isOpen ? "#C9A66B" : "#0E0E10" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl ml-6 font-light transition-colors duration-300 group-hover:text-[#C9A66B]"
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
            <p className="font-body text-[#0E0E10]/70 pt-2 pb-8 px-4 md:px-6 text-base md:text-lg leading-relaxed max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
