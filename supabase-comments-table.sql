-- Comments/Annotations Table for Feedback System
-- Run this in your Supabase SQL Editor
--
-- Page URL identifiers used in the app:
-- - 'landing' - Landing page
-- - 'locations' - City selection page
-- - 'neighborhoods-{cityName}' - Neighborhood selection for specific city (e.g., 'neighborhoods-Lisbon')
-- - 'neighborhood-detail-{cityName}-{neighborhoodName}' - Detail page for specific neighborhood (e.g., 'neighborhood-detail-Lisbon-Alfama')

CREATE TABLE page_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  x_position INTEGER NOT NULL,
  y_position INTEGER NOT NULL,
  author_name TEXT DEFAULT 'Anonymous',
  parent_comment_id UUID REFERENCES page_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE page_comments ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for prototype - not production secure!)
CREATE POLICY "Allow all operations" ON page_comments FOR ALL USING (true);

-- Create indexes for faster lookups
CREATE INDEX idx_page_comments_url ON page_comments(page_url);
CREATE INDEX idx_page_comments_parent ON page_comments(parent_comment_id);
