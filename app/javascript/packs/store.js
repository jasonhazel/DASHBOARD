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
      Vue.delete(state.cards, card.id)
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
      // commit('UPDATE_CARD', card)
      axios.patch(`/cards/${card.id}`, { card: card })
        .then(
          response => commit('UPDATE_CARD', response.data),
          error => console.log(error)
        )
    },
    deleteCard({ commit }, card) {
      commit('DELETE_CARD', card)
    },
  },
  getters: {
    cards: (state) => state.cards,
  }
})

export default store