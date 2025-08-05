/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Experimental performance features
  experimental: {
    scrollRestoration: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['404studios.com', 'www.404studios.com'],
  },
  // Fix webpack hash function issues with PNPM builds
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fix for webpack hash function compatibility with Node.js and PNPM
    if (config.output) {
      config.output.hashFunction = "xxhash64" // For webpack 5.54.0+
    }

    // Additional PNPM compatibility fixes
    if (!dev && !isServer) {
      // Ensure proper module resolution for PNPM's symlink structure
      config.resolve.modules = config.resolve.modules || []
      config.resolve.modules.push("node_modules")
      
      // Performance optimizations for production
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
        usedExports: true,
        concatenateModules: true,
      }
      
      // Minimize bundle size - remove require() which doesn't work in ES modules
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': './src',
      }
    }
    
    // Add performance plugins
    if (!dev) {
      // Tree shaking improvements
      config.optimization.providedExports = true
      config.optimization.usedExports = true
      
      // Reduce bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }

    return config
  },
}

export default nextConfig
