<script>
import dateformat from 'dateformat';

const { events } = require('../data.json');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const EVENT_LIMIT = Date.now() - ONE_DAY_MS;

export default {
  data() {
    return {
      events: events
        .map(event => {
          event.date = new Date(event.date);

          return event;
        })
        .filter(event => event.date.getTime() >= EVENT_LIMIT)
        .sort((a, b) => a.date.getTime() > b.date.getTime())
    };
  },
  methods: {
    formatEventDate(date) {
      return dateformat(date, 'dddd, mmmm dS, yyyy');
    }
  }
};
</script>

<template>
<div class="jk-event-schedule">
	<div class="jk-event-schedule__event" v-bind:key="event.headline" v-for="event of events">
		<div class="jk-event-schedule__date">{{ formatEventDate(event.date) }}</div>
		<div class="jk-event-schedule__location">{{ event.location.name }}</div>
		<div class="jk-event-schedule__headline">{{ event.headline }}</div>
		<div>
			<span>With: {{ event.artists.join(', ') }}</span>
		</div>
		<div v-if="event.description" class="jk-event-schedule__description">{{ event.description }}</div>
		<div>Doors: {{ event.doorTime }}, Show: {{ event.startTime }}, {{ event.ages }}</div>
		<div v-if="event.cover">${{ event.cover.toFixed(2) }} Cover</div>
	</div>
</div>
</template>

<style>
.jk-event-schedule__date {
  font-size: 20px;
  font-weight: bold;
}

.jk-event-schedule__event {
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.75);
}

.jk-event-schedule__event:not(:first-child) {
  margin-top: 10px;
}
</style>