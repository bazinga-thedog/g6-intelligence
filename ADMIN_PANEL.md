# Admin Panel

The admin panel has been moved to a separate repository for better organization and deployment.

## Access the Admin Panel

**Repository**: https://github.com/bazinga-thedog/g6-admin

**Features**:
- Full CRUD operations for all data
- Password-protected access
- Modern responsive UI
- Real-time data sync with this application

## Quick Setup

```bash
# Clone the admin repository
git clone https://github.com/bazinga-thedog/g6-admin.git
cd g6-admin

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run the admin panel
npm run dev
```

## Default Login

**Password**: `admin123`

⚠️ Change this in production!

## Documentation

See the admin repository README for:
- Complete setup instructions
- Usage guide
- Security best practices
- Deployment instructions

## Related Documentation

- `MIGRATION_SUMMARY.md` - Data migration details
- `QUICK_REFERENCE.md` - Quick reference for database structure
