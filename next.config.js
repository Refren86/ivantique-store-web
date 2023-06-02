/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ivantique.vercel.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
