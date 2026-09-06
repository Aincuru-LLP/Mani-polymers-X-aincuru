import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PackagingSection({ onSelectPackaging, onOpenInquiry }) {
  const vessels = [
    {
      code: 'CONTAINMENT-50L',
      title: '50-Liter High-Density Polyethylene Jerrycan',
      capacity: '50.0 Litres Fluid Tare',
      tareWeight: 'Approx 2.45 KG (Empty Container)',
      closure: 'Sealed Crimson Threaded Cap &bull; EPDM Chemical Gasket',
      stacking: 'Triple-Tier Dynamic Pallet Rating',
      image: '/images/container-50l.jpg',
      formulations: 'PVA GUM, VRC Lamination, Short Gum, Thick Gum',
      features: [
        'Reinforced vertical structural side ribs engineered for warehouse palletizing',
        'Balanced dual molded carrying handles for controlled manual decanting',
        'Chemical and solvent-inert virgin HDPE polymer resin',
      ],
    },
    {
      code: 'CONTAINMENT-20L',
      title: '20-Liter Industrial Workshop Canister',
      capacity: '20.0 Litres Fluid Tare',
      tareWeight: 'Approx 1.15 KG (Empty Container)',
      closure: 'Heavy-Duty Leakproof Cap with Inner Bung Insert',
      stacking: 'Quad-Tier Pallet Stacking',
      image: '/images/container-50l.jpg',
      formulations: 'Cyliket Oil, Short Gum, Spot Emulsions',
      features: [
        'Compact profile suitable for direct workstation placement by machine operators',
        'Anti-splash integrated pour spout to eliminate chemical wastage',
        'Uniform wall thickness preventing wall collapse under negative vacuum',
      ],
    },
    {
      code: 'CONTAINMENT-50KG',
      title: '50-KG Woven Polypropylene Sack',
      capacity: '50.0 KG Dry Weight',
      tareWeight: 'High-Tensile Polypropylene Outer Mesh',
      closure: 'Heavy Red Industrial Double Top Stitch &bull; Hermetic Inner Liner',
      stacking: 'Multi-Tier Interlocking Bag Pallets',
      image: '/images/sack-packaging.jpg',
      formulations: 'Starch Gum Powders, Dry Polymer Blends, Adhesive Granules',
      features: [
        'Co-extruded polyethylene inner liner preventing atmospheric moisture caking',
        'Anti-slip external weave structure to ensure stability during freight transit',
        'UV-stabilized fabric designed for long-distance multi-modal transport',
      ],
    },
  ];

  const handleInquire = (title) => {
    if (onSelectPackaging) {
      onSelectPackaging(title);
    }
    if (onOpenInquiry) {
      onOpenInquiry(title);
    } else {
      const formElement = document.getElementById('contact');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="packaging" className="py-20 sm:py-36 bg-white border-b border-neutral-200/80">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Section Heading with Smooth Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-baseline justify-between pb-6 sm:pb-8 mb-12 sm:mb-16 border-b border-neutral-200 gap-2"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
              SECTION // 04 &bull; CONTAINMENT ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-950 tracking-tight">
              Industrial Packaging Standards
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            SPECIFICATION // 50L &bull; 20L &bull; 50KG
          </span>
        </motion.div>

        {/* 3-Column Structural Display with Levitation Hover Model */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {vessels.map((vessel) => (
            <motion.div
              key={vessel.code}
              variants={cardVariant}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="border border-neutral-200 bg-[#FAFAFA] p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-900 transition-colors duration-300 group shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-neutral-200/70 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  <span className="group-hover:text-neutral-900 transition-colors">{vessel.code}</span>
                  <span className="font-semibold text-neutral-900">{vessel.capacity}</span>
                </div>

                {/* Container Photo Frame with Levitation on Card Hover */}
                <div className="relative aspect-square w-full bg-neutral-200/50 flex items-center justify-center p-4 sm:p-6 mb-6 border border-neutral-200 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    src={vessel.image}
                    alt={vessel.title}
                    className="w-4/5 h-4/5 object-contain filter grayscale contrast-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 font-mono text-[9px] text-neutral-500 uppercase bg-white/90 px-2 py-0.5 border border-neutral-200 backdrop-blur-xs">
                    {vessel.capacity}
                  </div>
                </div>

                <h3 className="font-serif text-xl text-neutral-950 mb-3 group-hover:text-neutral-900 transition-colors">
                  {vessel.title}
                </h3>

                <div className="space-y-1.5 font-mono text-xs border-y border-neutral-200/70 py-3.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tare:</span>
                    <span className="text-neutral-900">{vessel.tareWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Closure:</span>
                    <span className="text-neutral-900 text-right" dangerouslySetInnerHTML={{ __html: vessel.closure }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Stacking:</span>
                    <span className="text-neutral-900">{vessel.stacking}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-neutral-600 font-normal">
                  {vessel.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-neutral-900 mt-2 flex-shrink-0"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/70">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInquire(`Container: ${vessel.title}`)}
                  className="w-full flex items-center justify-between px-4 py-3.5 border border-neutral-900 hover:bg-neutral-950 hover:text-white text-xs uppercase tracking-widest font-medium transition-all duration-200 rounded-none group min-h-[44px]"
                >
                  <span>Select Packaging Format</span>
                  <ArrowUpRight strokeWidth={1.2} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
