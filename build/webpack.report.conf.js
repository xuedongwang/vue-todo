const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const buildConfig = require('./webpack.prod.conf');


const config = merge(buildConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});

module.exports = config;