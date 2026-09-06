import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Products from './components/Products';
import PackagingSection from './components/PackagingSection';
import AboutSection from './components/AboutSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileStickyCTA from './components/MobileStickyCTA';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    // Detect if user loaded /admin directly or #admin
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/admin') || hash === '#admin') {
      return 'admin';
    }
    return 'landing';
  });

  const [selectedProduct, setSelectedProduct] = useState('PVA GUM');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Listen to browser popstate and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname.includes('/admin') || window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('landing');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const toggleAdminView = () => {
    if (currentView === 'admin') {
      setCurrentView('landing');
      window.history.pushState(null, '', '/');
    } else {
      setCurrentView('admin');
      window.history.pushState(null, '', '#admin');
    }
  };

  const handleOpenInquiry = (productName) => {
    if (productName && typeof productName === 'string') {
      setSelectedProduct(productName);
    }
    setIsSheetOpen(true);
  };

  const handleSelectProduct = (prodName) => {
    setSelectedProduct(prodName);
  };

  // If Admin View is active, render full-screen Admin Dashboard
  if (currentView === 'admin') {
    return <AdminDashboard onExitAdmin={toggleAdminView} />;
  }

  // Otherwise, render High-Converting Mobile-First Landing Page
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-950 selection:text-white pb-16 md:pb-0">
      {/* 1. Header / Navigation */}
      <Navbar
        onNavigateAdmin={toggleAdminView}
        currentView={currentView}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      <main className="flex-1">
        {/* 2. Hero Section with responsive typography & tactile actions */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* 3. USPs / Trust Signals (2x2 on mobile, 4x1 on desktop) */}
        <TrustBadges />

        {/* 4. Products Section (Accordion on mobile, Dossier on desktop) */}
        <Products
          onSelectProduct={handleSelectProduct}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 5. Packaging Containment Showcase */}
        <PackagingSection
          onSelectPackaging={handleSelectProduct}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 6. About Mani Polymers / Sivakasi Facility (Dark Onyx #111111) */}
        <AboutSection />

        {/* 7. Concierge Lead Generation (Inline + iOS-style slide-up bottom sheet) */}
        <LeadForm
          preselectedProduct={selectedProduct}
          isSheetOpen={isSheetOpen}
          onCloseSheet={() => setIsSheetOpen(false)}
        />
      </main>

      {/* 8. Footer */}
      <Footer onNavigateAdmin={toggleAdminView} />

      {/* 9. Mobile-First Thumb-Zone Sticky Bar (<= md screens) */}
      <MobileStickyCTA onOpenInquiry={() => handleOpenInquiry()} />

      {/* 10. Floating Sticky WhatsApp Button (>= md screens) */}
      <WhatsAppFloat />
    </div>
  );
}
