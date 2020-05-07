require('dotenv').config();

module.exports = {
  env: {
    MAIL_ADDRESS: process.env.MAIL_ADDRESS,
    MAIL_PW: process.env.MAIL_PW,
  },
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
  serverRuntimeConfig: {
    // Will only be available on the server side
    MAIL_ADDRESS: process.env.MAIL_ADDRESS,
    MAIL_PW: process.env.MAIL_PW,
  },
  publicRuntimeConfig: {
    RECIPIENT_MAIL: process.env.RECIPIENT_MAIL,
  },
};
