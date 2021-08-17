import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import store from './store'

import axios from 'axios'
axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').content


import './cards/sonarr'

const app = () => {

  new Vue({
    vuetify,
    store,
    render: h => h(App),
  }).$mount('#app')

}

document.addEventListener('DOMContentLoaded', app)
