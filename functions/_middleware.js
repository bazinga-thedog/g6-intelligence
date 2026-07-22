// Cloudflare Pages Functions middleware
// Handles SPA routing while preserving static asset serving

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // List of static file patterns that should be served directly
  const staticPatterns = [
    /\.pdf$/,
    /\.css$/,
    /\.js$/,
    /\.json$/,
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.gif$/,
    /\.svg$/,
    /\.ico$/,
    /\.woff$/,
    /\.woff2$/,
    /\.ttf$/,
    /\.eot$/,
    /^\/assets\//,
  ];

  // Check if this is a static asset
  const isStatic = staticPatterns.some(pattern => pattern.test(pathname));

  if (isStatic) {
    // Serve the static asset directly
    const response = await context.next();

    // If it's a PDF, ensure correct headers
    if (pathname.endsWith('.pdf') && response.ok) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Content-Type', 'application/pdf');
      newResponse.headers.set('Content-Disposition', 'attachment; filename="' + pathname.split('/').pop() + '"');
      return newResponse;
    }

    return response;
  }

  // For all other routes, serve index.html (React Router / SPA)
  return context.next();
}
