import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Filter } from 'lucide-react';

export const INDUSTRIAL_ROSTER = [
  {
    code: 'FORMULA-01',
    name: 'PVA GUM',
    category: 'Converting',
    classification: 'Polyvinyl Alcohol Polymer Emulsion',
    solidContent: 'High Solid Resin Content',
    packaging: '50 Ltr Jerrycan &bull; 20 Ltr Can',
    viscosityProfile: 'Controlled Fluid Emulsion',
    cureFilm: 'Dries Transparent, Rigid Fiber Bond',
    primarySubstrates: 'Kraft Paper Tubes, Bookbinding Enclosures, Carton Flaps, Spiral Cones',
    description: 'High tensile shear adhesive engineered for automated paper converting. Rapid fiber-tearing bond with minimal water absorption to prevent corrugated board warping.',
  },
  {
    code: 'FORMULA-02',
    name: 'VRC LAMINATION',
    category: 'Lamination',
    classification: 'High-Clarity Film-to-Board Resin',
    solidContent: 'Optical Grade Emulsion',
    packaging: '50 Ltr Jerrycan &bull; 20 Ltr Can',
    viscosityProfile: 'Smooth Machine Roller Flow',
    cureFilm: 'Non-Yellowing, Optical Clarity Barrier',
    primarySubstrates: 'Duplex Paperboard, BOPP Film, PVC Foil, Luxury Packaging',
    description: 'Formulated specifically for thermal and wet film lamination across offset printed packaging. Delivers micro-bubble-free adhesion with high flexural fatigue resistance.',
  },
  {
    code: 'FORMULA-03',
    name: 'SHORT GUM',
    category: 'Converting',
    classification: 'Instant-Tack Rapid-Set Adhesive',
    solidContent: 'Accelerated Polymer Matrix',
    packaging: '50 Ltr Drum &bull; 20 Ltr Can',
    viscosityProfile: 'Low-Medium Rheology',
    cureFilm: 'Instant Mechanical Tack, Clean Fracture',
    primarySubstrates: 'Automated Folder Gluers, Corrugated Cartons, High-Speed Lines',
    description: 'Calibrated for high-velocity carton folder-gluers exceeding 150m/min. Zero nozzle spitting, no stringing, and instantaneous fiber-tear within 3 to 5 seconds of compression.',
  },
  {
    code: 'FORMULA-04',
    name: 'FEVICOL',
    category: 'Heavy Duty',
    classification: 'Heavy-Duty Synthetic Resin Wood Adhesive',
    solidContent: 'High Solid Synthetic Resin',
    packaging: '50 Ltr Jerrycan &bull; 20 Ltr Can &bull; 50 KG Sack',
    viscosityProfile: 'Thick White Paste',
    cureFilm: 'Moisture-Resistant Permanent Bond',
    primarySubstrates: 'Plywood Pressing, High-Pressure Laminates, Hardwood Joinery',
    description: 'Industrial-grade synthetic resin adhesive formulated for high-pressure cold and hot press lamination. High bond strength that exceeds wood fiber rupture thresholds.',
  },
  {
    code: 'FORMULA-05',
    name: 'THICK GUM',
    category: 'Heavy Duty',
    classification: 'High-Viscosity Thixotropic Paste',
    solidContent: 'High Mineral & Polymer Body',
    packaging: '50 Ltr Drum &bull; 20 Ltr Can &bull; 50 KG Woven Sack',
    viscosityProfile: 'Ultra-Dense Paste (Non-Sagging)',
    cureFilm: 'Rigid Structural Gap-Filling Matrix',
    primarySubstrates: 'Heavy Paper Cores, Rigid Setup Boxes, Fireworks Tube Casings',
    description: 'Ultra-heavy paste adhesive engineered for non-sagging application on coarse paperboard and thick industrial paper winding where void filling is necessary.',
  },
  {
    code: 'FORMULA-06',
    name: 'CYLIKET OIL',
    category: 'Specialty',
    classification: 'Demoulding Lubricant & Protective Chemical',
    solidContent: 'Solvent-Free Chemical Compound',
    packaging: '50 Ltr Barrel &bull; 20 Ltr Canister',
    viscosityProfile: 'Free-Flowing Lubricant',
    cureFilm: 'Microscopic Release Barrier',
    primarySubstrates: 'Adhesive Applicator Rollers, Machine Guides, Industrial Moulds',
    description: 'Precision chemical release lubricant designed to prevent polymer crusting on transfer cylinders, doctor blades, and glue pots, decreasing cleanout frequency.',
  },
  {
    code: 'FORMULA-07',
    name: 'LIQUID GUM',
    category: 'Converting',
    classification: 'General Purpose Commercial Fluid Adhesive',
    solidContent: 'Standard Viscosity Formulation',
    packaging: '50 Ltr Jerrycan &bull; 20 Ltr Can',
    viscosityProfile: 'Fluid Pourable Liquid',
    cureFilm: 'Flexible Transparent Bond',
    primarySubstrates: 'Label Pasting, Envelope Seams, Manual Packing Stations',
    description: 'Dependable commercial liquid adhesive offering long open time and easy brushability for labeling, manual packaging assemblies, and general stationery manufacturing.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Formulations' },
  { id: 'Converting', label: 'Paper Converting' },
  { id: 'Lamination', label: 'Lamination & Film' },
  { id: 'Heavy Duty', label: 'Heavy Duty Paste' },
  { id: 'Specialty', label: 'Specialty & Release' },
];

