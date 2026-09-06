import React from 'react';
import { motion } from 'framer-motion';

/**
 * Mani Polymers Official Architectural Mark & Logotype
 * 
 * Concept: An architectural interlocking polymer lattice forming a structural 'M',
 * encased within a precision hexagonal chemical bond matrix.
 * Represents: Chemical synthesis, polymer cross-linking, and high tensile bond strength.
 */
export default function Logo({
  variant = 'dark', // 'dark' (for light backgrounds) | 'light' (for dark backgrounds)
  size = 'md', // 'sm' | 'md' | 'lg'
  showMarkOnly = false,
  showSubtitle = true,
  className = '',
}) {
  const isLight = variant === 'light';
  const strokeColor = isLight ? '#FFFFFF' : '#111111';
  const textColor = isLight ? 'text-white' : 'text-neutral-950';
  const subtextColor = isLight ? 'text-neutral-400' : 'text-neutral-500';

  // Sizing definitions
  const dimensions = {
    sm: { icon: 26, text: 'text-lg', subtext: 'text-[8px]', gap: 'gap-2.5' },
    md: { icon: 34, text: 'text-2xl', subtext: 'text-[9px]', gap: 'gap-3.5' },
    lg: { icon: 44, text: 'text-3xl', subtext: 'text-[10px]', gap: 'gap-4' },
  }[size] || { icon: 34, text: 'text-2xl', subtext: 'text-[9px]', gap: 'gap-3.5' };

  return (
    <div className={`inline-flex items-center ${dimensions.gap} select-none ${className}`}>
      
      {/* Structural Vector Mark */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex-shrink-0 relative flex items-center justify-center"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer Precision Hexagonal Reaction Cell */}
          <polygon
            points="20,2 35.5,11 35.5,29 20,38 4.5,29 4.5,11"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity={isLight ? 0.35 : 0.25}
          />

          {/* Molecular Interlocking Core Nodes (Polymer Bonds) */}
          <circle cx="20" cy="2" r="1.5" fill={strokeColor} />
          <circle cx="35.5" cy="11" r="1.5" fill={strokeColor} />
          <circle cx="35.5" cy="29" r="1.5" fill={strokeColor} />
          <circle cx="20" cy="38" r="1.5" fill={strokeColor} />
          <circle cx="4.5" cy="29" r="1.5" fill={strokeColor} />
          <circle cx="4.5" cy="11" r="1.5" fill={strokeColor} />

          {/* Architectural 'M' Cross-Linked Polymer Matrix */}
          <path
            d="M10 27V13L20 23L30 13V27"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Cross-Link High-Tensile Bar */}
          <line
            x1="13"
            y1="20"
            x2="27"
            y2="20"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity={isLight ? 0.75 : 0.65}
          />
        </svg>
      </motion.div>

      {/* Logotype (Wordmark & Industrial Metadata) */}
      {!showMarkOnly && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-serif ${dimensions.text} font-normal tracking-tight ${textColor} transition-colors`}
          >
            MANI POLYMERS
          </span>
          {showSubtitle && (
            <span
              className={`font-mono ${dimensions.subtext} uppercase tracking-[0.25em] ${subtextColor} pt-1 block`}
            >
              SYNTHETIC ADHESIVES &bull; SIVAKASI
            </span>
          )}
        </div>
      )}

    </div>
  );
}
