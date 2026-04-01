/** @type {import('next').NextConfig} */
const nextConfig = {
  // Files in /files are served only via the API download route, never from /public

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Prevent caching of download and admin API responses
        source: '/api/(download|admin)(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, private' },
        ],
      },
    ]
  },

  // Compress all responses
  compress: true,
}

export default nextConfig
