var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = function(argv) {
  var config = {
    entry: {
      app: './src/index.js',
      vendor: [
        'promise-polyfill',
        'vue',
        'lodash/debounce'
      ]
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].[hash].js'
    },
    module: {
      loaders: [{
        test: /\.html$/,
        loader: 'html'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /assets\/.*\.(jpg|svg)/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      }, {
        test: /fonts\/.*\.(otf|eot|ttf|svg|woff|woff2)/,
        loader: 'file?name=fonts/[name].[hash].[ext]'
      }, {
        test: /CNAME/,
        loader: 'file?name=[name]'
      }]
    },
    resolve: {
      alias: {
        'vue': 'vue/dist/vue'
      }
    },
    plugins: [
      new ExtractTextPlugin('app.[hash].css'),
      new HTMLWebpackPlugin({
        template: './src/index.ejs'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })
    ]
  };

  if (argv.production) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    )
  }

  return config;
};
