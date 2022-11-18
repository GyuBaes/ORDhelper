/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: [
      'http://next-js-ord-helper.s3-website.ap-northeast-2.amazonaws.com/',
    ],
    // path: ['http://nextord.s3-website-us-east-1.amazonaws.com/'],
    domains: [
      // 'http://nextord.s3-website-us-east-1.amazonaws.com/',
      'http://next-js-ord-helper.s3-website.ap-northeast-2.amazonaws.com/',
      '*',
      's3.amazonaws.com',
      'localhost:3000',
    ],
  },
};

module.exports = nextConfig;
