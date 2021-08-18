<template>
  <VCard tile color='primary' flat>
    <VCardTitle style="cursor:pointer" v-on:click='expand = !expand' class='pa-3'>
      <VBadge dot :color='onlineColor' overlap class='mr-2'>
        <VAvatar size='34'  v-on:click.stop="openTo()">
          <VImg :src="require('../icon.png')"  />
        </VAvatar>
      </VBadge>
      {{ card.settings.name || card.settings.application.name }}
      <VSpacer />
      <div v-show='expand'>
        <VBtn icon v-on:click.stop="$emit('edit', card)"><VIcon>mdi-cog</VIcon></VBtn>
      </div>
    </VCardTitle>
    <VDivider />
    <VExpandTransition>
      <VSheet v-show="expand" color='secondary' class='pb-4'>
        <Upcoming :calendar="sonarr.calendar" />
        <Downloading :queue="sonarr.queue" />
        <VCardActions>
          <VSpacer />

        </VCardActions>
      </VSheet>
    </VExpandTransition>    
  
  </VCard>
</template>

<script>
import { API as Sonarr } from '..'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

import Upcoming from './Upcoming.vue'
import Downloading from './Downloading.vue'

export default {
  props: { card: Object },
  components: { Upcoming, Downloading },
  data() {
    return {
      api:      null,
      refresh:  30000,
      expand:   false, 
      edit:     false,
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
    edit(newVal) {
      // this.expand = !newVal
    }
  },
  created() {
    this.api = new Sonarr(this.url, this.card.settings.apiKey)
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
      return this.card.settings.url.replace(/\/$/, '')
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