-- Update lifestyle_appeal values for investment_locations table
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

UPDATE investment_locations SET lifestyle_appeal = 10 WHERE city = 'Lisbon';
UPDATE investment_locations SET lifestyle_appeal = 9 WHERE city = 'Porto';
UPDATE investment_locations SET lifestyle_appeal = 9 WHERE city = 'Algarve';
UPDATE investment_locations SET lifestyle_appeal = 9 WHERE city = 'Dubai';
UPDATE investment_locations SET lifestyle_appeal = 9 WHERE city = 'London';
UPDATE investment_locations SET lifestyle_appeal = 8 WHERE city = 'Manchester';
UPDATE investment_locations SET lifestyle_appeal = 7 WHERE city = 'Birmingham';
UPDATE investment_locations SET lifestyle_appeal = 9 WHERE city = 'Edinburgh';
UPDATE investment_locations SET lifestyle_appeal = 7 WHERE city = 'Leeds';
UPDATE investment_locations SET lifestyle_appeal = 8 WHERE city = 'Bristol';
UPDATE investment_locations SET lifestyle_appeal = 8 WHERE city = 'Liverpool';
UPDATE investment_locations SET lifestyle_appeal = 7 WHERE city = 'Newcastle';
UPDATE investment_locations SET lifestyle_appeal = 7 WHERE city = 'Nottingham';
UPDATE investment_locations SET lifestyle_appeal = 8 WHERE city = 'Glasgow';

COMMIT;
