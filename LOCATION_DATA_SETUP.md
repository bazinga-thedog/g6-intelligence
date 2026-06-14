# Location Data - Supabase Integration

## Overview
The LocationShowcase component now fetches all location data dynamically from Supabase. This allows for real-time updates and easy management of investment opportunities without code changes.

## Database Setup

### 1. Run the SQL Script
Execute the `supabase-locations-table.sql` file in your Supabase SQL Editor to:
- Create the `investment_locations` table
- Set up indexes for better performance
- Insert sample location data
- Enable Row Level Security (RLS) with public read access

### 2. Table Structure

```sql
investment_locations
├── id (Primary Key)
├── city
├── country
├── country_code
├── is_preferred (boolean)
├── image_url
├── description
├── price_per_sqm_eur_min/max
├── price_per_sqm_usd_min/max
├── price_per_sqm_gbp_min/max
├── rental_yield_min/max
├── days_to_rent_avg
├── price_growth_5y (JSONB array of 5 numbers)
├── created_at
└── updated_at
```

## Data Structure

### Price Growth Array
The `price_growth_5y` field stores 5 years of price growth data as a JSON array:
```json
[8.2, 12.5, 15.8, 18.2, 21.5]
```
- Each value represents the percentage growth for that year
- Negative values are supported (e.g., `-3.0` for 3% decline)
- The component automatically renders a trendline chart
- Color coding: Green for positive latest value, Red for negative

### Multi-Currency Support
Each location has price ranges in three currencies:
- EUR (Euro)
- USD (US Dollar)  
- GBP (British Pound)

The UI dynamically switches between currencies using the `selectedCurrency` state.

## Component Integration

### Data Flow
1. **useEffect Hook**: Fetches data on component mount
2. **fetchLocations()**: Queries Supabase and transforms data
3. **Transform Layer**: Converts flat Supabase structure to nested metrics object
4. **State Management**: Updates `locations` state with transformed data
5. **Render**: UI displays location cards with real-time data

### Loading States
- **Loading**: Shows spinner with "Loading investment opportunities..."
- **Error**: Displays error message with Retry button
- **Success**: Renders location cards with all metrics

### Real-time Updates
To enable real-time updates when data changes in Supabase:

```javascript
useEffect(() => {
  fetchLocations()

  // Subscribe to changes
  const subscription = supabase
    .channel('investment_locations_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'investment_locations' },
      () => fetchLocations()
    )
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

## Managing Location Data

### Adding a New Location
```sql
INSERT INTO investment_locations (
  city, country, country_code, is_preferred, image_url, description,
  price_per_sqm_eur_min, price_per_sqm_eur_max,
  price_per_sqm_usd_min, price_per_sqm_usd_max,
  price_per_sqm_gbp_min, price_per_sqm_gbp_max,
  rental_yield_min, rental_yield_max,
  days_to_rent_avg,
  price_growth_5y
) VALUES (
  'Barcelona', 'Spain', 'ES', false,
  'https://images.unsplash.com/photo-city-image',
  'Vibrant coastal city with strong rental market',
  5000, 8500, 5400, 9200, 4300, 7400,
  4.2, 5.8, 28,
  '[7.5, 9.2, 11.8, 14.5, 16.2]'::jsonb
);
```

### Updating Metrics
```sql
UPDATE investment_locations
SET 
  price_per_sqm_eur_min = 4800,
  price_per_sqm_eur_max = 7500,
  rental_yield_min = 4.8,
  rental_yield_max = 6.5,
  price_growth_5y = '[9.0, 13.2, 16.5, 19.8, 22.5]'::jsonb,
  updated_at = NOW()
WHERE city = 'Lisbon';
```

### Marking as Preferred
```sql
UPDATE investment_locations
SET is_preferred = true
WHERE city = 'Barcelona';
```

## Dynamic Features

### Currency Switching (Future Enhancement)
Add a currency selector in the UI:
```javascript
const [selectedCurrency, setSelectedCurrency] = useState('EUR')

<select onChange={(e) => setSelectedCurrency(e.target.value)}>
  <option value="EUR">EUR (€)</option>
  <option value="USD">USD ($)</option>
  <option value="GBP">GBP (£)</option>
</select>
```

### Filtering by Preference
Already implemented via filters:
- "All Locations" - Shows all
- "Preferred Choices" - Shows only `is_preferred = true`
- Country filters - Shows by `country_code`

## Performance Optimization

### Indexes
The table includes indexes on:
- `country_code` - Fast filtering by country
- `is_preferred` - Fast filtering of preferred locations

### Caching Strategy (Optional)
Consider implementing client-side caching:
```javascript
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const [lastFetch, setLastFetch] = useState(null)

if (!lastFetch || Date.now() - lastFetch > CACHE_DURATION) {
  await fetchLocations()
  setLastFetch(Date.now())
}
```

## Security

### Row Level Security (RLS)
The table has RLS enabled with:
- **Public Read**: Anyone can view locations (investment data is public)
- **Authenticated Write**: Only authenticated users can update data

### API Keys
Ensure `.env` contains valid Supabase credentials:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Troubleshooting

### Error: "Failed to fetch locations"
1. Check Supabase credentials in `.env`
2. Verify the table exists: `SELECT * FROM investment_locations`
3. Check RLS policies allow public read access
4. Inspect browser console for detailed error messages

### Empty Location List
1. Verify data was inserted: `SELECT COUNT(*) FROM investment_locations`
2. Check the transform function for errors
3. Ensure `price_growth_5y` is valid JSON array

### Currency Values Not Displaying
1. Ensure all currency fields have values (min/max for EUR, USD, GBP)
2. Check that `selectedCurrency` state matches available currency keys
3. Verify numbers are stored as INTEGER in Supabase

## Future Enhancements

- [ ] Real-time subscription for live updates
- [ ] Admin panel for managing locations
- [ ] Image upload integration
- [ ] Historical data tracking (audit log)
- [ ] Advanced filtering (price range, yield range)
- [ ] Location comparison tool
- [ ] Export data to CSV/PDF
- [ ] Multi-language support for descriptions
