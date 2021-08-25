<template>
  <div>
    <div v-if="short">
      <template v-for="episode in queue"> 
        <Episode :key="episode.id" :episode='episode' v-on='$listeners' :size='32'>       
          <div><strong>{{ episode.series }}</strong></div>
          <div>{{ episode.title }} ({{ episode.number }})</div>
          <div>{{ episode.downloaded }}%</div>
        </Episode>
      </template>
    </div>
    <div v-else-if="queue.length > 0">
      <VSubheader>Downloading</VSubheader>
      <VSlideGroup show-arrows='always' ref='slider'>

        <template v-for="episode in queue"> 
          <VSlideItem  :key="episode.id">
            <Episode :episode='episode' v-on='$listeners'>
              <div><strong>{{ episode.series }}</strong></div>
              <div>{{ episode.title }} ({{ episode.number }})</div>
              <div>{{ episode.downloaded }}%</div>
            </Episode>
          </VSlideItem>
        </template>
      </VSlideGroup>
    </div>
  </div>
</template>

<script>
import Episode from './Episode.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Episode
  },
  props: {
    queue: Array,
    opened: Boolean,
    short: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
  watch: {
    opened(val) {
      if (this.$refs.slider && val) {
        this.$refs.slider.setWidths()
      }
    }
  }
}
</script>