# Profile-Based City Recommendations

## Overview

The system now personalizes city recommendations based on the investor profile determined during the KYC survey. Cities are ranked and highlighted based on their match with the user's profile.

## Four Investor Profiles

### 1. **Income Seeker**
- **Focus**: Stable rental yields and consistent cash flow
- **Risk Tolerance**: Conservative to moderate
- **Recommended Cities**:
  - **Lisbon** - Stable market, 4.5-6.2% yields, Golden Visa
  - **Dubai** - High yields (5.8-7.5%), zero taxes, strong rental demand
  - **Porto** - Emerging market, 5.2-6.8% yields
  - **Budapest** - Exceptional yields (6.2-8.5%), low entry cost
  - **Barcelona** - Tourism-driven rentals, 4.2-5.8% yields
  - **Algarve** - Resort market, 5.5-7.2% yields, vacation rentals

**Ranking Factors**:
- Income Stability Score × 2
- Rental Yield × 3
- Residency Program availability (+5 bonus)

---

### 2. **Growth Hunter**
- **Focus**: Capital appreciation and emerging markets
- **Risk Tolerance**: Growth-oriented to aggressive
- **Recommended Cities**:
  - **Athens** - Exceptional growth (42.8% over 5Y), €2,800-5,200/sqm
  - **Tallinn** - Tech hub, 48.8% growth over 5Y
  - **Dubai** - 22.8% growth, emerging luxury market
  - **Porto** - 25.3% growth, still affordable
  - **Berlin** - Tech hub, 38.5% growth trajectory
  - **Budapest** - 45.2% growth, undervalued market
  - **Barcelona** - Tourism boom, 20.5% growth

**Ranking Factors**:
- Growth Potential Score × 3
- 5-Year Price Growth × 0.5
- Emerging Market Status (+10 bonus)

---

### 3. **Lifestyle Investor**
- **Focus**: Quality of life, residency, personal use
- **Risk Tolerance**: Varies (lifestyle over returns)
- **Recommended Cities**:
  - **Algarve** - Premier beaches, golf, 300+ days sunshine
  - **Barcelona** - Mediterranean lifestyle, culture, cuisine
  - **Lisbon** - Historic charm, international appeal, Golden Visa
  - **Miami** - International gateway, year-round sunshine, no state tax
  - **London** - World-class amenities, global hub

**Ranking Factors**:
- Lifestyle Appeal Score × 3
- Residency Program (+10 bonus)
- Income Stability × 1

---

### 4. **Sophisticated Builder**
- **Focus**: Strategic diversification, balanced portfolio
- **Risk Tolerance**: Experienced, data-driven
- **Recommended Cities**:
  - **Dubai** - Tax advantages, high liquidity, strong fundamentals
  - **London** - Mature market, maximum transparency, stable
  - **Lisbon** - Balanced growth + income, EU access
  - **Miami** - International hub, appreciation + lifestyle
  - **Berlin** - Tech ecosystem, balanced fundamentals
  - **Tallinn** - Digital infrastructure, EU emerging market

**Ranking Factors**:
- Growth Potential × 1.5
- Income Stability × 1.5
- Lifestyle Appeal × 1
- Mature Market Status (+5 bonus)

---

## New Cities Added (8 Total)

### **Barcelona, Spain**
- **Highlights**: Mediterranean hub, tourism economy, Golden Visa
- **Price**: €4,200-8,500/sqm
- **Yield**: 4.2-5.8%
- **Growth**: 20.5% (5Y)
- **Profile Match**: Income Seeker, Lifestyle Investor, Growth Hunter

### **Athens, Greece**
- **Highlights**: Exceptional value, tourism boom, €250k Golden Visa
- **Price**: €2,800-5,200/sqm
- **Yield**: 5.5-7.2%
- **Growth**: 42.8% (5Y) - **Highest growth**
- **Profile Match**: Growth Hunter, Income Seeker

### **Miami, USA**
- **Highlights**: International gateway, no state income tax, luxury market
- **Price**: €5,800-11,500/sqm
- **Yield**: 4.5-6.2%
- **Growth**: 35.2% (5Y)
- **Profile Match**: Sophisticated Builder, Lifestyle Investor, Growth Hunter

