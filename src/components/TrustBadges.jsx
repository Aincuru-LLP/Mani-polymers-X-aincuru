import React from 'react';
import { motion } from 'framer-motion';
import { Award, Percent, Clock, HeartHandshake } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TrustBadges() {
  const pillars = [
    {
      id: '01',
      icon: Award,
      title: 'Premium Quality',
      parameter: 'Refractometer Testing',
      specification: 'Formulated with high-purity synthetic polymer chains. Every production batch undergoes refractometer solid-content verification and Brookfield viscosity calibration to prevent phase separation or nozzle crystallization.',
    },
    {
      id: '02',
      icon: Percent,
      title: 'Best Price Guarantee',
      parameter: 'Direct Reactor Wholesale',
      specification: 'Factory direct procurement from our 1011 National Colony chemical facility in Sivakasi. Complete elimination of middle-tier chemical brokers ensures stable, transparent per-litre commercial pricing.',
    },
    {
      id: '03',
      icon: Clock,
      title: 'On-Time Delivery',
      parameter: 'Regional Freight Sync',
      specification: 'Standard 50L drums and 20L canisters are maintained in constant inventory for rapid dispatch across Sivakasi, Madurai, Coimbatore, and pan-India manufacturing corridors.',
    },
    {
      id: '04',
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      parameter: 'Custom Rheology Calibration',
      specification: 'Over 500 industrial buyers rely on our formulations. We provide free 1-litre factory test samples and calibrate specific gravity, open time, and green tack to your machine speeds upon technical request.',
    },
  ];

  return (
    <section id="standards" className="py-20 sm:py-32 bg-white border-b border-neutral-200/80">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Section Index Heading with smooth reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-10 sm:mb-14 border-b border-neutral-200 gap-2"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
              SECTION // 02 &bull; TECHNICAL ASSURANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-950 tracking-tight">
              Operational Standards &amp; Factory Guarantees
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            SIVAKASI INDUSTRIAL PROTOCOL
          </span>
        </motion.div>

        {/* Responsive Domino Grid: 2x2 Grid on Mobile, 4x1 Row on Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 overflow-hidden"
        >
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FAFAFA] p-5 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300 group relative"
              >
                <div>
                  {/* Serial & 1px Stroke Icon with Micro-Rotation on Hover */}
                  <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-neutral-200/70">
                    <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                      [{item.id}]
                    </span>
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon strokeWidth={1} className="w-5 h-5 text-neutral-500 group-hover:text-neutral-950 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Title & Parameter */}
                  <h3 className="font-serif text-lg sm:text-2xl font-normal text-neutral-950 mb-1 leading-tight group-hover:text-neutral-900 transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 block mb-3 sm:mb-5">
                    {item.parameter}
                  </span>

                  {/* Factual Specification */}
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed line-clamp-4 sm:line-clamp-none">
                    {item.specification}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                  <span>VERIFIED SPEC</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-950 transition-colors"></span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
