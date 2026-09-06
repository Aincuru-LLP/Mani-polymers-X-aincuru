import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowUpRight } from 'lucide-react';

export default function MobileStickyCTA({ onOpenInquiry }) {
  const [isVisible, setIsVisible] = useState(false);

  // Show sticky CTA bar only after scrolling past top hero view (120px)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    setIsVisible(window.scrollY > 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Mobile Navigation Bar"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-xl border-t border-neutral-200/90 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3 max-w-md mx-auto">
            
            {/* Direct Call Tap Target (At least 48x48px) */}
            <motion.a
              whileTap={{ scale: 0.94 }}
              href="tel:9787329451"
              className="h-12 w-12 flex-shrink-0 border border-neutral-300 bg-white flex items-center justify-center text-neutral-900 rounded-none transition-colors shadow-xs"
              aria-label="Direct Telephone Line"
            >
              <Phone strokeWidth={1.5} className="w-5 h-5 text-neutral-900" />
            </motion.a>

            {/* Primary Thumb "Get a Quote" Button with Live Status Dot */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onOpenInquiry}
              className="h-12 flex-1 bg-neutral-950 text-white flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest font-medium rounded-none shadow-md transition-colors relative overflow-hidden"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span>Get a Quote &bull; WhatsApp</span>
              <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
            </motion.button>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
