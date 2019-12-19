const path = require('path');
const webpack = require('webpack');
const notifier = require('node-notifier');
const portfinder = require('portfinder');
const chalk = require('chalk');
const internalIp = require('internal-ip');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildDirname = 'dist';

const config = {
  mode: 'development',
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
          'vue-style-loader',
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
  devServer: {
    host: '0.0.0.0',
    hot: true,
    progress: true,
    historyApiFallback: true,
    quiet: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

const getWebpackConfig = async () => {
  try {
    const port = await portfinder.getPortPromise();
    config.devServer.port = port
    config.plugins.push(new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`\nYou application is running:\n`,`${chalk.cyan('http://localhost:' + port)}`, `${chalk.cyan('http://'+internalIp.v4.sync())}`],
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: '编译失败（build err）',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: path.join(__dirname, './error_icon.png')
        });
      }
    }));
    return config;
  } catch (err) {
    throw err;
  }
}

module.exports = getWebpackConfig;