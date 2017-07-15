const head = document.head || document.getElementsByTagName('head')[0];
const scriptNode = document.createElement('script');
let uuid = 0;

scriptNode.type = 'text/javascript';

export function loadJSONP(url) {
  return new Promise(resolve => {
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