import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    debug: true,
    debugStore: true,
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
      this.state.consumptionCounts.push(consumptionCount)
    }
  },
  actions: {
    fetchConsumptions (context) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${this.state.controllerUrl}consumptie`).then(response => {
        context.commit('SET_CONSUMPTIONS', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    fetchConsumptionCount (context) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${this.state.controllerUrl}consumptie?id=${this.state.kassaContainerId}`).then(response => {
        context.commit('SET_CONSUMPTIONS_COUNT', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    createConsumption (context, item) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.post(`${this.state.controllerUrl}consumptiecount`, {
        kassaContainerId: this.state.kassaContainerId,
        consumptieId: item.id,
        aantal: item.aantal
      }).then(response => {
        context.commit('SET_CONSUMPTION_COUNT', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      }).catch(error => {
        console.log('consumptie post error', error.response)
        console.log('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    updateConsumption (context, item) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      let objConsumptionCount = null
      for (var i in this.state.consumptionCounts) {
        if (this.state.consumptionCounts[i].id === item.consumptieCountId) {
          this.state.consumptionCounts[i].aantal = item.aantal
          objConsumptionCount = this.state.consumptionCounts[i]
        }
      }
      axios.put(`${this.state.controllerUrl}consumptiecount/${objConsumptionCount.id}`, objConsumptionCount)
        .then(response => {
          context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('consumptie put error', error.response)
          console.log('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
    }
  },
  getters: {
  }
}
