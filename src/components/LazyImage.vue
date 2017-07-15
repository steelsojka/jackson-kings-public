<script>
import debounce from 'lodash/debounce';

const ImageStatus = {
  WAITING: 'WAITING',
  PENDING: 'PENDING',
  LOADED: 'LOADED'
};

export default {
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
    },
    type: {
      type: String,
      default: 'image'
    },
    poster: {
      type: String
    }
  },
  data() {
    return {
      status: ImageStatus.WAITING,
      confirmed: false,
      styles: {
        height: this.height + 'px',
        width: this.width + 'px'
      }
    };
  },
  computed: {
    resolved() {
      return this.status === ImageStatus.LOADED;
    },
    waiting() {
      return this.status === ImageStatus.WAITING;
    },
    pending() {
      return this.status === ImageStatus.PENDING;
    }
  },
  methods: {
    onLoaded() {
      this.status = ImageStatus.LOADED;
      this.styles = {};
    },
    onClick() {
      this.confirmed = true;
    }
  },
  mounted() {
    var handler = debounce(() => {
      const dimensions = this.$el.getBoundingClientRect();
      const windowBottom = window.pageYOffset + window.innerHeight;
      const top = (dimensions.top + window.pageYOffset) - this.threshold;
      
      if (top <= windowBottom) {
        switch (this.type) {
          case 'image':
            this.status = ImageStatus.PENDING;
            this.confirmed = true;
            break;
          case 'video':
            this.status = ImageStatus.LOADED;
            break;
        }
        
        window.removeEventListener('scroll', handler, false);
        window.removeEventListener('resize', handler, false);
      }
    }, 100);
    
    window.addEventListener('scroll', handler, false);
    window.addEventListener('resize', handler, false);
    handler();
  }
};
</script>

<template>
<div class="jk-lazy-image" :style="styles">
  <div class="jk-lazy-image__loader" v-if="waiting || pending" :style="styles">
    <div class="fa fa-spin fa-spinner"></div>
  </div>
  <img v-if="type === 'image' && (pending || resolved)" :src="src" @load="onLoaded"/>
  <div class="relative" v-if="type === 'video' && resolved">
    <div v-if="!confirmed">
      <img class="jk-lazy-image__poster" :src="poster" />
      <div class="jk-lazy-image__video-play"
        title="Play video." 
        @click.prevent="onClick">
        <span class="fa fa-play"></span>  
      </div>
    </div>
    <video 
      class="jk-lazy-image__video"
      v-if="confirmed"
      :height="height"
      :width="width"
      :src="src"
      @load="onLoaded"
      autoplay
      controls>
    </video>
  </div>
</div>
</template>

<style>
.jk-lazy-image {
  position: relative;
  display: flex;
}

.jk-lazy-image__loader {
  display: flex;
  position: absolute;
  z-index: 5;
  font-size: 36px !important;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
}

.jk-lazy-image__poster,
.jk-lazy-image__video {
  padding-right: 10px;
}

.jk-lazy-image__video-play {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: -5px;
  cursor: pointer;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.4);
}

.jk-lazy-image__video-play span {
  transition: transform 0.15s ease-in;
  transform: scale(1);
}

.jk-lazy-image__video-play:hover span {
  transform: scale(1.5);
}
</style>
