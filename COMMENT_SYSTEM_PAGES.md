# Comment System - Page Identification

## Overview
The CommentSystem component now tracks comments per specific page/view using unique page identifiers. This ensures comments are isolated to their respective contexts.

## Page Identifiers

### 1. Landing Page
- **Page ID**: `landing`
- **Description**: Main landing page with hero section and survey
- **Comments**: Feedback on landing page design, messaging, survey flow

### 2. City Selection Page (Investment Opportunities)
- **Page ID**: `locations`
- **Description**: City cards showcase (Lisbon, Dubai, Porto, London, Singapore, Manchester)
- **Comments**: Feedback on city selection, metrics display, filtering

### 3. Neighborhood Selection Pages
- **Page ID**: `neighborhoods-{cityName}`
- **Examples**: 
  - `neighborhoods-Lisbon`
  - `neighborhoods-Dubai`
  - `neighborhoods-Porto`
- **Description**: Neighborhood cards for a specific city
- **Comments**: City-specific feedback, neighborhood comparisons

### 4. Neighborhood Detail Pages
- **Page ID**: `neighborhood-detail-{cityName}-{neighborhoodName}`
- **Examples**:
  - `neighborhood-detail-Lisbon-Alfama`
  - `neighborhood-detail-Dubai-Dubai Marina`
  - `neighborhood-detail-Porto-Ribeira`
- **Description**: Detailed view of a specific neighborhood with quality of life data
- **Comments**: Neighborhood-specific feedback, data accuracy, missing information

## Implementation

### CommentSystem Component
```jsx
<CommentSystem pageId="landing" />
<CommentSystem pageId="locations" />
<CommentSystem pageId={`neighborhoods-${selectedCity?.city}`} />
<CommentSystem pageId={`neighborhood-detail-${cityName}-${neighborhood?.name}`} />
```

### Database
- Comments are stored in `page_comments` table
- `page_url` field contains the page identifier
- Indexed for fast filtering by page
- Comments from different pages are completely isolated

## Benefits

1. **Contextual Feedback**: Comments are tied to specific pages/views
2. **Isolation**: Comments on Lisbon neighborhoods don't appear on Porto neighborhoods
3. **Granularity**: Can provide feedback on specific neighborhood details
4. **Organization**: Easy to review feedback by page type or specific location
5. **Scalability**: Adding new cities/neighborhoods automatically creates new comment contexts

## Querying Comments

### View all comments for landing page:
```sql
SELECT * FROM page_comments WHERE page_url = 'landing';
```

### View all comments for a specific city:
```sql
SELECT * FROM page_comments WHERE page_url LIKE 'neighborhoods-Lisbon%';
```

### View all comments for a specific neighborhood:
```sql
SELECT * FROM page_comments WHERE page_url = 'neighborhood-detail-Lisbon-Alfama';
```

### View all neighborhood detail pages:
```sql
SELECT * FROM page_comments WHERE page_url LIKE 'neighborhood-detail-%';
```

## Future Enhancements

- Add user authentication to track who left comments
- Add comment categories (bug, feature request, general feedback)
- Add priority/severity levels
- Export comments by page for analysis
- Admin dashboard to manage and respond to comments