export default function Products({ onSelectProduct, onOpenInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeAccordion, setActiveAccordion] = useState(0);

  const filteredRoster = selectedCategory === 'all'
    ? INDUSTRIAL_ROSTER
    : INDUSTRIAL_ROSTER.filter((item) => item.category === selectedCategory);

  const handleInquire = (productName) => {
    if (onSelectProduct) {
      onSelectProduct(productName);
    }
    if (onOpenInquiry) {
      onOpenInquiry(productName);
    } else {
      const formElement = document.getElementById('contact');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <section id="products" className="py-20 sm:py-36 bg-[#FAFAFA] border-b border-neutral-200/80">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Section Header with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 sm:pb-8 mb-8 sm:mb-12 border-b border-neutral-200 gap-4"
        >
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
              SECTION // 03 &bull; PRODUCT ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950 tracking-tight leading-tight">
              Industrial Formulation Roster
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              Synthesized under strict chemical process controls at our Sivakasi reactors. Available in standard 50 Ltr, 20 Ltr, and 50 KG containment.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            CATALOGUE // {filteredRoster.length} OF 07 ACTIVE FORMULATIONS
          </div>
        </motion.div>

        {/* Category Filter Carousel with Animated Sliding Pill */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveAccordion(0);
                  }}
                  className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-200 min-h-[44px] flex items-center ${
                    isSelected ? 'text-white' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="categorySliderPill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-neutral-950 -z-10"
                    />
                  )}
                  {!isSelected && (
                    <div className="absolute inset-0 border border-neutral-200 -z-10 bg-white/70" />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Mobile-First Accordion System (< lg screens) */}
        <div className="block lg:hidden border border-neutral-200 divide-y divide-neutral-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-neutral-200"
            >
              {filteredRoster.map((item, idx) => {
                const isOpen = activeAccordion === idx;
                return (
                  <div key={item.code} className="transition-colors">
                    
                    {/* Accordion Tap Target (>= 48px height) */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleAccordion(idx)}
                      className="w-full py-4 px-5 flex items-center justify-between text-left min-h-[52px] group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-neutral-400">
                          [{String(idx + 1).padStart(2, '0')}]
                        </span>
                        <div>
                          <h3 className="font-serif text-xl font-normal text-neutral-950">
                            {item.name}
                          </h3>
                          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block">
                            {item.classification}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="p-1"
                      >
                        <ChevronDown strokeWidth={1.5} className="w-5 h-5 text-neutral-400" />
                      </motion.div>
                    </motion.button>

                    {/* Accordion Content Drawer (Framer Motion Height & Opacity) */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-[#FAFAFA]"
                        >
                          <div className="p-5 pt-2 space-y-4 border-t border-neutral-100 text-xs">
                            <p className="text-neutral-600 leading-relaxed font-sans">
                              {item.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                              <div className="border border-neutral-200 bg-white p-2.5">
                                <span className="text-neutral-400 block text-[9px] uppercase">Packaging</span>
                                <span className="text-neutral-900 font-medium" dangerouslySetInnerHTML={{ __html: item.packaging }} />
                              </div>
                              <div className="border border-neutral-200 bg-white p-2.5">
                                <span className="text-neutral-400 block text-[9px] uppercase">Solids Grade</span>
                                <span className="text-neutral-900 font-medium">{item.solidContent}</span>
                              </div>
                            </div>

                            <div className="border border-neutral-200 bg-white p-2.5 font-mono text-[11px]">
                              <span className="text-neutral-400 block text-[9px] uppercase">Substrates</span>
                              <span className="text-neutral-800">{item.primarySubstrates}</span>
                            </div>

                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleInquire(item.name)}
                              className="w-full py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 min-h-[44px]"
                            >
                              <span>Inquire {item.name} Spec</span>
                              <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Desktop Structural Dossier Roster (>= lg screens) with Layout Animations */}
        <div className="hidden lg:block border border-neutral-200 divide-y divide-neutral-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="divide-y divide-neutral-200"
            >
              {filteredRoster.map((item, idx) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="p-8 lg:p-10 hover:bg-neutral-50/80 transition-colors duration-200 flex flex-row items-start justify-between gap-8 group relative"
                >
                  {/* Left Details */}
                  <div className="w-1/3 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                        [{String(idx + 1).padStart(2, '0')}]
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                        {item.code}
                      </span>
                      <span className="px-1.5 py-0.5 border border-neutral-200 text-[9px] font-mono uppercase text-neutral-500 bg-neutral-50">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-normal text-neutral-950 group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </h3>
                    
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 block">
                      {item.classification}
                    </span>

                    <p className="text-xs text-neutral-600 font-normal leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Middle Technical Specifications */}
                  <div className="w-1/2 grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="border border-neutral-100 bg-[#FAFAFA] p-3.5 space-y-1 transition-colors group-hover:border-neutral-200">
                      <span className="text-[10px] text-neutral-400 uppercase block">Available Packaging</span>
                      <span className="text-neutral-900 font-medium block" dangerouslySetInnerHTML={{ __html: item.packaging }} />
                    </div>

                    <div className="border border-neutral-100 bg-[#FAFAFA] p-3.5 space-y-1 transition-colors group-hover:border-neutral-200">
                      <span className="text-[10px] text-neutral-400 uppercase block">Solid Content Grade</span>
                      <span className="text-neutral-900 font-medium block">{item.solidContent}</span>
                    </div>

                    <div className="border border-neutral-100 bg-[#FAFAFA] p-3.5 space-y-1 col-span-2 transition-colors group-hover:border-neutral-200">
                      <span className="text-[10px] text-neutral-400 uppercase block">Target Industrial Substrates</span>
                      <span className="text-neutral-800 font-normal block text-[11px]">{item.primarySubstrates}</span>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="w-48 flex flex-col justify-start items-end pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInquire(item.name)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-3 border border-neutral-900 hover:bg-neutral-950 hover:text-white text-neutral-950 text-xs uppercase tracking-widest font-medium transition-all duration-200 rounded-none group/btn min-h-[44px]"
                    >
                      <span>Inquire Spec</span>
                      <ArrowUpRight strokeWidth={1.2} className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </motion.button>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bulk Chemical Supply Callout with Subtle Hover Elevation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 border border-neutral-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
              BULK TANKER &bull; 200L DRUM DISPATCH
            </span>
            <h4 className="font-serif text-xl text-neutral-950">
              High-Volume Continuous Plant Supply
            </h4>
            <p className="text-xs text-neutral-600 max-w-2xl">
              Operating automatic multi-corrugator lines or large-scale folding carton plants? We formulate specific solids percentages and ship in sealed 200L barrels or dedicated tanker loads direct from Sivakasi.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInquire('Bulk 200L / Tanker Supply')}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap rounded-none min-h-[44px]"
          >
            Request Bulk Pricing
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
