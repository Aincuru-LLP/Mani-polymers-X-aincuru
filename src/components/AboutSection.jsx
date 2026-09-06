import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity, CheckCircle2, ShieldCheck, Factory } from 'lucide-react';

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const metrics = [
  { value: '50,000 L', label: 'Monthly Reactor Output', icon: Factory },
  { value: '±0.02%', label: 'Viscosity Tolerance', icon: Activity },
  { value: '100%', label: 'Pre-Dispatch Machine Tested', icon: CheckCircle2 },
  { value: '1998', label: 'Continuous Synthesis Since', icon: ShieldCheck },
];

const tenets = [
  {
    index: '01',
    title: 'Polymer Solid Concentration',
    body: 'Strict active polymer solids testing reduces water evaporation shrinkage, eliminating edge curl on laminated duplex paperboard.',
  },
  {
    index: '02',
    title: 'Rheology & Machinability',
    body: 'Thixotropic stabilization prevents nozzle crusting and roller splashing on automated folder-gluers running up to 200m/minute.',
  },
  {
    index: '03',
    title: 'Reactor-Direct Unit Economics',
    body: 'Wholesale pricing direct from our Sivakasi manufacturing vats. Zero intermediary handling ensures stable commercial unit economics.',
  },
  {
    index: '04',
    title: 'Batch-to-Batch Uniformity',
    body: 'Standardized production logging guarantees uniform tack times and drying curves, eliminating frequent machine recalibrations.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="facility"
      style={{ backgroundColor: '#111111' }}
      className="py-20 sm:py-36 bg-[#111111] bg-onyx text-neutral-100 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Heading with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={transition}
          className="flex flex-col lg:flex-row lg:items-baseline justify-between pb-6 sm:pb-8 mb-12 sm:mb-16 border-b border-neutral-800 gap-2"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
              SECTION // 05 &bull; SIVAKASI SYNTHESIS FACILITY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Chemical Synthesis &amp; Plant Operations
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            WORKS // 1011 NATIONAL COLONY, SIVAKASI - 626189
          </span>
        </motion.div>

        {/* Dynamic Metric Counter Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 mb-12 sm:mb-16"
        >
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                whileHover={{ backgroundColor: '#1f1f1f' }}
                transition={{ duration: 0.2 }}
                className="bg-[#161616] p-6 sm:p-8 space-y-2 transition-colors group"
              >
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="font-mono text-[10px] tracking-wider uppercase">METRIC 0{idx + 1}</span>
                  <Icon strokeWidth={1.2} className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-white font-normal pt-1">
                  {m.value}
                </div>
                <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                  {m.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Asymmetrical 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) with Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={transition}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
              Mani Polymers operates dedicated chemical reaction vessels in Sivakasi, Tamil Nadu—the industrial core of India's printing, fireworks, and paperboard converting industries.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
              We engineer specialized adhesives around direct plant requirements: zero foaming under high-speed doctor blades, instantaneous fiber rupture on corrugated board flaps, and thermal stability in hot industrial press environments.
            </p>

            <div className="pt-6 border-t border-neutral-800 flex items-start gap-4">
              <MapPin strokeWidth={1} className="w-5 h-5 text-neutral-400 mt-1 flex-shrink-0" />
              <div className="font-mono text-xs space-y-1">
                <span className="text-white uppercase tracking-wider block font-medium">
                  MANUFACTURING FACILITY &amp; ATELIER DISPATCH
                </span>
                <span className="text-neutral-400 block">
                  1011 National Colony, Sivakasi - 626189, Tamil Nadu, India.
                </span>
                <span className="text-neutral-500 block text-[11px]">
                  Direct Factory Logistics &bull; Road Freight Loading Bay
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): 4 Monolithic Tenets with Diagonal Stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800"
          >
            {tenets.map((tenet, idx) => (
              <motion.div
                key={tenet.index}
                whileHover={{ y: -3, backgroundColor: '#1d1d1d' }}
                transition={{ duration: 0.25 }}
                className="bg-[#191919] p-6 sm:p-8 space-y-2.5 transition-colors"
              >
                <span className="font-mono text-xs text-neutral-500 block">[{tenet.index}]</span>
                <h3 className="font-serif text-lg text-white font-normal">{tenet.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {tenet.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
