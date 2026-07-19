-- Update price_growth_5y (annual price growth percentages) for investment_locations table
-- Based on official transaction data from 2021-2025
-- Column type is JSONB, so we use JSON array format
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

-- Portugal
UPDATE investment_locations
SET price_growth_5y = '[6.7, 3.1, 6.1, 5.1, 4.8]'::jsonb
WHERE city = 'Lisbon';

UPDATE investment_locations
SET price_growth_5y = '[2.2, 7.4, 6.5, 7.3, 4.8]'::jsonb
WHERE city = 'Porto';

UPDATE investment_locations
SET price_growth_5y = '[9.9, 17.7, 7.4, 9.4, 8.8]'::jsonb
WHERE city = 'Algarve';

-- UAE
UPDATE investment_locations
SET price_growth_5y = '[16.6, 12.7, 19.9, 27.5, 19.8]'::jsonb
WHERE city = 'Dubai';

-- United Kingdom
UPDATE investment_locations
SET price_growth_5y = '[5.5, 6.7, -4.8, 0.0, -1.0]'::jsonb
WHERE city = 'London';

UPDATE investment_locations
SET price_growth_5y = '[5.0, 14.7, 3.8, 2.3, 5.7]'::jsonb
WHERE city = 'Manchester';

UPDATE investment_locations
SET price_growth_5y = '[7.7, 13.6, -2.6, 3.3, 0.1]'::jsonb
WHERE city = 'Birmingham';

UPDATE investment_locations
SET price_growth_5y = '[9.7, 6.6, 2.8, 7.0, 5.4]'::jsonb
WHERE city = 'Edinburgh';

UPDATE investment_locations
SET price_growth_5y = '[8.2, 15.3, -0.9, 7.1, 3.3]'::jsonb
WHERE city = 'Leeds';

UPDATE investment_locations
SET price_growth_5y = '[6.4, 13.6, 1.0, 1.9, -0.1]'::jsonb
WHERE city = 'Bristol';

UPDATE investment_locations
SET price_growth_5y = '[10.7, 14.1, -2.9, 10.0, 9.5]'::jsonb
WHERE city = 'Liverpool';

UPDATE investment_locations
SET price_growth_5y = '[9.7, 12.8, 4.6, 6.7, 6.1]'::jsonb
WHERE city = 'Newcastle';

UPDATE investment_locations
SET price_growth_5y = '[7.2, 14.4, -1.1, 2.6, 0.5]'::jsonb
WHERE city = 'Nottingham';

UPDATE investment_locations
SET price_growth_5y = '[9.8, 7.1, 0.1, 7.3, 4.8]'::jsonb
WHERE city = 'Glasgow';

COMMIT;

-- Verification query (optional - run after the updates)
-- SELECT city, price_growth_5y FROM investment_locations ORDER BY city;
