# Prospect Segmentation & Profile Examples

## Console Output After Survey Completion

```
=== PROSPECT SEGMENTATION ===
Prospect GUID: 550e8400-e29b-41d4-a716-446655440000

SEGMENTATION:
  Tax Residency: portugal
  Net Worth: High HNWI
  Investment Objective: yield
  Driver: Own Process (score: 5)

PROFILE:
  Risk Tolerance: growth
  Investment Horizon: 7-10
  Experience Abroad: established
  RE Experience: experienced
  Yield Alignment: Aligned
=============================
✓ Segmentation and profile saved successfully
```

## Example Prospect Profiles

### Profile 1: Experienced Investor, Realistic Expectations
```
Tax Residency: uk
Net Worth: Ultra High HNWI (€5M+)
Investment Objective: growth
Driver: Own Process (score: 7)

Risk Tolerance: growth_oriented
Investment Horizon: 10+
Experience Abroad: extensive
RE Experience: professional
Yield Alignment: Aligned (answered 5% for UK, benchmark 4-8%)
```
**Interpretation:** High-value, experienced investor who knows the market. Long-term horizon. Low touch needed, route to premium self-service platform.

---

### Profile 2: New Investor, Honest About Knowledge
```
Tax Residency: singapore
Net Worth: Emerging HNWI (€500K-€750K)
Investment Objective: residency
Driver: Delegate (score: 1)

Risk Tolerance: conservative
Investment Horizon: 5-7
Experience Abroad: exploring
RE Experience: new
Yield Alignment: Honest (answered "I don't know")
```
**Interpretation:** First-time international investor seeking golden visa. Medium horizon. Needs education and full-service support. High-touch concierge approach.

---

### Profile 3: Outlier Detection - Delusional Expectations
```
Tax Residency: portugal
Net Worth: Established HNWI (€1.25M-€1.5M)
Investment Objective: yield
Driver: Delegate (score: 2)

Risk Tolerance: moderate
Investment Horizon: 3-5
Experience Abroad: initial
RE Experience: active
Yield Alignment: Delusional (answered 14% for Portugal, benchmark 4-7%)
```
**Interpretation:** Unrealistic yield expectations (claimed 14% when PT average is 4-7%). Short-medium horizon. Flag for education call before qualification.

---

### Profile 4: Slightly Misaligned But Experienced
```
Tax Residency: dubai
Net Worth: High HNWI (€1.5M-€5M)
Investment Objective: personal
Driver: Own Process (score: 6)

Risk Tolerance: moderate
Investment Horizon: 7-10
Experience Abroad: established
RE Experience: experienced
Yield Alignment: Misaligned (answered 10% for Dubai, benchmark 6-8%)
```
**Interpretation:** Experienced investor, slightly optimistic on yields (10% vs 6-8% benchmark). Long horizon. Minor education needed but qualified.

---

## Database Query Examples

### Find All Delusional Prospects for Education Campaign
```sql
SELECT prospect_guid, tax_residency, survey_answers->'home_market_yield' as claimed_yield
FROM prospect_segmentation
WHERE yield_alignment = 'Delusional';
```

### Segment High-Value, Hands-On Investors for Premium Platform
```sql
SELECT *
FROM prospect_segmentation
WHERE net_worth IN ('High HNWI', 'Ultra High HNWI')
  AND driver = 'Own Process'
  AND yield_alignment IN ('Aligned', 'Honest');
```

### Find Delegates Needing Concierge Service
```sql
SELECT *
FROM prospect_segmentation
WHERE driver = 'Delegate'
  AND net_worth IN ('Established HNWI', 'High HNWI', 'Ultra High HNWI');
```

### Risk Profile Analysis
```sql
SELECT risk_tolerance, driver, COUNT(*) as count
FROM prospect_segmentation
GROUP BY risk_tolerance, driver
ORDER BY count DESC;
```

### Yield Alignment by Country
```sql
SELECT 
  tax_residency,
  yield_alignment,
  COUNT(*) as count,
  ROUND(AVG(CAST(survey_answers->'home_market_yield' AS NUMERIC)), 2) as avg_claimed_yield
FROM prospect_segmentation
WHERE yield_alignment != 'N/A' AND yield_alignment != 'Honest'
GROUP BY tax_residency, yield_alignment
ORDER BY tax_residency, yield_alignment;
```

---

## Business Use Cases

### 1. Lead Scoring
Combine criteria for priority ranking:
- Ultra High HNWI + Own Process + Aligned = **Score: 100** (Hot lead, low touch)
- High HNWI + Delegate + Aligned = **Score: 90** (Hot lead, high touch)
- Emerging HNWI + Delegate + Honest = **Score: 70** (Qualified, needs education)
- Any + Any + Delusional = **Score: 30** (Education required before qualification)

### 2. Content Personalization
- **Delusional + New RE Experience** → Show educational content on realistic yields
- **Aligned + Professional** → Show advanced market analysis and direct opportunities
- **Honest + Exploring** → Show beginner guides and success stories

### 3. Sales Routing
- **Delegate + High/Ultra HNWI** → Route to senior concierge team
- **Own Process + Aligned** → Route to self-service platform with optional support
- **Delusional** → Route to education specialist before sales qualification

### 4. Marketing Segmentation
- **Conservative + Residency Objective** → Target with golden visa success stories
- **Aggressive + Growth + Extensive** → Target with high-appreciation opportunities
- **Moderate + Yield** → Target with stable cash flow properties

---

## All Possible Values Reference

### SEGMENTATION (4 criteria):
1. **Tax Residency**: portugal, uk, dubai, singapore, other, unknown
2. **Net Worth**: Emerging HNWI, Established HNWI, High HNWI, Ultra High HNWI, Unknown
3. **Investment Objective**: yield, growth, residency, personal, unknown
4. **Driver**: Own Process, Delegate, Unknown

### PROFILE (5 criteria):
1. **Risk Tolerance**: very_conservative, conservative, moderate, growth_oriented, aggressive, unknown
2. **Investment Horizon**: <3, 3-5, 5-7, 7-10, 10+, unknown
3. **Experience Abroad**: exploring, initial, established, extensive, unknown
4. **RE Experience**: new, active, experienced, professional, unknown
5. **Yield Alignment**: Honest, Aligned, Misaligned, Delusional, N/A

---

## Yield Benchmarks by Country

| Country | Min | Max | Example Aligned | Example Misaligned | Example Delusional |
|---------|-----|-----|-----------------|--------------------|--------------------|
| Portugal | 4% | 7% | 5.5% | 3%, 9% | 0.5%, 14% |
| UK | 4% | 8% | 6% | 3%, 10% | 1%, 15% |
| Dubai | 6% | 8% | 7% | 5%, 10% | 3%, 14% |
| Singapore | 3% | 4% | 3.5% | 2%, 6% | 0%, 10% |

**Scoring Logic:**
- **Aligned**: Within range [min, max]
- **Misaligned**: Within ±3% of boundaries but outside range
- **Delusional**: Beyond ±3% of boundaries
- **Honest**: Answered "I don't know"
- **N/A**: Tax residency = Other
