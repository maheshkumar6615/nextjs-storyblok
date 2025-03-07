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
  
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'https://nextjs-storyblok-red.vercel.app', 
          },
        ],
        destination: '/morning-star/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'nextjs-storyblok-git-develop-maheshs-projects-2bf9f744.vercel.app', 
          },
        ],
        destination: '/eggos/:path*',
      },
    ];
  },
};

export default nextConfig;