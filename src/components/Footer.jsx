import React from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onNavigateAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{ backgroundColor: '#111111' }}
      className="bg-[#111111] bg-onyx text-neutral-300 border-t border-neutral-800"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800 items-start">
          
          {/* Col 1: Brand & Taglines */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-sans">
              Manufacture and wholesale supply of synthetic chemical solutions, PVA gums, lamination resins, and specialty adhesives for packaging and converting plants.
            </p>
            <div className="font-mono text-[10px] text-neutral-400 space-y-1 pt-2 uppercase tracking-wider">
              <p>"QUALITY YOU CAN TRUST"</p>
              <p>"STRONGER SOLUTIONS FOR A BETTER TOMORROW"</p>
              <p>"BUILDING STRONGER BONDS, DELIVERING EXCELLENCE"</p>
            </div>
          </div>

          {/* Col 2: Product Formulations Index */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block">
              FORMULATION ROSTER
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#products" className="hover:text-white transition-colors">01 / PVA GUM</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">02 / VRC LAMINATION</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">03 / SHORT GUM</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">04 / FEVICOL</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">05 / THICK GUM</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">06 / CYLIKET OIL</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">07 / LIQUID GUM</a></li>
            </ul>
          </div>

          {/* Col 3: Exact Location & Phone Contacts */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block">
              FACILITY &amp; SIVAKASI CONTACTS
            </span>
            <div className="space-y-3">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Plant Address:</span>
                <p className="text-neutral-200 font-sans text-xs pt-0.5">
                  1011 National Colony,<br />
                  Sivakasi - 626189,<br />
                  Tamil Nadu, India.
                </p>
              </div>

              <div className="pt-1 space-y-1">
                <span className="text-neutral-500 block text-[10px] uppercase">Direct Dispatch Lines:</span>
                <a href="tel:9787329451" className="block text-white hover:underline text-sm">
                  +91 97873 29451
                </a>
                <a href="tel:9786012365" className="block text-neutral-300 hover:text-white text-sm">
                  +91 97860 12365
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} MANI POLYMERS. ALL RIGHTS RESERVED.
          </p>

          {/* Designed by Aincuru */}
          <a
            href="https://www.aincuru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-neutral-800 hover:border-neutral-600 bg-[#161616] hover:bg-[#1f1f1f] transition-all duration-200 group rounded-none"
            title="Aincuru - Context Creates Intelligence"
          >
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-200 transition-colors">
              Designed by
            </span>
            <img
              src="/images/aincuru-logo-light.png"
              alt="Aincuru"
              className="h-5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </a>

          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateAdmin}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              [Admin Terminal]
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Top</span>
              <ArrowUp strokeWidth={1.5} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
