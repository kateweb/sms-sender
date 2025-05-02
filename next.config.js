const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: process.env._next_intl_trailing_slash === 'true', // Use the environment variable
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    _next_intl_trailing_slash: process.env._next_intl_trailing_slash || 'false', // Default to 'false' if not provided
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra1.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true
};

module.exports = withNextIntl(nextConfig);
