var fs = require('fs');
var path = require('path');

var links = require(path.resolve(__dirname, '../link-pages.json'));

links.forEach(function(link) {
  var filePath = path.resolve(__dirname, '../dist/' + link.filename + '.html');
  var content = fs.readFileSync(filePath);

  fs.writeFileSync(
    filePath,
    '---\npermalink: ' + link.permalink + '\n---\n' + content
  );
});
