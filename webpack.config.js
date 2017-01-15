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
      loader: 'style-loader!css-loader'
    }]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue'
    }
  }
};