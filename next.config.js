/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['contract.cam.eclo.io'],
  }
}

module.exports = nextConfig
