# Development Setup Guide

## 🚀 Running the Application with Email Notifications

To test the appointment scheduling with email notifications in development, you need to run **TWO servers**:

### Terminal 1: Frontend (Vite)
```bash
npm run dev
```
This runs on **http://localhost:5173**

### Terminal 2: API Server (Email Backend)
```bash
npm run dev:api
```
This runs on **http://localhost:3001**

---

## ✅ What's Been Updated

### 1. Schedule Consultation Button
- **Location:** Investment Details page (`/neighborhoods/Dubai/Dubai%20Marina/investment`)
- **Action:** Now navigates to `/schedule-consultation` form

### 2. Contact Us Buttons
- **Locations:** 
  - Landing page header (top right)
  - Landing page footer
- **Action:** Now navigate to `/schedule-consultation` form

### 3. Email Notifications
- **Recipient:** `thedogbazinga@gmail.com`
- **Trigger:** When user submits the schedule consultation form
- **Development:** Uses `http://localhost:3001/api/send-appointment-email`
- **Production:** Uses `/api/send-appointment-email` (Cloudflare Function)

---

## 📧 Testing Email Functionality

### Step 1: Start Both Servers
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run dev:api
```

### Step 2: Navigate to Schedule Page
Visit: **http://localhost:5173/schedule-consultation**

Or click any of these buttons:
- "Contact Us" in header/footer
- "Schedule a Consultation" on investment details page

### Step 3: Fill Out Form
1. Enter name, email, phone
2. Select language and timezone
3. Select one or more time slots
4. Click "Confirm Consultation"

### Step 4: Check Email
- Email will be sent to: **thedogbazinga@gmail.com**
- Check the Resend dashboard: https://resend.com/emails
- Look for the email with subject: "New Consultation Request - [Name]"

### Step 5: Verify in Console
You should see in Terminal 2:
```
📧 Received appointment request: { name, email, phone, ... }
📤 Sending email to thedogbazinga@gmail.com...
✅ Email sent successfully! ID: xxx-xxx-xxx
```

---

## 🔍 Troubleshooting

### Email Not Sending
1. **Check API server is running**
   - Terminal 2 should show: "🚀 G6 Intelligence Development Server"
   - Visit: http://localhost:3001/api/health

2. **Check RESEND_API_KEY in .env**
   ```bash
   cat .env | grep RESEND
   ```
   Should show: `RESEND_API_KEY=re_...`

3. **Check browser console (F12)**
   - Look for "Appointment email sent successfully" or errors
   - Check Network tab for API call to localhost:3001

4. **Check API server logs (Terminal 2)**
   - Should show: "📧 Received appointment request"
   - If not, the form isn't reaching the API

### Form Not Submitting
- Ensure you've filled out: Name + (Email OR Phone) + At least 1 time slot
- Check browser console for errors

### CORS Errors
- Make sure API server is running on port 3001
- Check that dev-server.js has CORS enabled (it does)

---

## 🌐 Production Deployment

When deploying to Cloudflare Pages:

1. **Set Environment Variable**
   - Go to Cloudflare Pages Dashboard
   - Settings → Environment Variables
   - Add: `RESEND_API_KEY=re_your_key_here`

2. **Deploy**
   ```bash
   npm run build
   git push
   ```

3. **Cloudflare Function**
   - The function at `functions/api/send-appointment-email.js` will handle emails
   - No need to run separate API server in production

---

## 📁 File Structure

```
G6/
├── src/
│   ├── ScheduleConsultation.jsx     # Form component (updated API URL)
│   ├── LandingPage.jsx              # Contact Us buttons (updated)
│   └── InvestmentDetails.jsx        # Schedule button (updated)
├── functions/
│   └── api/
│       └── send-appointment-email.js # Cloudflare Function (production)
├── dev-server.js                     # Development API server
├── test-email-simple.js              # Email test script
└── .env                              # RESEND_API_KEY here
```

---

## 🎯 Quick Test Command

Test email sending directly (without the form):
```bash
node test-email-simple.js
```

This sends a test email to verify Resend is working.

---

## ✨ Summary

1. Run `npm run dev` + `npm run dev:api` together
2. Click "Contact Us" or "Schedule a Consultation"
3. Fill out and submit the form
4. Check thedogbazinga@gmail.com for appointment notification

The system automatically routes between development (localhost:3001) and production (Cloudflare Function) based on the environment!
