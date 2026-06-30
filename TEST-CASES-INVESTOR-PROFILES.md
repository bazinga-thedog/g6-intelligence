# Test Cases: Investor Profile Recommendations

## Overview

After the KYC survey, the system:
- Determines investor profile (internal classification - NOT shown to user)
- Displays **ONLY 3 cities** personalized to the profile
- Shows "Recommended" badge on matched cities
- Displays profile-specific metrics (no emojis)

---

## Test Case 1: INCOME SEEKER 💰

**Profile Goal**: Conservative investor seeking stable rental income and cash flow

### Survey Path
1. **Q1: Investment Range** → Any option (e.g., "€500K - €750K")
2. **Q2: Investment Objective** → Click **"Yield Generation"** _(Regular cash flows through rental income)_ **[CRITICAL]**
3. **Q3: Investment Horizon** → Any option (e.g., "5 - 7 years")
4. **Q4: Risk Tolerance** → Click **"Hold the property but avoid making any additional investments until the market stabilizes"** _(Conservative)_ **[CRITICAL]**
5. **Q5: Real Estate Experience** → Any option (e.g., "Active Investor")
6. **Q6: International Experience** → Any option (e.g., "Exploring International Markets")
7. **Q7: Tax Residency** → Any option (e.g., "Portugal")
8. **Q8: Home Market Yield** → Type "5" or click **"I don't know"**
9. **Q9: Diversification Priority** → Any option (e.g., "Yes")

### Expected Result: **Income Seeker**

### Top 3 Cities Displayed:
1. ✅ **Nottingham** - 6.8-8.5% yield (HIGHEST UK), £2,400-3,900/sqm, student market
2. ✅ **Newcastle** - 6.5-8.2% yield, £2,200-3,700/sqm, affordable entry
3. ✅ **Liverpool** - 6.2-8.0% yield, £2,400-4,200/sqm, UNESCO heritage

**Alternative Top 3 (depending on sorting):**
- Nottingham, Newcastle, Liverpool
- Liverpool, Dubai, Algarve
- Dubai, Algarve, Porto

### Metrics Displayed (Income Seeker):
- ✅ Price/sqm
- ✅ **Rental Yield** (HIGHLIGHTED - blue background)
- ✅ Income Stability score
- ✅ Golden Visa / Days to Rent
- ❌ NO 5Y chart shown

### Badge Display:
Cities should show **dark badge**: "✓ Recommended" (top-right corner)

---

## Test Case 2: GROWTH HUNTER 📈

**Profile Goal**: Aggressive investor seeking capital appreciation in emerging markets

### Survey Path
1. **Q1: Investment Range** → Any option (e.g., "€1M - €1.25M")
2. **Q2: Investment Objective** → Click **"Capital Growth"** _(Value appreciation)_ **[CRITICAL]**
3. **Q3: Investment Horizon** → Select **"7 - 10 years"** or **"10+ years"**
4. **Q4: Risk Tolerance** → Click **"Look for opportunities to acquire additional properties at discounted prices"** _(Growth-oriented)_ **[CRITICAL]**
5. **Q5: Real Estate Experience** → Any option (e.g., "Active Investor")
6. **Q6: International Experience** → Any option (e.g., "Initial Portfolio Diversification")
7. **Q7: Tax Residency** → Any option (e.g., "Dubai")
8. **Q8: Home Market Yield** → Type "7" or click **"I don't know"**
9. **Q9: Diversification Priority** → Any option (e.g., "No")

### Expected Result: **Growth Hunter**

### Top 3 Cities Displayed:
1. ✅ **Bristol** - 26.5% growth (HIGHEST), £3,900-6,800/sqm, creative hub
2. ✅ **Liverpool** - 22.8% growth, £2,400-4,200/sqm, regeneration
3. ✅ **Dubai** - 22.8% growth, zero taxes, 9/10 growth potential

**Alternative Top 3 (depending on sorting):**
- Bristol, Liverpool, Dubai
- Liverpool, Porto, Dubai
- Porto, Algarve, Bristol

### Metrics Displayed (Growth Hunter):
- ✅ Price/sqm
- ✅ **Current Appreciation** (HIGHLIGHTED - blue background)
- ✅ Growth Potential score
- ✅ **5Y Price Growth Chart** (full-width, visual)

### Badge Display:
Cities should show **dark badge**: "✓ Recommended" (top-right corner)

---

## Test Case 3: LIFESTYLE INVESTOR 🏖️

**Profile Goal**: Investor prioritizing quality of life, residency programs, and personal use

