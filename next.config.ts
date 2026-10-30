import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones and other PCs on the local network open the dev server (e.g. http://10.182.167.2:3000).
  // Without this, Next.js blocks dev-only resources for non-localhost origins and the 3D hero never loads.
  // Development only — has no effect on production builds.
  allowedDevOrigins: ["10.182.167.2", "10.*.*.*", "192.168.*.*", "172.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
