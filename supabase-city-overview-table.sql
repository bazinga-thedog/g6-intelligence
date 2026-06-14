-- City Overview Table
-- Stores city overview data with descriptions, highlights, and average metrics

CREATE TABLE IF NOT EXISTS city_overview (
  id SERIAL PRIMARY KEY,
  city_name VARCHAR(100) NOT NULL UNIQUE,
  hero_image_url TEXT,
  description TEXT,

  -- Key highlights (stored as JSON array of strings)
  highlights JSONB,

  -- Average metrics across the city
  avg_price_per_sqm_eur_min INTEGER,
  avg_price_per_sqm_eur_max INTEGER,
  avg_price_per_sqm_usd_min INTEGER,
  avg_price_per_sqm_usd_max INTEGER,
  avg_price_per_sqm_gbp_min INTEGER,
  avg_price_per_sqm_gbp_max INTEGER,

  avg_rental_yield DECIMAL(4,2),
  avg_days_to_rent INTEGER,

  -- 5-year price growth trend (stored as JSON array of 5 values)
  price_growth_5y JSONB,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_city_overview_name ON city_overview(city_name);

-- Insert Lisbon overview
INSERT INTO city_overview (
  city_name, hero_image_url, description, highlights,
  avg_price_per_sqm_eur_min, avg_price_per_sqm_eur_max,
  avg_price_per_sqm_usd_min, avg_price_per_sqm_usd_max,
  avg_price_per_sqm_gbp_min, avg_price_per_sqm_gbp_max,
  avg_rental_yield, avg_days_to_rent, price_growth_5y
) VALUES (
  'Lisbon',
  'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&h=600&fit=crop',
  'Portugal''s capital combines rich history with modern amenities, offering investors a unique blend of culture and growth potential. The city has seen consistent appreciation driven by international demand, golden visa programs, and a thriving tourism sector.',
  '["Growing tech hub with international companies", "Strong short-term rental market", "Golden visa residency program", "Mediterranean lifestyle and climate"]'::jsonb,
  4500, 7200,
  4900, 7800,
  3900, 6200,
  5.5, 30,
  '[9.2, 13.5, 16.8, 20.2, 23.5]'::jsonb
);

-- Insert Dubai overview
INSERT INTO city_overview (
  city_name, hero_image_url, description, highlights,
  avg_price_per_sqm_eur_min, avg_price_per_sqm_eur_max,
  avg_price_per_sqm_usd_min, avg_price_per_sqm_usd_max,
  avg_price_per_sqm_gbp_min, avg_price_per_sqm_gbp_max,
  avg_rental_yield, avg_days_to_rent, price_growth_5y
) VALUES (
  'Dubai',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=600&fit=crop',
  'A global business and tourism hub, Dubai offers investors tax-free returns, world-class infrastructure, and strong rental yields. The city continues to attract international investors with its strategic location, stability, and ambitious development plans.',
  '["Zero property tax and capital gains tax", "High rental yields (6-8% average)", "Strong expat demand and tourism", "World-class infrastructure and connectivity"]'::jsonb,
  3200, 6800,
  3500, 7400,
  2800, 6000,
  6.8, 24,
  '[8.8, 13.2, 18.5, 23.8, 27.5]'::jsonb
);

-- Insert Porto overview
INSERT INTO city_overview (
  city_name, hero_image_url, description, highlights,
  avg_price_per_sqm_eur_min, avg_price_per_sqm_eur_max,
  avg_price_per_sqm_usd_min, avg_price_per_sqm_usd_max,
  avg_price_per_sqm_gbp_min, avg_price_per_sqm_gbp_max,
  avg_rental_yield, avg_days_to_rent, price_growth_5y
) VALUES (
  'Porto',
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&h=600&fit=crop',
  'Portugal''s second city has emerged as a prime investment destination, offering excellent value compared to Lisbon while maintaining strong growth potential. The UNESCO World Heritage historic center and vibrant cultural scene attract both tourists and digital nomads.',
  '["Lower entry prices than Lisbon", "UNESCO World Heritage historic center", "Growing digital nomad community", "Excellent quality of life"]'::jsonb,
  3200, 5800,
  3500, 6300,
  2800, 5000,
  6.2, 36,
  '[10.5, 15.2, 20.5, 25.8, 30.2]'::jsonb
);

-- Enable Row Level Security
ALTER TABLE city_overview ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to city_overview"
  ON city_overview
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Allow authenticated users to update city_overview"
  ON city_overview
  FOR UPDATE
  USING (auth.role() = 'authenticated');
