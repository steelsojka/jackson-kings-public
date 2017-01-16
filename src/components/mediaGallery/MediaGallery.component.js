var RequestStatus = require('../../common').RequestStatus;
var InstagramService = require('../../utils').InstagramService;
var template = require('./MediaGallery.html');
var LazyImageComponent = require('../lazyImage').LazyImageComponent;

require('./MediaGallery.css');

module.exports = {
  template: template,
  components: {
    JkLazyImage: LazyImageComponent  
  },
  data: function() {
    return {
      mediaItems: [],
      requestStatus: RequestStatus.PENDING
    };
  },
  methods: {
    getMediaURL: function(item) {
      switch (item.type) {
        case 'video':
          return item.videos.low_resolution.url;
        default:
          return item.images.low_resolution.url;
      }
    }  
  },
  mounted: function() {
    var self = this;
    
    return InstagramService.getMedia()
      .then(function(items) { 
        self.mediaItems = items; 
        self.requestStatus = RequestStatus.SUCCESS;
      })
      .catch(function(meta) {
        self.requestStatus = RequestStatus.FAILED;
      });
  }
};