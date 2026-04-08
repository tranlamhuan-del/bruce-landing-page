import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['googleapis'],
  env: {
    BAND_SHEET_ID: process.env.BAND_SHEET_ID || '1kVWRYTLBFhzi53ybZRpu5SHDYzXN43s3RzF2DrAw9uk',
    HWL_SHEET_ID: process.env.HWL_SHEET_ID || '18dHcazp51TH3bF0HEwq7EN04zwySpgtNu_nRpMxjHaE',
    HWL_SCRAPER_URL: process.env.HWL_SCRAPER_URL || 'http://100.118.236.116:3002',
    HWL_SCRAPER_SECRET: process.env.HWL_SCRAPER_SECRET || 'hwl-scraper-2026-secret',
    JWT_SECRET: process.env.JWT_SECRET || 'dainam-band-secret-key-2024',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
