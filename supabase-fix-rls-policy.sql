-- Fix RLS policies for consultation_appointments table
-- This allows anonymous users (using anon key) to insert appointments

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON consultation_appointments;
DROP POLICY IF EXISTS "Allow authenticated read" ON consultation_appointments;
DROP POLICY IF EXISTS "Allow authenticated update" ON consultation_appointments;

-- Recreate with correct permissions
-- IMPORTANT: anon role must be able to INSERT
CREATE POLICY "Allow anonymous inserts"
ON consultation_appointments
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anyone to insert (alternative - more permissive)
-- Uncomment if the above doesn't work
-- CREATE POLICY "Allow all inserts"
-- ON consultation_appointments
-- FOR INSERT
-- WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read"
ON consultation_appointments
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update"
ON consultation_appointments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE consultation_appointments ENABLE ROW LEVEL SECURITY;

-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'consultation_appointments';