### Survey Path
1. **Q1: Investment Range** → Any option (e.g., "€750K - €1M")
2. **Q2: Investment Objective** → Click **"Residency Benefits"** _(Golden visa and residence programs)_ **[CRITICAL]** OR **"Personal Use"** _(Primary or secondary residence)_ **[CRITICAL]**
3. **Q3: Investment Horizon** → Any option (e.g., "10+ years")
4. **Q4: Risk Tolerance** → Any option (e.g., "Hold the property but avoid making any additional investments...")
5. **Q5: Real Estate Experience** → Any option (e.g., "New to Real Estate Investment")
6. **Q6: International Experience** → Any option (e.g., "Exploring International Markets")
7. **Q7: Tax Residency** → Any option (e.g., "United Kingdom")
8. **Q8: Home Market Yield** → Type "4" or click **"I don't know"**
9. **Q9: Diversification Priority** → Any option (e.g., "Yes")

### Expected Result: **Lifestyle Investor**

### Top 3 Cities Displayed:
1. ✅ **Algarve** - 10/10 lifestyle, beaches, golf, Golden Visa
2. ✅ **Lisbon** - 9/10 lifestyle, historic charm, Golden Visa
3. ✅ **Edinburgh** - 9/10 lifestyle, UNESCO heritage, festivals

**Alternative Top 3 (depending on sorting):**
- Algarve, Lisbon, Edinburgh
- Algarve, Edinburgh, Bristol
- Lisbon, Edinburgh, Porto

### Metrics Displayed (Lifestyle Investor):
- ✅ Price/sqm
- ✅ **Lifestyle Appeal** (HIGHLIGHTED - blue background)
- ✅ Golden Visa / Overall Quality
- ✅ Rental Yield (secondary, white text)
- ❌ NO 5Y chart shown

### Badge Display:
Cities should show **dark badge**: "✓ Recommended" (top-right corner)

---

## Test Case 4: SOPHISTICATED BUILDER 🏛️

**Profile Goal**: Experienced investor building strategic global portfolio with balanced fundamentals

### Survey Path
1. **Q1: Investment Range** → Select **"€1.5M - €5M"** or **"€5M+"**
2. **Q2: Investment Objective** → Click **"Capital Growth"** _(Value appreciation)_
3. **Q3: Investment Horizon** → Select **"7 - 10 years"** or **"10+ years"**
4. **Q4: Risk Tolerance** → Click **"Look for opportunities to acquire additional properties at discounted prices"** _(Growth-oriented)_ **[CRITICAL]**
5. **Q5: Real Estate Experience** → Click **"Professional Investor"** _(Extensive portfolio with dedicated management)_ **[CRITICAL]**
6. **Q6: International Experience** → Click **"Established International Presence"** _(Multiple markets with active holdings)_ OR **"Extensive Global Portfolio"** **[CRITICAL]**
7. **Q7: Tax Residency** → Any option (e.g., "Dubai")
8. **Q8: Home Market Yield** → Type "6" or click **"I don't know"**
9. **Q9: Diversification Priority** → Click **"Yes"** **[IMPORTANT for strategic classification]**

### Expected Result: **Sophisticated Builder**

### Top 3 Cities Displayed:
1. ✅ **Dubai** - Balanced fundamentals, zero taxes, 8/10 liquidity, Golden Visa
2. ✅ **London** - 10/10 transparency, 10/10 liquidity, mature market
3. ✅ **Lisbon** - Balanced growth + income, EU access, Golden Visa

**Alternative Top 3 (depending on sorting):**
- Dubai, London, Lisbon
- London, Dubai, Edinburgh
- Dubai, Lisbon, Berlin

### Metrics Displayed (Sophisticated Builder):
- ✅ Price/sqm
- ✅ Growth Potential score
- ✅ **Market Transparency** (HIGHLIGHTED - blue background)
- ✅ **5Y Price Growth Chart** (full-width, visual)

### Badge Display:
Cities should show **dark badge**: "✓ Recommended" (top-right corner)

---

## Quick Reference Table

| Profile | Key Survey Answers | Likely Top 3 Cities | Key Metrics Shown |
|---------|-------------------|---------------------|-------------------|
| **Income Seeker** | Q2: Yield Generation<br>Q4: Conservative | Nottingham, Newcastle, Liverpool | **Rental Yield** (highlight), Income Stability, Golden Visa |
| **Growth Hunter** | Q2: Capital Growth<br>Q4: Growth-oriented | Bristol, Liverpool, Dubai | **Current Appreciation** (highlight), Growth Potential, **Chart** |
| **Lifestyle Investor** | Q2: Residency OR Personal Use | Algarve, Lisbon, Edinburgh | **Lifestyle Appeal** (highlight), Golden Visa, Rental Yield |
| **Sophisticated Builder** | Q5: Professional<br>Q6: Established/Extensive | Dubai, London, Edinburgh | Growth Potential, **Market Transparency** (highlight), **Chart** |

---

## Validation Checklist

After completing each test case, verify:

### Display & UI
- [ ] **Exactly 3 cities** are displayed (no more, no less)
- [ ] Dark "✓ Recommended" badge appears on matched cities (top-right corner)
- [ ] Badge shows "Recommended" ONLY (no profile name exposed)
- [ ] Country badge visible on bottom-left of image (no conflict with Recommended badge)
- [ ] Profile-matched cities appear first in the list

