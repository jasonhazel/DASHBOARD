<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='slider'>
      <VSlideItem v-for="episode in calendar" :key="episode.id" >
        <VTooltip right>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" v-on:click.prevent="openTo(episode.url)" target="_blank">
              <VAvatar size='40' class="mr-3" >
                <VImg :src="episode.poster"  />
              </VAvatar>
            </a>
          </template>
          <div><strong>{{ episode.shortAirDate }}</strong></div>
          <div>{{ episode.seriesTitle }}</div>
          <div>{{ episode.title }} ({{ episode.number }})</div>
        </VTooltip>
      </VSlideItem>
    </VSlideGroup>
  </div>
</template>

<script>
export default {
  methods: {
  },
  props: {
    calendar: Array,
    opened: Boolean
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