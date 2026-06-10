# Counter App - Supabase + React + Cloudflare

A simple counter application that persists state to Supabase.

## Setup Instructions

### 1. Install Dependencies
Already done! But if you need to reinstall:
```bash
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Settings** → **API** to find your credentials:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - Anon/Public Key (a long JWT token)

### 3. Create Database Table

In your Supabase project:

1. Go to **SQL Editor**
2. Run this SQL to create the `counters` table:

```sql
-- Create counters table
CREATE TABLE counters (
  id INTEGER PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert initial counter with value 0
INSERT INTO counters (id, value) VALUES (1, 0);

-- Enable Row Level Security (optional for prototype)
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (for prototype - not production!)
CREATE POLICY "Allow all operations" ON counters FOR ALL USING (true);
```

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

- **Counter.jsx**: Main component with increment/decrement buttons
- **supabaseClient.js**: Supabase client configuration
- On load: Fetches current counter value from Supabase
- On button click: Updates value in Supabase and UI
- If you refresh or reopen the page, it loads the persisted value

## Deploy to Cloudflare Pages

### Via Dashboard (Easiest)

1. Push this code to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Select **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`: your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: your Supabase anon key
7. Deploy!

### Via Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist
```

## Project Structure

```
├── src/
│   ├── Counter.jsx          # Main counter component
│   ├── supabaseClient.js    # Supabase configuration
│   ├── App.jsx              # Root component
│   └── App.css              # Styles
├── .env                     # Environment variables (create this)
├── .env.example             # Environment template
└── README.md                # This file
```

## Next Steps (Optional)

- Add authentication with Supabase Auth
- Enable real-time updates with Supabase subscriptions
- Add multiple counters with different IDs
- Add reset button
- Add counter history/logs
