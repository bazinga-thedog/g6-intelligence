-- Neighborhoods Table
-- Stores neighborhood data with investment metrics

CREATE TABLE IF NOT EXISTS neighborhoods (
  id SERIAL PRIMARY KEY,
  city_id INTEGER REFERENCES investment_locations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  city_name VARCHAR(100) NOT NULL, -- Denormalized for easier queries
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

  -- Additional investment metrics
  acquisition_tax DECIMAL(4,2),
  avg_holding_time DECIMAL(4,2), -- in years
  days_available_to_rent INTEGER,

  -- Rent per square meter in different currencies
  rent_per_sqm_eur INTEGER,
  rent_per_sqm_usd INTEGER,
  rent_per_sqm_gbp INTEGER,

  -- 5-year rental growth (stored as JSON array of 5 values)
  rental_growth_5y JSONB,

  -- Average rental time
  avg_rental_time INTEGER, -- in months

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(city_name, name)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city_id ON neighborhoods(city_id);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city_name ON neighborhoods(city_name);

-- Insert Lisbon neighborhoods
INSERT INTO neighborhoods (
  city_name, name, image_url, description,
  price_per_sqm_eur_min, price_per_sqm_eur_max,
  price_per_sqm_usd_min, price_per_sqm_usd_max,
  price_per_sqm_gbp_min, price_per_sqm_gbp_max,
  rental_yield_min, rental_yield_max,
  days_to_rent_avg, price_growth_5y,
  acquisition_tax, avg_holding_time, days_available_to_rent,
  rent_per_sqm_eur, rent_per_sqm_usd, rent_per_sqm_gbp,
  rental_growth_5y, avg_rental_time
) VALUES
('Lisbon', 'Alfama', 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
 'Historic neighborhood with cobblestone streets and stunning views',
 5200, 8500, 5700, 9200, 4500, 7400,
 5.2, 6.8, 28, '[10.5, 14.2, 17.8, 21.5, 24.8]'::jsonb,
 6.5, 8.5, 22, 18, 20, 16,
 '[4.2, 5.8, 7.5, 9.2, 11.5]'::jsonb, 14),

('Lisbon', 'Chiado', 'https://images.unsplash.com/photo-1588534176924-267bb0020618?w=800',
 'Upscale area with luxury shopping and cultural attractions',
 6500, 10200, 7100, 11100, 5600, 9000,
 4.8, 6.2, 22, '[12.8, 16.5, 19.8, 23.2, 26.5]'::jsonb,
 6.5, 9.2, 18, 22, 24, 19,
 '[5.5, 7.2, 8.8, 10.5, 12.8]'::jsonb, 12),

('Lisbon', 'Belém', 'https://images.unsplash.com/photo-1581880191784-6c49c98a5af5?w=800',
 'Riverside district with historic monuments and parks',
 4800, 7200, 5200, 7800, 4100, 6300,
 4.5, 5.9, 35, '[8.5, 11.8, 15.2, 18.8, 22.1]'::jsonb,
 6.5, 7.8, 28, 15, 16, 13,
 '[3.8, 5.2, 6.8, 8.5, 10.2]'::jsonb, 15),

('Lisbon', 'Parque das Nações', 'https://images.unsplash.com/photo-1598990386997-48fd3f8d6e23?w=800',
 'Modern waterfront area with contemporary architecture',
 4200, 6500, 4600, 7100, 3600, 5600,
 5.5, 7.2, 25, '[9.2, 13.5, 17.2, 20.8, 24.5]'::jsonb,
 6.5, 6.5, 20, 16, 17, 14,
 '[4.5, 6.2, 7.8, 9.5, 11.8]'::jsonb, 13),

('Lisbon', 'Príncipe Real', 'https://images.unsplash.com/photo-1599982699571-e8e6c8e4bfbb?w=800',
 'Trendy neighborhood with garden squares and boutiques',
 5800, 9200, 6300, 10000, 5000, 8000,
 4.2, 5.8, 30, '[11.5, 15.8, 19.5, 22.8, 26.2]'::jsonb,
 6.5, 8.8, 25, 20, 22, 17,
 '[5.2, 6.8, 8.5, 10.2, 12.5]'::jsonb, 12),

('Lisbon', 'Santos', 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
 'Bohemian area with nightlife and creative scene',
 5000, 7800, 5400, 8500, 4300, 6800,
 5.0, 6.5, 32, '[9.8, 13.2, 16.8, 20.2, 23.8]'::jsonb,
 6.5, 7.5, 26, 17, 18, 15,
 '[4.8, 6.5, 8.2, 10.0, 11.8]'::jsonb, 14);

-- Insert Dubai neighborhoods
INSERT INTO neighborhoods (
  city_name, name, image_url, description,
  price_per_sqm_eur_min, price_per_sqm_eur_max,
  price_per_sqm_usd_min, price_per_sqm_usd_max,
  price_per_sqm_gbp_min, price_per_sqm_gbp_max,
  rental_yield_min, rental_yield_max,
  days_to_rent_avg, price_growth_5y,
  acquisition_tax, avg_holding_time, days_available_to_rent,
  rent_per_sqm_eur, rent_per_sqm_usd, rent_per_sqm_gbp,
  rental_growth_5y, avg_rental_time
) VALUES
('Dubai', 'Dubai Marina', 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800',
 'Waterfront living with stunning skyline views',
 4500, 8200, 4900, 8900, 3900, 7200,
 6.5, 8.2, 20, '[8.5, 12.8, 18.5, 24.2, 28.5]'::jsonb,
 4.0, 5.5, 15, 24, 26, 21,
 '[6.5, 8.8, 11.5, 14.2, 16.8]'::jsonb, 11),

('Dubai', 'Downtown Dubai', 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800',
 'Iconic location with Burj Khalifa and Dubai Mall',
 6200, 11500, 6700, 12500, 5400, 10100,
 5.2, 7.0, 18, '[10.2, 15.5, 20.8, 25.2, 29.8]'::jsonb,
 4.0, 6.2, 12, 28, 30, 24,
 '[5.8, 7.8, 10.5, 13.2, 15.8]'::jsonb, 12),

('Dubai', 'Palm Jumeirah', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
 'Exclusive island with luxury beachfront properties',
 7500, 15000, 8100, 16300, 6500, 13100,
 4.8, 6.5, 25, '[12.5, 16.8, 21.5, 26.8, 31.2]'::jsonb,
 4.0, 7.8, 18, 35, 38, 30,
 '[7.2, 9.5, 12.5, 15.2, 18.5]'::jsonb, 11),

('Dubai', 'Business Bay', 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800',
 'Central business district with modern high-rises',
 3800, 6500, 4100, 7100, 3300, 5700,
 7.0, 9.2, 22, '[7.2, 11.5, 16.8, 22.5, 26.8]'::jsonb,
 4.0, 4.8, 16, 22, 24, 19,
 '[7.8, 10.2, 13.5, 16.8, 19.5]'::jsonb, 12),

('Dubai', 'Jumeirah Beach Residence', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
 'Beachfront community with resort-style living',
 5200, 9200, 5700, 10000, 4500, 8000,
 6.2, 7.8, 24, '[9.5, 14.2, 19.5, 24.8, 29.2]'::jsonb,
 4.0, 5.8, 17, 26, 28, 22,
 '[6.8, 9.2, 12.2, 15.5, 18.2]'::jsonb, 11);

-- Insert Porto neighborhoods
INSERT INTO neighborhoods (
  city_name, name, image_url, description,
  price_per_sqm_eur_min, price_per_sqm_eur_max,
  price_per_sqm_usd_min, price_per_sqm_usd_max,
  price_per_sqm_gbp_min, price_per_sqm_gbp_max,
  rental_yield_min, rental_yield_max,
  days_to_rent_avg, price_growth_5y,
  acquisition_tax, avg_holding_time, days_available_to_rent,
  rent_per_sqm_eur, rent_per_sqm_usd, rent_per_sqm_gbp,
  rental_growth_5y, avg_rental_time
) VALUES
('Porto', 'Ribeira', 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
 'UNESCO World Heritage riverside district',
 4200, 7200, 4600, 7800, 3600, 6300,
 6.2, 8.0, 30, '[12.5, 18.2, 22.8, 27.5, 32.8]'::jsonb,
 6.5, 7.2, 24, 19, 21, 16,
 '[6.2, 8.5, 11.2, 14.5, 17.8]'::jsonb, 13),

('Porto', 'Foz do Douro', 'https://images.unsplash.com/photo-1583937443569-d9be3cddf402?w=800',
 'Coastal neighborhood with beaches and seafood restaurants',
 5500, 9200, 6000, 10000, 4800, 8000,
 4.8, 6.2, 35, '[10.2, 15.8, 20.5, 25.2, 29.8]'::jsonb,
 6.5, 9.5, 28, 22, 24, 19,
 '[4.8, 6.8, 9.2, 11.8, 14.5]'::jsonb, 14),

('Porto', 'Boavista', 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=800',
 'Modern area with shopping and business centers',
 3800, 6200, 4100, 6700, 3300, 5400,
 5.5, 7.2, 38, '[9.5, 14.8, 19.2, 24.5, 28.8]'::jsonb,
 6.5, 6.8, 30, 16, 17, 14,
 '[5.5, 7.5, 9.8, 12.5, 15.2]'::jsonb, 13),

('Porto', 'Cedofeita', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
 'Artistic neighborhood with galleries and cultural venues',
 3200, 5500, 3500, 6000, 2800, 4800,
 6.0, 7.5, 40, '[8.8, 13.5, 18.8, 23.2, 27.5]'::jsonb,
 6.5, 6.2, 32, 14, 15, 12,
 '[5.2, 7.2, 9.5, 12.2, 14.8]'::jsonb, 14);

-- Enable Row Level Security
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to neighborhoods"
  ON neighborhoods
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Allow authenticated users to update neighborhoods"
  ON neighborhoods
  FOR UPDATE
  USING (auth.role() = 'authenticated');
