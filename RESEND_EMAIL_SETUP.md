# Resend Email Setup Guide

This guide explains how to configure email notifications for appointment scheduling using Resend.

## Overview

When a user schedules a consultation appointment, an email notification is automatically sent to `bruno.m.martinho@gmail.com` with all the appointment details including:
- Contact information (name, email, phone)
- Preferred language
- Timezone
- Selected time slots

## Setup Instructions

### 1. Get Your Resend API Key

1. Sign up or log in at [resend.com](https://resend.com)
2. Navigate to API Keys section
3. Create a new API key (or use an existing one)
4. Copy the API key (it starts with `re_`)

### 2. Configure Domain (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to Domains
2. Add your domain: `g6-intelligence.com`
3. Follow the DNS verification steps
4. Update the `from` email in `functions/api/send-appointment-email.js` line 87:
   ```javascript
   from: 'G6 Intelligence <noreply@g6-intelligence.com>',
   ```

**Note:** During development/testing, you can use Resend's test domain which allows sending emails only to the verified email addresses in your Resend account.

### 3. Set Environment Variables

#### For Local Development (Vite Dev Server)

Add to your `.env` file:
```
RESEND_API_KEY=re_your_api_key_here
```

**Important:** The `.env` file is gitignored and won't be deployed to Cloudflare Pages.

#### For Cloudflare Pages Production

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Navigate to **Settings** > **Environment Variables**
4. Add a new variable:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Production (and Preview if needed)
5. Click **Save**
6. Redeploy your site for changes to take effect

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Schedule Consultation page
3. Fill out the form and select time slots
4. Submit the form
5. Check your email at `bruno.m.martinho@gmail.com`

### 5. Verify Email Delivery

You can monitor email delivery in the Resend dashboard:
- Go to **Emails** section
- View status of sent emails
- Check delivery logs and any errors

## API Endpoint

The email is sent via a Cloudflare Pages Function:
- **Endpoint:** `/api/send-appointment-email`
- **Method:** POST
- **Location:** `functions/api/send-appointment-email.js`

## Customization

### Change Recipient Email

Edit `functions/api/send-appointment-email.js` line 88:
```javascript
to: ['your-email@example.com'],
```

### Customize Email Template

The email HTML template is in `functions/api/send-appointment-email.js` starting at line 42. You can modify:
- Colors and styling
- Layout and structure
- Content and formatting

### Add Multiple Recipients

Change the `to` field to an array:
```javascript
to: ['bruno.m.martinho@gmail.com', 'team@g6-intelligence.com'],
```

## Troubleshooting

### Email Not Sending

1. **Check API Key:** Ensure `RESEND_API_KEY` is set in Cloudflare Pages environment variables
2. **Check Console:** Look for errors in browser console and Cloudflare Pages logs
3. **Domain Verification:** If using custom domain, ensure it's verified in Resend
4. **Rate Limits:** Check if you've hit Resend's rate limits

### CORS Issues

The API endpoint includes CORS headers. If you experience issues:
- Check that the request is going to the correct endpoint
- Verify the `Access-Control-Allow-Origin` header is set correctly

### Local Development

For local testing with Cloudflare Pages Functions, use:
```bash
npx wrangler pages dev dist
```

This runs the built site with Functions support locally.

## Security Notes

- Never commit your `RESEND_API_KEY` to version control
- Use environment variables for sensitive data
- The `.env` file is already in `.gitignore`
- Cloudflare Pages environment variables are encrypted and secure

## Dependencies

- `resend` npm package (already installed)
- Cloudflare Pages account (for production deployment)
- Resend account (free tier available)

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Resend Dashboard](https://resend.com/emails)
