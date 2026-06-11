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

1. **Investment Range** (type: choice, 2x2 grid)
   - Currency selector: EUR, GBP, AED, SGD
   - Options: €500K-€1M, €1M-€3M, €3M-€10M, €10M+
   - Dynamically updates with selected currency symbol

2. **Investment Objective** (type: choice-detailed, vertical list)
   - Yield Generation
   - Capital Growth
   - Residency Benefits
   - Personal Use

3. **Risk Tolerance** (type: choice-detailed, vertical list)
   - Question: "If a market experiences a temporary downturn, your preferred response would be:"
   - Options from conservative to aggressive (maintain → maximize)

4. **Real Estate Experience** (type: choice-detailed, vertical list)
   - New to RE → Professional Investor

5. **International RE Experience** (type: choice-detailed, vertical list)
   - Exploring → Extensive Global Portfolio

6. **Tax Residency** (type: choice, 2x2 grid)
   - Portugal, UK, Dubai, Singapore, Other

7. **Home Market Yield** (type: input)
   - Number input with % suffix
   - "I don't know" button option
   - "Continue" button (disabled when empty)

8. **Diversification Priority** (type: choice-detailed, vertical list)
   - Question: "Your perspective on international diversification when returns are comparable to your home market:"
   - Diversification Priority → Return Maximization

**Survey Data Storage:**
- Saves to Supabase table: `kyc_surveys`
- Includes all answers + selected currency + timestamp

### 3. Comment/Annotation System (src/CommentSystem.jsx)
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

3. **kyc_surveys**
   - id, answers (JSONB), completed_at, created_at

**SQL files:**
- `supabase-setup.sql` - counters table
- `supabase-comments-table.sql` - comments table
- `supabase-kyc-surveys.sql` - KYC surveys table

## Key Files Structure

```
src/
├── App.jsx                 # Main app component
├── LandingPage.jsx         # Landing page with hero, markets, footer
├── LandingPage.css         # Landing page styles
├── Survey.jsx              # 8-question KYC survey
├── Survey.css              # Survey dark theme styles
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
