-- Add average days on market for sale transactions field to neighborhoods table
-- This represents the average number of days a property stays on the market before being sold

ALTER TABLE neighborhoods
ADD COLUMN IF NOT EXISTS avg_days_on_market_sale INTEGER;

COMMENT ON COLUMN neighborhoods.avg_days_on_market_sale IS 'Average number of days a property is listed on the market before being sold';

-- Update existing Lisbon neighborhoods with realistic data
UPDATE neighborhoods SET avg_days_on_market_sale = 45 WHERE city_name = 'Lisbon' AND name = 'Alfama';
UPDATE neighborhoods SET avg_days_on_market_sale = 35 WHERE city_name = 'Lisbon' AND name = 'Chiado';
UPDATE neighborhoods SET avg_days_on_market_sale = 52 WHERE city_name = 'Lisbon' AND name = 'Belém';
UPDATE neighborhoods SET avg_days_on_market_sale = 38 WHERE city_name = 'Lisbon' AND name = 'Parque das Nações';
UPDATE neighborhoods SET avg_days_on_market_sale = 42 WHERE city_name = 'Lisbon' AND name = 'Príncipe Real';
UPDATE neighborhoods SET avg_days_on_market_sale = 48 WHERE city_name = 'Lisbon' AND name = 'Santos';

-- Update existing Dubai neighborhoods with realistic data
UPDATE neighborhoods SET avg_days_on_market_sale = 28 WHERE city_name = 'Dubai' AND name = 'Dubai Marina';
UPDATE neighborhoods SET avg_days_on_market_sale = 22 WHERE city_name = 'Dubai' AND name = 'Downtown Dubai';
UPDATE neighborhoods SET avg_days_on_market_sale = 35 WHERE city_name = 'Dubai' AND name = 'Palm Jumeirah';
UPDATE neighborhoods SET avg_days_on_market_sale = 32 WHERE city_name = 'Dubai' AND name = 'Business Bay';
UPDATE neighborhoods SET avg_days_on_market_sale = 30 WHERE city_name = 'Dubai' AND name = 'Jumeirah Beach Residence';

-- Update existing Porto neighborhoods with realistic data
UPDATE neighborhoods SET avg_days_on_market_sale = 55 WHERE city_name = 'Porto' AND name = 'Ribeira';
UPDATE neighborhoods SET avg_days_on_market_sale = 48 WHERE city_name = 'Porto' AND name = 'Foz do Douro';
UPDATE neighborhoods SET avg_days_on_market_sale = 62 WHERE city_name = 'Porto' AND name = 'Boavista';
UPDATE neighborhoods SET avg_days_on_market_sale = 68 WHERE city_name = 'Porto' AND name = 'Cedofeita';

-- Notes on the data:
-- Dubai has lower average days on market (22-35 days) due to high liquidity and investor demand
-- Lisbon has moderate days on market (35-52 days) reflecting a balanced market
-- Porto has higher days on market (48-68 days) as it's a secondary market with slower turnover
-- Premium neighborhoods (Chiado, Downtown Dubai) sell faster than peripheral areas
