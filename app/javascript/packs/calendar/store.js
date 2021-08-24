import store from '../store'
import axios from 'axios'

store.registerModule('calendar', {
  state: () => ({
    events: []
  }),
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    calendar({ commit }, options = {}) {
      axios.get(`/calendar`, {
        params: options, 
        headers: {
          Accept: 'application/json'
        } 
      })
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
    }
  },
  getters: {
    events: (state) => state.events,
  }
})



export default store