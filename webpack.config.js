var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [
      'promise-polyfill'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
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
      loader: 'file?name=assets/[name].[ext]'
    }, {
      test: /fonts\/.*\.(otf|eot|ttf|svg|woff|woff2)/,
      loader: 'file?name=fonts/[name].[ext]'
    }]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue'
    }
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new HTMLWebpackPlugin({
      template: './src/index.ejs'
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};