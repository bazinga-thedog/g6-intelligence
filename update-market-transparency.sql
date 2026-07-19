-- Update market_transparency values for investment_locations table
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

UPDATE investment_locations SET market_transparency = 8 WHERE city = 'Lisbon';
UPDATE investment_locations SET market_transparency = 7 WHERE city = 'Porto';
UPDATE investment_locations SET market_transparency = 6 WHERE city = 'Algarve';
UPDATE investment_locations SET market_transparency = 7 WHERE city = 'Dubai';
UPDATE investment_locations SET market_transparency = 10 WHERE city = 'London';
UPDATE investment_locations SET market_transparency = 9 WHERE city = 'Manchester';
UPDATE investment_locations SET market_transparency = 9 WHERE city = 'Birmingham';
UPDATE investment_locations SET market_transparency = 9 WHERE city = 'Edinburgh';
UPDATE investment_locations SET market_transparency = 8 WHERE city = 'Leeds';
UPDATE investment_locations SET market_transparency = 8 WHERE city = 'Bristol';
UPDATE investment_locations SET market_transparency = 8 WHERE city = 'Liverpool';
UPDATE investment_locations SET market_transparency = 7 WHERE city = 'Newcastle';
UPDATE investment_locations SET market_transparency = 7 WHERE city = 'Nottingham';
UPDATE investment_locations SET market_transparency = 8 WHERE city = 'Glasgow';

COMMIT;
