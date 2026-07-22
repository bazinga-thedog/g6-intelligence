# Featured Properties - Supabase Setup Guide

## Database Setup

### 1. Create the Table
Run the SQL script to create the properties table:
```bash
supabase-create-properties-table.sql
```

This creates:
- `properties` table with all required columns
- Indexes for optimal query performance
- Row Level Security (RLS) policies for public read access

### 2. Insert Sample Data
Run the SQL script to populate with sample properties:
```bash
supabase-insert-properties.sql
```

This inserts 5 sample properties for Newcastle/Heaton neighborhood.

## Table Schema

### Properties Table Structure
```sql
properties (
  id                UUID PRIMARY KEY
  city_name         TEXT NOT NULL
  neighborhood_name TEXT NOT NULL
  title             TEXT NOT NULL
  price_min         INTEGER NOT NULL
  price_max         INTEGER NOT NULL
  currency          TEXT NOT NULL ('EUR' | 'USD' | 'GBP')
  beds              INTEGER NOT NULL
  baths             INTEGER NOT NULL
  area              INTEGER NOT NULL
  parking           INTEGER (nullable)
  image_url         TEXT NOT NULL
  description       TEXT NOT NULL
  badge             TEXT (nullable: 'NEW' | 'EXCLUSIVE' | 'FEATURED')
  highlights        JSONB (array of strings)
  property_url      TEXT (nullable)
  is_active         BOOLEAN DEFAULT true
  created_at        TIMESTAMP WITH TIME ZONE
  updated_at        TIMESTAMP WITH TIME ZONE
)
```

### Indexes
- `idx_properties_city_neighborhood` - Fast filtering by city and neighborhood
- `idx_properties_is_active` - Filter active properties
- `idx_properties_created_at` - Sort by newest first

## Component Usage

### FeaturedProperties Component
Now automatically fetches data from Supabase:

```jsx
<FeaturedProperties
  cityName="Newcastle"
  neighborhoodName="Heaton"
  onNotify={() => alert('Notify callback')}
/>
```

**Props:**
- `cityName` (string) - City name to filter properties
- `neighborhoodName` (string) - Neighborhood name to filter properties
- `onNotify` (function) - Callback when user clicks "Notify Me" in empty state

**Features:**
- Auto-fetches up to 4 properties per neighborhood
- Shows loading skeleton while fetching
- Displays empty state when no properties found
- Handles errors gracefully
- Data transformation from Supabase format to component format

## Adding New Properties

### Via SQL
```sql
INSERT INTO properties (
  city_name,
  neighborhood_name,
  title,
  price_min,
  price_max,
  currency,
  beds,
  baths,
  area,
  parking,
  image_url,
  description,
  badge,
  highlights,
  property_url,
  is_active
) VALUES (
  'Newcastle',
  'Heaton',
  'Luxury Apartment',
  450000,
  485000,
  'GBP',
  3,
  2,
  120,
  1,
  'https://images.unsplash.com/photo-...',
  'Beautiful luxury apartment in prime location.',
  'NEW',
  '["Central Location","Modern Design","High Yield"]'::jsonb,
  'https://property-website.com/listing/123',
  true
);
```

### Via Supabase Dashboard
1. Go to Supabase Dashboard → Table Editor
2. Select `properties` table
3. Click "Insert row"
4. Fill in all required fields
5. For `highlights`, use JSON array format: `["Item 1", "Item 2", "Item 3"]`
6. Save

## Query Examples

### Get properties for a specific neighborhood
```sql
SELECT * FROM properties
WHERE city_name = 'Newcastle'
  AND neighborhood_name = 'Heaton'
  AND is_active = true
ORDER BY created_at DESC
LIMIT 4;
```

### Deactivate a property (soft delete)
```sql
UPDATE properties
SET is_active = false, updated_at = NOW()
WHERE id = 'property-uuid-here';
```

### Count properties by neighborhood
```sql
SELECT
  city_name,
  neighborhood_name,
  COUNT(*) as property_count
FROM properties
WHERE is_active = true
GROUP BY city_name, neighborhood_name
ORDER BY property_count DESC;
```

## Badge Types
- `NEW` - Recently listed property (green badge)
- `EXCLUSIVE` - Exclusive listing (blue badge)
- `FEATURED` - Featured/premium property (red badge)
- `NULL` - No badge shown

## Image Requirements
- **Aspect Ratio:** 16:10 (800x500px recommended)
- **Format:** JPEG or PNG
- **Source:** Unsplash, property photos, or stock images
- **URL:** Must be publicly accessible HTTPS URL

## Highlights
- Maximum 3 highlights displayed per property
- Stored as JSONB array in database
- Examples: "Sea View", "Recently Renovated", "High Rental Demand"
- Keep text short (2-4 words per highlight)

## Currency Support
- EUR (€) - Euro
- GBP (£) - British Pound
- USD ($) - US Dollar

Make sure currency matches the property location!

## Troubleshooting

### Properties not showing up?
1. Check `is_active = true`
2. Verify city_name and neighborhood_name match exactly (case-sensitive)
3. Check RLS policies in Supabase Dashboard
4. Check browser console for errors

### Images not loading?
1. Verify image_url is publicly accessible
2. Check CORS settings if images are from your domain
3. Ensure HTTPS URLs (not HTTP)

### Empty state showing with properties in DB?
1. Check console for Supabase errors
2. Verify API keys in `.env` file
3. Test query directly in Supabase SQL Editor
4. Check network tab for failed requests

## Next Steps

1. **Run both SQL scripts in Supabase SQL Editor**
2. **Verify data in Table Editor**
3. **Test the component** at http://localhost:5173/neighborhoods/Newcastle/Heaton
4. **Add properties for other neighborhoods** as needed
5. **Set up admin interface** for property management (future enhancement)
