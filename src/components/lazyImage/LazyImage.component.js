var debounce = require('lodash/debounce');

var template = require('./LazyImage.html');
var RequestStatus = require('../../common').RequestStatus;

require('./LazyImage.css');

module.exports = {
  template: template,
  props: {
    height: {
      default: 250,
      type: Number
    },
    width: {
      default: 250,
      type: Number
    },
    src: {
      required: true,
      type: String
    },
    threshold: {
      default: 100,
      type: Number
    }
  },
  data: function() {
    return {
      status: RequestStatus.PENDING
    };
  },
  computed: {
    resolved: function() {
      return this.status === RequestStatus.SUCCESS;
    },
    resolving: function() {
      return this.status === RequestStatus.PENDING;
    }
  },
  mounted: function() {
    var handler = debounce(function() {
      var dimensions = this.$el.getBoundingClientRect();
      var windowBottom = window.pageYOffset + window.innerHeight;
      var top = (dimensions.top + window.pageYOffset) - this.threshold;
      
      if (top <= windowBottom) {
        this.status = RequestStatus.SUCCESS;
        window.removeEventListener('scroll', handler, false);
      }
    }.bind(this), 100);
    
    window.addEventListener('scroll', handler, false);
    handler();
  }
};