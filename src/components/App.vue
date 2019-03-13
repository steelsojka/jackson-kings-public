<script>
import MediaGalleryComponent from './MediaGallery.vue';
import SoundCloudPlayerComponent from './SoundCloudPlayer.vue';
import EventScheduleComponent from './EventSchedule.vue';

export default {
  components: {
    JkMediaGallery: MediaGalleryComponent,
    JkSoundCloudPlayer: SoundCloudPlayerComponent,
    JkEventSchedule: EventScheduleComponent
  }
}
</script>


<template>
<div class="container">
  <div id="music" class="jk-app__title">Music</div>
  <div>
    <iframe width="100%" height="480" src="https://www.youtube.com/embed/bSpq5XtyS5Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div class="content-player">
    <jk-sound-cloud-player></jk-sound-cloud-player>
  </div>
  <div id="events" class="jk-app__title">Events</div>
  <div>
    <jk-event-schedule></jk-event-schedule>
  </div>
  <div id="media" class="jk-app__title">Media</div>
  <div>
    <jk-media-gallery></jk-media-gallery>
  </div>
</div>
</template>
