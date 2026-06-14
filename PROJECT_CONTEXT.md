# G6 Intelligence - Project Context

## Project Overview
Real estate investment platform for High Net Worth Individuals (HNWI) to diversify portfolios across UK, Portugal, Dubai, and Singapore. Deployed on Cloudflare Pages with Supabase backend.

**Stack:**
- Frontend: Vite + React
- Backend: Supabase (PostgreSQL)
- Hosting: Cloudflare Pages
- GitHub: https://github.com/bazinga-thedog/g6-intelligence

**Design Philosophy:**
- "Loro Piana not Louis Vuitton" - quiet luxury, understated, professional
- Dark, sophisticated color palette
- No emojis, clean SVG icons
- State-of-the-art modern UI patterns
- Target audience: HNWI investors

## User Journey Flow

**Landing Page → Survey → Location Showcase → (Preferences - TBD)**

1. User clicks "Yes" on landing page
2. Fresh GUID generated
3. 9-question KYC survey appears
4. Survey completion → **Navigate to Location Showcase page**
5. User selects locations → Continue to preferences (TBD)

## Current Features

### 1. Landing Page (src/LandingPage.jsx)
**Hero Section:**
- Full-screen background image (public/hero-bg.png - modern house with plants)
- Dark gradient overlay for text readability
- White transparent navigation header with:
  - Logo: "G6 Intelligence" (white)
  - Pill-style menu: Home, Process, About us, Sign up
  - Dark "Login" button + White "Contact Us" button
- Hero text: "Looking to diversify your real estate portfolio internationally?"
- Two CTA buttons: "Yes" (white, highlighted) and "Maybe" (transparent outline)
- Three feature cards at bottom with SVG icons:
  - Full Intelligence (bar chart icon)
  - Done For You (checkmark icon)
  - The Best Deals (layers icon)

**Markets Section:**
- 2x2 grid showing UK, Portugal, Dubai, Singapore
- Dark overlays with white text
- Hover effects

**Footer:**
- Dark theme with company info, links, locations

### 2. Survey/KYC System (src/Survey.jsx)
**Triggered when user clicks "Yes" button**

