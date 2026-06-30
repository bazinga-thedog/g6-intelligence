# Profile-Specific Metrics Display

## Overview

Each investor profile sees **different metrics** on location cards that are relevant to their investment goals. This provides a personalized experience focused on what matters most to each profile.

---

## Metrics by Profile

### 🔄 **Common to ALL Profiles**

**1. Price/sqm** (Always shown first)
- Displays price range in selected currency (EUR/USD/GBP)
- Format: `€4,500 - €7,200`
- Position: Top-left metric

---

## 💰 **Income Seeker** - Focus: Stable Cash Flow

### Metrics Displayed (4 total):

1. **Price/sqm** (Common)
   - Entry cost indicator

2. **💰 Rental Yield** (HIGHLIGHTED - Blue)
   - Range: e.g., `5.5% - 7.2%`
   - **WHY**: Core metric for cash flow investors
   - Higher = better regular income

3. **📊 Income Stability** (Green if ≥7)
   - Score: `8/10`
   - **WHY**: Measures rental income consistency
   - Shows market rental demand stability

4. **✓ Golden Visa** OR **📅 Days to Rent**
   - Shows "Available" if Golden Visa exists
   - Otherwise shows `35 days` average
   - **WHY**: Golden Visa = residency benefit, Days = rental velocity

### Chart Display:
❌ **5Y Price Growth chart HIDDEN** (not priority for income seekers)

---

## 📈 **Growth Hunter** - Focus: Capital Appreciation

### Metrics Displayed (4 total):

1. **Price/sqm** (Common)
   - Entry cost indicator

2. **📈 5Y Growth** (HIGHLIGHTED - Blue)
   - Value: `+42.8%`
   - **WHY**: Historical appreciation - primary metric
   - Shows momentum and market trajectory

3. **🚀 Growth Potential** (Green if ≥7)
   - Score: `9/10`
   - **WHY**: Forward-looking growth assessment
   - Based on market fundamentals

4. **🏗️ Market Stage**
   - Value: `Emerging`, `Emerging-Mature`, `Mature`
   - **WHY**: Emerging markets = higher growth potential
   - Shows where in the appreciation cycle

### Chart Display:
✅ **5Y Price Growth chart SHOWN** (critical visualization)

---

## 🏖️ **Lifestyle Investor** - Focus: Quality of Life

### Metrics Displayed (4 total):

1. **Price/sqm** (Common)
   - Entry cost indicator

2. **🏖️ Lifestyle Appeal** (HIGHLIGHTED if ≥8)
   - Score: `10/10`
   - **WHY**: Quality of life is primary driver
   - Beaches, weather, culture, amenities

3. **✓ Golden Visa** OR **⭐ Quality Score**
   - Shows "Available" if Golden Visa exists
   - Otherwise shows combined score: `(lifestyle + income) / 2`
   - **WHY**: Golden Visa = residency pathway (key goal)

4. **💵 Rental Yield** (Neutral color)
   - Range: `5.5% - 7.2%`
   - **WHY**: Secondary consideration (offset costs)
   - Not highlighted but still useful

### Chart Display:
❌ **5Y Price Growth chart HIDDEN** (lifestyle > appreciation)

---

## 🏛️ **Sophisticated Builder** - Focus: Balanced Portfolio

### Metrics Displayed (4 total):

1. **Price/sqm** (Common)
   - Entry cost indicator

2. **📈 Growth Potential** (Green)
   - Score: `8/10`
   - **WHY**: Strategic appreciation opportunities

3. **💰 Income Stability** (Green)
   - Score: `8/10`
   - **WHY**: Balanced portfolio needs income + growth

4. **🔍 Market Transparency** (HIGHLIGHTED if ≥8)
   - Score: `10/10`
   - **WHY**: Sophisticated investors need clear data
   - Regulatory environment, market reporting

### Chart Display:
✅ **5Y Price Growth chart SHOWN** (data-driven decisions)

---

## Visual Hierarchy

### Metric Highlighting System

**HIGHLIGHTED (Blue background + border)**
- Most important metric for that profile
- Larger font size (1.1rem vs 1rem)
- Color: `#4a90e2`