### Metrics Display
- [ ] **4 metrics** displayed per city (arranged in 2×2 grid)
- [ ] Primary metric has **blue background** (highlighted)
- [ ] **No emoji icons** in metric labels (professional HNWI style)
- [ ] Green text for high scores (≥7/10) or positive values
- [ ] For Growth Hunter & Sophisticated Builder: **5Y chart shown as one of the 4 metrics** (full-width)
- [ ] For Income Seeker & Lifestyle Investor: **NO chart shown**

### Profile Privacy
- [ ] Profile name appears in browser console (DevTools → Console)
- [ ] Profile name **NEVER** appears in UI (badge, tooltips, text)
- [ ] User has no indication of their internal classification

### Data Accuracy
- [ ] Cities match the expected profile (see table above)
- [ ] Metrics are appropriate for the profile
- [ ] Singapore is NOT in the list (removed due to restrictions)
- [ ] At least 10+ cities available in database (but only 3 shown)

---

## Testing Notes

### 1. Browser Console Check
Open DevTools → Console to verify profile:
```javascript
Investor Profile: Income Seeker
// This should appear ONLY in console, NEVER in UI
```

### 2. Badge Positioning
- **Top-Right**: "✓ Recommended" badge
- **Bottom-Left**: Country badge (inside image overlay)
- **NO OVERLAP** between badges

### 3. Metric Variations by Profile

**Income Seeker:**
```
[Price/sqm        ] [Rental Yield★   ]
[Income Stability ] [Golden Visa     ]
```

**Growth Hunter:**
```
[Price/sqm        ] [Current App.★   ]
[Growth Potential ] [                ]
[===== 5Y Chart (full width) =======]
```

**Lifestyle Investor:**
```
[Price/sqm        ] [Lifestyle★      ]
[Golden Visa      ] [Rental Yield    ]
```

**Sophisticated Builder:**
```
[Price/sqm        ] [Growth Potential]
[Transparency★    ] [                ]
[===== 5Y Chart (full width) =======]
```

★ = Blue highlighted background

### 4. Responsive Testing
- [ ] Desktop: 2×2 metric grid, 3 cities in 3-column layout
- [ ] Tablet: 2×2 metric grid, 2-3 cities per row
- [ ] Mobile: 1-column metric grid, 1 city per row

### 5. Edge Cases
- **No Survey Completed**: Shows first 3 cities by default order
- **Profile Undetermined**: Falls back to general metrics
- **Database Empty**: Shows loading state or error message

---

## Available Cities (Core Markets Only)

### 🇵🇹 Portugal (3 cities)
- **Lisbon** - Capital, Golden Visa, balanced fundamentals
- **Porto** - Coastal city, emerging growth
- **Algarve** - Resort destination, lifestyle appeal

### 🇬🇧 United Kingdom (10 cities)
- **London** - Global financial hub, mature market
- **Manchester** - Northern powerhouse
- **Birmingham** - Second city, HS2 connectivity
- **Edinburgh** - Scottish capital, lifestyle + sophistication
- **Leeds** - Tech hub, young professionals
- **Bristol** - Creative hub, highest growth
- **Liverpool** - UNESCO heritage, regeneration
- **Newcastle** - Student hub, high yields
- **Nottingham** - Highest UK yields, student market
- **Glasgow** - Scotland's largest city

### 🇦🇪 Dubai (1 city)
- **Dubai** - Zero taxes, high liquidity, Golden Visa

**Total: 14 cities** (only 3 shown at a time, personalized by profile)

---

## Common Issues & Fixes

### Issue: Wrong cities shown
**Fix**: Check Q2 (Investment Objective) and Q4 (Risk Tolerance) - these are critical for classification

### Issue: All cities shown (not just 3)
**Fix**: Verify `displayedLocations = filteredLocations.slice(0, 3)` in LocationShowcase.jsx

### Issue: Profile name visible in UI
**Fix**: Badge should only show "Recommended" - check `profile-match-badge` component

### Issue: Wrong metrics displayed
**Fix**: Check `getProfileMetrics()` function returns correct metrics for profile

### Issue: Emojis still showing
**Fix**: Remove `{metric.icon}` from metric label rendering

### Issue: Chart not showing/showing wrong
**Fix**: 
- Growth Hunter & Sophisticated Builder: Chart should be 4th metric
- Income Seeker & Lifestyle Investor: No chart metric

---

## Success Criteria

✅ **Test passes when:**
1. Survey determines correct profile (console log)
2. Exactly 3 relevant cities displayed
3. "Recommended" badge visible (no profile name)
4. Correct 4 metrics shown for profile (no emojis)
5. Chart shown/hidden based on profile
6. Professional HNWI aesthetic maintained
7. User has no awareness of internal classification

❌ **Test fails when:**
1. More or fewer than 3 cities shown
2. Profile name exposed anywhere in UI
3. Wrong metrics for profile
4. Emojis visible in metrics
5. Chart shown when shouldn't be (or vice versa)
6. Badge overlaps with country badge
7. Singapore appears in list
