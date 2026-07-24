# Cloudflare Pages Deployment Guide

## 🔧 Setting Up Email Notifications on Cloudflare Pages

### Step 1: Add Environment Variable

1. Go to your Cloudflare Pages dashboard
2. Select your project (g6-intelligence)
3. Navigate to **Settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Select **Production** and **Preview**
6. Click **Save**

### Step 2: Redeploy

After adding the environment variable, you MUST redeploy for changes to take effect.

**Option A: Push a new commit (triggers automatic deployment)**
```bash
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

**Option B: Manual redeploy in Cloudflare dashboard**
1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Retry deployment**

### Step 3: Verify Deployment

Once deployed, test the health endpoint:

```bash
curl https://your-site.pages.dev/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "G6 Intelligence API is running",
  "timestamp": "2026-07-24T...",
  "hasResendKey": true,
  "environment": "production"
}
```

**⚠️ Important:** If `hasResendKey` is `false`, the environment variable wasn't loaded. Redeploy again.

---

## 🧪 Testing the Email Function

### Test via curl:
```bash
curl -X POST https://your-site.pages.dev/api/send-appointment-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "language": "English",
    "timezone": "Europe/London",
    "selectedSlots": [
      {"date": "2026-07-29", "time": "10:00"}
    ]
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Appointment email sent successfully",
  "emailId": "xxx-xxx-xxx"
}
```

### Test via the website:
1. Visit your deployed site
2. Click "Contact Us" or "Schedule a Consultation"
3. Fill out and submit the form
4. Check thedogbazinga@gmail.com for the email

---

## 🐛 Troubleshooting

### Problem: "RESEND_API_KEY not configured" error

**Cause:** Environment variable not loaded

**Solution:**
1. Verify the variable exists in Cloudflare Pages settings
2. Check spelling: `RESEND_API_KEY` (case-sensitive)
3. Redeploy the site after adding the variable
4. Test `/api/health` endpoint - `hasResendKey` should be `true`

### Problem: 403 Error from Resend

**Cause:** Resend is in test mode and can only send to verified emails

**Solution:**
- Verify `thedogbazinga@gmail.com` in your Resend account, OR
- Verify your domain at https://resend.com/domains

### Problem: Function not found / 404 error

**Cause:** Functions not deployed correctly

**Solution:**
1. Verify `functions/api/send-appointment-email.js` exists in your repo
2. Check Cloudflare build logs for errors
3. Ensure your build command is: `npm run build`
4. Ensure output directory is: `dist`

### Problem: CORS errors in browser

**Cause:** Missing CORS headers

**Solution:** The function already includes CORS headers. If still seeing errors:
1. Check browser console for exact error
2. Verify the request is going to the correct URL
3. Test with curl first to isolate client vs server issue

---

## 📁 File Structure

```
G6/
├── functions/
│   ├── _middleware.js          # SPA routing middleware
│   └── api/
│       ├── health.js            # Health check endpoint
│       └── send-appointment-email.js  # Email sending endpoint
├── src/
│   └── ScheduleConsultation.jsx  # Form that calls the API
└── dist/                        # Built files (Cloudflare serves this)
```

---

## 🔍 Checking Cloudflare Logs

1. Go to Cloudflare Pages dashboard
2. Click on your deployment
3. View **Functions** logs tab
4. Look for errors or API calls

You should see:
- POST requests to `/api/send-appointment-email`
- Success or error responses
- Any console.log/error messages

---

## ✅ Deployment Checklist

- [ ] `RESEND_API_KEY` added to Cloudflare Pages environment variables
- [ ] Environment variable set for **Production** and **Preview**
- [ ] Site redeployed after adding environment variable
- [ ] `/api/health` endpoint returns `hasResendKey: true`
- [ ] Test email sent via curl or website form
- [ ] Email received at thedogbazinga@gmail.com

---

## 🚀 Quick Deploy Command

If you've made changes and want to deploy:

```bash
# Commit changes
git add .
git commit -m "Update email notification function"

# Push to trigger Cloudflare deployment
git push origin main
```

Cloudflare will automatically:
1. Pull the latest code
2. Run `npm run build`
3. Deploy to your `.pages.dev` domain
4. Make Functions available at `/api/*`

---

## 📧 Email Recipient Configuration

Current recipient: **thedogbazinga@gmail.com**

To change the recipient, edit:
- **Production:** `functions/api/send-appointment-email.js` line 92
- **Development:** `dev-server.js` line 66

```javascript
to: ['your-new-email@example.com'],
```

Then commit and push to deploy.

---

## 🆘 Still Having Issues?

1. **Check Function Logs:** Cloudflare dashboard → Deployments → Functions logs
2. **Test Health Endpoint:** Visit `/api/health` on your deployed site
3. **Verify Environment Variable:** Should see `hasResendKey: true`
4. **Check Resend Dashboard:** https://resend.com/emails for email send logs
5. **Test Locally First:** Run `npm run dev:api` to test the endpoint locally

If the health check shows `hasResendKey: false`, the environment variable isn't loaded. Redeploy!
