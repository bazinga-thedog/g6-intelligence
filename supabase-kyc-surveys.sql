-- KYC Surveys Table
-- Run this in your Supabase SQL Editor

CREATE TABLE kyc_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE kyc_surveys ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for prototype - not production secure!)
CREATE POLICY "Allow all operations" ON kyc_surveys FOR ALL USING (true);

-- Create index for faster lookups
CREATE INDEX idx_kyc_surveys_completed ON kyc_surveys(completed_at);
