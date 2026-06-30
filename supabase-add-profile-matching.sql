-- Add profile matching columns to investment_locations
-- These columns help match cities to investor profiles

ALTER TABLE investment_locations
  ADD COLUMN IF NOT EXISTS investor_profile_match JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS market_maturity VARCHAR(50),
  ADD COLUMN IF NOT EXISTS lifestyle_appeal INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS growth_potential INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS income_stability INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS sophistication_required INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS residency_program BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS tax_advantages TEXT,
  ADD COLUMN IF NOT EXISTS market_transparency INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS liquidity_score INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS entry_barriers TEXT;

-- Update existing cities with profile matching data

-- LISBON - Balanced for all profiles, strong for Lifestyle & Income
UPDATE investment_locations
SET
  investor_profile_match = '["Income Seeker", "Lifestyle Investor", "Sophisticated Builder"]'::jsonb,
  market_maturity = 'Mature',
  lifestyle_appeal = 9,
  growth_potential = 7,
  income_stability = 8,
  sophistication_required = 4,
  residency_program = true,
  tax_advantages = 'Golden Visa, NHR Tax Regime (if still available)',
  market_transparency = 8,
  liquidity_score = 7,
  entry_barriers = 'Moderate - English widely spoken, EU standards'
WHERE city = 'Lisbon';

-- DUBAI - Strong for Income & Growth, tax advantages
UPDATE investment_locations
SET
  investor_profile_match = '["Income Seeker", "Growth Hunter", "Sophisticated Builder"]'::jsonb,
  market_maturity = 'Emerging-Mature',
  lifestyle_appeal = 8,
  growth_potential = 9,
  income_stability = 8,
  sophistication_required = 6,
  residency_program = true,
  tax_advantages = 'Zero income tax, zero capital gains tax, Golden Visa',
  market_transparency = 7,
  liquidity_score = 8,
  entry_barriers = 'Low - English widely spoken, expat-friendly'
WHERE city = 'Dubai';

-- PORTO - Emerging market, strong for Growth & Income
UPDATE investment_locations
SET
  investor_profile_match = '["Income Seeker", "Growth Hunter"]'::jsonb,
  market_maturity = 'Emerging',
  lifestyle_appeal = 8,
  growth_potential = 8,
  income_stability = 7,
  sophistication_required = 5,
  residency_program = true,
  tax_advantages = 'Golden Visa, NHR Tax Regime (if still available)',
  market_transparency = 7,
  liquidity_score = 6,
  entry_barriers = 'Moderate - English widely spoken, EU standards'
WHERE city = 'Porto';

-- LONDON - Sophisticated market, stable income, lower growth
UPDATE investment_locations
SET
  investor_profile_match = '["Income Seeker", "Sophisticated Builder"]'::jsonb,
  market_maturity = 'Mature',
  lifestyle_appeal = 9,
  growth_potential = 5,
  income_stability = 9,
  sophistication_required = 7,
  residency_program = false,
  tax_advantages = 'None significant',
  market_transparency = 10,
  liquidity_score = 10,
  entry_barriers = 'High - Complex regulations, high entry costs'
WHERE city = 'London';

-- MANCHESTER - Income focused, emerging growth
UPDATE investment_locations
SET
  investor_profile_match = '["Income Seeker", "Growth Hunter"]'::jsonb,
  market_maturity = 'Emerging-Mature',
  lifestyle_appeal = 6,
  growth_potential = 7,
  income_stability = 8,
  sophistication_required = 5,
  residency_program = false,
  tax_advantages = 'None significant',
  market_transparency = 9,
  liquidity_score = 8,
  entry_barriers = 'Moderate - English speaking, lower costs than London'
WHERE city = 'Manchester';

-- Remove Singapore from preferred list (no one can buy there)
UPDATE investment_locations
SET
  is_preferred = false,
  investor_profile_match = '[]'::jsonb,
  entry_barriers = 'Very High - Foreign ownership restrictions, ABSD tax (60% for foreigners)'
WHERE city = 'Singapore';

-- Create index for profile matching queries
CREATE INDEX IF NOT EXISTS idx_investor_profile_match ON investment_locations USING gin(investor_profile_match);

COMMENT ON COLUMN investment_locations.investor_profile_match IS 'Array of investor profiles this city matches best: Income Seeker, Growth Hunter, Lifestyle Investor, Sophisticated Builder';
COMMENT ON COLUMN investment_locations.market_maturity IS 'Emerging, Emerging-Mature, Mature, or Declining';
COMMENT ON COLUMN investment_locations.lifestyle_appeal IS 'Score 1-10 for lifestyle/quality of life';
COMMENT ON COLUMN investment_locations.growth_potential IS 'Score 1-10 for capital appreciation potential';
COMMENT ON COLUMN investment_locations.income_stability IS 'Score 1-10 for rental income stability';
COMMENT ON COLUMN investment_locations.sophistication_required IS 'Score 1-10 for market complexity/expertise needed';
COMMENT ON COLUMN investment_locations.residency_program IS 'Whether city/country offers Golden Visa or residency program';
COMMENT ON COLUMN investment_locations.tax_advantages IS 'Summary of tax benefits';
COMMENT ON COLUMN investment_locations.market_transparency IS 'Score 1-10 for regulatory clarity and data availability';
COMMENT ON COLUMN investment_locations.liquidity_score IS 'Score 1-10 for ease of buying/selling';
COMMENT ON COLUMN investment_locations.entry_barriers IS 'Description of barriers to entry for foreign investors';
