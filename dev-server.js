// Development server with email API endpoint
import express from 'express';
import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email endpoint (mirrors the Cloudflare Function)
app.post('/api/send-appointment-email', async (req, res) => {
  try {
    console.log('📧 Received appointment request:', req.body);

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    const appointmentData = req.body;

    // Validate required fields
    if (!appointmentData.name || !appointmentData.selectedSlots || appointmentData.selectedSlots.length === 0) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Format the selected time slots for the email
    const formattedSlots = appointmentData.selectedSlots
      .map(slot => {
        const date = new Date(slot.date);
        return `${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${slot.time}`;
      })
      .join('\n');

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #16213e; }
            .value { margin-left: 10px; }
            .slots { background: white; padding: 15px; border-radius: 6px; margin-top: 10px; white-space: pre-line; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Consultation Request</h1>
              <p>G6 Intelligence</p>
            </div>
            <div class="content">
              <div class="section">
                <p><span class="label">Name:</span><span class="value">${appointmentData.name}</span></p>
                ${appointmentData.email ? `<p><span class="label">Email:</span><span class="value">${appointmentData.email}</span></p>` : ''}
                ${appointmentData.phone ? `<p><span class="label">Phone:</span><span class="value">${appointmentData.phone}</span></p>` : ''}
                <p><span class="label">Preferred Language:</span><span class="value">${appointmentData.language}</span></p>
                <p><span class="label">Timezone:</span><span class="value">${appointmentData.timezone}</span></p>
              </div>

              <div class="section">
                <p class="label">Available Time Slots (${appointmentData.selectedSlots.length} selected):</p>
                <div class="slots">${formattedSlots}</div>
              </div>

              <div class="footer">
                <p>This is an automated notification from your G6 Intelligence website.</p>
                <p>Received: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    console.log('📤 Sending email to thedogbazinga@gmail.com...');

    const emailData = await resend.emails.send({
      from: 'G6 Intelligence <onboarding@resend.dev>',
      to: ['thedogbazinga@gmail.com'],
      subject: `New Consultation Request - ${appointmentData.name}`,
      html: emailHtml,
    });

    // Check if there was an error in the response
    if (emailData.error) {
      console.error('❌ Resend error:', emailData.error);
      throw new Error(emailData.error.message || 'Failed to send email');
    }

    const data = emailData.data || emailData;

    console.log('✅ Email sent successfully! ID:', data.id);

    // Save appointment data to Supabase
    console.log('💾 Saving to Supabase...');

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    let supabaseRecord = null;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabaseData = {
          name: appointmentData.name,
          email: appointmentData.email || null,
          phone: appointmentData.phone || null,
          language: appointmentData.language,
          timezone: appointmentData.timezone,
          selected_slots: appointmentData.selectedSlots,
          email_sent: true,
          email_id: data.id,
          status: 'pending',
          user_agent: req.get('user-agent') || null,
          source_page: req.get('referer') || null
        };

        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/consultation_appointments`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(supabaseData)
        });

        if (supabaseResponse.ok) {
          const records = await supabaseResponse.json();
          supabaseRecord = records[0];
          console.log('✅ Saved to Supabase! ID:', supabaseRecord?.id);
        } else {
          const error = await supabaseResponse.text();
          console.error('⚠️  Failed to save to Supabase:', error);
          // Don't fail the request if Supabase save fails
        }
      } catch (supabaseError) {
        console.error('⚠️  Supabase error:', supabaseError.message);
        // Don't fail the request if Supabase save fails
      }
    } else {
      console.log('⚠️  Supabase credentials not configured, skipping database save');
    }

    // Return success response
    res.json({
      success: true,
      message: 'Appointment email sent successfully',
      emailId: data.id,
      appointmentId: supabaseRecord?.id || null
    });

  } catch (error) {
    console.error('❌ Error sending appointment email:', error);

    res.status(500).json({
      error: 'Failed to send appointment email',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dev server running' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🚀 G6 Intelligence Development Server                     ║
║                                                            ║
║  API Server: http://localhost:${PORT}                         ║
║  Endpoint: http://localhost:${PORT}/api/send-appointment-email ║
║                                                            ║
║  ✅ Ready to receive appointment requests                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
