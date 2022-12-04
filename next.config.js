const bundleAnalyzer = require('@next/bundle-analyzer')
const withPWA = require('next-pwa')

const pkg = require('./package.json')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const baseConfig = withBundleAnalyzer({
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'github.githubassets.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        BASE_URL: JSON.stringify(process.env.NEXT_PUBLIC_BASE_URL),
        BASE_IMAGE_URL: JSON.stringify(process.env.NEXT_PUBLIC_BASE_IMAGE_URL),
        IMAGE_FALLBACK: JSON.stringify(process.env.NEXT_PUBLIC_IMAGE_FALLBACK),
        GITHUB_URL: JSON.stringify(pkg.homepage),
      })
    )

    return config
  },
})

module.exports = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  buildExcludes: [/fonts\/.*$/],
  clientsClaim: true,
  skipWaiting: true,
})(baseConfig)
