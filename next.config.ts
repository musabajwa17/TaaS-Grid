/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // ✅ use the actual image CDN domain
      },
    ],
  },
};

export default nextConfig;
