import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '', // Leave empty for default ports (80 for HTTP, 443 for HTTPS)
        pathname: '/**', // Matches all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
