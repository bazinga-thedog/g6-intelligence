-- Migration: Add investor_profile column to prospect_segmentation table
-- Run this in your Supabase SQL Editor if the table already exists

-- Add the investor_profile column
ALTER TABLE prospect_segmentation
ADD COLUMN IF NOT EXISTS investor_profile TEXT;

-- Add the missing columns if they don't exist
ALTER TABLE prospect_segmentation
ADD COLUMN IF NOT EXISTS investment_horizon TEXT;

ALTER TABLE prospect_segmentation
ADD COLUMN IF NOT EXISTS diversification_priority TEXT;

-- Create index for the new investor_profile column
CREATE INDEX IF NOT EXISTS idx_investor_profile ON prospect_segmentation(investor_profile);

-- Update existing records to set a default profile (optional - can be left NULL until re-profiled)
-- Uncomment if you want to set a default for existing records:
-- UPDATE prospect_segmentation
-- SET investor_profile = 'Income Seeker'
-- WHERE investor_profile IS NULL;
