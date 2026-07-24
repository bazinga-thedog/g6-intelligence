-- Create consultation_appointments table to store scheduled consultation requests

CREATE TABLE IF NOT EXISTS consultation_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,

  -- Preferences
  language TEXT NOT NULL,
  timezone TEXT NOT NULL,

  -- Selected Time Slots (stored as JSONB array)
  selected_slots JSONB NOT NULL,

  -- Metadata
  user_agent TEXT,
  ip_address TEXT,
  source_page TEXT,

  -- Status tracking
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  notes TEXT,

  -- Email tracking
  email_sent BOOLEAN DEFAULT FALSE,
  email_id TEXT, -- Resend email ID

  CONSTRAINT email_or_phone_required CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_consultation_appointments_created_at ON consultation_appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_appointments_status ON consultation_appointments(status);
CREATE INDEX IF NOT EXISTS idx_consultation_appointments_email ON consultation_appointments(email);

-- Add RLS (Row Level Security) policies
ALTER TABLE consultation_appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON consultation_appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all appointments
CREATE POLICY "Allow authenticated read" ON consultation_appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update appointments
CREATE POLICY "Allow authenticated update" ON consultation_appointments
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE consultation_appointments IS 'Stores consultation appointment requests from the schedule form';
COMMENT ON COLUMN consultation_appointments.selected_slots IS 'JSONB array of {date, time} objects representing user availability';
COMMENT ON COLUMN consultation_appointments.status IS 'Appointment status: pending, confirmed, cancelled, completed';