### **Berlin, Germany**
- **Highlights**: Tech and startup hub, EU's largest economy
- **Price**: €4,500-7,800/sqm
- **Yield**: 3.8-5.2%
- **Growth**: 38.5% (5Y)
- **Profile Match**: Growth Hunter, Sophisticated Builder

### **Budapest, Hungary**
- **Highlights**: Exceptional yields, low entry costs, EU membership
- **Price**: €2,200-4,200/sqm
- **Yield**: 6.2-8.5% - **Highest yield**
- **Growth**: 45.2% (5Y)
- **Profile Match**: Income Seeker, Growth Hunter

### **Algarve, Portugal**
- **Highlights**: Premier resort destination, 300+ days sunshine, golf
- **Price**: €3,500-6,500/sqm
- **Yield**: 5.5-7.2%
- **Growth**: 32.8% (5Y)
- **Profile Match**: Lifestyle Investor, Income Seeker

### **Tallinn, Estonia**
- **Highlights**: Digital-first nation, E-Residency, tech ecosystem
- **Price**: €2,800-4,800/sqm
- **Yield**: 5.2-6.8%
- **Growth**: 48.8% (5Y) - **Second highest growth**
- **Profile Match**: Growth Hunter, Sophisticated Builder

### **Manchester, UK** (Existing)
- **Profile Match**: Income Seeker, Growth Hunter
- **Yield**: 4.8-6.2%
- **Growth**: 11.2% (5Y)

---

## Singapore Removed

**Reason**: Foreign ownership restrictions and 60% Additional Buyer's Stamp Duty (ABSD) make it impractical for most foreign investors.

---

## Technical Implementation

### Database Schema
New columns added to `investment_locations`:
- `investor_profile_match` (JSONB) - Array of matching profiles
- `market_maturity` - Emerging, Emerging-Mature, Mature, Declining
- `lifestyle_appeal` (1-10) - Quality of life score
- `growth_potential` (1-10) - Capital appreciation potential
- `income_stability` (1-10) - Rental income consistency
- `sophistication_required` (1-10) - Market complexity
- `residency_program` (Boolean) - Golden Visa availability
- `tax_advantages` (Text) - Tax benefits description
- `market_transparency` (1-10) - Regulatory clarity
- `liquidity_score` (1-10) - Ease of buying/selling
- `entry_barriers` (Text) - Barriers for foreign investors

### Ranking Algorithm

1. **Fetch Investor Profile** from `prospect_segmentation` table using `prospect_guid`
2. **Filter Cities** - Exclude Singapore
3. **Sort by**:
   - Exact profile match (priority)
   - Preferred status
   - Profile-specific scoring:
     - **Income Seeker**: (incomeStability × 2) + (rentalYield × 3) + residencyBonus
     - **Growth Hunter**: (growthPotential × 3) + (5YGrowth × 0.5) + emergingMarketBonus
     - **Lifestyle Investor**: (lifestyleAppeal × 3) + residencyBonus + incomeStability
     - **Sophisticated Builder**: (growthPotential × 1.5) + (incomeStability × 1.5) + lifestyleAppeal + matureMarketBonus

4. **Display Badge**: Green "Recommended for [Profile]" badge on matched cities

### User Experience

- **Before Survey**: Cities sorted by preferred status
- **After Survey**: Cities re-ranked based on investor profile
- **Visual Indicator**: Green badge shows "Recommended for [Your Profile]"
- **Transparency**: User sees why certain cities appear first

---

## SQL Migration Steps

1. Run `supabase-add-profile-matching.sql` - Adds new columns and updates existing cities
2. Run `supabase-enriched-cities.sql` - Adds 7 new cities with full profile data
3. System automatically fetches profile and ranks cities

---

## Future Enhancements

- **Explainability**: Show "Why this city?" with key matching factors
- **Filters**: Allow users to filter by profile attributes (yield range, growth potential, etc.)
- **Comparison**: Side-by-side comparison of profile-matched cities
- **Notifications**: Alert users when new cities matching their profile are added
