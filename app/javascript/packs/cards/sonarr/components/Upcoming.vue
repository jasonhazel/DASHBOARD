<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='slider'>
      <template v-for="episode in calendar"> 
        <VSlideItem  :key="episode.id">
          <Episode :episode='episode' v-on='$listeners'>
            <div><strong>{{ formatDate(episode.date, 'MMMM do K:mmaaaaa') }}</strong></div>
            <div>{{ episode.series }}</div>
            <div>{{ episode.title }} ({{ episode.number }})</div>
          </Episode>
        </VSlideItem>
      </template>
    </VSlideGroup>
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
    calendar: Array,
    opened: Boolean
  },
  methods: {
  },
  watch: {
    opened(val) {
      if (val) {
        this.$refs.slider.setWidths()
      }
    }
  }
}
</script>