(function(JK) {
  JK.InstagramService = {
    // This really shouldn't be stored here, but it's sandboxed and anybody can't really do much with it.
    accessToken: '202391883.a7b08ff.aa0c792905fd48edaa64f307f0ceef7b',
    apiUrl: 'https://api.instagram.com/v1',
    makeRequest: function(path) {
      return JK.LoadJSONP(this.apiUrl + path + '?access_token=' + this.accessToken)
        .then(function(data) {
          return data.data; 
        });
    },
    getMedia: function() {
      return this.makeRequest('/users/self/media/recent');
    }
  };
  
  // Run when the document is ready for modification.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

  Vue.component('jk-media-gallery', {
    template: '#media-gallery-template',
    data: function() {
      return {
        mediaItems: []    
      };
    },
    mounted: function() {
      return JK.InstagramService.getMedia()
        .then(function(items) { 
          this.mediaItems = items; 
        }.bind(this));
    }
  });

  // Main function executed on DOM loaded.
  function onDOMContentLoaded() {
    new Vue({
      el: 'footer',
      data: function() {
        return {
          copyrightYear: (new Date()).getFullYear()
        };
      }
    });

    new Vue({
      el: '#app'
    });
  }
}(this.JK));

// Load data through JSONP... I know...
(function(JK, global) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var scriptNode = document.createElement('script');
  var uuid = 0;

  scriptNode.type = 'text/javascript';
  
  function LoadJSONP(url) {
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
  }
  
  JK.LoadJSONP = LoadJSONP;
})(this.JK, this);
