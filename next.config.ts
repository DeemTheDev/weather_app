import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Images Config */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },
  output: 'export', 
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
