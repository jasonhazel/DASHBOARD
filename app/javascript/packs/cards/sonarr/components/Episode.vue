<template>
  <VTooltip right>
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on" v-on:click.prevent="$emit('click', url)" target="_blank">
        <VProgressCircular 
          class="mr-3" 
          v-bind="attrs" 
          v-on="on"
          :size='40' 
          :rotate="-90"           
          :value='downloaded' 
          color='green'
        >
          <VAvatar size='34' >
            <VImg :src="poster"  />
          </VAvatar>
        </VProgressCircular>
      </a>
    </template>
    
    <div v-if='calendar'>
      <div><strong>{{ airDate('MMMM do K:mmaaaaa') }}</strong></div>
      <div>{{ series.title }}</div>
      <div>{{ title }} ({{ number }})</div>
    </div>
    <div v-else>
      <div><strong>{{ series.title }}</strong></div>
      <div>{{ title }} ({{ number }})</div>
      <div v-if="status == 'downloading'">
        {{ etaDistance }} remaining
      </div>
      <div v-if="status == 'paused'">
        Paused
      </div>
    </div>
  </VTooltip>
</template>

<script>
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import { utcToZonedTime } from 'date-fns-tz'
export default {
  data () {
    return {
    }
  },
  props: {
    calendar: null,
    queue: null
  },
  methods: {
    image(type = 'poster') {
      return this.series.images.find(i => i.coverType == type).url
    },
    airDate(display = 'EEEE K:mmaaaaa') {
      let airDate = utcToZonedTime(new Date(this.episode.airDateUtc))
      return format(airDate, display)
    },
    
  },
  computed: {
    episode() {
      return this.calendar || this.queue.episode
    },
    series() {
      return this.episode.series || this.queue.series
    },
    downloaded() {
      return this.episode.hasFile
    },
    poster() {
      return this.image()
    },
    number() {
      return `S${this.episode.seasonNumber}E${this.episode.episodeNumber}`
    },
    title() {
      return this.episode.title
    },
    seriesName() {
      return this.series.title
    }, 
    url() {
      console.log(`series/${this.series.titleSlug}`)
      return `series/${this.series.titleSlug}`
    },
    progress() {
      return parseInt(100 - ((this.queue.sizeleft / this.queue.size) * 100))      
    },
    downloaded() {
      if (this.calendar) 
        return this.episode.hasFile ? 100 : 0
      
      return this.progress
    },
    status() {
      return this.queue.status.toLowerCase()
    },
    eta() {
      return utcToZonedTime(new Date(this.queue.estimatedCompletionTime))
    },

    etaDistance() {
      return formatDistance(this.eta, new Date())
    }    
  }
}
</script>