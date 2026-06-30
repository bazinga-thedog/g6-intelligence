# Profile-Specific Metrics - HNWI Professional Version

## Overview

Each investor profile displays **4 carefully selected metrics** relevant to their investment strategy. The interface is designed for high-net-worth individuals with a professional, data-driven aesthetic.

**Key Design Principles:**
- ✅ No emoji icons (professional appearance)
- ✅ One metric is a 5-year trend chart (visual data)
- ✅ Clean typography and spacing
- ✅ Highlighted primary metrics
- ✅ Color-coded performance indicators

---

## Metrics by Profile

### 💰 **Income Seeker** - Stable Cash Flow Focus

**4 Metrics Displayed:**

1. **Price/sqm** (Entry Cost)
   - Range in selected currency
   - Example: `€4,500 - €7,200`

2. **Rental Yield** (PRIMARY - HIGHLIGHTED)
   - Annual rental return range
   - Example: `5.5% - 7.2%`
   - **Blue highlight** - Most important metric

3. **Income Stability** (Score)
   - Rental market consistency rating
   - Example: `8/10`
   - Green text if ≥7

4. **Golden Visa** OR **Days to Rent**
   - Shows "Available" if Golden Visa program exists
   - Otherwise shows average rental velocity
   - Example: `Available` or `35 days`
   - Green text for Golden Visa

**NO 5Y Chart** - Income seekers prioritize current yield over appreciation

---

### 📈 **Growth Hunter** - Capital Appreciation Focus

**4 Metrics Displayed:**

1. **Price/sqm** (Entry Cost)
   - Range in selected currency
   - Example: `€2,800 - €5,200`

2. **Current Appreciation** (PRIMARY - HIGHLIGHTED)
   - Latest 5-year growth figure
   - Example: `+42.8%`
   - **Blue highlight** - Most important metric

3. **Growth Potential** (Score)
   - Forward-looking growth assessment
   - Example: `9/10`
   - Green text if ≥7

4. **5Y Price Growth Chart** (VISUAL)
   - **Trendline chart spanning full width**
   - Shows 5-year historical trajectory
   - Color: Green (positive) or Red (negative)
   - Critical for growth analysis

---

### 🏖️ **Lifestyle Investor** - Quality of Life Focus

**4 Metrics Displayed:**

1. **Price/sqm** (Entry Cost)
   - Range in selected currency
   - Example: `€3,500 - €6,500`

2. **Lifestyle Appeal** (PRIMARY - HIGHLIGHTED)
   - Quality of life rating
   - Example: `10/10`
   - **Blue highlight** if ≥8

3. **Golden Visa** OR **Overall Quality**
   - Shows "Available" if Golden Visa program exists
   - Otherwise shows combined lifestyle + income score
   - Example: `Available` or `9/10`
   - Green text

4. **Rental Yield** (Secondary)
   - Annual rental return range
   - Example: `5.5% - 7.2%`
   - Standard white text (not primary focus)

**NO 5Y Chart** - Lifestyle investors prioritize location quality over appreciation

---

### 🏛️ **Sophisticated Builder** - Balanced Portfolio Focus

**4 Metrics Displayed:**

1. **Price/sqm** (Entry Cost)
   - Range in selected currency
   - Example: `£10,000 - £15,500`

2. **Growth Potential** (Score)
   - Forward-looking growth assessment
   - Example: `5/10`
   - Green text if ≥7

3. **Market Transparency** (PRIMARY - HIGHLIGHTED)
   - Regulatory clarity and data quality
   - Example: `10/10`
   - **Blue highlight** if ≥8
   - Critical for sophisticated analysis

4. **5Y Price Growth Chart** (VISUAL)
   - **Trendline chart spanning full width**
   - Shows 5-year historical trajectory
   - Essential for data-driven decisions

---

## Visual Design System

### Color Coding

