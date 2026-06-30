# Quick Reference: Profile Metrics

## Metric Display by Profile (4 metrics each)

| Profile | Metric 1 | Metric 2 (Priority) | Metric 3 | Metric 4 | Chart |
|---------|----------|---------------------|----------|----------|-------|
| **Income Seeker** 💰 | Price/sqm | 💰 **Rental Yield** | 📊 Income Stability | ✓ Golden Visa / 📅 Days | ❌ |
| **Growth Hunter** 📈 | Price/sqm | 📈 **5Y Growth** | 🚀 Growth Potential | 🏗️ Market Stage | ✅ |
| **Lifestyle Investor** 🏖️ | Price/sqm | 🏖️ **Lifestyle Appeal** | ✓ Golden Visa / ⭐ Quality | 💵 Rental Yield | ❌ |
| **Sophisticated Builder** 🏛️ | Price/sqm | 📈 Growth Potential | 💰 Income Stability | 🔍 **Transparency** | ✅ |
| **No Profile** (Default) | Price/sqm | Rental Yield | Days to Rent | — | ✅ |

**Bold** = Highlighted metric (blue background)

---

## Color Coding

| Color | Meaning | When Applied |
|-------|---------|--------------|
| 🔵 Blue (Highlight) | Most important metric | Profile's primary focus metric |
| 🟢 Green (Positive) | Good score/value | Score ≥ 7/10 or favorable condition |
| ⚪ White (Neutral) | Standard display | Default state |

---

## Icon Legend

| Icon | Meaning |
|------|---------|
| 💰 | Rental yield / income |
| 📊 | Income stability score |
| 📈 | Growth / appreciation |
| 🚀 | Growth potential |
| 🏗️ | Market stage/maturity |
| 🏖️ | Lifestyle appeal |
| ✓ | Golden Visa available |
| ⭐ | Quality/overall score |
| 💵 | Rental yield (secondary) |
| 🔍 | Market transparency |
| 📅 | Days to rent |

---

## What Changed from Default?

### Before (Same for Everyone)
```
Price/sqm | Rental Yield | Days to Rent
[5Y Chart Always Shown]
```

### After (Profile-Specific)
```
Income Seeker:     Price | Yield💰 | Stability | GoldenVisa [No Chart]
Growth Hunter:     Price | Growth📈 | Potential | Stage [With Chart]
Lifestyle:         Price | Appeal🏖️ | GoldenVisa | Yield [No Chart]
Sophisticated:     Price | Growth | Stability | Transparency🔍 [With Chart]
```

---

## Testing Checklist

After completing survey as each profile, verify:

- [ ] Correct 4 metrics show (not the old 3)
- [ ] Primary metric has blue background
- [ ] Icons appear next to metric labels
- [ ] Green text shows for high scores (≥7/10)
- [ ] Chart shown only for Growth Hunter / Sophisticated Builder
- [ ] Mobile view shows 1-column layout
- [ ] Badge shows "Recommended for [Profile]" on matched cities

---

## Example Screenshots Expected

**Income Seeker viewing Budapest:**
- Price: €2,200 - €4,200
- 💰 **Rental Yield: 6.2% - 8.5%** (BLUE HIGHLIGHT)
- 📊 Income Stability: 7/10 (GREEN)
- ✓ Golden Visa: Available (GREEN)
- NO chart below

**Growth Hunter viewing Athens:**
- Price: €2,800 - €5,200
- 📈 **5Y Growth: +42.8%** (BLUE HIGHLIGHT)
- 🚀 Growth Potential: 9/10 (GREEN)
- 🏗️ Market Stage: Emerging (GREEN)
- WITH chart below

**Lifestyle viewing Algarve:**
- Price: €3,500 - €6,500
- 🏖️ **Lifestyle Appeal: 10/10** (BLUE HIGHLIGHT)
- ✓ Golden Visa: Available (GREEN)
- 💵 Rental Yield: 5.5% - 7.2% (WHITE)
- NO chart below

**Sophisticated viewing London:**
- Price: £10,000 - £15,500
- 📈 Growth Potential: 5/10 (WHITE)
- 💰 Income Stability: 9/10 (GREEN)
- 🔍 **Market Transparency: 10/10** (BLUE HIGHLIGHT)
- WITH chart below
