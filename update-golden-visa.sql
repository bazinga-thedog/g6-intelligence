-- Update residency_program (Golden Visa) values for investment_locations table
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

UPDATE investment_locations SET residency_program = false WHERE city = 'Lisbon';
UPDATE investment_locations SET residency_program = false WHERE city = 'Porto';
UPDATE investment_locations SET residency_program = false WHERE city = 'Algarve';
UPDATE investment_locations SET residency_program = true WHERE city = 'Dubai';
UPDATE investment_locations SET residency_program = false WHERE city = 'London';
UPDATE investment_locations SET residency_program = false WHERE city = 'Manchester';
UPDATE investment_locations SET residency_program = false WHERE city = 'Birmingham';
UPDATE investment_locations SET residency_program = false WHERE city = 'Edinburgh';
UPDATE investment_locations SET residency_program = false WHERE city = 'Leeds';
UPDATE investment_locations SET residency_program = false WHERE city = 'Bristol';
UPDATE investment_locations SET residency_program = false WHERE city = 'Liverpool';
UPDATE investment_locations SET residency_program = false WHERE city = 'Newcastle';
UPDATE investment_locations SET residency_program = false WHERE city = 'Nottingham';
UPDATE investment_locations SET residency_program = false WHERE city = 'Glasgow';

COMMIT;
