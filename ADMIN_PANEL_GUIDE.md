# Admin Panel Guide 🛠️

## Access the Admin Panel

### URL
Navigate to: **http://localhost:5174/#admin**

### Default Credentials
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change the password in `AdminPanel.jsx` line 22 before deploying to production!

---

## Features

### 1. **City Overview Management**
- View all cities (Lisbon, Dubai, Porto)
- Edit city descriptions, hero images, highlights
- Update average metrics (price/sqm, rental yield, days to rent)
- Add new cities
- Delete existing cities

### 2. **Neighborhoods Management**
- View all 15 neighborhoods across 3 cities
- Edit neighborhood data:
  - Name, description, images
  - Price per sqm (EUR, USD, GBP)
  - Rental yields, days to rent
  - Investment metrics
- Add new neighborhoods
- Delete existing neighborhoods

### 3. **Quality of Life Data Management**
- View all QoL records
- Edit quality of life data:
  - Amenities counts (restaurants, cafés, supermarkets, etc.)
  - Transportation (metro, bus, tram, walkability)
  - Lifestyle ratings (nightlife, shopping, culture, safety)
  - Popularity factors
- Add new QoL records
- Delete existing QoL records

---

## How to Use

### Login
1. Navigate to http://localhost:5174/#admin
2. Enter password: `admin123`
3. Click "Login"

### Viewing Data
1. Click on tabs to switch between:
   - **City Overview** - City-level data
   - **Neighborhoods** - Neighborhood-level data
   - **Quality of Life** - Lifestyle and amenities data
2. Data loads automatically for each tab

### Editing Data
1. Click **"Edit"** button on any record
2. Modal opens with form fields
3. Update the fields you want to change
4. Click **"Save"** to commit changes
5. Success message appears
6. Data refreshes automatically

### Adding New Data
1. Click **"+ New City"** / **"+ New Neighborhood"** / **"+ New QoL Record"**
2. Fill in the required fields (marked with *)
3. Optional fields can be left empty
4. Click **"Save"**
5. New record appears in the list

### Deleting Data
1. Click **"Delete"** button on any record
2. Confirmation dialog appears
3. Confirm to delete permanently
4. Record is removed from database

---

## Field Descriptions

### City Overview

| Field | Type | Description |
|-------|------|-------------|
| City Name * | Text | Name of the city (e.g., "Lisbon") |
| Hero Image URL | URL | Full URL to hero image (Unsplash, etc.) |
| Description | Text | Investment overview paragraph |
| Highlights | JSON | Array of key investment points |
| Avg Price/sqm EUR | Number | Min/Max price per square meter in EUR |
| Avg Price/sqm USD | Number | Min/Max price per square meter in USD |
| Avg Price/sqm GBP | Number | Min/Max price per square meter in GBP |
| Avg Rental Yield | Decimal | Average rental yield percentage |
| Avg Days to Rent | Number | Average days to find tenant |
| Price Growth 5Y | JSON | Array of 5 annual growth percentages |

**Highlights Example**:
```json
["Growing tech hub", "Strong rental market", "Golden visa program"]
```

**Price Growth 5Y Example**:
```json
[9.2, 13.5, 16.8, 20.2, 23.5]
```

---

### Neighborhoods

| Field | Type | Description |
|-------|------|-------------|
| City Name * | Text | Parent city name |
| Neighborhood Name * | Text | Name of neighborhood |
| Image URL | URL | Neighborhood image |
| Description | Text | Brief description |
| Price/sqm EUR Min/Max | Number | Price range in EUR |
| Price/sqm USD Min/Max | Number | Price range in USD |
| Price/sqm GBP Min/Max | Number | Price range in GBP |
| Rental Yield Min/Max | Decimal | Yield range (%) |
| Days to Rent | Number | Average days to rent |
| Acquisition Tax | Decimal | Transfer tax percentage |
| Avg Holding Time | Decimal | Years investors hold property |
| Days Available | Number | Days on market |
| Rent/sqm EUR/USD/GBP | Number | Monthly rent per sqm |
| Price Growth 5Y | JSON | 5-year price growth array |
| Rental Growth 5Y | JSON | 5-year rental growth array |
| Avg Rental Time | Number | Lease duration in months |

