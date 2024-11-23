import { createStore } from 'vuex'

export default createStore({
  state: {
    counter: 1000
  },
  getters: {
  },
  mutations: {
    increment(state, payload) {
      state.counter += payload
    },
    decrement(state, payload) {
      state.counter -= payload
    }
  },
  actions: {
    actionIncrement({ commit }) {
      commit('increment', 10)
    },
    actionDecrement({ commit }, number) {
      commit('decrement', number)
    },
    actionButton({ commit }, object) {
      if (object.state) {
        commit('increment', object.number)
      } else {
        commit('decrement', object.number)
      }
    }
  },
  modules: {
  }
})
