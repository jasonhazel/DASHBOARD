import API from './api'
export { API }

import Vue from 'vue'

Vue.component('RadarrCard', () => import('./components/Card.vue'))
Vue.component('RadarrForm', () => import('./components/Form.vue'))

export const registration = {
  id: 'radarr',
  name: 'Radarr',
  color: '#2193b5',
  icon: require('./icon.png'),
  card: 'RadarrCard',
  form: 'RadarrForm'
}
