import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const defaultMessage = encodeURIComponent(
    'Hello Mani Polymers, I am requesting technical specifications for your industrial adhesives.'
  );
  const whatsappUrl = `https://wa.me/919787329451?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Dispatch Desk" className="hidden md:flex fixed bottom-8 right-8 z-40 items-center group">
      <div className="mr-3 bg-neutral-900 text-white text-[10px] font-mono uppercase tracking-wider py-1.5 px-3 border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        WhatsApp Desk &bull; +91 97873 29451
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center border border-neutral-700 hover:border-neutral-400 transition-all duration-200 relative shadow-xl"
        title="Connect directly on WhatsApp"
      >
        <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
        <MessageSquare strokeWidth={1.5} className="w-5 h-5 text-white" />
      </a>
    </aside>
  );
}
