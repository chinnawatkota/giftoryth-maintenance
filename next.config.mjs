import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const primaryDomain = process.env.PRIMARY_DOMAIN || 'www.giftoryth.com';
const apexDomain = primaryDomain.replace(/^www\./, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Allow MinIO CDN host (and any giftoryth subdomain) for Next Image optimization
    domains: ['images.giftoryth.com', 'giftoryth.com', 'www.giftoryth.com'],
    // Temporarily bypass Next.js image optimizer to avoid domain allowlist issues
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.giftoryth.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.giftoryth.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: apexDomain }],
        destination: `https://${primaryDomain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
