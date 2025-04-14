/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        pathname: '/05fcc879-04d4-4222-8896-e3772a8a3060/**',
      },
    ],
  },
};

module.exports = nextConfig;
