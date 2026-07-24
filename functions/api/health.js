// Simple health check endpoint to verify Cloudflare Functions are working

export async function onRequestGet(context) {
  const { env } = context;

  return new Response(
    JSON.stringify({
      status: 'ok',
      message: 'G6 Intelligence API is running',
      timestamp: new Date().toISOString(),
      hasResendKey: !!env.RESEND_API_KEY,
      environment: env.ENVIRONMENT || 'production'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}
