-- Investment Locations Table
-- Stores city/location data with investment metrics

CREATE TABLE IF NOT EXISTS investment_locations (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  country_code VARCHAR(10) NOT NULL,
  is_preferred BOOLEAN DEFAULT false,
  image_url TEXT,
  description TEXT,

  -- Price per square meter in different currencies
  price_per_sqm_eur_min INTEGER,
  price_per_sqm_eur_max INTEGER,
  price_per_sqm_usd_min INTEGER,
  price_per_sqm_usd_max INTEGER,
  price_per_sqm_gbp_min INTEGER,
  price_per_sqm_gbp_max INTEGER,

  -- Rental yield range
  rental_yield_min DECIMAL(4,2),
  rental_yield_max DECIMAL(4,2),

  -- Days to rent average
  days_to_rent_avg INTEGER,

  -- 5-year price growth (stored as JSON array of 5 values)
  price_growth_5y JSONB,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_country_code ON investment_locations(country_code);
CREATE INDEX IF NOT EXISTS idx_is_preferred ON investment_locations(is_preferred);

-- Insert sample data
INSERT INTO investment_locations (
  city, country, country_code, is_preferred, image_url, description,
  price_per_sqm_eur_min, price_per_sqm_eur_max,
  price_per_sqm_usd_min, price_per_sqm_usd_max,
  price_per_sqm_gbp_min, price_per_sqm_gbp_max,
  rental_yield_min, rental_yield_max,
  days_to_rent_avg,
  price_growth_5y
) VALUES
(
  'Lisbon', 'Portugal', 'PT', true,
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
  'Capital city with historic charm and growing international appeal',
  4500, 7200, 4900, 7800, 3900, 6200,
  4.5, 6.2, 35,
  '[8.2, 12.5, 15.8, 18.2, 21.5]'::jsonb
),
(
  'Dubai', 'Dubai', 'AE', true,
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  'Dynamic metropolis with tax advantages and strong rental demand',
  3200, 6800, 3500, 7400, 2800, 6000,
  5.8, 7.5, 28,
  '[5.2, 8.5, 14.2, 19.8, 22.8]'::jsonb
),
(
  'Porto', 'Portugal', 'PT', true,
  'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
  'Coastal city with emerging market potential and strong yields',
  3200, 5800, 3500, 6300, 2800, 5000,
  5.2, 6.8, 42,
  '[6.8, 10.2, 15.5, 18.5, 25.3]'::jsonb
),
(
  'London', 'United Kingdom', 'UK', false,
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  'Global financial hub with world-class infrastructure and amenities',
  11500, 18000, 12500, 19500, 10000, 15500,
  3.2, 4.8, 21,
  '[2.8, 5.2, 8.5, 10.8, 12.1]'::jsonb
),
(
  'Singapore', 'Singapore', 'SG', false,
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
  'Stable city-state with robust governance and long-term appreciation',
  13000, 22000, 14100, 23900, 11300, 19000,
  2.5, 3.8, 18,
  '[1.2, 3.8, 6.2, 8.1, 9.5]'::jsonb
),
(
  'Manchester', 'United Kingdom', 'UK', false,
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  'Northern powerhouse with strong rental yields and growing economy',
  3800, 6200, 4100, 6700, 3300, 5400,
  4.8, 6.2, 32,
  '[2.1, -3.0, 4.5, 8.8, 11.2]'::jsonb
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE investment_locations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read locations (public data)
CREATE POLICY "Allow public read access to investment_locations"
  ON investment_locations
  FOR SELECT
  USING (true);

-- Create a policy for authenticated users to update (optional - only if you want admin access)
CREATE POLICY "Allow authenticated users to update investment_locations"
  ON investment_locations
  FOR UPDATE
  USING (auth.role() = 'authenticated');
