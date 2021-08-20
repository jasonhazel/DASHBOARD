<template>
  <div>
    <VSubheader>Downloading</VSubheader>
    <VSlideGroup show-arrows='always' :center-active='true' ref='slider'>
      <VSlideItem  v-if="queue.length == 0">
        <div style="width: 100%" class='grey--text text-overline text-center'>Nothing Queued</div>
      </VSlideItem>
      <VSlideItem v-for="download in queue" :key="download.id" >
        <Episode :queue="download" v-on='$listeners'/>
      </VSlideItem>
    </VSlideGroup>
  </div>
</template>

<script>
import Episode from './Episode.vue'
export default {
  components: { Episode },
  props: { queue: Array, opened: Boolean },
  watch: {
    opened(val) {
      if (val) {
        this.$refs.slider.setWidths()
      }
    }
  },
  methods: {
    downloadColor(download) {

      switch(download.status) {
        case 'paused':
          return 'orange'
        case 'downloading':
          return 'green'
        case 'completed':
          return download.trackedStatus == 'warning' ? 'orange' : 'green'
        default:
          return 'primary'
      }
    }
  }

}
</script>