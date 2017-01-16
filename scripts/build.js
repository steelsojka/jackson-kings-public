var argv = require('yargs').argv;
var config = require('../webpack.config')(argv);
var webpack = require('webpack');

webpack(config, function(err, stats) {
  if (err) {
    throw err;
  }
});