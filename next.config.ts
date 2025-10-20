/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
