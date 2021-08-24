<template>
  <VCard tile color='primary' flat>
    <VCardTitle style="cursor:pointer" v-on:click='expand = !expand' class='pa-3'>
      <VBadge dot :color='onlineColor' overlap class='mr-2'>
        <VAvatar size='32'  v-on:click.stop="openTo(card.settings.url)">
          <VImg :src="require('../icon.png')"  />
        </VAvatar>
      </VBadge>
      {{ card.settings.name || card.settings.application.name }}
      <VSpacer />

      <div v-show='expand'>
        <VBtn icon v-on:click.stop="$emit('edit', card)"><VIcon>mdi-cog</VIcon></VBtn>
      </div>
      <div v-show="!expand">
        <Downloading :queue="queue" v-on:click='openTo' short />
      </div>

    </VCardTitle>
    <VDivider />
    <VExpandTransition>
      <VSheet v-show="expand" color='secondary' class='pb-4'>
        <Upcoming 
          :calendar="calendar" 
          :opened='expand' 
          v-on:click='openTo'
        />

        <Downloading
          :queue="queue"
          :opened='expand'
          v-on:click='openTo'
        />
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
      api:        null,
      expand:     false, 
      edit:       false,
      status:     { version: null },
      calendar:   [],
      queue:      [],
      intervals:  []
    }
  },
  watch: {

  },
  created() {
    this.api = new Sonarr(this.card)
    this.start()    
  },
  destroyed() {
    this.intervals.forEach(i => clearInterval(i))
  },
  methods: {
    start() {
      this.intervals.push(setInterval(this.getStatus, 10000))
      this.getStatus()

      this.intervals.push(setInterval(this.getCalendar, 10000))
      this.getCalendar()

      this.intervals.push(setInterval(this.getQueue, 10000))
      this.getQueue()      
    },
    getStatus() {
      this.api.systemStatus()
        .then(response => this.status = response.data)
    },
    getCalendar() {
      this.api.calendar()
        .then(response => this.calendar = response)
    },
    getQueue() {
      this.api.queue()
        .then(response => this.queue = response)
    },
    openTo(url, target = '_blank') {
      window.open(`${this.url}/${url}`, target)
    }
  },
  computed: {
    url() {
      return this.card.settings.url.replace(/\/$/, '')
    },
    online() {
      return this.status.version != null
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