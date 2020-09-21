import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    debug: false,
    debugStore: false,
    consumptions: [],
    consumptionCounts: []
  }),
  mutations: {
    SET_CONSUMPTIONS (state, consumptions) {
      for (let i = 0; i < consumptions.length; i++) {
        consumptions[i].aantal = 0
        consumptions[i].total = 0
      }
      state.consumptions = consumptions
      if (state.debugStore) console.log('set Consumptions triggered with', consumptions)
    },
    SET_CONSUMPTION_COUNT (state, consumptionCount) {
      for (const i in state.consumptions) {
        if (state.consumptions[i].id === consumptionCount.consumptieId) {
          state.consumptions[i].consumptieCountId = consumptionCount.id
          break
        }
      }
      state.consumptionCounts.push(consumptionCount)
    }
  },
  actions: {
    fetchConsumptions ({ state, commit, rootState }) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}consumptie`).then(response => {
        commit('SET_CONSUMPTIONS', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    fetchConsumptionCount ({ state, commit, rootState }) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}consumptie?id=${rootState.kassabladen.kassaContainer.id}`).then(response => {
        commit('SET_CONSUMPTIONS_COUNT', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    createConsumption ({ state, commit, rootState }, item) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.post(`${rootState.controllerUrl}consumptiecount`, {
        kassaContainerId: rootState.kassabladen.kassaContainer.id,
        consumptieId: item.id,
        aantal: item.aantal
      }).then(response => {
        commit('SET_CONSUMPTION_COUNT', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      }).catch(error => {
        console.log('consumptie post error', error.response)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    updateConsumption ({ state, commit, rootState }, item) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      let objConsumptionCount = null
      for (var i in state.consumptionCounts) {
        if (state.consumptionCounts[i].id === item.consumptieCountId) {
          state.consumptionCounts[i].aantal = item.aantal
          objConsumptionCount = state.consumptionCounts[i]
        }
      }
      axios.put(`${rootState.controllerUrl}consumptiecount/${objConsumptionCount.id}`, objConsumptionCount)
        .then(response => {
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('consumptie put error', error.response)
          console.log('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
    }
  },
  getters: {
  }
}
