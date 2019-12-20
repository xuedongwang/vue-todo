const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildDirname = 'dist';

const config = {
  mode: 'production',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.join(__dirname, `../${buildDirname}`),
    filename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src')
    },
    extensions: ['.vue', '.js', '.jsx', '.json', '.scss']
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization:{
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
    splitChunks:{
      chunks: 'all',
    },
  },
  performance: {
    hints: false
  },
  stats:{
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
};

module.exports = config;