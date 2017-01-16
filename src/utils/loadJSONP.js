var head = document.head || document.getElementsByTagName('head')[0];
var scriptNode = document.createElement('script');
var uuid = 0;

scriptNode.type = 'text/javascript';

module.exports = function loadJSONP(url) {
  return new Promise(function(resolve) {
    var name = '__jsonp' + uuid++;

    url += '&callback=' + name;

    var script = scriptNode.cloneNode();
    script.src = url;

    global[name] = function(data) {
      resolve(data);
      head.removeChild(script);
      script = null;
      delete global[name];
    }

    head.appendChild(script);
  });
};