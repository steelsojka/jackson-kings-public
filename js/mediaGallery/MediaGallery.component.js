var RequestStatus = require('../common').RequestStatus;
var InstagramService = require('../InstagramService');
var template = require('./MediaGallery.html');

module.exports = {
  template: template,
  data: function() {
    return {
      mediaItems: [],
      requestStatus: RequestStatus.PENDING
    };
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