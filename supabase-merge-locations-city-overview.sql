-- Merge city_overview into investment_locations
-- This script adds city_overview fields to investment_locations and migrates data

-- Step 1: Add new columns from city_overview to investment_locations
ALTER TABLE investment_locations ADD COLUMN IF NOT EXISTS hero_image_url TEXT;
ALTER TABLE investment_locations ADD COLUMN IF NOT EXISTS highlights JSONB;

-- Step 2: Update existing records with data from city_overview
-- Match by city name
UPDATE investment_locations il
SET
  hero_image_url = co.hero_image_url,
  highlights = co.highlights,
  description = COALESCE(il.description, co.description),
  price_per_sqm_eur_min = COALESCE(il.price_per_sqm_eur_min, co.avg_price_per_sqm_eur_min),
  price_per_sqm_eur_max = COALESCE(il.price_per_sqm_eur_max, co.avg_price_per_sqm_eur_max),
  price_per_sqm_usd_min = COALESCE(il.price_per_sqm_usd_min, co.avg_price_per_sqm_usd_min),
  price_per_sqm_usd_max = COALESCE(il.price_per_sqm_usd_max, co.avg_price_per_sqm_usd_max),
  price_per_sqm_gbp_min = COALESCE(il.price_per_sqm_gbp_min, co.avg_price_per_sqm_gbp_min),
  price_per_sqm_gbp_max = COALESCE(il.price_per_sqm_gbp_max, co.avg_price_per_sqm_gbp_max),
  days_to_rent_avg = COALESCE(il.days_to_rent_avg, co.avg_days_to_rent),
  price_growth_5y = COALESCE(il.price_growth_5y, co.price_growth_5y)
FROM city_overview co
WHERE il.city = co.city_name;

-- Step 3: For Lisbon, Dubai, Porto - also update rental yield if city_overview has better data
UPDATE investment_locations il
SET
  rental_yield_min = co.avg_rental_yield - 0.5,
  rental_yield_max = co.avg_rental_yield + 0.5
FROM city_overview co
WHERE il.city = co.city_name
  AND il.city IN ('Lisbon', 'Dubai', 'Porto')
  AND co.avg_rental_yield IS NOT NULL;

-- Step 4: Drop the city_overview table (after confirming data is merged)
-- IMPORTANT: Review the merged data first before running this!
-- DROP TABLE IF EXISTS city_overview;

-- To verify the merge, run this query:
-- SELECT city, country, is_preferred, hero_image_url, highlights, description FROM investment_locations WHERE city IN ('Lisbon', 'Dubai', 'Porto');
