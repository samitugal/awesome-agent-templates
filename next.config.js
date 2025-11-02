/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles deployment automatically, no need for static export
  // output: 'export', // Disabled for Vercel deployment
  trailingSlash: false,
  images: {
    // unoptimized: true, // Let Vercel handle image optimization
    domains: ['github.com', 'raw.githubusercontent.com']
  },
  // Vercel deployment settings
  assetPrefix: '',
  basePath: '',
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to build issues
  },
  // Compress output
  compress: true,
  // Generate sitemap and robots.txt
  generateBuildId: async () => {
    return 'awesome-agent-templates-' + Date.now()
  }
}

module.exports = nextConfig
