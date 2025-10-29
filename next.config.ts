/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // optional for Unsplash
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // ✅ Added for Pexels
      },
    ],
  },
};

export default nextConfig;
