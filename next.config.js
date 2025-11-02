/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for static hosting
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
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
