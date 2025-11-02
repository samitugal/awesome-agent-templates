/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify hosting
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
    domains: ['github.com', 'raw.githubusercontent.com']
  },
  // Static hosting settings
  assetPrefix: '',
  basePath: '',
  // Compress output
  compress: true,
  // Generate unique build ID
  generateBuildId: async () => {
    return 'awesome-agent-templates-' + Date.now()
  }
}

module.exports = nextConfig
