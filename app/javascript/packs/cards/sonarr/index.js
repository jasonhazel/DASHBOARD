import API from './api'
export { API }

import Vue from 'vue'

Vue.component('SonarrCard', () => import('./components/Card.vue'))
Vue.component('SonarrForm', () => import('./components/Form.vue'))

export const registration = {
  id: 'sonarr',
  name: 'Sonarr',
  icon: require('./icon.png'),
  card: 'SonarrCard',
  form: 'SonarrForm'
}
