import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cards: []
  },
  mutations: {
    SET_CARDS(state, cards) {
      Vue.set(state, 'cards', cards)
    },
    CREATE_CARD(state, card) {
      state.cards.push(card)
    },
    UPDATE_CARD(state, card) {
      let index = state.cards.findIndex(c => c.id == card.id)
      Vue.set(state.cards, index, card)
    },
    DELETE_CARD(state, card) {
      let index = state.cards.findIndex(c => c.id == card.id)
      Vue.delete(state.cards, index)
    },
  },
  actions: {
    getCards({ commit }) {
      axios.get('/cards')
        .then(response => {
          commit('SET_CARDS', response.data)
        }, error => {
          alert('Error loading cards')
          console.log(error)
        })
        
    },
    createCard({ commit }, card) {
      axios.post('/cards', { card: { settings: card }})
        .then(
          response => commit('CREATE_CARD', response.data), 
          error => console.log(error)
        )
    },
    updateCard({ commit }, card) {
      axios.patch(`/cards/${card.id}`, { card: card })
        .then(
          response => commit('UPDATE_CARD', response.data),
          error => console.log(error)
        )
    },
    deleteCard({ commit }, card) {
      axios.delete(`/cards/${card.id}`)
        .then(
          response => commit('DELETE_CARD', response.data),
          error => console.log(error)
        )
    },
  },
  getters: {
    cards: (state) => state.cards,
  }
})

export default store