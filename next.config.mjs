/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://api.404studios.com",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  },
  
  // Experimental performance features
  experimental: {
    scrollRestoration: true,
    reactCompiler: true,
    serverComponentsHmrCache: true,
    preloadEntriesOnStart: false, // Reduce memory usage
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