| Color | Purpose | When Applied |
|-------|---------|--------------|
| **Blue (#4a90e2)** | Primary Focus | Profile's most important metric |
| **Green (#10b981)** | Positive/High Score | Score ≥7/10 or favorable condition |
| **White (#e5e5e5)** | Standard | Default display |
| **Gray (#6b7280)** | Labels | Metric labels |

### Typography

- **Metric Labels**: 
  - 0.7rem, 600 weight
  - Uppercase, letter-spacing 0.08em
  - Professional, clean appearance

- **Metric Values**: 
  - 1.05rem standard, 1.15rem highlighted
  - 600 weight standard, 700 weight highlighted
  - Letter-spacing -0.01em (tighter for numbers)

### Layout

- **2-Column Grid** on desktop
- **1-Column Grid** on mobile
- **Full-Width Chart** - Spans both columns
- Subtle borders and backgrounds (no heavy shadows)

---

## Chart Display Rules

| Profile | Chart Shown? | Reason |
|---------|--------------|--------|
| **Income Seeker** | ❌ No | Focus on current yield, not appreciation |
| **Growth Hunter** | ✅ Yes | Essential for growth analysis |
| **Lifestyle Investor** | ❌ No | Quality of life > financial returns |
| **Sophisticated Builder** | ✅ Yes | Data-driven portfolio decisions |
| **No Profile (Default)** | ✅ Yes | General investor interest |

---

## Examples by Profile & City

### Income Seeker viewing Budapest

```
┌─────────────────────────────────────────┐
│ PRICE/SQM                               │
│ €2,200 - €4,200                         │
├─────────────────────────────────────────┤
│ RENTAL YIELD                 [BLUE BG]  │
│ 6.2% - 8.5%                  [BLUE]     │
├─────────────────────────────────────────┤
│ INCOME STABILITY                        │
│ 7/10                         [GREEN]    │
├─────────────────────────────────────────┤
│ GOLDEN VISA                             │
│ Available                    [GREEN]    │
└─────────────────────────────────────────┘
```

### Growth Hunter viewing Athens

```
┌─────────────────────────────────────────┐
│ PRICE/SQM                               │
│ €2,800 - €5,200                         │
├─────────────────────────────────────────┤
│ CURRENT APPRECIATION         [BLUE BG]  │
│ +42.8%                       [BLUE]     │
├─────────────────────────────────────────┤
│ GROWTH POTENTIAL                        │
│ 9/10                         [GREEN]    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 5Y PRICE GROWTH                         │
│ ──────────────────▲                     │
│         ●──●──●──●──●                   │
│                           +42.8%        │
└─────────────────────────────────────────┘
```

### Lifestyle Investor viewing Algarve

```
┌─────────────────────────────────────────┐
│ PRICE/SQM                               │
│ €3,500 - €6,500                         │
├─────────────────────────────────────────┤
│ LIFESTYLE APPEAL             [BLUE BG]  │
│ 10/10                        [BLUE]     │
├─────────────────────────────────────────┤
│ GOLDEN VISA                             │
│ Available                    [GREEN]    │
├─────────────────────────────────────────┤
│ RENTAL YIELD                            │
│ 5.5% - 7.2%                  [WHITE]    │
└─────────────────────────────────────────┘
```

### Sophisticated Builder viewing London

```
┌─────────────────────────────────────────┐
│ PRICE/SQM                               │
│ £10,000 - £15,500                       │
├─────────────────────────────────────────┤
│ GROWTH POTENTIAL                        │
│ 5/10                         [WHITE]    │
├─────────────────────────────────────────┤
│ MARKET TRANSPARENCY          [BLUE BG]  │
│ 10/10                        [BLUE]     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 5Y PRICE GROWTH                         │
│ ──────────────────▲                     │
│    ●──●──●──●──●                        │
│                           +12.1%        │
└─────────────────────────────────────────┘
```

---

## Key Changes from Previous Version

### ❌ Removed
- Emoji icons (💰, 📈, 🏖️, etc.)
- Separate chart section below metrics
- 3-column metric grid

### ✅ Added
- Chart as one of the 4 metrics (full-width)
- Professional HNWI design aesthetic
- Cleaner borders and subtle backgrounds
- Better typography hierarchy

### ✅ Improved
- More prominent highlighting for primary metrics
- Better spacing and padding
- Consistent 4-metric layout for all profiles
- Responsive design for mobile

---

## Technical Details

### Chart Integration

The chart is now treated as a metric:
```javascript
{
  label: '5Y Price Growth',
  type: 'chart',
  isChart: true,
  chartData: location.metrics.priceGrowth5Y
}
```

### Rendering Logic

```javascript
{getProfileMetrics(location, investorProfile).map((metric, index) => (
  metric.isChart ? (
    // Full-width chart metric
  ) : (
    // Standard text metric
  )
))}
```

### CSS Classes

- `.metric` - Standard metric container
- `.metric-highlight` - Blue background for primary metric
- `.metric-chart` - Full-width chart container (grid-column: 1 / -1)
- `.metric-value.highlight` - Blue text + larger font
- `.metric-value.positive` - Green text for high scores

---

## Testing Checklist

For each profile, verify:

- [ ] Exactly 4 items display (3 text metrics + 1 chart for some profiles)
- [ ] No emoji icons visible
- [ ] Primary metric has blue background
- [ ] Chart spans full width when present
- [ ] Chart only shows for Growth Hunter, Sophisticated Builder, and Default
- [ ] Green text for scores ≥7/10
- [ ] Mobile view shows 1-column layout
- [ ] Professional, clean appearance suitable for HNWI

---

## Summary

This version provides a **professional, data-driven interface** suitable for high-net-worth investors:

✅ Clean, minimalist design without emoji
✅ Integrated chart as a metric (not separate)
✅ Clear visual hierarchy with highlighting
✅ Profile-optimized data presentation
✅ Responsive and accessible
