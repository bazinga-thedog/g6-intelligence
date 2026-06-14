-- Add reply support to comments system
-- Run this in your Supabase SQL Editor

-- Add parent_comment_id column to support threaded comments
ALTER TABLE page_comments
ADD COLUMN parent_comment_id UUID REFERENCES page_comments(id) ON DELETE CASCADE;

-- Add index for faster reply lookups
CREATE INDEX idx_page_comments_parent ON page_comments(parent_comment_id);

-- Add author name field (optional but helpful for replies)
ALTER TABLE page_comments
ADD COLUMN author_name TEXT DEFAULT 'Anonymous';

-- Update existing records to have null parent_comment_id (top-level comments)
UPDATE page_comments SET parent_comment_id = NULL WHERE parent_comment_id IS NULL;
