<template>
  <VCard tile color='primary' flat>
    <VCardTitle style="cursor:pointer" v-on:click='expand = !expand' class='pa-3'>
      <VBadge dot :color='onlineColor' overlap class='mr-2'>
        <VAvatar size='34'  v-on:click.stop="openTo()">
          <VImg :src="require('./icon.png')"  />
        </VAvatar>
      </VBadge>
      {{ card.name || card.application.name }}
      <VSpacer></VSpacer>

    </VCardTitle>
    <VDivider />
    <VExpandTransition>
      <VSheet v-show="expand" color='secondary'>
        <VSubheader>Upcoming</VSubheader>
        <VSlideGroup show-arrows='always' ref='upcoming'>
          <VSlideItem v-for="episode in sonarr.calendar" :key="episode.id" >
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
        <VSubheader>Downloading</VSubheader>
        <VSlideGroup show-arrows='always' :center-active='true' ref='downloading'>
          <VSlideItem  v-if="sonarr.queue.length == 0">
            <div style="width: 100%" class='grey--text text-overline text-center'>Nothing Queued</div>
          </VSlideItem>
          <VSlideItem v-for="download in sonarr.queue" :key="download.id" >
            <VTooltip right>
              <template v-slot:activator="{ on, attrs }">
                <VProgressCircular 
                  class="mr-3" 
                  v-bind="attrs" 
                  v-on="on"
                  :rotate="-90" 
                  :size='40' 
                  :value='download.progress' 
                  :color='downloadColor(download)'
                >
                  <VAvatar size='34' >
                    <VImg :src="download.poster"  />
                  </VAvatar>
                </VProgressCircular>
                
              </template>
              
              <div><strong>{{ download.seriesTitle }}</strong></div>
              <div>{{ download.episodeTitle }} ({{ download.episodeNumber }})</div>
              <div v-if="download.status == 'downloading'">
                {{ download.etaDistance }} remaining
              </div>
              <div v-if="download.status == 'paused'">
                Paused
              </div>
            </VTooltip>
          </VSlideItem>
        </VSlideGroup>
        <VCardActions>
          <VSpacer />
          <VBtn icon><VIcon>mdi-cog</VIcon></VBtn>
        </VCardActions>
      </VSheet>
    </VExpandTransition>    
  </VCard>
</template>

<script>
import { API as Sonarr } from '.'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

export default {
  props: { card: Object },
  data() {
    return {
      api:      null,
      refresh: 30000,
      expand:   false, 
      sonarr: { 
        status:   { version: null },
        calendar: [],
        queue:    []
      },
      interval: null
    }
  },
  watch: {
    // this is a hack to get the sliders to work right
    // things seem to be working at the moment without it.
    // 🤞
    // expand(val) {
    //   if (val) {
    //     this.$refs.upcoming.setWidths()
    //     this.$refs.downloading.setWidths()
    //   }
    // }
  },
  created() {
    this.api = new Sonarr(this.url, this.card.apiKey)
    this.start()    
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    start() {
      this.interval = setInterval(this.process, this.refresh)
      this.process()
    },
    process() {
      let now = new Date()

      this.api.systemStatus()
        .then(response => this.sonarr.status = response.data)

      let options = {
        start: format(now, 'yyyy-MM-dd'),
        end: format(addDays(now, 7), 'yyyy-MM-dd')
      }

      this.api.calendar(options)
        .then(response => this.sonarr.calendar = response)

      this.api.queue().then(response => this.sonarr.queue = response)
    },


    openTo(path = '', target = '_blank') {
      let url = `${this.url}/${path}`
      window.open(url, target)
    },
    downloadColor(download) {

      switch(download.status) {
        case 'paused':
          return 'orange'
        case 'downloading':
          return 'green'
        case 'completed':
          return download.trackedStatus == 'warning' ? 'orange' : 'primary'
        default:
          return 'primary'
      }
    }
  },
  computed: {
    url() {
      return this.card.url.replace(/\/$/, '')
    },
    online() {
      return this.sonarr.status.version != null
    },
    onlineColor() {
      return this.online ? 'green' : 'red'
    }
  }
}
</script>

<style scoped>
.v-slide-group {
  width: 100%;
}

</style>