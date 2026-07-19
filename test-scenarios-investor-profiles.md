# Test Scenarios for 4 Investor Profiles

## 1. Income Seeker Profile

**Objective:** Yield-focused, conservative, wants rental income

### Survey Answers:
1. **Investment Range** (Q1): `750k-1m` (EUR)
2. **Investment Objective** (Q2): `Yield Generation` (yield)
3. **Investment Horizon** (Q3): `7 - 10 years` (7-10)
4. **Risk Tolerance** (Q4): `Hold the property but avoid making any additional investments until the market stabilizes` (conservative)
5. **Real Estate Experience** (Q5): `Active Investor` (active)
6. **International Experience** (Q6): `Initial Portfolio Diversification` (initial)
7. **Tax Residency** (Q7): `United Kingdom` (uk)
8. **Home Market Yield** (Q8): `5.5` (within UK benchmark 4-8%)
9. **Diversification Priority** (Q9): `No` (no)

**Expected Result:** Income Seeker
- Conservative risk tolerance
- Yield objective
- Lower experience scores (Driver Score: 2-3 = Delegate)

---

## 2. Growth Hunter Profile

**Objective:** Capital appreciation, growth-oriented, buy low/sell high

### Survey Answers:
1. **Investment Range** (Q1): `1.25m-1.5m` (EUR)
2. **Investment Objective** (Q2): `Capital Growth` (growth)
3. **Investment Horizon** (Q3): `5 - 7 years` (5-7)
4. **Risk Tolerance** (Q4): `Look for opportunities to acquire additional properties at discounted prices`
(growth_oriented)
5. **Real Estate Experience** (Q5): `Active Investor` (active) ← Changed from "experienced"
6. **International Experience** (Q6): `Initial Portfolio Diversification` (initial)
7. **Tax Residency** (Q7): `Portugal` (portugal)
8. **Home Market Yield** (Q8): `5` (within PT benchmark 4-7%)
9. **Diversification Priority** (Q9): `Yes` (yes)

**Expected Result:** Growth Hunter
- Growth objective
- Growth-oriented risk tolerance
- Higher experience scores (Driver Score: 5 = Own Process)

---

## 3. Lifestyle Investor Profile

**Objective:** Residency/personal use, lifestyle benefits over pure returns

### Survey Answers:
1. **Investment Range** (Q1): `1m-1.25m` (EUR)
2. **Investment Objective** (Q2): `Residency Benefits` (residency)
3. **Investment Horizon** (Q3): `10+ years` (10+)
4. **Risk Tolerance** (Q4): `Hold the property but avoid making any additional investments until the market stabilizes` (conservative)
5. **Real Estate Experience** (Q5): `Active Investor` (active)
6. **International Experience** (Q6): `Exploring International Markets` (exploring)
7. **Tax Residency** (Q7): `Dubai` (dubai)
8. **Home Market Yield** (Q8): `7` (within Dubai benchmark 6-8%)
9. **Diversification Priority** (Q9): `Yes` (yes)

**Expected Result:** Lifestyle Investor
- Residency or Personal Use objective triggers this profile immediately
- Regardless of other factors

---

## 4. Sophisticated Builder Profile

**Objective:** Experienced diversifier, strategic global portfolio builder

### Survey Answers:
1. **Investment Range** (Q1): `1.5m-5m` (EUR)
2. **Investment Objective** (Q2): `Capital Growth` (growth)
3. **Investment Horizon** (Q3): `10+ years` (10+)
4. **Risk Tolerance** (Q4): `Look for opportunities to acquire additional properties at discounted prices` (growth_oriented)
5. **Real Estate Experience** (Q5): `Professional Investor` (professional)
6. **International Experience** (Q6): `Extensive Global Portfolio` (extensive)
7. **Tax Residency** (Q7): `Singapore` (singapore)
8. **Home Market Yield** (Q8): `I don't know` (unknown - click "I don't know" button)
9. **Diversification Priority** (Q9): `Yes` (yes)

**Expected Result:** Sophisticated Builder
- Professional/Experienced RE experience
- Established/Extensive international experience
- Growth-oriented OR diversification priority
- Driver = Own Process (Driver Score: 6-8)

---

## Alternative: Lifestyle Investor with Personal Use

### Survey Answers:
1. **Investment Range** (Q1): `500k-750k` (EUR)
2. **Investment Objective** (Q2): `Personal Use` (personal)
3. **Investment Horizon** (Q3): `3 - 5 years` (3-5)
4. **Risk Tolerance** (Q4): `Sell the property as soon as possible to avoid further losses` (very_conservative)
5. **Real Estate Experience** (Q5): `New to Real Estate Investment` (new)
6. **International Experience** (Q6): `Exploring International Markets` (exploring)
7. **Tax Residency** (Q7): `Other` (other)
8. **Home Market Yield** (Q8): `I don't know` (unknown)
9. **Diversification Priority** (Q9): `No` (no)

**Expected Result:** Lifestyle Investor
- Personal Use objective triggers this profile

---

## How to Test

1. **Start fresh:** Clear browser cache or use incognito mode
2. **Click "Yes"** on the landing page to start survey
3. **Follow each scenario** by selecting the exact answers listed above
4. **Check the browser console** after completing the survey to see:
   - Investor Profile
   - Driver Score
   - All segmentation and profile attributes
5. **Navigate to Locations page** to see if preferred cities match the profile

---

## Quick Reference: Driver Score Calculation

**Driver Score Components:**
- RE Experience: new=0, active=1, experienced=2, professional=3
- International Experience: exploring=0, initial=1, established=2, extensive=3
- Diversification Priority: no=-1 (not used in current Q9), yes=0

**Threshold:**
- Score 0-3 = **Delegate**
- Score 4-8 = **Own Process**

**Profile Matrix:**
| Profile | Objective | Risk | Experience | Driver |
|---------|-----------|------|------------|--------|
| Income Seeker | Yield | Conservative | Any | Any |
| Growth Hunter | Growth | Growth-Oriented | Any | Score ≥4 |
| Lifestyle Investor | Residency/Personal | Any | Any | Any |
| Sophisticated Builder | Any (not residency/personal) | Growth-Oriented OR Div=Yes | Professional/Experienced + Established/Extensive | Own Process |
