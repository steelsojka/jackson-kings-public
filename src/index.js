var MediaGalleryComponent = require('./components').MediaGalleryComponent;
var Vue = require('vue');

require('./assets');
require('./css');
require('./CNAME');

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
      JkMediaGallery: MediaGalleryComponent
    }
  });
}
