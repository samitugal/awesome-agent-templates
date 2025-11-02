/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages hosting
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
    domains: ['github.com', 'raw.githubusercontent.com']
  },
  // GitHub Pages settings
  assetPrefix: process.env.NODE_ENV === 'production' ? '/awesome-agent-templates' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/awesome-agent-templates' : '',
  // Compress output
  compress: true,
  // Generate unique build ID
  generateBuildId: async () => {
    return 'awesome-agent-templates-' + Date.now()
  }
}

module.exports = nextConfig
