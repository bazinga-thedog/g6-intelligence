-- Counter App Database Setup
-- Run this in your Supabase SQL Editor

-- Create counters table
CREATE TABLE counters (
  id INTEGER PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert initial counter with value 0
INSERT INTO counters (id, value) VALUES (1, 0);

-- Enable Row Level Security
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for prototype - not production secure!)
CREATE POLICY "Allow all operations" ON counters FOR ALL USING (true);
