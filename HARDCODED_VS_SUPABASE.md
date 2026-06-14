# Hardcoded Data vs. Supabase

## Current Status

### ✅ Data in Supabase

1. **Comments** (`page_comments` table)
   - Location: `CommentSystem.jsx`
   - Comment text, coordinates, author names, replies
   - Page-specific isolation
   - **Status**: Fully integrated

2. **City Investment Locations** (`investment_locations` table)
   - Location: `LocationShowcase.jsx`
   - Cities: Lisbon, Dubai, Porto, London, Singapore, Manchester
   - Metrics: price/sqm (EUR/USD/GBP), rental yield, days to rent, 5Y price growth
   - **Status**: Fully integrated with loading/error states

3. **KYC Survey Data** (tables from `supabase-kyc-surveys.sql`)
   - Survey responses
   - Prospect segmentation
   - Investment preferences
   - **Status**: Database ready

### ❌ Hardcoded Data (NOT in Supabase)

#### 1. **Neighborhood Data** (NeighborhoodShowcase.jsx)
**Location**: `src/NeighborhoodShowcase.jsx` lines 74-340

**Data Structure**:
```javascript
const neighborhoodData = {
  'Lisbon': [
    {
      id, name, image, 
      metrics: {
        pricePerSqm: {EUR, USD, GBP},
        rentalYield: {min, max},
        daysToRent: {avg},
        priceGrowth5Y: [5 years],
        acquisitionTax,
        avgHoldingTime,
        daysAvailableToRent,
        rentPerSqm: {EUR, USD, GBP},
        rentalGrowth5Y: [5 years],
        avgRentalTime
      },
      description
    }
  ],
  'Dubai': [...],
  'Porto': [...]
}
```

**Neighborhoods**:
- **Lisbon**: Alfama, Chiado, Belém, Parque das Nações, Príncipe Real, Santos (6 neighborhoods)
- **Dubai**: Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, JBR (5 neighborhoods)
- **Porto**: Ribeira, Foz do Douro, Boavista, Cedofeita (4 neighborhoods)

**Total**: 15 neighborhoods with full metrics

---

#### 2. **City Overview Data** (NeighborhoodShowcase.jsx)
**Location**: `src/NeighborhoodShowcase.jsx` lines 10-73

**Data Structure**:
```javascript
const cityOverview = {
  'Lisbon': {
    heroImage,
    description,
    highlights: [4 key points],
    avgMetrics: {
      pricePerSqm: {EUR, USD, GBP},
      rentalYield: {avg},
      daysToRent: {avg},
      priceGrowth5Y: [5 years]
    }
  },
  'Dubai': {...},
  'Porto': {...}
}
```

**Data for**: Lisbon, Dubai, Porto (3 cities)

---

#### 3. **Quality of Life Data** (NeighborhoodDetail.jsx)
**Location**: `src/NeighborhoodDetail.jsx` lines 9-162

**Data Structure**:
```javascript
const qualityOfLifeData = {
  'Alfama': {
    popularityFactors: [6 reasons for high rents],
    amenities: {
      restaurants, cafes, supermarkets, 
      schools, healthcare, parks
    },
    transportation: {
      metroStations, busLines, tramLines, 
      walkability (%)
    },
    lifestyle: {
      nightlife, shopping, culture, safety
    }
  },
  // ... other neighborhoods
}
```

**Data for**: 5 neighborhoods (Alfama, Chiado, Dubai Marina, Downtown Dubai, Ribeira)
**Fallback**: Generic data for other neighborhoods

---

#### 4. **Filter Options** (LocationShowcase.jsx)
**Location**: `src/LocationShowcase.jsx` lines 116-123

**Data Structure**:
```javascript
const filters = [
  { value: 'all', label: 'All Locations' },
  { value: 'preferred', label: 'Preferred Choices' },
  { value: 'PT', label: 'Portugal' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AE', label: 'Dubai' },
  { value: 'SG', label: 'Singapore' }
]
```

**Total**: 6 filter options

---

## Summary

### In Supabase (2 datasets):
✅ City locations (6 cities) - `investment_locations` table
✅ Comments system - `page_comments` table

### Hardcoded (4 datasets):
❌ Neighborhoods (15 neighborhoods across 3 cities)
❌ City overview data (3 cities)
❌ Quality of life data (5+ neighborhoods)
❌ Filter options (6 filters)

---

## Migration Priority

### High Priority:
1. **Neighborhood Data** - Core feature, 15 neighborhoods with extensive metrics
2. **Quality of Life Data** - Justifies investment decisions, unique selling point

### Medium Priority:
3. **City Overview Data** - Currently only 3 cities, but essential for UX

### Low Priority:
4. **Filter Options** - Simple, static data, could be dynamically generated from city data

---

## Estimated Database Tables Needed

### 1. `neighborhoods` table
```sql
- id, city_id (FK), name, image_url, description
- price_per_sqm_eur_min/max, price_per_sqm_usd_min/max, price_per_sqm_gbp_min/max
- rental_yield_min/max
- days_to_rent_avg
- price_growth_5y (JSONB)
- acquisition_tax
- avg_holding_time
- days_available_to_rent
- rent_per_sqm_eur/usd/gbp
- rental_growth_5y (JSONB)
- avg_rental_time
```

### 2. `city_overview` table
```sql
- id, city_id (FK), hero_image_url, description
- highlights (JSONB array)
- avg_price_per_sqm_eur_min/max (aggregated)
- avg_rental_yield
- avg_days_to_rent
- price_growth_5y (JSONB)
```

### 3. `neighborhood_quality_of_life` table
```sql
- id, neighborhood_id (FK)
- popularity_factors (JSONB array)
- amenities_restaurants, amenities_cafes, amenities_supermarkets
- amenities_schools, amenities_healthcare, amenities_parks
- transport_metro_stations, transport_bus_lines, transport_tram_lines
- transport_walkability
- lifestyle_nightlife, lifestyle_shopping, lifestyle_culture, lifestyle_safety
```

---

## Benefits of Moving to Supabase

1. **Easy Updates**: Change metrics without code deployment
2. **Scalability**: Add new cities/neighborhoods via database inserts
3. **Real-time**: Update data dynamically (prices, availability)
4. **Multi-user**: Admins can manage data via dashboard
5. **Consistency**: Single source of truth
6. **Analytics**: Query across all locations
7. **API-ready**: Expose data to mobile apps or partners

---

## Recommendation

**Priority 1**: Migrate neighborhood data and quality of life data to Supabase
- These are the largest datasets (15 neighborhoods)
- Most likely to change/expand
- Core to the application's value proposition

**Priority 2**: Migrate city overview data
- Only 3 cities currently
- Supports the neighborhood context

**Priority 3**: Keep filters hardcoded for now
- Simple, static data
- Can be auto-generated from city data
- Low maintenance burden
