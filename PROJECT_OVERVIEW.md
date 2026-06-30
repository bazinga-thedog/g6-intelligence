# G6 Intelligence - Project Overview

## Project Description

G6 Intelligence is a real estate investment platform designed for high-net-worth individuals (HNWIs) seeking international property investment opportunities. The platform provides personalized investment recommendations based on investor profiles, market data, and geographic diversification strategies.

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with dark theme
- **State Management**: React hooks (useState, useEffect, useMemo)

## Core Business Logic

### Investor Profile System

The platform segments users into 4 distinct investor profiles based on a KYC survey:

1. **Income Seeker**
   - Prioritizes: Rental yield, income stability, golden visa programs
   - Risk tolerance: Low to medium
   - Focus: Stable cash flow and residency options

2. **Growth Hunter**
   - Prioritizes: Capital appreciation, growth potential, emerging markets
   - Risk tolerance: Medium to high
   - Focus: High-growth opportunities and market momentum

3. **Lifestyle Investor**
   - Prioritizes: Lifestyle appeal, golden visa programs, quality of life
   - Risk tolerance: Medium
   - Focus: Personal use, residency, and lifestyle benefits

4. **Sophisticated Builder**
   - Prioritizes: Balanced growth and income, market transparency, diversification
   - Risk tolerance: Medium to high
   - Focus: Portfolio building with sophisticated strategies

### Recommendation Algorithm

**Key Rule**: The platform excludes cities from the user's tax residency country when calculating "Preferred Choice" recommendations to encourage international diversification.

#### Scoring Algorithm

Each location is scored based on the user's investor profile:

- **Income Seeker**: `(incomeStability × 2) + (rentalYield × 3) + (goldenVisa ? 5 : 0)`
- **Growth Hunter**: `(growthPotential × 3) + (priceGrowth5Y × 0.5) + (emerging ? 10 : 0)`
- **Lifestyle Investor**: `(lifestyleAppeal × 3) + (goldenVisa ? 10 : 0) + incomeStability`
- **Sophisticated Builder**: `(growthPotential × 1.5) + (incomeStability × 1.5) + lifestyleAppeal + (mature ? 5 : 0)`

#### Preferred Cities Logic

1. Fetch user's investor profile and tax residency from `prospect_segmentation` table
2. Filter out all cities from user's tax residency country
3. Calculate profile score for remaining cities
4. Select top 3 highest-scoring cities
5. Mark these 3 as "Preferred Choice" with star badge

**Example**: If user is from Portugal (tax residency = 'portugal'), Lisbon, Porto, and Algarve are automatically excluded from the top 3, even if they score highly for the user's profile.

## Database Schema

### Tables

#### `prospect_segmentation`
Stores user KYC survey results and investor classification:
```sql
- prospect_guid (UUID, primary key)
- investor_profile (TEXT) -- "Income Seeker", "Growth Hunter", etc.
- tax_residency (TEXT) -- 'portugal', 'uk', 'dubai', 'singapore', 'other'
- investment_horizon (TEXT)
- diversification_priority (TEXT)
- created_at (TIMESTAMP)
```

#### `investment_locations`
Master table of investment cities with metrics:
```sql
- id (INT, primary key)
- city (TEXT)
- country (TEXT)
- country_code (TEXT) -- 'PT', 'UK', 'AE', etc.
- image_url (TEXT)
- description (TEXT)

-- Pricing metrics (in EUR, USD, GBP)
- price_per_sqm_eur_min, price_per_sqm_eur_max
- price_per_sqm_usd_min, price_per_sqm_usd_max
- price_per_sqm_gbp_min, price_per_sqm_gbp_max

-- Investment metrics
- rental_yield_min, rental_yield_max (DECIMAL)
- days_to_rent_avg (INT)
- price_growth_5y (DECIMAL[]) -- Array of 5 values for chart

-- Profile matching attributes
- investor_profile_match (TEXT[]) -- Array of matching profiles
- market_maturity (TEXT) -- 'Emerging', 'Mature'
- lifestyle_appeal (INT) -- 1-10 scale
- growth_potential (INT) -- 1-10 scale
- income_stability (INT) -- 1-10 scale
- residency_program (BOOLEAN) -- Golden visa available
- market_transparency (INT) -- 1-10 scale
- liquidity_score (INT) -- 1-10 scale
- sophistication_required (INT) -- 1-10 scale
```

#### `neighborhoods`
Neighborhood-level data for each city:
```sql
- id (INT)
- city (TEXT)
- name (TEXT)
- description (TEXT)
- image_url (TEXT)
- price_per_sqm (INT)
- rental_yield (DECIMAL)
- days_to_rent (INT)
- price_growth_1y (DECIMAL)

-- Quality of life metrics
- walkability_score (INT)
- transit_score (INT)
- safety_rating (DECIMAL)
- school_rating (DECIMAL)
- restaurant_density (INT)
- park_access (INT)
- cultural_venues (INT)
```

