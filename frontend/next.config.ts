import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
  },
};

export default nextConfig;
