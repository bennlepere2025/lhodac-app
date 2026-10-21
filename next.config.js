/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Active le support des Server Actions
  },
};

module.exports = nextConfig;