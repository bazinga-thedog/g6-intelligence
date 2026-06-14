# Run City Overview SQL Script

## Instructions

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-city-overview-table.sql`
5. Click **Run** or press `Ctrl+Enter`

## What This Does

Creates the `city_overview` table with:
- **3 rows** (Lisbon, Dubai, Porto)
- Hero images, descriptions, highlights
- Average metrics per city (price/sqm, rental yield, days to rent, 5Y growth)

## Verify

After running the script:
1. Go to **Table Editor** in Supabase
2. Find the `city_overview` table
3. Verify 3 rows exist

## Test the App

The app is already updated to fetch from this table:
- Refresh http://localhost:5174/
- Navigate to a city
- The city overview section should load from Supabase

## Table Structure

```sql
city_overview:
  - id (PRIMARY KEY)
  - city_name (UNIQUE)
  - hero_image_url
  - description
  - highlights (JSONB array)
  - avg_price_per_sqm_eur_min/max
  - avg_price_per_sqm_usd_min/max
  - avg_price_per_sqm_gbp_min/max
  - avg_rental_yield
  - avg_days_to_rent
  - price_growth_5y (JSONB array)
```
