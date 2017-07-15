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
  <div class="jk-app__title">Music</div>
  <div class="content-player">
    <jk-sound-cloud-player></jk-sound-cloud-player>
  </div>
  <div class="jk-app__title">Events</div>
  <div>
    <jk-event-schedule></jk-event-schedule>
  </div>
  <div class="jk-app__title">Media</div>
  <div>
    <jk-media-gallery></jk-media-gallery>
  </div>
</div>
</template>
