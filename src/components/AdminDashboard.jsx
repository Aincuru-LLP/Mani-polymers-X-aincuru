import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  RefreshCw,
  MessageSquare,
  Phone,
  Trash2,
  Lock,
  LogOut,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import Logo from './Logo';

export default function AdminDashboard({ onExitAdmin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mani_admin_auth') === 'true';
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('All');

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), password: passwordInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Access Denied: Invalid credentials.');
      }

      localStorage.setItem('mani_admin_auth', 'true');
      localStorage.setItem('mani_admin_email', data.user.email);
      setIsAuthenticated(true);
      fetchLeads();
    } catch (err) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mani_admin_auth');
    localStorage.removeItem('mani_admin_email');
    setIsAuthenticated(false);
    setLeads([]);
  };

  // GET Request: Fetch leads from Neon PostgreSQL backend
  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/leads', window.location.origin);
      if (searchTerm) url.searchParams.append('search', searchTerm);
      if (productFilter !== 'All') url.searchParams.append('product', productFilter);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Database query error');
      }

      setLeads(data.leads || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Unable to query Neon PostgreSQL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, productFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Permanently purge lead record #${id}?`)) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert('Zero records available for export.');

    const headers = ['ID', 'Timestamp', 'Full Name', 'Phone', 'Product', 'Message', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.created_at).toISOString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.product}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      l.status || 'New',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mani-polymers-database-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      !searchTerm ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.product?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  // 1. Unauthenticated Brutalist Login Screen
  if (!isAuthenticated) {
    return (
      <div
        style={{ backgroundColor: '#111111' }}
        className="min-h-screen bg-[#111111] text-neutral-100 flex flex-col justify-center items-center px-4 sm:px-6 py-16 font-mono"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: '#191919' }}
          className="w-full max-w-md border border-neutral-800 p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-3 pb-4 border-b border-neutral-800">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block">
              AUTHENTICATION // TERMINAL
            </span>
            <Logo variant="light" size="md" showSubtitle={true} />
            <p className="text-xs text-neutral-500 pt-1">
              Neon Serverless PostgreSQL Lead Ingestion
            </p>
          </div>

          {authError && (
            <div className="p-3.5 border border-red-800 bg-red-950/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle strokeWidth={1.5} className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400">
                User ID / Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="maniadmin@mani.com"
                required
                className="w-full bg-transparent border-b border-neutral-700 focus:border-white py-3 text-sm text-white focus:outline-none rounded-none min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400">
                Passcode
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent border-b border-neutral-700 focus:border-white py-3 text-sm text-white focus:outline-none rounded-none min-h-[44px]"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={authLoading}
              className="w-full py-4 bg-white text-neutral-950 hover:bg-neutral-200 text-xs uppercase tracking-widest font-semibold transition-colors rounded-none min-h-[48px]"
            >
              {authLoading ? 'Verifying Access...' : 'Access Database Terminal'}
            </motion.button>
          </form>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
            <button
              onClick={onExitAdmin}
              className="hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              &larr; Back to Flagship
            </button>
            <span>Authorized Personnel</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Authenticated Brutalist Data Terminal
  return (
    <div
      style={{ backgroundColor: '#111111' }}
      className="min-h-screen bg-[#111111] text-neutral-200 flex flex-col font-mono"
    >
      {/* Top Header Bar */}
      <header
        style={{ backgroundColor: '#191919' }}
        className="border-b border-neutral-800 px-4 sm:px-12 py-4 sticky top-0 z-40"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" showSubtitle={false} />
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-700 px-2 py-0.5">
              NEON POSTGRESQL
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={fetchLeads}
              disabled={loading}
              className="px-3 py-2 border border-neutral-700 hover:border-neutral-400 text-neutral-300 hover:text-white transition-colors flex items-center gap-2 rounded-none min-h-[44px]"
            >
              <RefreshCw strokeWidth={1.5} className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleExportCSV}
              className="px-3 py-2 border border-neutral-600 text-neutral-200 hover:bg-white hover:text-neutral-950 transition-colors flex items-center gap-2 rounded-none min-h-[44px]"
            >
              <Download strokeWidth={1.5} className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onExitAdmin}
              className="px-3 py-2 border border-neutral-700 hover:border-neutral-400 text-neutral-300 transition-colors rounded-none min-h-[44px] flex items-center gap-1.5"
            >
              <span>Site</span>
              <ExternalLink strokeWidth={1.2} className="w-3.5 h-3.5 hidden sm:inline" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              className="h-11 w-11 flex items-center justify-center border border-neutral-700 hover:border-red-500 text-neutral-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut strokeWidth={1.5} className="w-4 h-4" />
            </motion.button>
          </div>

        </div>
      </header>

      {/* Main Terminal Body */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-12 py-6 sm:py-8 w-full flex-1 space-y-6">
        
        {/* Search & Filter Strip */}
        <div
          style={{ backgroundColor: '#191919' }}
          className="border border-neutral-800 p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between"
        >
          <div className="relative flex-1">
            <Search strokeWidth={1.5} className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, phone, product..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-400 rounded-none font-mono min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#111111] border border-neutral-800 text-neutral-300 text-xs px-4 py-2.5 rounded-none focus:outline-none min-h-[44px] cursor-pointer"
            >
              <option value="All">All Formulations</option>
              <option value="PVA GUM">PVA GUM</option>
              <option value="VRC LAMINATION">VRC LAMINATION</option>
              <option value="SHORT GUM">SHORT GUM</option>
              <option value="FEVICOL">FEVICOL</option>
              <option value="THICK GUM">THICK GUM</option>
              <option value="CYLIKET OIL">CYLIKET OIL</option>
              <option value="LIQUID GUM">LIQUID GUM</option>
            </select>
          </div>
        </div>

        {/* Database Results Container */}
        <div style={{ backgroundColor: '#191919' }} className="border border-neutral-800 overflow-hidden">
          
          {loading && (
            <div className="p-8 text-center text-xs text-neutral-500">
              Querying Neon Serverless PostgreSQL database...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-950/40 border-b border-red-800 text-red-300 text-xs">
              {error}
            </div>
          )}

          {!loading && filteredLeads.length === 0 && (
            <div className="p-12 text-center text-xs text-neutral-500 space-y-2">
              <span className="font-serif text-xl text-white block">Zero Inquiries Found</span>
              <span>Submit an inquiry from the landing page to verify real-time ingestion.</span>
            </div>
          )}

          {!loading && filteredLeads.length > 0 && (
            <>
              {/* 1. Mobile Responsive Card View (< md screens) */}
              <div className="block md:hidden divide-y divide-neutral-800">
                {filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                  const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
                    `Hello ${lead.name}, this is Mani Polymers Sivakasi regarding your inquiry for ${lead.product}.`
                  )}`;

                  return (
                    <div key={lead.id} className="p-5 space-y-4 bg-[#141414]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-neutral-500">#{lead.id}</span>
                            <span className="font-serif text-lg font-medium text-white">{lead.name}</span>
                          </div>
                          <span className="text-[11px] text-neutral-400 block pt-0.5">
                            {new Date(lead.created_at).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <span className="px-2 py-1 border border-neutral-700 bg-[#111111] text-[10px] text-neutral-300 font-mono">
                          {lead.product}
                        </span>
                      </div>

                      {lead.message && (
                        <p className="text-xs text-neutral-400 font-sans bg-[#191919] p-3 border border-neutral-800">
                          {lead.message}
                        </p>
                      )}

                      {/* Mobile Action Buttons (>= 44x44px touch targets) */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="min-h-[44px] border border-neutral-700 bg-neutral-900 text-neutral-200 flex items-center justify-center gap-2 text-xs hover:border-white transition-colors"
                        >
                          <MessageSquare strokeWidth={1.5} className="w-4 h-4 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${cleanPhone}`}
                          className="min-h-[44px] border border-neutral-700 bg-neutral-900 text-neutral-200 flex items-center justify-center gap-2 text-xs hover:border-white transition-colors"
                        >
                          <Phone strokeWidth={1.5} className="w-4 h-4 text-neutral-200" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="min-h-[44px] border border-neutral-800 hover:border-red-600 bg-neutral-900 text-neutral-400 hover:text-red-400 flex items-center justify-center gap-2 text-xs transition-colors"
                        >
                          <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                          <span>Purge</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. Desktop High-Density Data Table (>= md screens) */}
              <div className="hidden md:block overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-[#111111] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Inquirer Name</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Interested Product</th>
                      <th className="py-3 px-4">Requirement Details</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredLeads.map((lead) => {
                      const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                      const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
                        `Hello ${lead.name}, this is Mani Polymers Sivakasi regarding your inquiry for ${lead.product}.`
                      )}`;

                      return (
                        <tr key={lead.id} className="hover:bg-neutral-900/50 transition-colors">
                          <td className="py-3 px-4 text-neutral-500 font-mono">
                            #{lead.id}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-neutral-400">
                            {new Date(lead.created_at).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 px-4 font-sans font-medium text-white">
                            {lead.name}
                          </td>
                          <td className="py-3 px-4 font-mono text-neutral-300">
                            {lead.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 border border-neutral-700 bg-[#111111] text-[11px] text-neutral-300">
                              {lead.product}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-neutral-400 font-sans" title={lead.message}>
                            {lead.message || <span className="text-neutral-600 italic">No notes provided</span>}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="min-h-[44px] min-w-[44px] border border-neutral-700 hover:border-white text-neutral-300 hover:text-white transition-colors flex items-center justify-center"
                                title="Message on WhatsApp"
                              >
                                <MessageSquare strokeWidth={1.5} className="w-4 h-4" />
                              </a>
                              <a
                                href={`tel:${cleanPhone}`}
                                className="min-h-[44px] min-w-[44px] border border-neutral-700 hover:border-white text-neutral-300 hover:text-white transition-colors flex items-center justify-center"
                                title="Call"
                              >
                                <Phone strokeWidth={1.5} className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="min-h-[44px] min-w-[44px] border border-neutral-700 hover:border-red-500 text-neutral-400 hover:text-red-400 transition-colors flex items-center justify-center"
                                title="Purge Record"
                              >
                                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="p-4 bg-[#111111] border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-widest">
            <span>{filteredLeads.length} of {leads.length} Records in PostgreSQL</span>
            <span>NEON SERVERLESS ENGINE</span>
          </div>

        </div>

      </main>
    </div>
  );
}
