import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8226ccffe3494c8f98765baa77a226b7.r2.dev",
      },
    ],
  },
};

export default nextConfig;
