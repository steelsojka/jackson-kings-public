module.exports = {
  entry: {
    app: './js/index.js',
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
    }]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue'
    }
  }
};