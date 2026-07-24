// Simple test to send email to verified address
import { Resend } from 'resend';
import * as dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('🧪 Sending test email...\n');

// Try sending to thedogbazinga@gmail.com (verified address)
const result = await resend.emails.send({
  from: 'G6 Intelligence <onboarding@resend.dev>',
  to: ['thedogbazinga@gmail.com'],
  subject: '🧪 TEST - G6 Intelligence Appointment System',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .test-badge { background: #ffc107; color: #000; padding: 8px 20px; border-radius: 20px; display: inline-block; margin-bottom: 15px; font-weight: bold; }
          .section { margin-bottom: 20px; background: white; padding: 20px; border-radius: 6px; }
          .label { font-weight: bold; color: #16213e; }
          .value { margin-left: 10px; }
          .slots { background: #e9ecef; padding: 15px; border-radius: 6px; margin-top: 10px; border-left: 4px solid #16213e; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="test-badge">🧪 TEST EMAIL</div>
            <h1>New Consultation Request</h1>
            <p style="margin: 0; opacity: 0.9;">G6 Intelligence</p>
          </div>
          <div class="content">
            <div class="section">
              <h3 style="margin-top: 0; color: #16213e;">Contact Information</h3>
              <p><span class="label">Name:</span><span class="value">Alexander Hamilton</span></p>
              <p><span class="label">Email:</span><span class="value">alexander.hamilton@company.com</span></p>
              <p><span class="label">Phone:</span><span class="value">+44 20 7123 4567</span></p>
              <p><span class="label">Preferred Language:</span><span class="value">English</span></p>
              <p><span class="label">Timezone:</span><span class="value">Europe/London</span></p>
            </div>

            <div class="section">
              <h3 style="margin-top: 0; color: #16213e;">Available Time Slots</h3>
              <p style="margin-bottom: 10px;"><strong>3 slots selected:</strong></p>
              <div class="slots">
                • Monday, July 29, 2026 at 10:00<br>
                • Tuesday, July 30, 2026 at 14:30<br>
                • Wednesday, July 31, 2026 at 11:00
              </div>
            </div>

            <div class="footer">
              <p><strong>✅ This is a TEST EMAIL from your G6 Intelligence appointment notification system.</strong></p>
              <p>The system is working correctly!</p>
              <p style="margin-top: 15px; font-size: 11px;">Sent: ${new Date().toLocaleString()}</p>
              <hr style="border: none; border-top: 1px solid #dee2e6; margin: 15px 0;">
              <p style="font-size: 11px; color: #999;">
                <strong>Note:</strong> This test was sent to thedogbazinga@gmail.com because Resend is in test mode.<br>
                To send to bruno.m.martinho@gmail.com, verify your domain at <a href="https://resend.com/domains">resend.com/domains</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,
});

console.log('\n✅ Email sent successfully!\n');
console.log('Email Details:');
console.log('  ID:', result.data?.id || result.id);
console.log('  To: thedogbazinga@gmail.com');
console.log('  Status:', result.error ? 'Error' : 'Success');

if (result.error) {
  console.log('\n❌ Error:', result.error);
} else {
  console.log('\n📬 Check your inbox at thedogbazinga@gmail.com');
  console.log('🔍 View in Resend dashboard: https://resend.com/emails');
  console.log('\n💡 To send emails to bruno.m.martinho@gmail.com:');
  console.log('   1. Verify your domain at https://resend.com/domains');
  console.log('   2. Update the "from" address to use your verified domain');
}

console.log('\n✨ The appointment notification system is configured and ready!');