---

### Quality of Life

| Field | Type | Description |
|-------|------|-------------|
| City Name * | Text | Parent city |
| Neighborhood Name * | Text | Parent neighborhood |
| Popularity Factors | JSON | Array of reasons for high demand |
| Restaurants | Number | Count of restaurants |
| Cafés | Number | Count of cafés |
| Supermarkets | Number | Count of supermarkets |
| Schools | Number | Count of schools |
| Healthcare | Number | Count of healthcare facilities |
| Parks | Number | Count of parks |
| Metro Stations | Number | Number of metro stations |
| Bus Lines | Number | Number of bus lines |
| Tram Lines | Number | Number of tram lines |
| Walkability | Number | Walkability score (0-100) |
| Nightlife | Select | Low / Moderate / High / Very High |
| Shopping | Text | Shopping description |
| Culture | Select | Low / Moderate / High / Very High |
| Safety | Select | Low / Moderate / High / Very High |

**Popularity Factors Example**:
```json
["Historic charm", "Panoramic views", "Fado music culture", "Tourist demand"]
```

---

## Tips & Best Practices

### Images
- Use **Unsplash** for high-quality free images
- Format: `https://images.unsplash.com/photo-ID?w=800`
- For hero images: `?w=1600&h=600&fit=crop`
- Always use HTTPS URLs

### JSON Fields
- Highlights and Popularity Factors must be valid JSON arrays
- Use double quotes, not single quotes
- Format: `["Item 1", "Item 2", "Item 3"]`
- The form will validate JSON before saving

### Price Data
- Always provide min and max values
- Keep currency conversions consistent
- Update all three currencies (EUR, USD, GBP)

### Growth Arrays
- Must contain exactly 5 values (one per year)
- Represent cumulative growth percentages
- Example: `[10.5, 14.2, 17.8, 21.5, 24.8]`

### Consistency
- Ensure city names match exactly across tables
- Neighborhood names must match between `neighborhoods` and `neighborhood_quality_of_life`
- Case-sensitive matching (e.g., "Lisbon" ≠ "lisbon")

---

## Troubleshooting

### "Error loading data"
**Solution**: Check Supabase connection
- Verify `.env` file has correct credentials
- Check Supabase dashboard is accessible
- Ensure RLS policies allow authenticated updates

### "Error saving"
**Solution**: Check field validation
- Required fields must be filled
- JSON fields must be valid JSON
- Number fields must contain numeric values
- Check console for specific error message

### "Delete failed"
**Solution**: Check foreign key constraints
- Some records may be referenced by other tables
- Delete dependent records first (e.g., QoL before neighborhood)

### JSON parsing errors
**Solution**: Validate JSON syntax
- Use a JSON validator (jsonlint.com)
- Ensure double quotes, not single quotes
- Check for trailing commas
- Arrays must have square brackets `[]`

### Changes not appearing
**Solution**: Refresh the data
- Click on another tab and back
- Logout and login again
- Check browser console for errors

---

## Security Considerations

### ⚠️ Before Production

1. **Change the Admin Password**
   - Edit `AdminPanel.jsx` line 22
   - Use a strong, unique password
   - Consider environment variable

2. **Implement Proper Authentication**
   - Use Supabase Auth
   - Add user roles (admin, editor, viewer)
   - Implement JWT tokens
   - Add session management

3. **Update RLS Policies**
   ```sql
   -- Only allow authenticated users to update
   CREATE POLICY "Only authenticated users can update"
     ON city_overview
     FOR UPDATE
     USING (auth.role() = 'authenticated');
   ```

