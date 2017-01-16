var argv = require('yargs').argv;
var config = require('../webpack.config')(argv);
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  inline: true,
  hot: true,
  compress: true,
  stats: {
    colors: true
  }
});

server.listen(8080);