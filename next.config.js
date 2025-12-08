// // @type {import('next').NextConfig}
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const nextConfig = {
//   reactStrictMode: true,
//    turbopack: {
//     root: './Desktop/Full Stack/TaaS-Grid/front-end',
//   },
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "plus.unsplash.com" },
//       { protocol: "https", hostname: "images.pexels.com" },
//       { protocol: "https", hostname: "media.istockphoto.com" },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:3001/api/:path*', // proxy to Express
//       },
//     ];
//   },
// };

// module.exports = withBundleAnalyzer(nextConfig);


const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname), // THIS ensures an absolute path
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // proxy to Express
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
