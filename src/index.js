import Vue from 'vue';

import AppComponent from './components';

require('./assets');
require('./css');
require('./CNAME');
require('./favicon');

// Run when the document is ready for modification.
document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

// Main function executed on DOM loaded.
function onDOMContentLoaded() {
  new Vue({
    components: {
      JkApp: AppComponent
    },
    el: '#app',
    render(h) {
      return h('jk-app');
    }
  });
}
