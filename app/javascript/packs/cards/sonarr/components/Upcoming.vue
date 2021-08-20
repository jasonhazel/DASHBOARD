<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='slider'>
      <template v-for="episode in calendar"> 
        <VSlideItem v-if="!episode.downloaded" :key="episode.id" >
          <Episode :calendar='episode' v-on='$listeners' />
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