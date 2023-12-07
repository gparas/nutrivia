/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  transpilePackages: ['@mui/x-charts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dc1qw84yo/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
