// Cloudflare Pages Function to send appointment emails via Resend
// Uses fetch API directly instead of Resend SDK for better Cloudflare compatibility

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Get environment variables
    const resendApiKey = env.RESEND_API_KEY;
    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase configuration missing' }),
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

    // Send email using Resend API directly via fetch
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'G6 Intelligence <onboarding@resend.dev>',
        to: ['thedogbazinga@gmail.com'],
        subject: `New Consultation Request - ${appointmentData.name}`,
        html: emailHtml,
      })
    });

    const resendData = await resendResponse.json();

    // Check if there was an error
    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData);
      throw new Error(resendData.message || 'Failed to send email via Resend');
    }

    // Save appointment data to Supabase
    const supabaseData = {
      name: appointmentData.name,
      email: appointmentData.email || null,
      phone: appointmentData.phone || null,
      language: appointmentData.language,
      timezone: appointmentData.timezone,
      selected_slots: appointmentData.selectedSlots,
      email_sent: true,
      email_id: resendData.id,
      status: 'pending',
      user_agent: request.headers.get('user-agent') || null,
      source_page: request.headers.get('referer') || null
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

    let supabaseRecord = null;
    if (supabaseResponse.ok) {
      const records = await supabaseResponse.json();
      supabaseRecord = records[0];
      console.log('Saved to Supabase:', supabaseRecord?.id);
    } else {
      const error = await supabaseResponse.text();
      console.error('Failed to save to Supabase:', error);
      // Don't fail the request if Supabase save fails, email was still sent
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Appointment email sent successfully',
        emailId: resendData.id,
        appointmentId: supabaseRecord?.id || null
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
