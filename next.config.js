module.exports = {
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
            value: 'nextjs-storyblok-red.vercel.app',
          },
        ],
        destination: '/morning-star/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'nextjs-storyblok-naphngp31-maheshs-projects-2bf9f744.vercel.app',
          },
        ],
        destination: '/eggos/:path*',
      },
    ];
  },
};