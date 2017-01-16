var debounce = require('lodash/debounce');

var template = require('./LazyImage.html');
var ImageStatus = require('./common').ImageStatus;

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
      status: ImageStatus.WAITING,
      styles: {
        height: this.height + 'px',
        width: this.width + 'px'
      }
    };
  },
  computed: {
    resolved: function() {
      return this.status === ImageStatus.LOADED;
    },
    waiting: function() {
      return this.status === ImageStatus.WAITING;
    },
    pending: function() {
      return this.status === ImageStatus.PENDING;
    }
  },
  methods: {
    onLoaded: function() {
      this.status = ImageStatus.LOADED;
      this.styles = {};
    }
  },
  mounted: function() {
    var handler = debounce(function() {
      var dimensions = this.$el.getBoundingClientRect();
      var windowBottom = window.pageYOffset + window.innerHeight;
      var top = (dimensions.top + window.pageYOffset) - this.threshold;
      
      if (top <= windowBottom) {
        this.status = ImageStatus.PENDING;
        window.removeEventListener('scroll', handler, false);
      }
    }.bind(this), 100);
    
    window.addEventListener('scroll', handler, false);
    handler();
  }
};