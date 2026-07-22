-- Create properties table for Featured Properties component
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name TEXT NOT NULL,
  neighborhood_name TEXT NOT NULL,
  title TEXT NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('EUR', 'USD', 'GBP')),
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL,
  area INTEGER NOT NULL,
  parking INTEGER,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  badge TEXT CHECK (badge IN ('NEW', 'EXCLUSIVE', 'FEATURED')),
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  property_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_city_neighborhood ON properties(city_name, neighborhood_name);
CREATE INDEX IF NOT EXISTS idx_properties_is_active ON properties(is_active);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- Add RLS policies (adjust based on your security requirements)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active properties
CREATE POLICY "Allow public read access to active properties"
  ON properties
  FOR SELECT
  USING (is_active = true);

-- Comment on table
COMMENT ON TABLE properties IS 'Featured investment properties displayed on neighborhood detail pages';
