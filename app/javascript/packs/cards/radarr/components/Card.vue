<template>
  <VCard tile color='primary' flat>
    <VCardTitle style="cursor:pointer" v-on:click='expand = !expand' class='pa-3'>
      <VBadge dot :color='onlineColor' overlap class='mr-2'>
        <VAvatar size='34'  v-on:click.stop="openTo()">
          <VImg :src="require('../icon.png')"  />
        </VAvatar>
      </VBadge>
      {{ card.settings.name || card.settings.application.name }}
      <VSpacer></VSpacer>
      <div v-show='expand'>
        <VBtn icon v-on:click.stop="$emit('edit', card)"><VIcon>mdi-cog</VIcon></VBtn>
      </div>
    </VCardTitle>
    <VDivider />
    <VExpandTransition>
      <VSheet v-show="expand" color='secondary' class='pb-4'>
        <Upcoming :calendar="radarr.calendar" />
        
      </VSheet>
      
    </VExpandTransition>    
  </VCard>
</template>

<script>
import { API as Radarr } from '..'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

import Upcoming from './Upcoming.vue'

export default {
  props: { card: Object },
  components: { Upcoming },
  data() {
    return {
      api:      new Radarr(this.card),
      expand:   true, 
      radarr: { 
        status:   { version: null },
        calendar: [],
        queue:    []
      },
      intervals:  []
    }
  },
  watch: {
  },
  created() {
    this.intervals.push(setInterval(this.status, 10000))
    this.status()
    
    this.intervals.push(setInterval(this.calendar, 10000))
    this.calendar()
  },
  destroyed() {
    this.intervals.forEach(i => clearInterval(i))
  },
  methods: {
    status() {
      this.api.systemStatus()
        .then(response => this.radarr.status = response.data)
    },
    calendar() {
      this.api.calendar()
        .then(response => this.radarr.calendar = response)
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
      return this.radarr.status.version != null
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