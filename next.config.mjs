/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Keep deliberate print texture while avoiding full-quality derivatives for
    // the large atmospheric images used below the fold.
    qualities: [45, 60, 75],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
