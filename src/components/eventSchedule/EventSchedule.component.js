var dateformat = require('dateformat');

var events = require('../../data.json').events;

var ONE_DAY_MS = 24 * 60 * 60 * 1000;
var EVENT_LIMIT = Date.now() - ONE_DAY_MS;

require('./EventSchedule.css');

module.exports = {
  template: require('./EventSchedule.html'),
  data: function() {
    return {
      events: events
        .map(function(event) {
          event.date = new Date(event.date);

          return event;
        })
        .filter(function(event) {
          return event.date.getTime() >= EVENT_LIMIT
        })
        .sort(function(a, b) {
          return a.date.getTime() > b.date.getTime();
        })
    };
  },
  methods: {
    formatEventDate: function(date) {
      return dateformat(date, 'dddd, mmmm dS, yyyy');
    }
  }
};