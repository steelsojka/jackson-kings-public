(function(JK) {
  // Run when the document is ready for modification.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

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
      el: '#app',
      components: {
        JkMediaGallery: JK.MediaGalleryComponent
      }
    });
  }
}(this.JK));

// Instagram Service
(function(JK) {
  JK.InstagramService = {
    // This really shouldn't be stored here, but it's sandboxed and anybody can't really do much with it.
    accessToken: '202391883.a7b08ff.aa0c792905fd48edaa64f307f0ceef7b',
    apiUrl: 'https://api.instagram.com/v1',
    makeRequest: function(path) {
      return JK.LoadJSONP(this.apiUrl + path + '?access_token=' + this.accessToken)
        .then(function(res) {
          if (res.meta.code >= 200 || res.meta.code < 400) {
            return res.data; 
          }

          return Promise.reject(res.meta);
        });
    },
    getMedia: function() {
      return this.makeRequest('/users/self/media/recent');
    }
  };
})(this.JK);

(function(JK) {
  JK.RequestStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
  };
})(this.JK);

// Media Component
(function(JK) {
  JK.MediaGalleryComponent = {
    template: '#media-gallery-template',
    data: function() {
      return {
        mediaItems: [],
        requestStatus: JK.RequestStatus.PENDING
      };
    },
    mounted: function() {
      var self = this;
      
      return JK.InstagramService.getMedia()
        .then(function(items) { 
          self.mediaItems = items; 
          self.requestStatus = JK.RequestStatus.SUCCESS;
        })
        .catch(function(meta) {
          self.requestStatus = JK.RequestStatus.FAILED;
        });
    }
  };
})(this.JK);

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
