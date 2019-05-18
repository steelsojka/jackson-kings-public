var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var sites = require('../link-pages.json');

var template = fs.readFileSync(path.resolve(__dirname, '../link-page.html'));

sites.forEach(function(site) {
  var content = _.template(template, {
    interpolate: /{{=([\s\S]+?)}}/g,
    evaluate: /{{([\s\S]+?)}}/g
  })(site);

  fs.writeFileSync(
    path.resolve(__dirname, '../src', site.filename + '.ejs'),
    content
  );
});
