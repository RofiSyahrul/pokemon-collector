const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
        esModule: false,
      },
    })
    return config
  },
})
