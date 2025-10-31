/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ne pas ignorer les erreurs TypeScript en production
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['localhost'],
  },
  serverExternalPackages: ['@prisma/client'],
}

export default nextConfig
