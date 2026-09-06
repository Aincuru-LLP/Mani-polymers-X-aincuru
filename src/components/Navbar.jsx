import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onNavigateAdmin, currentView, onOpenInquiry }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for dynamic header compression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile full-screen menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Formulations', href: '#products', index: '01' },
    { label: 'Standards', href: '#standards', index: '02' },
    { label: 'Containment', href: '#packaging', index: '03' },
    { label: 'Facility', href: '#facility', index: '04' },
    { label: 'Contact', href: '#contact', index: '05' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#FAFAFA]/95 backdrop-blur-xl border-b border-neutral-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
            : 'bg-[#FAFAFA]/80 backdrop-blur-md border-b border-neutral-200/60'
        }`}
      >
        <div
          className={`max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Brand Logo & Logotype */}
          <a href="#home" className="flex items-center">
            <Logo
              variant="dark"
              size={isScrolled ? 'sm' : 'md'}
              showSubtitle={!isScrolled}
            />
          </a>

          {/* Desktop Navigation Links with Magnetic Underline Motion */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-neutral-600 hover:text-neutral-950 transition-colors duration-300 py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neutral-950 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions: Hotline & Tactile Quote Button */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="tel:9787329451"
              className="font-mono text-xs text-neutral-500 hover:text-neutral-950 transition-colors duration-200"
            >
              +91 97873 29451
            </a>

            {/* Ghost CTA Button with smooth micro-interaction */}
            <motion.button
              whileHover={{ backgroundColor: '#111111', color: '#FAFAFA', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-900 text-neutral-900 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-none group"
            >
              <span>Get a Quote</span>
              <ArrowUpRight strokeWidth={1.2} className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          </div>

          {/* Mobile Header Menu Button (>= 44x44px tap target) */}
          <div className="flex sm:hidden items-center">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="h-11 w-11 flex items-center justify-center text-neutral-950"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X strokeWidth={1.5} className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu strokeWidth={1.5} className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Sleek Full-Screen Slide-Out Mobile Menu (Framer Motion) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="sm:hidden fixed inset-0 z-40 bg-[#FAFAFA] flex flex-col justify-between pt-24 pb-12 px-8 overflow-y-auto"
          >
            {/* Top Navigation Links */}
            <div className="space-y-6 pt-4">
              <div className="pb-3 border-b border-neutral-200 flex items-center justify-between">
                <Logo size="sm" variant="dark" showSubtitle={true} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                  ARCHIVE
                </span>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * idx, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between py-2 border-b border-neutral-100 group min-h-[44px]"
                  >
                    <span className="font-serif text-3xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      [{link.index}]
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions & Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-8 border-t border-neutral-200 space-y-4"
            >
              <a
                href="tel:9787329451"
                className="flex items-center gap-3 py-3 font-mono text-sm text-neutral-900 border border-neutral-300 bg-white px-4 min-h-[48px] hover:border-neutral-900 transition-colors"
              >
                <Phone strokeWidth={1.2} className="w-4 h-4 text-neutral-900" />
                <span>Call Factory: +91 97873 29451</span>
              </a>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-4 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>Request Formulation Quote</span>
                <ArrowUpRight strokeWidth={1.2} className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
