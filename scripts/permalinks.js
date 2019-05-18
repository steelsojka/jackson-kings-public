var fs = require('fs');
var path = require('path');

var links = require(path.resolve(__dirname, '../permalinks.json'));

Object.keys(links).forEach(function(filename) {
  var filePath = path.resolve(__dirname, '../dist/' + filename);
  var content = fs.readFileSync(filePath);

  fs.writeFileSync(
    filePath,
    '---\npermalink: ' + links[filename] + '\n---\n' + content
  );
});
