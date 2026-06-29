-- Prospect Segmentation Table
-- Run this in your Supabase SQL Editor

CREATE TABLE prospect_segmentation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_guid UUID NOT NULL UNIQUE,

  -- Segmentation Criteria (4 main criteria)
  tax_residency TEXT NOT NULL,
  net_worth TEXT NOT NULL,
  investment_objective TEXT NOT NULL,
  driver TEXT NOT NULL,
  driver_score INTEGER,

  -- Profile Criteria (4 additional KYC attributes)
  risk_tolerance TEXT NOT NULL,
  investment_horizon TEXT NOT NULL,
  experience_abroad TEXT NOT NULL,
  re_experience TEXT NOT NULL,
  yield_alignment TEXT NOT NULL,
  diversification_priority TEXT NOT NULL,

  -- Investor Profile (calculated from segmentation + profile data)
  investor_profile TEXT NOT NULL,

  -- Survey Reference
  survey_answers JSONB NOT NULL,
  selected_currency TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE prospect_segmentation ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for prototype - not production secure!)
CREATE POLICY "Allow all operations" ON prospect_segmentation FOR ALL USING (true);

-- Create indexes for faster lookups
CREATE INDEX idx_prospect_guid ON prospect_segmentation(prospect_guid);
CREATE INDEX idx_tax_residency ON prospect_segmentation(tax_residency);
CREATE INDEX idx_net_worth ON prospect_segmentation(net_worth);
CREATE INDEX idx_investment_objective ON prospect_segmentation(investment_objective);
CREATE INDEX idx_driver ON prospect_segmentation(driver);
CREATE INDEX idx_risk_tolerance ON prospect_segmentation(risk_tolerance);
CREATE INDEX idx_experience_abroad ON prospect_segmentation(experience_abroad);
CREATE INDEX idx_re_experience ON prospect_segmentation(re_experience);
CREATE INDEX idx_yield_alignment ON prospect_segmentation(yield_alignment);
CREATE INDEX idx_investor_profile ON prospect_segmentation(investor_profile);
CREATE INDEX idx_created_at ON prospect_segmentation(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_prospect_segmentation_updated_at
  BEFORE UPDATE ON prospect_segmentation
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
