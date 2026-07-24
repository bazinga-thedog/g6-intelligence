# Supabase Consultation Appointments Setup

## 📊 Database Table for Storing Appointments

All consultation appointment requests are now saved to Supabase in addition to sending emails.

---

## 🗄️ Database Setup

### Step 1: Create the Table

Run the SQL script in your Supabase SQL Editor:

**File:** `supabase-consultation-appointments.sql`

Or copy and paste this:

```sql
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
  status TEXT DEFAULT 'pending',
  notes TEXT,

  -- Email tracking
  email_sent BOOLEAN DEFAULT FALSE,
  email_id TEXT,

  CONSTRAINT email_or_phone_required CHECK (email IS NOT NULL OR phone IS NOT NULL)
);
```

### Step 2: Add to Cloudflare Pages Environment Variables

You need to add Supabase credentials to Cloudflare Pages:

1. Go to Cloudflare Pages Dashboard
2. Select your project
3. Navigate to **Settings** → **Environment variables**
4. Add these variables (they should already exist from your frontend):
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon public key

5. **Redeploy** after adding variables

---

## 📋 Table Schema

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique appointment ID |
| `created_at` | Timestamp | When the appointment was created |
| `name` | Text | Customer name (required) |
| `email` | Text | Email address (optional if phone provided) |
| `phone` | Text | Phone number (optional if email provided) |
| `language` | Text | Preferred language (English, Portuguese, etc.) |
| `timezone` | Text | Customer timezone |
| `selected_slots` | JSONB | Array of `{date, time}` objects |
| `user_agent` | Text | Browser/device information |
| `source_page` | Text | Page URL where form was submitted |
| `status` | Text | `pending`, `confirmed`, `cancelled`, or `completed` |
| `notes` | Text | Admin notes about the appointment |
| `email_sent` | Boolean | Whether notification email was sent |
| `email_id` | Text | Resend email ID for tracking |

### Example Record

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2026-07-24T12:34:56Z",
  "name": "Alexander Hamilton",
  "email": "alexander@example.com",
  "phone": "+44 20 7123 4567",
  "language": "English",
  "timezone": "Europe/London",
  "selected_slots": [
    {"date": "2026-07-29", "time": "10:00"},
    {"date": "2026-07-30", "time": "14:30"}
  ],
  "user_agent": "Mozilla/5.0...",
  "source_page": "https://example.com/schedule-consultation",
  "status": "pending",
  "email_sent": true,
  "email_id": "abc-123-xyz"
}
```

---

## 🔐 Row Level Security (RLS)

The table has RLS enabled with these policies:

1. **Anonymous Insert** - Allows anyone to submit appointments via the form
2. **Authenticated Read** - Only authenticated users can view appointments
3. **Authenticated Update** - Only authenticated users can update status/notes

### Why This Matters

- ✅ Public users can submit appointments (anon key)
- ✅ Your admin panel can read/update them (authenticated)
- ✅ Data is protected from unauthorized access

---

## 📊 Querying Appointments

### All Pending Appointments

```sql
SELECT * FROM consultation_appointments 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Appointments from Last 7 Days

```sql
SELECT * FROM consultation_appointments 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Count by Status

```sql
SELECT status, COUNT(*) 
FROM consultation_appointments 
GROUP BY status;
```

### Appointments by Language

```sql
SELECT language, COUNT(*) 
FROM consultation_appointments 
GROUP BY language
ORDER BY COUNT(*) DESC;
```

---

## 🔄 Workflow

### When User Submits Form:

1. **Frontend** sends data to `/api/send-appointment-email`
2. **Function** validates the data
3. **Resend API** sends email to `thedogbazinga@gmail.com`
4. **Supabase** saves appointment record
5. **Response** returns success with `emailId` and `appointmentId`

### What Gets Saved:

✅ All form data (name, email, phone, language, timezone, slots)  
✅ Email tracking (email_sent, email_id from Resend)  
✅ Metadata (user agent, source page)  
✅ Status (defaults to "pending")  

---

## 🎯 Use Cases

### 1. Admin Dashboard
Build a dashboard to view and manage appointments:
- View all pending appointments
- Update status (confirmed, cancelled, completed)
- Add notes
- Filter by date, status, language

### 2. Analytics
Track appointment trends:
- Popular time slots
- Language distribution
- Conversion rates
- Peak submission times

### 3. CRM Integration
Export or sync data to your CRM:
- Batch export to CSV
- Real-time webhook to CRM
- Automated follow-ups

### 4. Email Audit Trail
Track all appointment emails:
- View email delivery status
- Cross-reference with Resend dashboard
- Resend failed emails

---

## 🧪 Testing

### Test Insert (SQL Editor)

```sql
INSERT INTO consultation_appointments (
  name, email, phone, language, timezone, selected_slots, status
) VALUES (
  'Test User',
  'test@example.com',
  '+1234567890',
  'English',
  'Europe/London',
  '[{"date": "2026-07-30", "time": "10:00"}]'::jsonb,
  'pending'
);
```

### Test via Form

1. Visit your site
2. Click "Contact Us"
3. Fill out and submit the form
4. Check Supabase Table Editor:
   - Go to **Table Editor**
   - Select `consultation_appointments`
   - You should see the new record

---

## 🔧 Troubleshooting

### Record Not Saving

**Check:**
1. Table exists in Supabase
2. RLS policies are enabled (allow anon inserts)
3. Environment variables in Cloudflare Pages:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy after adding environment variables

### "Failed to save to Supabase" in Logs

**Common causes:**
- RLS policy blocking inserts
- Invalid JSONB format for selected_slots
- Missing required fields (name, language, timezone)
- Constraint violation (email OR phone required)

**Note:** Email is still sent even if Supabase save fails. Check Cloudflare function logs for details.

---

## 📈 Next Steps

### Recommended Enhancements

1. **Admin Panel** - Build a page to view/manage appointments
2. **Status Updates** - Add workflow for confirming appointments
3. **Email Notifications** - Send confirmation emails to customers
4. **Calendar Integration** - Sync with Google Calendar or Outlook
5. **Analytics Dashboard** - Track submission trends
6. **Export Functionality** - Export to CSV for reports

---

## 🆘 Support

- **Supabase Docs:** https://supabase.com/docs
- **Table Editor:** https://supabase.com/dashboard → Table Editor
- **SQL Editor:** https://supabase.com/dashboard → SQL Editor
- **Function Logs:** Cloudflare Pages → Functions → Logs

---

## ✅ Summary

✅ Appointment data saved to Supabase  
✅ Email sent via Resend  
✅ Both happen automatically on form submission  
✅ Email ID tracked in database  
✅ Status tracking (pending → confirmed → completed)  
✅ Ready for admin dashboard integration  

Your appointment system now has a complete data trail! 🎉
