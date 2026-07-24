// Cloudflare Pages Function to send appointment emails via Resend
import { Resend } from 'resend';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Get the Resend API key from environment variables
    const resendApiKey = env.RESEND_API_KEY;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse the request body
    const appointmentData = await request.json();

    // Validate required fields
    if (!appointmentData.name || !appointmentData.selectedSlots || appointmentData.selectedSlots.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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
    // Note: In test mode, Resend can only send to verified email addresses
    // If you get a 403 error, verify your domain at resend.com/domains
    const emailData = await resend.emails.send({
      from: 'G6 Intelligence <onboarding@resend.dev>',
      to: ['thedogbazinga@gmail.com'],
      subject: `New Consultation Request - ${appointmentData.name}`,
      html: emailHtml,
    });

    // Check if there was an error in the response
    if (emailData.error) {
      throw new Error(emailData.error.message || 'Failed to send email');
    }

    const data = emailData.data || emailData;

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Appointment email sent successfully',
        emailId: data.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

  } catch (error) {
    console.error('Error sending appointment email:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to send appointment email',
        details: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
