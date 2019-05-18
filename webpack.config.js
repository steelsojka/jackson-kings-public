var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = function(argv) {
  var config = {
    entry: {
      app: './src/index.js',
      vendor: ['promise-polyfill', 'vue', 'lodash/debounce']
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].[hash].js'
    },
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loader: 'html?minimize=' + Boolean(argv.poduction)
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
          test: /assets\/.*\.(jpg|svg|png)/,
          loaders: ['file?name=assets/[name].[hash].[ext]', 'image-webpack']
        },
        {
          test: /fonts\/.*\.(otf|eot|ttf|svg|woff|woff2)/,
          loader: 'file?name=fonts/[name].[hash].[ext]'
        },
        {
          test: /CNAME/,
          loader: 'file?name=[name]'
        },
        {
          test: /favicon\/.*\.(png|svg|json|xml|ico)$/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test: /\.json$/,
          exclude: /manifest.json$/,
          loader: 'json-loader'
        },
        {
          test: /mainfest.json$/,
          loader: 'file?name=[name]'
        }
      ]
    },
    resolve: {
      alias: {
        vue: argv.production
          ? 'vue/dist/vue.runtime.min'
          : 'vue/dist/vue.runtime.common'
      }
    },
    plugins: [
      new ExtractTextPlugin('app.[hash].css'),
      new HTMLWebpackPlugin({
        copyrightYear: new Date().getFullYear(),
        template: './src/index.ejs',
        minify: !argv.production
          ? false
          : {
              collapseWhitespace: true
            }
      }),
      new HTMLWebpackPlugin({
        template: './src/saveme.ejs',
        filename: 'saveme.html',
        minify: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.BannerPlugin(
        'Copyright 2016-2017 Jackson Kings. All rights reserved.',
        {
          entryOnly: true
        }
      )
    ],
    imageWebpackLoader: {
      mozjpeg: {
        quality: 90
      }
    }
  };

  if (argv.production) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production'
        }
      })
    );
  }

  return config;
};
