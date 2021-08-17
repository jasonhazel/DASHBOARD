import API from './api'
export { API }

import Vue from 'vue'
import store from '../../store.js'

Vue.component('SonarrCard', () => import('./Card.vue'))
Vue.component('SonarrForm', () => import('./Form.vue'))

store.dispatch('registerApplication', {
  id: 'sonarr',
  name: 'Sonarr',
  color: '#2193b5',
  icon: require('./icon.png'),
  components: {
    card: 'SonarrCard',
    form: 'SonarrForm'
  }
})