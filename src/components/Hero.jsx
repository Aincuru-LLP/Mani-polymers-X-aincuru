import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] };

const maskLineVariant = {
  hidden: { y: '105%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition },
};

export default function Hero({ onOpenInquiry }) {
  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-20 sm:pb-32 bg-[#FAFAFA] border-b border-neutral-200/80 overflow-hidden">
      
      {/* Structural Hairline Guides with subtle entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 border-x border-neutral-200/40">
          <div className="border-r border-neutral-200/30 h-full hidden lg:block col-span-4"></div>
          <div className="border-r border-neutral-200/30 h-full hidden lg:block col-span-4"></div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Staggered Motion Container */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-8 sm:space-y-12"
        >
          {/* Editorial Masked Headline Reveal */}
          <div className="max-w-5xl space-y-1 sm:space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                variants={maskLineVariant}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-neutral-950 tracking-tight leading-[0.96] sm:leading-[0.92]"
              >
                Industrial &amp; Commercial
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.div
                variants={maskLineVariant}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-neutral-950 tracking-tight leading-[0.96] sm:leading-[0.92]"
              >
                <span className="italic font-normal">Adhesive Solutions</span> You Can Trust.
              </motion.div>
            </div>
          </div>

          {/* Asymmetrical Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Industrial Copy & Technical Specs Matrix */}
            <motion.div variants={fadeIn} className="lg:col-span-5 space-y-6 sm:space-y-8">
              <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                Mani Polymers synthesizes high-solid chemical adhesives, polyvinyl alcohol emulsions, and specialty resins for automated converting lines, high-speed carton flap gluing, paper tube winding, and film lamination.
              </p>

              {/* Technical Specifications Matrix with Interactive Hover Depth */}
              <div className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-3 font-mono text-xs shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between border-b border-neutral-100 pb-2.5 transition-colors hover:text-neutral-950 group">
                  <span className="text-neutral-400 group-hover:text-neutral-600 uppercase transition-colors">Chemical Family:</span>
                  <span className="text-neutral-900 font-medium">PVA &bull; Synthetic Resins</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2.5 transition-colors hover:text-neutral-950 group">
                  <span className="text-neutral-400 group-hover:text-neutral-600 uppercase transition-colors">Standard Containment:</span>
                  <span className="text-neutral-900 font-medium">50 Ltr Drum &bull; 20 Ltr Can</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2.5 transition-colors hover:text-neutral-950 group">
                  <span className="text-neutral-400 group-hover:text-neutral-600 uppercase transition-colors">Dry Compound Packaging:</span>
                  <span className="text-neutral-900 font-medium">50 KG Woven Sack</span>
                </div>
                <div className="flex justify-between pt-0.5 transition-colors hover:text-neutral-950 group">
                  <span className="text-neutral-400 group-hover:text-neutral-600 uppercase transition-colors">Works Address:</span>
                  <span className="text-neutral-900 font-medium">1011 National Colony, Sivakasi</span>
                </div>
              </div>

              {/* Action Buttons with Micro-Interactions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#262626' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={onOpenInquiry}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium rounded-none min-h-[48px] group shadow-sm"
                >
                  <span>Inquire Now &bull; Connect on WhatsApp</span>
                  <ArrowUpRight strokeWidth={1.2} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.01, borderColor: '#171717', color: '#000' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-medium rounded-none min-h-[48px] transition-colors"
                >
                  <span>Formulation Roster</span>
                </motion.a>
              </div>

            </motion.div>

            {/* Right Column: Architectural Photography Frame with Ambient Hover */}
            <motion.div variants={fadeIn} className="lg:col-span-7 relative">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative border border-neutral-200 bg-neutral-100 p-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <motion.img
                    initial={{ scale: 1.05, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 0.92 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    src="/images/hero-factory.jpg"
                    alt="Industrial chemical manufacturing reactors at Mani Polymers Sivakasi"
                    className="w-full h-full object-cover filter grayscale contrast-110"
                  />
                  
                  {/* Status Overlay with Pulsing Viscosity Monitor Beacon */}
                  <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/90 backdrop-blur-sm text-white px-4 py-2.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span>Fig. 1.0 &bull; Sivakasi Reactor Works</span>
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
                      />
                      <span>Continuous Viscosity Monitoring</span>
                    </div>
                  </div>
                </div>

                {/* Registration Crosshairs */}
                <div className="absolute -top-2 -left-2 font-mono text-[10px] text-neutral-400 select-none">+</div>
                <div className="absolute -top-2 -right-2 font-mono text-[10px] text-neutral-400 select-none">+</div>
                <div className="absolute -bottom-2 -left-2 font-mono text-[10px] text-neutral-400 select-none">+</div>
                <div className="absolute -bottom-2 -right-2 font-mono text-[10px] text-neutral-400 select-none">+</div>
              </motion.div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>"Building Stronger Bonds, Delivering Excellence"</span>
                <span className="hidden sm:inline">Ref: MP-IND-2026</span>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
