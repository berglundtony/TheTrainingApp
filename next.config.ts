import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v2.exercisedb.io",
      },
    ],
  }
}

export default nextConfig;
