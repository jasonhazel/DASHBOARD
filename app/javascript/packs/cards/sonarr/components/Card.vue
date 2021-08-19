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
        <Upcoming :calendar="sonarr.calendar" :opened='expand' />
        <Downloading :queue="sonarr.queue"  :opened='expand' />
        <VCardActions>
          <VSpacer />

        </VCardActions>
      </VSheet>
    </VExpandTransition>    
  
  </VCard>
</template>

<script>
import { API as Sonarr } from '..'

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
      intervals: []
    }
  },
  watch: {

  },
  created() {
    this.api = new Sonarr(this.card)
    this.start()    
  },
  destroyed() {
    // clearInterval(this.interval)
    this.intervals.forEach(i => clearInterval(i))
  },
  methods: {
    start() {
      this.intervals.push(setInterval(this.status, 30000))
      this.status()

      this.intervals.push(setInterval(this.calendar, 60000))
      this.calendar()

      this.intervals.push(setInterval(this.queue, 60000))
      this.queue()      
    },
    status() {
      this.api.systemStatus()
        .then(response => this.sonarr.status = response.data)
    },
    calendar() {
      this.api.calendar()
        .then(response => this.sonarr.calendar = response)
    },
    queue() {
      this.api.queue()
        .then(response => this.sonarr.queue = response)
    },
    openTo(path = '', target = '_blank') {
      let url = `${this.url}/${path}`
      window.open(url, target)
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