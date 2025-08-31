/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  allowedDevOrigins: [
    'http://192.168.0.104:3000', // Replace with your dev server address and port
  ],
};

module.exports = nextConfig;