#### `comments`
User feedback system:
```sql
- id (UUID)
- prospect_guid (UUID)
- page_id (TEXT) -- 'locations', 'neighborhoods', etc.
- content (TEXT)
- parent_id (UUID) -- For threaded replies
- created_at (TIMESTAMP)
```

## User Flow

### 1. Landing Page (`LandingPage.jsx`)
- Hero section with value proposition
- Embedded KYC survey modal
- Survey collects: investment amount, timeline, goals, experience, tax residency
- On completion: Navigate to `/locations`

### 2. Location Showcase (`LocationShowcase.jsx`)
- Display all available investment cities
- **Preferred Choice** badge on top 3 cities (excluding user's home country)
- Filter by: All, Preferred, Portugal, UK, Dubai
- Shows first 3 cities by default with "See More" to expand
- Profile-specific metrics displayed on each card
- Click city → Navigate to neighborhoods

### 3. Neighborhood Showcase (`NeighborhoodShowcase.jsx`)
- Shows neighborhoods within selected city
- Quality of life metrics
- Comparison table
- Click neighborhood → Navigate to detail

### 4. Neighborhood Detail (`NeighborhoodDetail.jsx`)
- Detailed neighborhood analysis
- Investment calculator
- Market insights
- "Continue" → Navigate to investment details

### 5. Investment Details (`InvestmentDetails.jsx`)
- Complete investment roadmap (9 phases)
- Timeline visualization
- Cost breakdown
- Call-to-action for consultation booking

### 6. Schedule Consultation (`ScheduleConsultation.jsx`)
- Calendar interface
- Time slot selection
- Contact form
- Confirmation flow

## Key Components

### LocationShowcase.jsx

**Purpose**: Display investment cities with personalized recommendations

**Key Features**:
- Dynamic "Preferred Choice" calculation using `useMemo`
- Tax residency-based filtering
- Profile-specific metric display
- Trendline charts for 5-year price growth
- Multi-currency support (EUR, USD, GBP)

**State Management**:
```javascript
- rawLocations: Raw data from database
- locations: Computed with useMemo (includes isPreferred flag)
- investorProfile: User's profile from survey
- taxResidency: User's tax residency country
```

**Critical Logic**:
```javascript
const getTaxResidencyCountryCode = (taxRes) => {
  const mapping = {
    'portugal': 'PT',
    'uk': 'UK',
    'dubai': 'AE',
    'singapore': 'SG',
    'other': null
  }
  return mapping[taxRes.toLowerCase()] || null
}

const calculatePreferredCities = (locs, profile, userTaxResidency) => {
  const userCountryCode = getTaxResidencyCountryCode(userTaxResidency)
  
  // CRITICAL: Filter out user's home country
  const eligibleLocations = userCountryCode
    ? locs.filter(loc => loc.countryCode !== userCountryCode)
    : locs
  
  // Sort by profile score
  const sortedByScore = [...eligibleLocations].sort((a, b) => {
    const aScore = calculateProfileScore(a, profile)
    const bScore = calculateProfileScore(b, profile)
    return bScore - aScore
  })
  
  // Mark top 3 as preferred
  const top3Ids = sortedByScore.slice(0, 3).map(loc => loc.id)
  return locs.map(loc => ({
    ...loc,
    isPreferred: top3Ids.includes(loc.id)
  }))
}
```

### Survey.jsx

**Purpose**: KYC survey to determine investor profile

**Survey Questions**:
1. Investment amount (€100k-500k ranges)
2. Investment timeline (1-3 years, 3-5 years, 5+ years)
3. Primary goal (income, growth, lifestyle, balanced)
4. Investment experience (first-time, some, experienced, sophisticated)
5. Tax residency (portugal, uk, dubai, singapore, other)
6. Home market yield (% input)
7. Diversification priority (yes/no)

**Classification Logic**:
- Combines answers to assign one of 4 investor profiles
- Stores in `prospect_segmentation` table
- Uses `prospect_guid` (UUID stored in localStorage) to track users

### NeighborhoodDetail.jsx

**Purpose**: Detailed neighborhood analysis with investment insights

**Features**:
- Comprehensive metrics dashboard
- ROI projections
- Quality of life indicators
- Investment timeline roadmap
- Conversion modal for consultation booking

## Styling Approach

### Dark Theme
- Background: `#0a0a0a`
- Cards: `#1a1a1a`
- Text: `#e5e5e5`
- Accent: `#4a90e2` (blue)
- Success: `#10b981` (green)

### Design Principles
- Mobile-first responsive design
- Smooth transitions and hover effects
- Glassmorphism effects with backdrop blur
- Card-based layouts with 3-column grid
- Minimalist badges and indicators

### Key CSS Classes
```css
.location-card.preferred /* Top 3 cities */
.preferred-badge /* Star icon badge */
.metric /* Grid item for metrics */
.metric-highlight /* Emphasized metrics */
.see-more-btn /* Show more cities button */
```

## Routing Structure

```
/ (LandingPage)
  └─> /locations (LocationShowcase)
       └─> /neighborhoods/:cityName (NeighborhoodShowcase)
            └─> /neighborhoods/:cityName/:neighborhoodName (NeighborhoodDetail)
                 └─> /neighborhoods/:cityName/:neighborhoodName/investment (InvestmentDetails)
                      └─> /schedule-consultation (ScheduleConsultation)
                           └─> /consultation-confirmation (ConsultationConfirmation)
```

## Important Implementation Details

### 1. Tax Residency Exclusion
- **CRITICAL**: Always exclude user's home country from "Preferred Choice"
- Implemented in `calculatePreferredCities()` function
- Uses `useMemo` to avoid race conditions

### 2. Profile-Specific Metrics
Each profile sees different metrics on location cards:
- Income Seeker: Rental Yield, Income Stability, Golden Visa
- Growth Hunter: Current Appreciation, Growth Potential, 5Y Chart
- Lifestyle Investor: Lifestyle Appeal, Golden Visa, Rental Yield
- Sophisticated Builder: Growth Potential, Market Transparency, 5Y Chart

### 3. Prospect Tracking
- Uses `prospect_guid` (UUID) stored in localStorage
- Survives page refreshes
- Links survey responses to user actions
- No authentication required

### 4. Multi-Currency Support
- All prices stored in EUR, USD, GBP
- User selects currency preference
- Displayed consistently across platform

### 5. Comment System
- Threaded comments with replies
- Tied to specific pages (page_id)
- Anonymous but tracked by prospect_guid

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Environment Variables

Supabase configuration (in `src/supabaseClient.js`):
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

## Known Limitations

1. Singapore excluded from all listings (cannot buy there)
2. Fixed to 4 investor profiles (not customizable)
3. No user authentication (relies on localStorage UUID)
4. Limited to cities with data in database
5. 5-year price growth must be exactly 5 data points for chart

## Future Enhancements

- User authentication and saved portfolios
- Comparison tool for multiple cities/neighborhoods
- Investment calculator with personalized assumptions
- Email notifications for new opportunities
- Integration with property listing APIs
- Mobile app version
- Multi-language support
- Advanced filtering (price range, yield range, etc.)

## Key Files

```
src/
├── App.jsx                      # Main router and app shell
├── LandingPage.jsx              # Homepage with hero and survey
├── Survey.jsx                   # KYC survey modal
├── LocationShowcase.jsx         # City listings (PREFERRED LOGIC HERE)
├── NeighborhoodShowcase.jsx     # Neighborhood listings
├── NeighborhoodDetail.jsx       # Neighborhood detail page
├── InvestmentDetails.jsx        # Investment roadmap
├── ScheduleConsultation.jsx     # Booking interface
├── ConsultationConfirmation.jsx # Booking confirmation
├── CommentSystem.jsx            # Feedback comments
├── supabaseClient.js            # Supabase configuration
└── prospectGuid.js              # UUID generation/retrieval

SQL migration files:
├── supabase-prospect-segmentation.sql
├── supabase-add-profile-matching.sql
├── supabase-enriched-cities.sql
└── supabase-uk-cities.sql
```

## Testing Scenarios

### Test Case 1: Portugal Resident, Income Seeker
- Tax residency: portugal
- Expected: Lisbon, Porto, Algarve NOT in top 3
- Should see: Dubai, UK cities, or other countries

### Test Case 2: UK Resident, Growth Hunter
- Tax residency: uk
- Expected: London, Manchester, etc. NOT in top 3
- Should see: Emerging markets prioritized

### Test Case 3: Dubai Resident, Lifestyle Investor
- Tax residency: dubai
- Expected: Dubai NOT in top 3
- Should see: High lifestyle appeal cities

### Test Case 4: Unknown Country ("Other")
- Tax residency: other
- Expected: No filtering, all cities eligible
- Should see: Pure profile-based ranking

## Debugging

Enable console logs to trace recommendation logic:
```javascript
console.log('=== Calculating Preferred Cities ===')
console.log('Tax Residency:', userTaxResidency)
console.log('User Country Code:', userCountryCode)
console.log('Excluding:', cityName)
console.log('Top 3 Preferred:', cities)
```

## Contact & Support

For questions about the codebase or implementation details, refer to:
- `PROJECT_CONTEXT.md` - Additional context
- `LOCATION_SHOWCASE_README.md` - Location showcase details
- `PROFILE-BASED-RECOMMENDATIONS.md` - Recommendation algorithm details
