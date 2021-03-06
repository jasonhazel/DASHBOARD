import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import store from './store'

import axios from 'axios'
axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').content
axios.defaults.headers.common['Content-Type'] = 'application/json'

import './cards/sonarr'

import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'

Vue.mixin({
  methods: { 
    formatDate(date, display = 'EEEE K:mmaaaaa') {
      let userTime = utcToZonedTime(new Date(date))
      return format(userTime, display)
    }
  }
})

const app = () => {
  new Vue({
    vuetify,
    store,
    render: h => h(App),
  }).$mount('#app')

}

document.addEventListener('DOMContentLoaded', app)
