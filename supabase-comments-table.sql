-- Comments/Annotations Table for Feedback System
-- Run this in your Supabase SQL Editor

CREATE TABLE page_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  x_position INTEGER NOT NULL,
  y_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE page_comments ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for prototype - not production secure!)
CREATE POLICY "Allow all operations" ON page_comments FOR ALL USING (true);

-- Create index for faster page lookups
CREATE INDEX idx_page_comments_url ON page_comments(page_url);
