# Quick Setup Guide

## Step-by-Step Setup

### 1️⃣ Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - Name: `counter-app` (or any name)
   - Database Password: (generate or create one)
   - Region: Choose closest to you
4. Wait ~2 minutes for project to be created

### 2️⃣ Create Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
CREATE TABLE counters (
  id INTEGER PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

INSERT INTO counters (id, value) VALUES (1, 0);

ALTER TABLE counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON counters FOR ALL USING (true);
```

4. Click "Run" or press `Ctrl+Enter`
5. You should see "Success. No rows returned"

### 3️⃣ Get Your API Credentials

1. In Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. Find these two values:
   - **Project URL** (under "Project URL" section)
   - **anon public** key (under "Project API keys" section)

### 4️⃣ Configure Your App

1. In this project folder, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your editor and paste your credentials:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 5️⃣ Run the App

```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## ✅ Testing

1. Click the "+ Increment" button → counter goes up
2. Click the "- Decrement" button → counter goes down
3. Refresh the page → counter value persists!
4. Open in another browser/tab → same value appears

## 🎉 You're Done!

Your counter app is now:
- ✅ Saving to Supabase
- ✅ Loading from Supabase
- ✅ Persisting across sessions

## Next: Deploy to Cloudflare

See the main README.md for deployment instructions.
