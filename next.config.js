const withOptimizedImages = require('next-optimized-images');
require('dotenv').config();

module.exports = withOptimizedImages({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