**Design:**
- Full-screen modal overlay with dark blur
- Dark navy container (#1a1f2e)
- Progress bar at top (blue gradient)
- Header with: Back button (left), Question counter (center), Close X (right)
- Professional animations and transitions

**8 Questions:**

1. **Investment Range** (type: choice, grid)
   - Currency selector: EUR, GBP, AED, SGD
   - Options: €500K-€750K, €750K-€1M, €1M-€1.25M, €1.25M-€1.5M, €1.5M-€5M, €5M+
   - Dynamically converts values based on selected currency with exchange rates

2. **Investment Objective** (type: choice-detailed, vertical list)
   - Yield Generation
   - Capital Growth
   - Residency Benefits
   - Personal Use

3. **Investment Horizon** (type: choice, vertical list)
   - Less than 3 years
   - 3 - 5 years
   - 5 - 7 years
   - 7 - 10 years
   - 10+ years

4. **Risk Tolerance** (type: choice-detailed, vertical list)
   - Question: "If the market value of your residential property investment declined by 20% over a two-year period, while rental income remained stable, what would you most likely do?"
   - Options: Very Conservative (sell immediately) → Aggressive (actively increase exposure)
   - 5 levels: very_conservative, conservative, moderate, growth_oriented, aggressive

5. **Real Estate Experience** (type: choice-detailed, vertical list)
   - New to RE → Professional Investor

6. **International RE Experience** (type: choice-detailed, vertical list)
   - Exploring → Extensive Global Portfolio

7. **Tax Residency** (type: choice, 2x2 grid)
   - Portugal, UK, Dubai, Singapore, Other

8. **Home Market Yield** (type: input)
   - Number input with % suffix
   - "I don't know" button option
   - "Continue" button (disabled when empty)

9. **Geographic Diversification Priority** (type: choice, yes/no)
   - Question: "Would you still consider investing abroad for geographic diversification if the target market offered lower yields and growth potential than your home market?"
   - Options: Yes, No

**Survey Data Storage:**
- Prospect GUID generated on first visit (stored in localStorage)
- Segmentation saved to Supabase table: `prospect_segmentation`
- Includes: GUID, all 4 criteria, driver score, answers, currency, timestamps

**Post-Survey Segmentation & Profile (Hidden from User):**
After survey completion, prospects are automatically classified into 8 criteria (4 segmentation + 4 profile):

## SEGMENTATION CRITERIA (4):

1. **Tax Residency** 
   - Source: Q6 (direct answer)
   - Values: portugal, uk, dubai, singapore, other

2. **Net Worth**
   - Source: Q1 (investment range)
   - Mapping:
     - €500K-€750K, €750K-€1M, €1M-€1.25M → "Emerging HNWI"
     - €1.25M-€1.5M → "Established HNWI"
     - €1.5M-€5M → "High HNWI"
     - €5M+ → "Ultra High HNWI"

3. **Investment Objective**
   - Source: Q2 (direct answer)
   - Values: yield, growth, residency, personal

4. **Driver** (Own Process vs Delegate)
   - Source: Calculated from Q4 + Q5 + Q8
   - Logic: Score-based system (0-8 points)
     - Q4 (RE Experience): new=0, active=1, experienced=2, professional=3
     - Q5 (Intl Experience): exploring=0, initial=1, established=2, extensive=3
     - Q8 (Diversification): diversification_priority=-1, balanced=0, return_focused=1, return_maximization=2
   - Classification:
     - Score 0-3: "Delegate" (prefers done-for-you service)
     - Score 4-8: "Own Process" (hands-on, DIY approach)
   - Rationale: Higher experience + return-focused = more likely to manage themselves

## PROFILE CRITERIA (6 - Critical for KYC):

1. **Risk Tolerance**
   - Source: Q4 (direct answer)
   - Values: very_conservative, conservative, moderate, growth_oriented, aggressive

2. **Investment Horizon**
   - Source: Q3 (direct answer)
   - Values: <3, 3-5, 5-7, 7-10, 10+
   - Purpose: Understand investment time horizon

3. **Experience Investing Abroad**
   - Source: Q6 (direct answer)
   - Values: exploring, initial, established, extensive

4. **Real Estate Experience**
   - Source: Q5 (direct answer)
   - Values: new, active, experienced, professional

5. **Home Market Yield Alignment** (Outlier Detection)
   - Source: Q8 (home market yield) vs country benchmarks
   - Benchmarks:
     - Portugal: 4-7%
     - UK: 4-8%
     - Dubai: 6-8%
     - Singapore: 3-4%
     - Other: N/A
   - Logic:
     - "Honest": Answered "I don't know"
     - "Aligned": Within country range
     - "Misaligned": Within ±3% of range boundaries but outside
     - "Delusional": Beyond ±3% of range boundaries
     - "N/A": Tax residency = Other
   - Purpose: Spot unrealistic expectations (e.g., claiming 14% when country avg is 5%)

6. **Geographic Diversification Priority**
   - Source: Q9 (direct answer)
   - Values: yes, no
   - Question: Would they invest abroad even with lower yields/growth?
   - Purpose: Identify diversification-first vs return-first investors

**Prospect GUID System (src/prospectGuid.js):**
- Fresh UUID v4 generated every time user clicks "Yes" to start survey
- Stored in localStorage (key: `g6_prospect_guid`)
- Each survey attempt gets a unique GUID
- Used to track anonymous prospects before authentication
- Functions:
  - `getProspectGuid()` - Returns current GUID from localStorage
  - `generateFreshGuid()` - Creates new GUID (called when "Yes" is clicked)
  - `clearProspectGuid()` - Removes GUID (e.g., after sign-up)

After survey completion:
1. Segmentation logged to console with GUID
2. Saved to Supabase `prospect_segmentation` table
3. Can be queried by GUID for personalization

**Configuration Constants (src/segmentation.js):**
All criteria values exported for use in decision-making throughout the app:

**SEGMENTATION:**
- `SEGMENTATION.TAX_RESIDENCY.*` - portugal, uk, dubai, singapore, other, unknown
- `SEGMENTATION.NET_WORTH.*` - Emerging HNWI, Established HNWI, High HNWI, Ultra High HNWI, Unknown
- `SEGMENTATION.INVESTMENT_OBJECTIVE.*` - yield, growth, residency, personal, unknown
- `SEGMENTATION.DRIVER.*` - Own Process, Delegate, Unknown

**PROFILE:**
- `PROFILE.RISK_TOLERANCE.*` - very_conservative, conservative, growth_oriented, unknown
- `PROFILE.INVESTMENT_HORIZON.*` - <3, 3-5, 5-7, 7-10, 10+, unknown
- `PROFILE.EXPERIENCE_ABROAD.*` - exploring, initial, established, extensive, unknown
- `PROFILE.RE_EXPERIENCE.*` - new, active, experienced, professional, unknown
- `PROFILE.YIELD_ALIGNMENT.*` - Honest, Aligned, Misaligned, Delusional, N/A
- `PROFILE.DIVERSIFICATION_PRIORITY.*` - yes, no, unknown

**YIELD_BENCHMARKS:**
- Country-specific yield ranges for alignment scoring

Usage example:
```javascript
import { SEGMENTATION, PROFILE } from './segmentation'

if (prospect.driver === SEGMENTATION.DRIVER.DELEGATE) {
  // Route to concierge service
}

if (prospect.yieldAlignment === PROFILE.YIELD_ALIGNMENT.DELUSIONAL) {
  // Flag for education / reality check
}
```

### 3. Location Showcase (src/LocationShowcase.jsx)
**Luxury "window shopping" experience - shown after survey completion**

**Concept:** High-end storefront displaying curated city-level investment opportunities

**Layout:**
- **Hero Section**: "Investment Opportunities"
- **Subtitle**: "Explore our hand-selected locations across premium markets"
- **Filter Bar**: All Locations | Portugal | UK | Dubai | Singapore
- **Location Cards Grid**: 3-column responsive grid (2-col tablet, 1-col mobile)
- **Fixed Bottom Bar**: Selection counter + Continue button

**Preferred Choices (Top 3):**
- Algorithm selects top 3 cities based on KYC profile (behind the scenes)
- Preferred cities shown FIRST in grid
- Special styling:
  - Gold/bronze border (rgba(212, 175, 55))
  - Gold gradient background
  - "⭐ PREFERRED CHOICE" badge at top
  - Enhanced glow on hover
- Currently mock: Lisbon, Dubai, Porto marked as preferred

**City Card Structure:**
Each card displays:
- **Preferred Badge** (top): Gold banner with star icon "PREFERRED CHOICE"
- **Hero Image**: 280px tall, zoom effect on hover
- **Country Badge**: Top-left overlay (e.g., "Portugal")
- **Selected Badge**: Top-right when selected (✓ Selected)
- **Content Section**:
  - City name (large, bold - e.g., "Lisbon")
  - Country (subtitle - e.g., "Portugal")
  - Description (1-2 lines about the city)
  - **City-Level Metrics Grid** (3 columns):
    - Avg. Yield (e.g., "5.2%")
    - 5Y Growth (e.g., "+42%" in green)
    - Price Range (e.g., "€500K - €1.5M")
  - Market Trend indicator (📈 Growing / ➡️ Stable)

**Interactions:**
- Click card to select/deselect
- Selected cards: blue glow, elevated shadow
- Hover: lift effect, image zoom
- Multi-select enabled

**Current Mock Data (6 cities):**

**Preferred Cities (shown first with gold badge):**
1. ⭐ Lisbon, Portugal - 5.2% yield, +42% growth
2. ⭐ Dubai, UAE - 6.5% yield, +38% growth
3. ⭐ Porto, Portugal - 5.9% yield, +51% growth

**Other Cities:**
4. London, United Kingdom - 4.1% yield, +29% growth
5. Singapore - 3.2% yield, +22% growth
6. Manchester, United Kingdom - 5.1% yield, +35% growth

**Design:**
- Dark gradient background (#0a0e1a → #1a1f2e)
- Luxury card design with soft shadows
- Blue accent (#4A90E2) for selections
- Green accent (#3d7a5c) for growth metrics
- Smooth animations and transitions

**Data Model (TO BE DEFINED after UI feedback):**
- Location entity structure
- Country → City → Neighbourhood hierarchy
- Metrics data source
- Image storage strategy
- How to store prospect selections in Supabase

### 4. Comment/Annotation System (src/CommentSystem.jsx)
**Two-toggle system in top-right corner:**
- "Add Comment" mode - click anywhere to add comments
- "View Comments" mode - see all existing comments

**Features:**
- Blue circular markers (💬 icon inside)
- Comments stored with x/y coordinates and page URL
- Dark popups for adding/viewing comments
- Real-time counter updates
- Crosshair cursor in add mode
- Normal cursor on popups and toggles

**Database table:** `page_comments`

## Database Schema

### Tables Created:

1. **counters** (prototype test)
   - id, value, updated_at

2. **page_comments**
   - id, page_url, comment_text, x_position, y_position, created_at

3. **prospect_segmentation** (main segmentation + profile table)
   - id, prospect_guid (UUID, unique)
   - Segmentation: tax_residency, net_worth, investment_objective, driver, driver_score
   - Profile: risk_tolerance, investment_horizon, experience_abroad, re_experience, yield_alignment, diversification_priority
   - survey_answers (JSONB), selected_currency
   - created_at, updated_at
   - Indexes on: prospect_guid, all 10 criteria fields, created_at

4. **kyc_surveys** (deprecated - replaced by prospect_segmentation)
   - id, answers (JSONB), completed_at, created_at

**SQL files:**
- `supabase-setup.sql` - counters table
- `supabase-comments-table.sql` - comments table
- `supabase-prospect-segmentation.sql` - prospect segmentation table (CURRENT)
- `supabase-kyc-surveys.sql` - KYC surveys table (deprecated)

## Key Files Structure

```
src/
├── App.jsx                 # Main app with page routing (landing → locations)
├── LandingPage.jsx         # Landing page with hero, markets, footer + survey modal
├── LandingPage.css         # Landing page styles
├── Survey.jsx              # 9-question KYC survey with segmentation
├── Survey.css              # Survey dark theme styles
├── LocationShowcase.jsx    # Location showcase page (destination after survey)
├── LocationShowcase.css    # Location showcase styles
├── segmentation.js         # Segmentation criteria constants (TAX_RESIDENCY, NET_WORTH, etc.)
├── prospectGuid.js         # GUID generation and localStorage management
├── CommentSystem.jsx       # Annotation system
├── CommentSystem.css       # Comment system styles
├── Counter.jsx             # (Old prototype - not in use)
└── supabaseClient.js       # Supabase configuration

public/
└── hero-bg.png            # Background image (modern house)

Root:
├── .env                   # Environment variables (not committed)
├── .env.example          # Template for Supabase credentials
└── *.sql                 # Database setup scripts
```

## Environment Variables Needed

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Design Decisions

### Colors:
- Primary Dark: #1a1f2e
- Primary Blue: #4A90E2
- Accent Green: #3d7a5c
- Text Dark: #1a1a1a
- White overlays with transparency

### Typography:
- Font: Inter (sans-serif)
- Headings: 600-700 weight
- Body: 400-500 weight
- Letter spacing: -0.02em for large text

### Interactions:
- Hover: translateX/Y + scale
- Transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Cards: dark with blue gradient on hover

## Next Steps / TODO

1. **Survey completion page** - Build the page users see after completing 8 questions
2. **Additional questions?** - Currently have 8, confirm if complete
3. **Email integration?** - Send survey results via email?
4. **Login/Sign up pages** - Build authentication flows
5. **Dashboard** - User area after login
6. **Admin panel** - View survey responses and comments
7. **Markets detail pages** - Individual pages for UK, PT, Dubai, Singapore
8. **Process page** - How the platform works

## Deployment

**Current deployment:**
- Repository: https://github.com/bazinga-thedog/g6-intelligence
- Auto-deploys to Cloudflare Pages on push to main
- Last deployed: Landing page with survey and comment system

**To deploy updates:**
```bash
git add .
git commit -m "Description"
git push origin main
```

## Important Notes

- **HNWI focus**: No playful elements, no emojis (except in comments), professional tone
- **Currency handling**: Survey Q1 saves selected currency with answers
- **Risk profiling**: Q3 is a proxy for risk tolerance (conservative → aggressive)
- **Experience tracking**: Q4 (general RE) and Q5 (international RE) are separate
- **Diversification insight**: Q8 reveals if user prioritizes yield vs diversification

## Development Commands

```bash
npm run dev          # Start dev server (usually port 5174)
npm run build        # Build for production
npm run preview      # Preview production build
```

## Supabase Setup

1. Create project at supabase.com
2. Run SQL scripts in order:
   - supabase-comments-table.sql
   - supabase-kyc-surveys.sql
3. Get credentials from Settings → API
4. Update .env file

## Session History Summary

**Session 1 (2026-06-09/10):**
- Built landing page with hero section
- Added comment/annotation system
- Created 8-question survey
- Integrated Supabase
- Deployed to Cloudflare Pages

**Current Status:** Survey complete, ready for next phase (completion page, authentication, etc.)
