# Location Showcase - Window Shopping for HNWI

## Overview
A luxury "storefront" page that displays curated real estate investment opportunities. Think **Loro Piana retail experience** for real estate.

## Page Flow
```
Landing Page → Survey (9 questions) → Location Showcase → Preferences (TBD)
```

## Access
1. Start dev server: `npm run dev`
2. Click **"Yes"** on landing page
3. Complete all 9 survey questions
4. **Location Showcase automatically loads**

## Features

### Hero Section
- Title: "Curated Investment Opportunities"
- Subtitle: "Explore our hand-selected locations across four premier markets"
- Dark gradient background

### Filter Bar
- All Locations
- Portugal
- United Kingdom
- Dubai
- Singapore

### Location Cards (3-column grid)
Each card displays:
- **Hero Image** (280px tall, zooms on hover)
- **Country Badge** (top-left overlay)
- **Selected Badge** (✓ when clicked)
- **Neighbourhood Name** (e.g., "Príncipe Real")
- **City, Country** (e.g., "Lisbon, Portugal")
- **Description** (luxury tagline)
- **3 Metrics**:
  - Avg. Yield: "5.2%"
  - 5Y Growth: "+42%" (green)
  - Price Range: "€650K - €1.2M"
- **Market Trend**: 📈 Growing / ➡️ Stable

### Interactions
- Click any card to select/deselect
- Multi-select enabled
- Selected cards: blue glow + elevated shadow
- Hover: card lifts, image zooms
- Filters work instantly

### Fixed Bottom Bar
- Shows: "X locations selected"
- Continue button (disabled until selection made)
- Sticky with blur backdrop

## Current Mock Data (6 Locations)

### Portugal
1. **Príncipe Real, Lisbon**
   - Yield: 5.2% | Growth: +42% | Price: €650K - €1.2M
   - "Historic charm meets modern luxury in central Lisbon"

2. **Foz do Douro, Porto**
   - Yield: 5.8% | Growth: +48% | Price: €450K - €950K
   - "Coastal elegance with strong rental yields"

### United Kingdom
3. **Kensington, London**
   - Yield: 3.8% | Growth: +28% | Price: £1.5M - £4M
   - "Prime central location with world-class amenities"

4. **Canary Wharf, London**
   - Yield: 4.2% | Growth: +31% | Price: £650K - £1.8M
   - "Financial district with high professional demand"

### Dubai
5. **Dubai Marina**
   - Yield: 6.8% | Growth: +35% | Price: AED 1.2M - 3.5M
   - "Waterfront living with high rental demand"

### Singapore
6. **Marina Bay**
   - Yield: 2.9% | Growth: +18% | Price: S$2.5M - S$8M
   - "Iconic skyline with stable long-term appreciation"

## Design Philosophy

### Visual Style
- **Loro Piana aesthetic**: Quiet luxury, understated elegance
- Dark gradient background: #0a0e1a → #1a1f2e
- Blue accent for selections: #4A90E2
- Green for growth metrics: #3d7a5c
- High-quality imagery (Unsplash placeholders)

### Animations
- Smooth fade-in on page load
- Card lift on hover
- Image zoom effect
- Filter transitions

### Responsive
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: 1-column stack

## Data Model (To Be Defined)

After UI feedback, we need to define:

### Location Entity
```javascript
{
  id: unique identifier,
  country: string,
  countryCode: string (PT, UK, AE, SG),
  city: string,
  neighbourhood: string,
  image: string (URL or path),
  metrics: {
    avgYield: string,
    growth5yr: string,
    priceRange: string,
    marketTrend: enum (up, stable, down)
  },
  description: string
}
```

### Questions to Address
1. **Data Source**: Where do locations come from?
   - Manual curation?
   - Database with real listings?
   - Mix of both?

2. **Hierarchy**: How to structure?
   - Country → City → Neighbourhood → Properties?
   - Flat list of curated locations?

3. **Images**: Storage strategy?
   - Supabase Storage?
   - CDN?
   - External service?

4. **Metrics**: Real-time or static?
   - Live data from market APIs?
   - Manually updated?
   - Mix (yield live, growth static)?

5. **Selections**: How to store?
   - New table: `prospect_location_selections`?
   - Add to existing `prospect_segmentation`?
   - Separate session table?

6. **Personalization**: Should we filter/rank based on KYC?
   - Show only locations matching their profile?
   - Rank by suitability?
   - Show all but highlight recommended?

## Next Steps

### Phase 1: UI Refinement
- [ ] Adjust card sizes/proportions
- [ ] Fine-tune metrics layout
- [ ] Test with real images
- [ ] Mobile optimization
- [ ] Add loading states

### Phase 2: Data Model
- [ ] Define location schema
- [ ] Create Supabase tables
- [ ] Decide on image strategy
- [ ] Define selection storage

### Phase 3: Integration
- [ ] Connect to real data
- [ ] Store prospect selections
- [ ] Add personalization logic
- [ ] Build preferences page (step 3)

## Technical Notes

### Files
- `src/LocationShowcase.jsx` - Main component
- `src/LocationShowcase.css` - Styles
- `src/App.jsx` - Routing logic

### State Management
Currently: Simple component state
Future: May need context or state management for:
- Selected locations across pages
- User profile data
- Personalization settings

### Performance
- Images are lazy-loaded via browser
- Filter is instant (client-side)
- Consider pagination for 50+ locations

## Testing
```bash
npm run dev
# Click "Yes" → Complete survey → Location Showcase loads
```
