import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    applications: {},
    cards: {},
    dark: true
  },
  mutations: {
    CREATE_CARD(state, card) {
      Vue.set(state.cards, card.id, card)
    },
    DELETE_CARD(state, card) {
      Vue.delete(state.cards, card.id)
    },
    SET_DARK(state, dark = false) {
      state.dark = dark
    },
    REGISTER_APPLICATION(state, application) {
      Vue.set(state.applications, application.id, application)
    }
  },
  actions: {
    createCard({ commit }, card) {
      commit('CREATE_CARD', card)
    },
    deleteCard({ commit }, card) {
      commit('DELETE_CARD', card)
    },
    setDark({ commit }, dark = true) {
      commit('SET_DARK', dark)
    },
    toggleDark({ commit, getters }) {
      return new Promise((resolve) => {
        commit('SET_DARK', !getters.dark)
        resolve(getters.dark)
      })
    },
    registerApplication({ commit }, application) {
      commit('REGISTER_APPLICATION', application)
    }
  },
  getters: {
    cards: (state) => state.cards,
    dark: (state) => state.dark,
    applications: (state) => state.applications
  }
})

export default store