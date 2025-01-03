import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co/**',
        port: '',
        search: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
}

export default nextConfig
