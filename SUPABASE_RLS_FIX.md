# Fixing Supabase RLS (Row Level Security) Issue

## 🚨 Problem

The consultation_appointments table exists but anonymous users can't insert records due to Row Level Security blocking the inserts.

**Error:** `new row violates row-level security policy for table "consultation_appointments"`

---

## ✅ Solution: Update RLS Policies

### Option 1: Run SQL Script (Recommended)

Go to Supabase SQL Editor and run:

**File:** `supabase-fix-rls-policy.sql`

Or paste this SQL:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON consultation_appointments;
DROP POLICY IF EXISTS "Allow authenticated read" ON consultation_appointments;
DROP POLICY IF EXISTS "Allow authenticated update" ON consultation_appointments;

-- Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts"
ON consultation_appointments
FOR INSERT
TO anon
WITH CHECK (true);

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
```

### Option 2: Disable RLS Temporarily (For Testing Only)

⚠️ **Warning:** This makes your table publicly writable. Only use for testing!

```sql
ALTER TABLE consultation_appointments DISABLE ROW LEVEL SECURITY;
```

To re-enable later:
```sql
ALTER TABLE consultation_appointments ENABLE ROW LEVEL SECURITY;
```

---

## 🔍 Verify Policies

After running the SQL, verify the policies exist:

```sql
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'consultation_appointments';
```

Expected output:
| policyname | roles | cmd |
|------------|-------|-----|
| Allow anonymous inserts | anon | INSERT |
| Allow authenticated read | authenticated | SELECT |
| Allow authenticated update | authenticated | UPDATE |

---

## 🧪 Test Again

After fixing the RLS policies, run:

```bash
node test-supabase-connection.js
```

You should see:
```
✅ Table exists and is accessible
✅ Test record inserted successfully!
✅ Successfully read 1 record(s)
✨ All tests passed!
```

---

## 🔐 Understanding RLS

### What is RLS?
Row Level Security allows you to control who can access specific rows in your table.

### Why Did It Fail?
The policy wasn't properly configured to allow the `anon` role (anonymous users) to INSERT records.

### Roles in Supabase:
- **anon** - Anonymous users (using VITE_SUPABASE_ANON_KEY)
- **authenticated** - Logged-in users
- **service_role** - Backend services (full access)

### Our Setup:
- ✅ **anon** can INSERT (form submissions)
- ✅ **authenticated** can SELECT and UPDATE (admin panel)
- ❌ **anon** cannot SELECT (privacy - can't see other people's appointments)

---

## 📊 Checking Your Supabase Configuration

### 1. Find Your API Keys

Go to: **Supabase Dashboard** → **Project Settings** → **API**

You should see:
- **Project URL:** `https://xxxxx.supabase.co`
- **anon/public key:** Starts with `eyJ...` (long JWT token)
- **service_role key:** Also starts with `eyJ...` (different from anon)

### 2. Update .env if Needed

Your `.env` should have:
```
VITE_SUPABASE_URL=https://mhnupmdpehiiiilgesys.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Note:** If your key starts with `sb_publishable_`, you might be using the wrong key. Use the **anon public** key instead.

### 3. Update Cloudflare Pages

Make sure Cloudflare Pages has the correct keys:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Then redeploy.

---

## 🎯 Quick Fix Steps

1. ✅ Run `supabase-fix-rls-policy.sql` in Supabase SQL Editor
2. ✅ Test with `node test-supabase-connection.js`
3. ✅ Verify API keys in Supabase Dashboard → Project Settings → API
4. ✅ Update `.env` with correct anon key if needed
5. ✅ Update Cloudflare Pages environment variables
6. ✅ Redeploy Cloudflare Pages
7. ✅ Test the form on your website

---

## 🆘 Still Not Working?

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Click **Logs** → **Postgres Logs**
3. Look for RLS policy errors

### Alternative: Use Service Role (Backend Only)

If you can't get RLS working, use the service_role key in your **backend/Cloudflare Function only**:

⚠️ **Never expose service_role key to frontend!**

In Cloudflare Pages environment variables:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Update `functions/api/send-appointment-email.js`:
```javascript
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;
```

This bypasses RLS entirely (backend has full access).

---

## ✅ Summary

**Root cause:** RLS policy not allowing anonymous inserts

**Fix:** Run `supabase-fix-rls-policy.sql` to create proper policies

**Verify:** Run test script to confirm

Your appointments will then save to Supabase successfully! 🎉
