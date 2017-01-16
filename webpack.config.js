var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?url=false')
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
  ]
};