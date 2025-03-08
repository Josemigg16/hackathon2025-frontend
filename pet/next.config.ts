import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/pet/create",
        destination: "https://hackaton.corpoeureka.net/pet/create",
      },
      {
        source: '/api/pet/play',
        destination: 'https://hackaton.corpoeureka.net/pet/play'
      },
      {
        source: '/api/pet/feed',
        destination: 'https://hackaton.corpoeureka.net/pet/feed'
      },
      {
        source: '/api/pet/train',
        destination: 'https://hackaton.corpoeureka.net/pet/train'
      },
      {
        source: '/api/pet/pet',
        destination: 'https://hackaton.corpoeureka.net/pet/pet'
      },
      {
        source: '/api/pet/scold',
        destination: 'https://hackaton.corpoeureka.net/pet/scold'
      },
      {
        source: '/api/pet/rest',
        destination: 'https://hackaton.corpoeureka.net/pet/rest'
      }
    ]
  },
}

export default nextConfig
