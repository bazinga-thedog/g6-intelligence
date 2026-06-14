-- Add Diversification Priority column to prospect_segmentation table
-- Run this in your Supabase SQL Editor

-- Add the new column
ALTER TABLE prospect_segmentation
ADD COLUMN diversification_priority TEXT;

-- Set default value for existing records (optional)
UPDATE prospect_segmentation
SET diversification_priority = 'unknown'
WHERE diversification_priority IS NULL;

-- Create index for faster lookups
CREATE INDEX idx_diversification_priority ON prospect_segmentation(diversification_priority);

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'prospect_segmentation'
AND column_name = 'diversification_priority';
