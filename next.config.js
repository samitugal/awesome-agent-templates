/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for deployment
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
    domains: ['github.com', 'raw.githubusercontent.com']
  },
  // Vercel deployment settings
  assetPrefix: '',
  basePath: '',
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  // Compress output
  compress: true,
  // Generate sitemap and robots.txt
  generateBuildId: async () => {
    return 'awesome-agent-templates-' + Date.now()
  }
}

module.exports = nextConfig
