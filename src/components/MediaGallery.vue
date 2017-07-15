<script>
import { RequestStatus } from '../common';
import { InstagramService } from '../utils';
import LazyImageComponent from './LazyImage.vue';

export default {
  props: {
    chunkSize: {
      default: 6,
      type: Number
    }
  },
  components: {
    JkLazyImage: LazyImageComponent  
  },
  data() {
    return {
      activeItems: [],
      mediaItems: [],
      requestStatus: RequestStatus.PENDING
    };
  },
  computed: {
    hasMore() {
      return Boolean(this.mediaItems.length);
    }
  },
  methods: {
    getMediaURL(item) {
      switch (item.type) {
        case 'video':
          return item.videos.low_resolution.url;
        default:
          return item.images.low_resolution.url;
      }
    },
    loadMore() {
      const limit = Math.min(this.chunkSize, this.mediaItems.length);

      for (var i = 0; i < limit; i++) {
        this.activeItems.push(this.mediaItems.shift());
      }
    }
  },
  mounted() {
    return InstagramService.getMedia()
      .then(items => { 
        this.mediaItems = items; 
        this.requestStatus = RequestStatus.SUCCESS;
        this.loadMore();
      })
      .catch(meta => {
        this.requestStatus = RequestStatus.FAILED;
      });
  }
};
</script>

<template>
<div class="jk-media-gallery">
  <div class="jk-media-gallery__container">
    <div class="jk-media-gallery__item" 
      :key="item.id"
      v-for="item of activeItems"
      :style="{ width: item.images.low_resolution.width + 'px' }">
      <jk-lazy-image 
        :height="item.images.low_resolution.height" 
        :width="item.images.low_resolution.width" 
        :src="getMediaURL(item)"
        :poster="item.images.low_resolution.url"
        :type="item.type">
      </jk-lazy-image>
      <div>
        <span v-if="item.caption">{{ item.caption.text }}</span>
      </div>
    </div>
  </div>
  <div class="jk-media-gallery__load-more"
    v-if="hasMore"
    @click="loadMore">More</div>
</div>
</template>


<style>
.jk-media-gallery {
  display: flex;
  flex-direction: column;
}

.jk-media-gallery__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.jk-media-gallery__item {
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.75);
  margin-bottom: 5px;
  position: relative;
}

.jk-media-gallery__item img {
  width: 100%;
  height: 100%;
}

.jk-media-gallery__load-more {
  text-align: center;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.85);
  width: 250px;
  margin-top: 10px;
  align-self: center;
  font-weight: bold;
  font-family: "Code Bold";
  cursor: pointer;
}

@media (max-width: 1200px) {
  .jk-media-gallery__container {
    justify-content: space-around;
  }
}

@media (max-width: 800px) {
  .jk-media-gallery__load-more {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
