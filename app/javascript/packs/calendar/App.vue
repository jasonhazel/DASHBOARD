<template>
  <VApp>
    <div v-if='false'>
      <Menu>
        <VToolbarTitle>
          {{ title }}
        </VToolbarTitle>
        <VSpacer />
        <VBtn icon v-on:click='prev'>
          <VIcon>mdi-chevron-left</VIcon>
        </VBtn>
        <VBtn text v-on:click='today'>Today</VBtn>
        <VBtn icon v-on:click='next'>
          <VIcon>mdi-chevron-right</VIcon>
        </VBtn>      
      </Menu>
      <VMain>
        <VSheet class='fill-height'>
          <VCalendar 
            ref="calendar" 
            v-model='value' 
            color='primary'
            :show-month-on-first="false"
            :events="events"
          >      

          </VCalendar>
        </VSheet>
      </VMain>    
    </div>
    <div v-else class='fill-height'>
      Under Construction
    </div>
  </VApp>
</template>

<script>
import Menu from '../components/Menu.vue'

import format from 'date-fns/format'
import endOfMonth from 'date-fns/endOfMonth'
import { utcToZonedTime } from 'date-fns-tz'

export default {
  methods: {
  },
  components: {
    Menu,
  },
  data: function () {
    return { 
      value: endOfMonth(new Date()),
    }
  },
  mounted() {
    this.$store.dispatch('getCards')
    // this.$store.dispatch('calendar')
    // this.$refs.calendar.checkChange()
  },
  methods: {
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    today() {
      this.value = endOfMonth(new Date())
    }
  },
  computed: {
    title() {
      let value = utcToZonedTime(new Date(this.value))
      return format(value, 'MMMM yyyy')
    },
    events() {
      return this.$store.getters.events.map(event => {
        event.start = utcToZonedTime(new Date(event.start))
        event.end = utcToZonedTime(new Date(event.end))
        return event
      })
    }
  }
}
</script>

<style scoped>
#app {
  background-color: var(--v-background-base);
}
</style>
