# Admin Panel - Quick Start 🚀

## Access

**URL**: http://localhost:5174/#admin

**Password**: `admin123`

---

## Quick Actions

### Edit City Data
1. Click **"City Overview"** tab
2. Click **"Edit"** on any city card
3. Update fields
4. Click **"Save"**

### Edit Neighborhood
1. Click **"Neighborhoods"** tab
2. Click **"Edit"** in table row
3. Update fields
4. Click **"Save"**

### Edit Quality of Life
1. Click **"Quality of Life"** tab
2. Click **"Edit"** in table row
3. Update amenities, transportation, lifestyle
4. Click **"Save"**

### Add New Record
1. Click **"+ New"** button in any tab
2. Fill in required fields (marked with *)
3. Click **"Save"**

### Delete Record
1. Click **"Delete"** button
2. Confirm deletion
3. Record removed permanently

---

## What You Can Edit

### ✅ City Overview (3 cities)
- Descriptions, images, highlights
- Average price/sqm (EUR/USD/GBP)
- Rental yield, days to rent
- 5-year growth trends

### ✅ Neighborhoods (15 neighborhoods)
- Names, descriptions, images
- Price ranges per sqm
- Rental yields and metrics
- Investment data

### ✅ Quality of Life (15 records)
- Amenities counts
- Transportation data
- Lifestyle ratings
- Popularity factors

---

## Important Notes

⚠️ **Changes are immediate** - No draft mode
⚠️ **Delete is permanent** - No undo
⚠️ **JSON fields** - Must be valid JSON arrays
⚠️ **Required fields** - Marked with * must be filled

---

## Common Fields

### JSON Arrays
```json
["Item 1", "Item 2", "Item 3"]
```

### Growth Arrays (5 years)
```json
[10.5, 14.2, 17.8, 21.5, 24.8]
```

### Images
- Use Unsplash URLs
- Format: `https://images.unsplash.com/photo-ID?w=800`

---

## Security

🔒 **Before Production**:
1. Change password in `AdminPanel.jsx` line 22
2. Implement proper authentication
3. Add user roles
4. Enable audit logging

---

## Troubleshooting

**Can't login?**
- Check password is `admin123`
- Refresh page

**Changes not saving?**
- Check required fields are filled
- Validate JSON syntax
- Check console for errors

**Data not loading?**
- Verify Supabase connection
- Check `.env` credentials

---

## Full Documentation

See **ADMIN_PANEL_GUIDE.md** for:
- Complete field descriptions
- Security best practices
- Extending the admin panel
- Backup & recovery

---

## Built-in Features

✅ Real-time data loading
✅ Form validation
✅ Success/error messages
✅ Responsive design
✅ Delete confirmations
✅ Auto-refresh after changes

---

**Happy editing!** 🎉
