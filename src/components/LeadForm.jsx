import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2, Check, X, Phone } from 'lucide-react';

const PRODUCTS_LIST = [
  'PVA GUM',
  'VRC LAMINATION',
  'SHORT GUM',
  'FEVICOL',
  'THICK GUM',
  'CYLIKET OIL',
  'LIQUID GUM',
  '50-Liter Drum Supply',
  '20-Liter Canister Supply',
  '50 KG Woven Sack Powder',
  'Bulk Tanker / Custom Formulation',
];

function InquiryForm({ preselectedProduct, onSuccess, isModal = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: 'PVA GUM',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [targetPhone, setTargetPhone] = useState('919787329451');

  useEffect(() => {
    if (preselectedProduct) {
      const match = PRODUCTS_LIST.find(
        (p) =>
          p.toLowerCase().includes(preselectedProduct.toLowerCase()) ||
          preselectedProduct.toLowerCase().includes(p.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        product: match || preselectedProduct,
      }));
    }
  }, [preselectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Strict validation
    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    const cleanDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setError('Please provide a valid 10-digit telephone or WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      // 1. Asynchronous Database Save to Neon PostgreSQL Database
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company_name: '',
          phone: formData.phone.trim(),
          product: formData.product.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error recording inquiry into database.');
      }

      console.log('✅ Lead saved to Neon DB:', data);
      setSubmitted(true);

      // 2. WhatsApp Routing String Formatting
      const messageSegment = formData.message.trim() ? ` ${formData.message.trim()}.` : '';
      const rawWhatsAppString = `Hello Mani Polymers, my name is ${formData.name.trim()}. I am interested in ${formData.product.trim()}.${messageSegment}`;
      const encodedMessage = encodeURIComponent(rawWhatsAppString);

      // 3. Dynamic WhatsApp Redirection
      const redirectUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 700);

    } catch (err) {
      console.error('Inquiry submission failed:', err);
      setError(err.message || 'Transmission failed. Please reach us by telephone.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="py-12 text-center space-y-4"
      >
        <motion.div
          initial={{ rotate: -45, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-14 h-14 rounded-full border border-neutral-950 flex items-center justify-center mx-auto text-neutral-950"
        >
          <Check strokeWidth={1.5} className="w-7 h-7" />
        </motion.div>
        <h3 className="font-serif text-2xl font-normal text-neutral-950">
          Inquiry Recorded
        </h3>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-sans">
          Logged to Neon PostgreSQL. Launching direct WhatsApp session for <strong>{formData.product}</strong>...
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 border border-neutral-900 bg-neutral-50 text-xs font-mono text-neutral-900"
        >
          ERROR: {error}
        </motion.div>
      )}

      {/* Floating-Label: Name */}
      <div className="floating-input-group">
        <label htmlFor={isModal ? 'modal-name' : 'name'} className="floating-label">
          Full Name *
        </label>
        <input
          type="text"
          id={isModal ? 'modal-name' : 'name'}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. S. Murugesan"
          required
          className="floating-input min-h-[48px]"
        />
      </div>

      {/* Floating-Label: Phone */}
      <div className="floating-input-group">
        <label htmlFor={isModal ? 'modal-phone' : 'phone'} className="floating-label">
          Telephone / WhatsApp Number *
        </label>
        <input
          type="tel"
          id={isModal ? 'modal-phone' : 'phone'}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 98421 00000"
          required
          className="floating-input min-h-[48px]"
        />
      </div>

      {/* Floating-Label: Product Dropdown */}
      <div className="floating-input-group">
        <label htmlFor={isModal ? 'modal-product' : 'product'} className="floating-label">
          Interested Formulation *
        </label>
        <select
          id={isModal ? 'modal-product' : 'product'}
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="floating-input bg-transparent font-normal cursor-pointer min-h-[48px]"
        >
          {PRODUCTS_LIST.map((p, idx) => (
            <option key={idx} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Floating-Label: Message / Volume */}
      <div className="floating-input-group">
        <label htmlFor={isModal ? 'modal-message' : 'message'} className="floating-label">
          Requirement / Estimated Volume
        </label>
        <textarea
          id={isModal ? 'modal-message' : 'message'}
          name="message"
          rows={2}
          value={formData.message}
          onChange={handleChange}
          placeholder="e.g. Need 40 cans of 50L PVA Gum delivered to Madurai for automated carton gluer."
          className="floating-input resize-none min-h-[72px]"
        ></textarea>
      </div>

      {/* Routing Target Number with Animated Sliding Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-neutral-500 gap-2 pt-1">
        <span>Direct WhatsApp Desk:</span>
        <div className="flex items-center gap-2 p-1 bg-neutral-100 border border-neutral-200">
          <button
            type="button"
            onClick={() => setTargetPhone('919787329451')}
            className={`relative px-3 py-1.5 text-xs font-mono transition-colors duration-200 min-h-[36px] flex items-center gap-1.5 ${
              targetPhone === '919787329451' ? 'text-white' : 'text-neutral-700 hover:text-neutral-950'
            }`}
          >
            {targetPhone === '919787329451' && (
              <motion.div
                layoutId={isModal ? 'modalHotlinePill' : 'hotlinePill'}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="absolute inset-0 bg-neutral-950 -z-10 shadow-xs"
              />
            )}
            <span>9787329451</span>
          </button>

          <button
            type="button"
            onClick={() => setTargetPhone('919786012365')}
            className={`relative px-3 py-1.5 text-xs font-mono transition-colors duration-200 min-h-[36px] flex items-center gap-1.5 ${
              targetPhone === '919786012365' ? 'text-white' : 'text-neutral-700 hover:text-neutral-950'
            }`}
          >
            {targetPhone === '919786012365' && (
              <motion.div
                layoutId={isModal ? 'modalHotlinePill' : 'hotlinePill'}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="absolute inset-0 bg-neutral-950 -z-10 shadow-xs"
              />
            )}
            <span>9786012365</span>
          </button>
        </div>
      </div>

      {/* Submit Button with Framer Motion tactile feedback */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.015, backgroundColor: '#262626' }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium transition-colors rounded-none disabled:opacity-75 group min-h-[48px] shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 strokeWidth={1.5} className="w-4 h-4 animate-spin" />
              <span>Saving &bull; Launching WhatsApp...</span>
            </>
          ) : (
            <>
              <span>Save Inquiry &bull; Connect on WhatsApp</span>
              <ArrowUpRight strokeWidth={1.2} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </>
          )}
        </motion.button>
      </div>

      <p className="text-[10px] font-mono text-neutral-400 text-center uppercase tracking-wider">
        ENCRYPTED NEON POSTGRESQL &bull; INSTANT DIRECT DISPATCH
      </p>
    </form>
  );
}

export default function LeadForm({
  preselectedProduct,
  isSheetOpen = false,
  onCloseSheet,
}) {
  // Lock background scroll when mobile bottom sheet is active
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSheetOpen]);

  return (
    <>
      {/* 1. Inline Editorial Section on Page */}
      <section id="contact" className="py-20 sm:py-36 bg-[#FAFAFA] border-b border-neutral-200/80">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column (5 Cols): Factory Directory & Contact Protocol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                  SECTION // 06 &bull; CONCIERGE INQUIRY
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950 tracking-tight">
                  Inquire Formulation &amp; Request Test Sample
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Direct communication with Mani Polymers plant formulators. We calculate freight, send technical data sheets (TDS), and provide sealed 1-litre factory test samples for machine trials.
                </p>
              </div>

              {/* Direct Factory Contacts with Micro-Hover */}
              <div className="border-t border-neutral-200 pt-6 space-y-6 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Primary Technical Hotline
                  </span>
                  <a
                    href="tel:9787329451"
                    className="font-serif text-2xl font-normal text-neutral-950 hover:underline block transition-transform hover:translate-x-1 duration-200"
                  >
                    +91 97873 29451
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Commercial Sales Desk
                  </span>
                  <a
                    href="tel:9786012365"
                    className="font-serif text-2xl font-normal text-neutral-950 hover:underline block transition-transform hover:translate-x-1 duration-200"
                  >
                    +91 97860 12365
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Atelier Address
                  </span>
                  <p className="text-neutral-700 font-sans text-xs leading-relaxed">
                    1011 National Colony, Sivakasi - 626189, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-neutral-200 bg-white font-mono text-[11px] text-neutral-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                DISPATCH ASSURANCE: All orders packed in virgin 50L/20L HDPE jerrycans or 50KG woven sacks with tamper-evident seals.
              </div>
            </motion.div>

            {/* Right Column (7 Cols): The Brutalist Floating-Label Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="border border-neutral-200 bg-white p-6 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-100 font-mono text-xs text-neutral-500">
                  <span className="font-serif text-xl font-normal text-neutral-950">
                    Concierge Direct Dispatch
                  </span>
                  <span className="text-[10px]">NEON POSTGRESQL // DB-SYNC</span>
                </div>

                <InquiryForm preselectedProduct={preselectedProduct} isModal={false} />

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. Mobile iOS-Style Slide-Up Bottom Sheet Modal with Gesture Drag */}
      <AnimatePresence>
        {isSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onCloseSheet}
              className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-Up Bottom Sheet Card with Drag-to-Dismiss */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 90 || velocity.y > 400) {
                  onCloseSheet();
                }
              }}
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full sm:max-w-lg bg-white border-t sm:border border-neutral-200 shadow-2xl rounded-t-2xl sm:rounded-none max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden touch-pan-y"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* iOS Drag Handle on Mobile (Interactive visual cue) */}
              <div className="pt-3 pb-1 flex justify-center sm:hidden cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
              </div>

              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                    CONCIERGE INQUIRY PROTOCOL
                  </span>
                  <h3 id="modal-title" className="font-serif text-xl font-normal text-neutral-950">
                    Request Formulation Spec
                  </h3>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onCloseSheet}
                  className="h-11 w-11 flex items-center justify-center text-neutral-500 hover:text-neutral-950 transition-colors"
                  aria-label="Close Inquiry Drawer"
                >
                  <X strokeWidth={1.5} className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <InquiryForm
                  preselectedProduct={preselectedProduct}
                  onSuccess={onCloseSheet}
                  isModal={true}
                />
              </div>

              {/* Quick Telephone Bar */}
              <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200/80 flex items-center justify-between font-mono text-[11px] text-neutral-600">
                <span>Immediate Assistance:</span>
                <a
                  href="tel:9787329451"
                  className="flex items-center gap-1.5 text-neutral-950 font-medium hover:underline min-h-[44px]"
                >
                  <Phone strokeWidth={1.5} className="w-3.5 h-3.5" />
                  <span>+91 97873 29451</span>
                </a>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
