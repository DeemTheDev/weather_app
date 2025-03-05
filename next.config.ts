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
};

export default nextConfig;
