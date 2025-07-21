/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
    }

    return config
  },
}

export default nextConfig
