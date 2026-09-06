-- ============================================================================
-- Mani Polymers - PostgreSQL Schema for Neon Serverless
-- ============================================================================

-- Create leads table to capture high-intent inquiries from landing page
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

-- Index on created_at for fast chronologically sorted admin queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Index on phone for quick lead deduplication or search
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);

-- Index on product for product-based analytics & filtering
CREATE INDEX IF NOT EXISTS idx_leads_product ON leads (product);

-- Comments on table columns
COMMENT ON TABLE leads IS 'Holds captured customer inquiries from Mani Polymers landing page';
COMMENT ON COLUMN leads.name IS 'Full Name of the inquirer';
COMMENT ON COLUMN leads.company_name IS 'Company or Factory name (optional)';
COMMENT ON COLUMN leads.phone IS 'Contact phone number (WhatsApp enabled)';
COMMENT ON COLUMN leads.product IS 'Adhesive or chemical solution of interest';
COMMENT ON COLUMN leads.message IS 'Specific inquiry requirement, volume or notes';
COMMENT ON COLUMN leads.status IS 'Lead follow-up workflow state';
