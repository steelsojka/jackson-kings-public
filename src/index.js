import Vue from 'vue';

import { AppComponent } from './components';
import Promise from 'promise-polyfill';

require('./assets');
require('./css');
require('./CNAME');
require('./favicon');

if (!window.Promise) {
  window.Promise = Promise;
}

if (!window.__IS_SONG_PAGE__) {
  const root = new Vue({
    components: {
      JkApp: AppComponent
    },
    render(h) {
      return h('jk-app');
    }
  });

  // Run when the document is ready for modification.
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

  // Main function executed on DOM loaded.
  function onDOMContentLoaded() {
    root.$mount('#app');
  }
}