4. **Add Audit Logging**
   - Track who changed what and when
   - Create audit tables
   - Log all CRUD operations

5. **Input Validation**
   - Server-side validation in Supabase functions
   - SQL injection protection (Supabase handles this)
   - XSS prevention (React handles this)

6. **Rate Limiting**
   - Limit requests per user
   - Prevent abuse
   - Use Supabase rate limiting features

---

## Extending the Admin Panel

### Adding New Fields

1. **Add to SQL Schema**
```sql
ALTER TABLE neighborhoods 
ADD COLUMN new_field VARCHAR(100);
```

2. **Update Form Component**
```jsx
<div className="form-group">
  <label>New Field</label>
  <input
    type="text"
    value={formData.new_field || ''}
    onChange={(e) => updateField('new_field', e.target.value)}
  />
</div>
```

3. **Update Table Display**
```jsx
<td>{n.new_field}</td>
```

### Adding New Tables

1. Create new tab button
2. Create new tab component
3. Add CRUD operations
4. Create edit modal form
5. Update fetchData() function

### Bulk Import/Export

Add CSV import/export functionality:
```javascript
// Export to CSV
const exportToCSV = (data, filename) => {
  const csv = convertToCSV(data)
  downloadFile(csv, filename)
}

// Import from CSV
const importFromCSV = async (file) => {
  const data = await parseCSV(file)
  await supabase.from('table').insert(data)
}
```

---

## Keyboard Shortcuts (Future Enhancement)

- `Ctrl+N` - New record
- `Ctrl+S` - Save (in modal)
- `Esc` - Close modal
- `Tab` - Navigate between tabs

---

## Mobile Access

The admin panel is responsive and works on:
- ✅ Desktop (optimal)
- ✅ Tablet (good)
- ⚠️ Mobile (limited, use desktop for best experience)

---

## Backup & Recovery

### Manual Backup
1. Go to Supabase Dashboard
2. Navigate to Database → Backups
3. Create manual backup
4. Download SQL dump

### Restore from Backup
1. Go to Supabase SQL Editor
2. Run SQL dump file
3. Verify data integrity

### Export Data via Admin Panel (Future)
```javascript
const exportAllData = async () => {
  const [cities, neighborhoods, qol] = await Promise.all([
    supabase.from('city_overview').select('*'),
    supabase.from('neighborhoods').select('*'),
    supabase.from('neighborhood_quality_of_life').select('*')
  ])
  
  downloadJSON({cities, neighborhoods, qol}, 'backup.json')
}
```

---

## Support

### Common Issues
- Check browser console for errors (F12)
- Verify network tab for failed requests
- Check Supabase logs in dashboard

### Need Help?
- Review `MIGRATION_SUMMARY.md`
- Check Supabase documentation
- Review SQL table schemas

---

## Future Enhancements

### Planned Features
- [ ] CSV Import/Export
- [ ] Bulk edit operations
- [ ] Data validation rules
- [ ] Version history
- [ ] User management
- [ ] Image upload (not just URLs)
- [ ] Rich text editor for descriptions
- [ ] Drag-and-drop reordering
- [ ] Advanced search/filter
- [ ] Analytics dashboard
- [ ] Audit logs viewer
- [ ] Real-time collaboration

### Nice to Have
- [ ] Markdown support for descriptions
- [ ] Image cropping tool
- [ ] Duplicate record feature
- [ ] Undo/Redo functionality
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Mobile app

---

## Summary

The admin panel provides a complete CRUD interface for managing all investment data:

✅ **Easy to use** - No SQL knowledge required
✅ **Safe** - Confirmation dialogs for deletes
✅ **Fast** - Real-time updates
✅ **Flexible** - Edit any field
✅ **Scalable** - Add unlimited records

**Access**: http://localhost:5174/#admin
**Password**: `admin123` (change before production!)

Happy editing! 🚀
