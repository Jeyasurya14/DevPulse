import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set the turbopack root to prevent it from using the wrong workspace root
  // This fixes the "Can't resolve 'tailwindcss'" error caused by a stray package-lock.json
  // in the parent user directory
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
