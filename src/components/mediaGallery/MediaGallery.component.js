var RequestStatus = require('../../common').RequestStatus;
var InstagramService = require('../../utils').InstagramService;
var template = require('./MediaGallery.html');
var LazyImageComponent = require('../lazyImage').LazyImageComponent;

require('./MediaGallery.css');

module.exports = {
  template: template,
  props: {
    chunkSize: {
      default: 6,
      type: Number
    }
  },
  components: {
    JkLazyImage: LazyImageComponent  
  },
  data: function() {
    return {
      activeItems: [],
      mediaItems: [],
      requestStatus: RequestStatus.PENDING
    };
  },
  computed: {
    hasMore: function() {
      return Boolean(this.mediaItems.length);
    }
  },
  methods: {
    getMediaURL: function(item) {
      switch (item.type) {
        case 'video':
          return item.videos.low_resolution.url;
        default:
          return item.images.low_resolution.url;
      }
    },
    loadMore: function() {
      var limit = Math.min(this.chunkSize, this.mediaItems.length);

      for (var i = 0; i < limit; i++) {
        this.activeItems.push(this.mediaItems.shift());
      }
    }
  },
  mounted: function() {
    var self = this;
    
    return InstagramService.getMedia()
      .then(function(items) { 
        self.mediaItems = items; 
        self.requestStatus = RequestStatus.SUCCESS;
        self.loadMore();
      })
      .catch(function(meta) {
        self.requestStatus = RequestStatus.FAILED;
      });
  }
};