# Privacy: Profile Classification Kept Internal

## Overview

The investor profile classification is an **internal system** used to personalize recommendations. Users should never see or know their assigned profile category.

---

## What Users See

### ✅ Badge Display

**Recommended Cities:**
```
┌─────────────────────────┐
│ ✓ Recommended           │ ← Simple, no profile name
└─────────────────────────┘
```

**NOT:**
```
┌───────────────────────────────────┐
│ ✓ Recommended for Income Seeker   │ ← ❌ Profile exposed
└───────────────────────────────────┘
```

### Why Keep It Private?

1. **User Psychology** - Labels can be limiting or feel restrictive
2. **Flexibility** - Users may not identify with assigned categories
3. **Professional Appeal** - HNWI prefer personalized service without obvious categorization
4. **Avoid Bias** - Users might second-guess their choices if they see their label
5. **Better UX** - "Recommended" is cleaner, simpler, more elegant

---

## What's Internal (Backend Only)

### Profile Classification System

**4 Internal Profiles:**
1. **Income Seeker** - Conservative, yield-focused
2. **Growth Hunter** - Aggressive, appreciation-focused
3. **Lifestyle Investor** - Quality of life, residency-focused
4. **Sophisticated Builder** - Experienced, balanced portfolio

### Where Profile is Used

**✅ Internal Usage:**
- Ranking/sorting cities
- Selecting which metrics to display
- Determining "Recommended" badge
- Console logging (for debugging)
- Backend analytics

**❌ Never Shown to User:**
- Badge text
- Profile labels on UI
- Explanatory text
- Marketing copy
- Email communications

---

## Technical Implementation

### Console Logging (Developer Only)

```javascript
console.log('Investor Profile:', data?.investor_profile)
// Output: "Investor Profile: Income Seeker"
// ✅ Only visible in browser DevTools, not to end user
```

### Badge Rendering

```javascript
// CORRECT ✅
<div className="profile-match-badge">
  <svg>...</svg>
  Recommended
</div>

// WRONG ❌
<div className="profile-match-badge">
  <svg>...</svg>
  Recommended for {investorProfile}
</div>
```

### Database Storage

Profile stored in `prospect_segmentation` table:
```sql
investor_profile: 'Income Seeker'  -- Internal only
```

Used for:
- Matching algorithm
- Analytics
- Internal reporting
- A/B testing

**Never exposed via:**
- Public API endpoints
- User-facing components
- Marketing materials

---

## User Experience Flow

### 1. Survey Completion
User answers 9 questions → System calculates profile **silently**

### 2. Location Page
User sees:
- Some cities marked "Recommended" ✓
- Cities ranked differently (personalized order)
- Metrics tailored to their goals
- **No mention of their profile category**

### 3. User Perception
User thinks:
- "The system knows what I'm looking for"
- "These recommendations make sense for me"
- **NOT:** "Why am I labeled as Income Seeker?"

---

## Alternative Approaches (Future Consideration)

### Option A: Explain Without Labeling
```
"Based on your preferences for stable rental income, 
we've highlighted cities with strong yields."
```
- ✅ Transparent about personalization
- ✅ No category labels
- ❌ More verbose

### Option B: Let Users Choose
```
"What matters most to you?
□ Rental Income
□ Capital Growth  
□ Quality of Life
□ Balanced Portfolio"
```
- ✅ User control
- ✅ No hidden classification
- ❌ Extra step, less magical

### Option C: Current Approach (Recommended)
```
Simply show: "Recommended"
```
- ✅ Clean and simple
- ✅ Feels personalized
- ✅ No user concerns about labeling
- ✅ Professional HNWI aesthetic

---

## Privacy Compliance

### Data Handling
- Profile classification is derived data (not PII)
- Used for service enhancement only
- Not shared with third parties
- Can be deleted on user request

### Transparency
- Privacy policy should mention: "We personalize recommendations based on your survey responses"
- No need to disclose specific classification methodology
- Users can request their profile data via GDPR/data export

---

## Testing Guidelines

### ✅ Verify
- Badge shows "Recommended" only
- No profile name visible anywhere in UI
- Console logs profile (DevTools only)
- Cities are personalized correctly
- Metrics change based on profile

### ❌ Red Flags
- Profile name appears in badge text
- Category mentioned in any user-facing text
- Tooltip or hover reveals profile
- Profile in page source/HTML
- Profile in network requests (client-side)

---

## Communication Examples

### ✅ Good (Vague, No Labels)
- "Based on your preferences..."
- "We think you'll like..."
- "Recommended for you"
- "Matches your criteria"

### ❌ Bad (Exposes Classification)
- "As an Income Seeker, you should..."
- "Growth Hunters like you prefer..."
- "Your profile: Lifestyle Investor"
- "You've been classified as..."

---

## Summary

**Key Principle:** 
> Use profiles to **personalize silently**, not to **label publicly**.

**Badge Text:**
```
✓ Recommended
```

**Internal Classification:**
```
Income Seeker / Growth Hunter / Lifestyle Investor / Sophisticated Builder
```

**User Perception:**
> "This platform understands what I'm looking for" (without feeling categorized)

---

## Future Enhancements

- [ ] Allow users to adjust preferences (without revealing profile)
- [ ] A/B test showing vs hiding profile names
- [ ] Add "Why is this recommended?" explainer (without profile label)
- [ ] User feedback: "Was this recommendation helpful?"
- [ ] Evolve profile over time based on behavior
