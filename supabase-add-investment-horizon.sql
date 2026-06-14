-- Add Investment Horizon column to prospect_segmentation table
-- Run this in your Supabase SQL Editor

-- Add the new column
ALTER TABLE prospect_segmentation
ADD COLUMN investment_horizon TEXT;

-- Set default value for existing records (optional)
UPDATE prospect_segmentation
SET investment_horizon = 'unknown'
WHERE investment_horizon IS NULL;

-- Make it NOT NULL after setting defaults (optional, if you want to enforce)
-- ALTER TABLE prospect_segmentation
-- ALTER COLUMN investment_horizon SET NOT NULL;

-- Create index for faster lookups
CREATE INDEX idx_investment_horizon ON prospect_segmentation(investment_horizon);

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'prospect_segmentation'
AND column_name = 'investment_horizon';
