/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a-us.storyblok.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stage.images.kglobalservices.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;