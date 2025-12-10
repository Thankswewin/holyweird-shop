-- HolyWeird Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_gbp INTEGER NOT NULL, -- Price in pence (e.g., £4.50 = 450)
  category TEXT NOT NULL CHECK (category IN ('housing', 'hardware', 'accessory', 'build', 'archive')),
  stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'limited', 'made_to_order', 'out_of_stock')),
  image_url TEXT,
  material TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  total_amount INTEGER NOT NULL, -- in pence
  currency TEXT DEFAULT 'gbp',
  shipping_address JSONB,
  billing_address JSONB,
  customer_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL, -- Denormalized for historical record
  quantity INTEGER DEFAULT 1,
  custom_config JSONB, -- For Dolly Builder custom configurations
  price_at_purchase INTEGER NOT NULL, -- Price at time of purchase in pence
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CONCIERGE REQUESTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS concierge_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  request_type TEXT CHECK (request_type IN ('commission', 'lifestyle', 'travel', 'sourcing', 'other')),
  message TEXT,
  attachments TEXT[], -- Array of attachment URLs
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DOLLY CONFIGURATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS dolly_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  share_id TEXT UNIQUE NOT NULL, -- Short shareable ID
  config JSONB NOT NULL, -- Full configuration object
  total_price INTEGER, -- Calculated total in pence
  user_email TEXT, -- Optional: if user was logged in
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_dolly_share_id ON dolly_configs(share_id);
CREATE INDEX IF NOT EXISTS idx_concierge_status ON concierge_requests(status);

-- =============================================
-- ROW LEVEL SECURITY (Optional but recommended)
-- =============================================
-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE concierge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE dolly_configs ENABLE ROW LEVEL SECURITY;

-- Products: Public read access
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (true);

-- Products: Only service role can modify
CREATE POLICY "Only service role can modify products" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Dolly configs: Public read by share_id
CREATE POLICY "Dolly configs are publicly readable" ON dolly_configs
  FOR SELECT USING (true);

-- Dolly configs: Anyone can create
CREATE POLICY "Anyone can create dolly configs" ON dolly_configs
  FOR INSERT WITH CHECK (true);

-- Orders: Service role only
CREATE POLICY "Orders managed by service role" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Order items: Service role only
CREATE POLICY "Order items managed by service role" ON order_items
  FOR ALL USING (auth.role() = 'service_role');

-- Concierge: Anyone can create, service role manages
CREATE POLICY "Anyone can create concierge requests" ON concierge_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role manages concierge requests" ON concierge_requests
  FOR ALL USING (auth.role() = 'service_role');
