import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['googleapis'],
  env: {
    BAND_SHEET_ID: process.env.BAND_SHEET_ID || '1kVWRYTLBFhzi53ybZRpu5SHDYzXN43s3RzF2DrAw9uk',
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
