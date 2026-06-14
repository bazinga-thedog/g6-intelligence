-- Neighborhood Quality of Life Table
-- Stores lifestyle, amenities, and popularity data for neighborhoods

CREATE TABLE IF NOT EXISTS neighborhood_quality_of_life (
  id SERIAL PRIMARY KEY,
  city_name VARCHAR(100) NOT NULL,
  neighborhood_name VARCHAR(100) NOT NULL,

  -- Popularity factors (reasons why rents are high)
  popularity_factors JSONB, -- Array of strings

  -- Amenities count
  amenities_restaurants INTEGER DEFAULT 0,
  amenities_cafes INTEGER DEFAULT 0,
  amenities_supermarkets INTEGER DEFAULT 0,
  amenities_schools INTEGER DEFAULT 0,
  amenities_healthcare INTEGER DEFAULT 0,
  amenities_parks INTEGER DEFAULT 0,

  -- Transportation
  transport_metro_stations INTEGER DEFAULT 0,
  transport_bus_lines INTEGER DEFAULT 0,
  transport_tram_lines INTEGER DEFAULT 0,
  transport_walkability INTEGER DEFAULT 0, -- Percentage 0-100

  -- Lifestyle ratings
  lifestyle_nightlife VARCHAR(50),
  lifestyle_shopping VARCHAR(100),
  lifestyle_culture VARCHAR(50),
  lifestyle_safety VARCHAR(50),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(city_name, neighborhood_name)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_qol_city_neighborhood ON neighborhood_quality_of_life(city_name, neighborhood_name);

-- Insert Lisbon quality of life data
INSERT INTO neighborhood_quality_of_life (
  city_name, neighborhood_name, popularity_factors,
  amenities_restaurants, amenities_cafes, amenities_supermarkets,
  amenities_schools, amenities_healthcare, amenities_parks,
  transport_metro_stations, transport_bus_lines, transport_tram_lines, transport_walkability,
  lifestyle_nightlife, lifestyle_shopping, lifestyle_culture, lifestyle_safety
) VALUES
('Lisbon', 'Alfama',
 '["Authentic Portuguese atmosphere with historic charm", "Panoramic views from Miradouros (viewpoints)", "Fado music culture and traditional restaurants", "Walking distance to major tourist attractions", "Strong short-term rental demand", "Unique architectural character"]'::jsonb,
 85, 42, 8, 5, 3, 4,
 0, 12, 2, 95,
 'Moderate', 'Local boutiques', 'Very High', 'High'),

('Lisbon', 'Chiado',
 '["Prime central location with luxury shopping", "Cultural hub with theaters and museums", "High-end restaurants and cafes", "Premium architectural heritage", "Wealthy resident demographic", "International business presence"]'::jsonb,
 120, 68, 12, 8, 6, 3,
 2, 18, 3, 98,
 'High', 'Luxury brands', 'Very High', 'Very High');

-- Insert Dubai quality of life data
INSERT INTO neighborhood_quality_of_life (
  city_name, neighborhood_name, popularity_factors,
  amenities_restaurants, amenities_cafes, amenities_supermarkets,
  amenities_schools, amenities_healthcare, amenities_parks,
  transport_metro_stations, transport_bus_lines, transport_tram_lines, transport_walkability,
  lifestyle_nightlife, lifestyle_shopping, lifestyle_culture, lifestyle_safety
) VALUES
('Dubai', 'Dubai Marina',
 '["Waterfront living with marina views", "Modern high-rise apartments", "Beach and water sports access", "International dining and entertainment", "Expat-friendly community", "Premium lifestyle amenities"]'::jsonb,
 200, 95, 18, 12, 8, 6,
 2, 15, 1, 85,
 'Very High', 'International brands', 'Moderate', 'Very High'),

('Dubai', 'Downtown Dubai',
 '["Iconic Burj Khalifa address", "World-class shopping at Dubai Mall", "Premium corporate environment", "Luxury residential towers", "High-profile location prestige", "Maximum rental yield potential"]'::jsonb,
 250, 110, 15, 10, 12, 4,
 3, 20, 0, 80,
 'High', 'Luxury & International', 'High', 'Very High');

-- Insert Porto quality of life data
INSERT INTO neighborhood_quality_of_life (
  city_name, neighborhood_name, popularity_factors,
  amenities_restaurants, amenities_cafes, amenities_supermarkets,
  amenities_schools, amenities_healthcare, amenities_parks,
  transport_metro_stations, transport_bus_lines, transport_tram_lines, transport_walkability,
  lifestyle_nightlife, lifestyle_shopping, lifestyle_culture, lifestyle_safety
) VALUES
('Porto', 'Ribeira',
 '["UNESCO World Heritage Site", "Riverside dining and entertainment", "Historic Porto atmosphere", "Tourist hotspot with high occupancy", "Iconic Dom Luís I Bridge views", "Port wine cellars nearby"]'::jsonb,
 95, 48, 6, 4, 3, 5,
 1, 10, 1, 92,
 'High', 'Local artisans', 'Very High', 'High');

-- Insert generic fallback data for neighborhoods without specific QOL data
INSERT INTO neighborhood_quality_of_life (
  city_name, neighborhood_name, popularity_factors,
  amenities_restaurants, amenities_cafes, amenities_supermarkets,
  amenities_schools, amenities_healthcare, amenities_parks,
  transport_metro_stations, transport_bus_lines, transport_tram_lines, transport_walkability,
  lifestyle_nightlife, lifestyle_shopping, lifestyle_culture, lifestyle_safety
) VALUES
-- Lisbon - remaining neighborhoods
('Lisbon', 'Belém',
 '["Historic monuments and museums", "Riverside location with waterfront promenade", "Family-friendly atmosphere", "Famous for Portuguese pastries", "Cultural tourism appeal", "Green spaces and parks"]'::jsonb,
 70, 35, 7, 5, 4, 8,
 1, 14, 2, 88,
 'Moderate', 'Local & chains', 'Very High', 'High'),

('Lisbon', 'Parque das Nações',
 '["Modern architecture and infrastructure", "Oceanarium and entertainment venues", "Family-oriented community", "Excellent public transportation", "Shopping mall proximity", "Waterfront cycling paths"]'::jsonb,
 90, 52, 10, 8, 5, 6,
 2, 16, 0, 90,
 'Moderate', 'Modern shopping mall', 'Moderate', 'Very High'),

('Lisbon', 'Príncipe Real',
 '["Trendy and upscale neighborhood", "LGBTQ+ friendly community", "Designer boutiques and concept stores", "Garden square for relaxation", "Art galleries and antique shops", "Gourmet food scene"]'::jsonb,
 110, 60, 9, 6, 5, 4,
 1, 15, 2, 94,
 'High', 'Designer boutiques', 'High', 'Very High'),

('Lisbon', 'Santos',
 '["Bohemian and artistic atmosphere", "Design and architecture studios", "Nightlife and bar scene", "Mix of old and new charm", "Growing creative community", "Riverside location"]'::jsonb,
 95, 55, 8, 5, 4, 3,
 1, 13, 2, 91,
 'High', 'Local & vintage', 'High', 'High'),

-- Dubai - remaining neighborhoods
('Dubai', 'Palm Jumeirah',
 '["Iconic palm-shaped island", "Exclusive beachfront properties", "5-star hotels and resorts", "Private beach access", "Luxury lifestyle destination", "Status symbol address"]'::jsonb,
 180, 85, 12, 8, 10, 5,
 1, 12, 0, 75,
 'High', 'Luxury boutiques', 'Moderate', 'Very High'),

('Dubai', 'Business Bay',
 '["Central business hub", "Modern office towers", "Canal views", "Professional expat community", "High-rise living", "Close to downtown"]'::jsonb,
 160, 78, 14, 9, 8, 4,
 2, 18, 0, 82,
 'Moderate', 'Business & chains', 'Moderate', 'Very High'),

('Dubai', 'Jumeirah Beach Residence',
 '["Beach access and waterfront promenade", "The Walk - dining and entertainment", "Resort-style living", "Popular with tourists", "Water sports activities", "Family-friendly beach community"]'::jsonb,
 190, 92, 16, 11, 9, 7,
 2, 16, 1, 88,
 'Very High', 'Beachfront retail', 'Moderate', 'Very High'),

-- Porto - remaining neighborhoods
('Porto', 'Foz do Douro',
 '["Coastal location with beaches", "Upscale residential area", "Fresh seafood restaurants", "Ocean views and sunsets", "Wealthy local residents", "Relaxed beach lifestyle"]'::jsonb,
 85, 44, 8, 6, 5, 6,
 1, 12, 1, 86,
 'Moderate', 'Upscale local', 'Moderate', 'Very High'),

('Porto', 'Boavista',
 '["Modern commercial district", "Shopping centers and offices", "Well-connected transportation", "Mix of residential and business", "Contemporary architecture", "Growing neighborhood"]'::jsonb,
 80, 46, 10, 7, 6, 5,
 2, 14, 0, 85,
 'Moderate', 'Shopping malls', 'Moderate', 'High'),

('Porto', 'Cedofeita',
 '["Artistic and bohemian vibe", "Independent galleries and studios", "Vintage shops and cafes", "University student population", "Creative community", "Affordable trendy area"]'::jsonb,
 75, 50, 7, 5, 4, 4,
 1, 11, 1, 89,
 'Moderate', 'Vintage & local', 'High', 'High');

-- Enable Row Level Security
ALTER TABLE neighborhood_quality_of_life ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to neighborhood_quality_of_life"
  ON neighborhood_quality_of_life
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Allow authenticated users to update neighborhood_quality_of_life"
  ON neighborhood_quality_of_life
  FOR UPDATE
  USING (auth.role() = 'authenticated');