**POSITIVE (Green text)**
- Supporting metrics with good scores
- Color: `#10b981`
- Shown when score ≥ 7/10

**NEUTRAL (White text)**
- Standard metrics
- Color: `#e5e5e5`

**Icons**
- Each metric has a relevant emoji icon
- Provides quick visual recognition
- E.g., 💰 = money/yield, 📈 = growth, 🏖️ = lifestyle

---

## Layout Changes

### Grid Structure
- **2-column grid** (was 3-column)
- 4 metrics total per card
- Better spacing for profile-specific data

### Responsive (Mobile)
- Switches to **1-column** on mobile
- Metrics stack vertically
- Icons remain visible

---

## Examples by City

### **Budapest (Income Seeker View)**
```
┌─────────────────────────────────┐
│ Price/sqm: €2,200 - €4,200     │
│ 💰 Rental Yield: 6.2% - 8.5%   │ ← HIGHLIGHTED
│ 📊 Income Stability: 7/10       │ ← GREEN
│ ✓ Golden Visa: Available        │ ← GREEN
└─────────────────────────────────┘
```

### **Athens (Growth Hunter View)**
```
┌─────────────────────────────────┐
│ Price/sqm: €2,800 - €5,200     │
│ 📈 5Y Growth: +42.8%            │ ← HIGHLIGHTED
│ 🚀 Growth Potential: 9/10       │ ← GREEN
│ 🏗️ Market Stage: Emerging       │ ← GREEN
└─────────────────────────────────┘
│ [5Y Growth Chart Displayed]     │
```

### **Algarve (Lifestyle Investor View)**
```
┌─────────────────────────────────┐
│ Price/sqm: €3,500 - €6,500     │
│ 🏖️ Lifestyle Appeal: 10/10     │ ← HIGHLIGHTED
│ ✓ Golden Visa: Available        │ ← GREEN
│ 💵 Rental Yield: 5.5% - 7.2%   │
└─────────────────────────────────┘
```

### **London (Sophisticated Builder View)**
```
┌─────────────────────────────────┐
│ Price/sqm: £10,000 - £15,500   │
│ 📈 Growth Potential: 5/10       │
│ 💰 Income Stability: 9/10       │ ← GREEN
│ 🔍 Market Transparency: 10/10   │ ← HIGHLIGHTED
└─────────────────────────────────┘
│ [5Y Growth Chart Displayed]     │
```

---

## Default Behavior (No Profile)

If user hasn't completed survey:
- Shows **3 generic metrics**:
  1. Price/sqm
  2. Rental Yield
  3. Days to Rent
- 5Y Growth chart shown
- No highlighting or icons

---

## Technical Implementation

### Component: `LocationShowcase.jsx`

**Function**: `getProfileMetrics(location, profile)`
- Returns array of 4 metric objects
- Each object has: `label`, `value`, `type`, `icon`
- Types: `highlight`, `positive`, `neutral`, `price`

**Conditional Chart Rendering**:
```javascript
{(investorProfile === 'Growth Hunter' || 
  investorProfile === 'Sophisticated Builder' || 
  !investorProfile) && (
  <div className="location-growth">
    {renderTrendline(location.metrics.priceGrowth5Y)}
  </div>
)}
```

### CSS Classes
- `.metric-highlight` - Blue background for key metrics
- `.metric-value.highlight` - Blue text + larger font
- `.metric-value.positive` - Green text
- `.metric-icon` - Emoji container

---

## Benefits

✅ **Personalization** - Each profile sees what matters to them
✅ **Less Clutter** - Only 4 relevant metrics (not overwhelming)
✅ **Visual Priority** - Highlighting shows what's most important
✅ **Better Decisions** - Profile-matched data = faster comparison
✅ **Education** - Users learn what to focus on for their goals

---

## Future Enhancements

- [ ] Tooltips explaining why each metric matters for the profile
- [ ] Toggle to "Show All Metrics" for power users
- [ ] Custom metric selection (let users choose)
- [ ] Metric comparison mode (side-by-side cities)
- [ ] Save favorite metrics per user
