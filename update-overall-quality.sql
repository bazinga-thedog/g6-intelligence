-- Update overall_quality values for investment_locations table
-- Note: If the column doesn't exist, first run:
-- ALTER TABLE investment_locations ADD COLUMN overall_quality INTEGER;
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Lisbon';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Porto';
UPDATE investment_locations SET overall_quality = 7 WHERE city = 'Algarve';
UPDATE investment_locations SET overall_quality = 9 WHERE city = 'Dubai';
UPDATE investment_locations SET overall_quality = 9 WHERE city = 'London';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Manchester';
UPDATE investment_locations SET overall_quality = 7 WHERE city = 'Birmingham';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Edinburgh';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Leeds';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Bristol';
UPDATE investment_locations SET overall_quality = 7 WHERE city = 'Liverpool';
UPDATE investment_locations SET overall_quality = 7 WHERE city = 'Newcastle';
UPDATE investment_locations SET overall_quality = 7 WHERE city = 'Nottingham';
UPDATE investment_locations SET overall_quality = 8 WHERE city = 'Glasgow';

COMMIT;
