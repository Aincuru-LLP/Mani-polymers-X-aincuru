# 🏭 Mani Polymers - High-Converting Industrial Landing Page & Admin Portal

A high-converting, CRO-optimized web application and lead-management dashboard for **Mani Polymers**, an adhesive & chemical solutions manufacturer based in Sivakasi, Tamil Nadu.

Built with **React**, **Tailwind CSS**, **Lucide Icons**, **Express.js**, and **Neon Serverless PostgreSQL**.

---

## 🌟 Key Highlights & Features

1. **Conversion Rate Optimization (CRO) Focused UI/UX:**
   - Designed around industrial buyer psychology (printing presses, packaging plants, carton factories).
   - Brand color system: Deep Navy Blue (`#0b192e`), Crimson Red (`#dc2626`) accents & CTAs, and Industrial Gold badges.
   - Prominent trust signals: 500+ industrial clients, Sivakasi manufacturing direct pricing, batch consistency assurance.
2. **Interactive Industrial Product Catalog:**
   - 7 core adhesive formulations: `PVA GUM`, `VRC LAMINATION`, `SHORT GUM`, `FEVICOL`, `THICK GUM`, `CYLIKET OIL`, and `LIQUID GUM`.
   - "Inquire for this Product" buttons automatically scroll down and pre-select the product in the inquiry form.
3. **Packaging Standards Showcase:**
   - 3D visual representations of **50-Liter Blue Industrial Jerrycans**, **20-Liter Canisters**, and **50-KG White Woven Sacks**.
4. **Dual-Action Lead Generation Form (Critical Flow):**
   - **Step 1:** Form data (Name, Company, Phone, Product, Message, Timestamp, IP) is immediately saved to **Neon Serverless PostgreSQL** via `POST /api/leads`.
   - **Step 2:** Form dynamically constructs a formatted WhatsApp link with customer details and redirects to `+919787329451` (or secondary `+919786012365`).
5. **Secure Admin Dashboard (`#admin` or `/admin`):**
   - Protected with user authentication:
     - **Email:** `maniadmin@mani.com`
     - **Password:** `mani@2026`
   - Real-time lead metrics (Total, New/Pending, Contacted, Converted).
   - Live search, product filter, status selector (`New`, `Contacted`, `Quoted`, `Converted`, `Closed`).
   - One-click direct WhatsApp chat link with the inquirer.
   - One-click CSV export (`mani-polymers-leads-YYYY-MM-DD.csv`).
6. **🍌 Nano Banana Image Prompts:**
   - Dedicated prompt templates in `NANO_BANANA_PROMPTS.md` for generating photorealistic hero factory shots, 3D jerrycans, and woven sacks.

---

## 📁 Project Architecture

```
mani-polymers-project/
├── .env                         # Neon DB URL, port & admin credentials
├── .env.example
├── NANO_BANANA_PROMPTS.md       # Exact image prompts for Nano Banana tool
├── package.json                 # Unified npm scripts & dependencies
├── server/
│   ├── db.js                    # Neon PostgreSQL pg.Pool connection
│   ├── schema.sql               # PostgreSQL DDL table & index scripts
│   ├── init-db.js               # Auto-migration & connection verification
│   └── index.js                 # Express REST API (Leads & Admin auth)
├── public/
│   └── images/
│       ├── hero-factory.jpg     # Hero background factory image
│       ├── container-50l.jpg    # 3D render of 50L Blue Jerrycan
│       └── sack-packaging.jpg   # 3D render of 50KG White Woven Sack
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky nav with logo & "Get a Quote" CTA
│   │   ├── Hero.jsx             # Value proposition, stats & hero visuals
│   │   ├── TrustBadges.jsx      # 4-column USP cards (Quality, Price, Delivery)
│   │   ├── Products.jsx         # 7 products with specs & one-click inquiry
│   │   ├── PackagingSection.jsx # 50L, 20L cans & woven sack showcase
│   │   ├── AboutSection.jsx     # Sivakasi manufacturing excellence
│   │   ├── LeadForm.jsx         # The CRO Lead Form (Neon DB + WhatsApp)
│   │   ├── AdminDashboard.jsx   # Auth-protected lead management portal
│   │   ├── Footer.jsx           # Sivakasi address, phone numbers & links
│   │   └── WhatsAppFloat.jsx    # Sticky floating WhatsApp connect button
│   ├── App.jsx                  # Main view coordinator & route switcher
│   ├── index.css                # Tailwind directives & industrial styling
│   └── main.jsx                 # React root entrypoint
├── index.html                   # SEO-optimized HTML5 document
├── tailwind.config.js           # Brand design tokens & custom colors
├── postcss.config.js
└── vite.config.js               # Vite config with backend API proxy
```

---

## 🗄️ Neon PostgreSQL Table Schema

Execute the following DDL in your Neon SQL console or run `npm run db:init`:

```sql
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company_name VARCHAR(200),
    phone VARCHAR(30) NOT NULL,
    product VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Quoted', 'Converted', 'Closed'
    source VARCHAR(50) DEFAULT 'Landing Page Web Form',
    ip_address VARCHAR(60),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_product ON leads (product);
```

---

## ⚙️ Environment Configuration (`.env`)

```env
# Neon Serverless PostgreSQL Connection String
DATABASE_URL=postgresql://neondb_owner:npg_8fmPEgUNh0ra@ep-misty-dawn-aysmkxwm-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Server Configuration
PORT=5000

# Admin Portal Credentials
ADMIN_EMAIL=maniadmin@mani.com
ADMIN_PASSWORD=mani@2026

# Factory WhatsApp Dispatch Numbers
WHATSAPP_PRIMARY=919787329451
WHATSAPP_SECONDARY=919786012365

# Vite Development Server Proxy
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Database Connectivity & Schema
```bash
npm run db:init
```

### 3. Run Application Locally
Run both the Express API server (Port `5000`) and the Vite React frontend (Port `3000`) concurrently with one command:
```bash
npm run dev
```

* **Landing Page:** Open [http://localhost:3000](http://localhost:3000)
* **Admin Portal:** Open [http://localhost:3000#admin](http://localhost:3000#admin) or click the **Admin** button in the header.

---

## 🔐 Admin Dashboard Credentials
* **URL:** `http://localhost:3000#admin`
* **Admin Email:** `maniadmin@mani.com`
* **Admin Password:** `mani@2026`

---

## 📞 Factory Contact Information
* **Factory Address:** 1011 National Colony, Sivakasi - 626189, Tamil Nadu, India.
* **Direct Numbers:** +91 97873 29451 | +91 97860 12365
