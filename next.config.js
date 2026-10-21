/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true }, // gardez ce que vous aviez déjà
  webpack: (config, { dev }) => {
    if (dev) config.cache = false; // évite l'erreur de mémoire
    return config;
  },
};
module.exports = nextConfig;