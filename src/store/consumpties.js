import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: () => ({
    debug: false,
    debugStore: false,
    consumptions: [],
    consumptionCounts: [],
    setConsumptionCounts: false,
    totalCost: 0
  }),
  mutations: {
    SET_CONSUMPTIONS (state, consumptions) {
      state.consumptions = consumptions
    },
    // map consumpties to consumtion counts
    SET_CONSUMPTION_COUNTS (state, data) {
      const cCounts = []
      data.consumptions.forEach(consumption => {
        const cCount = {
          key: consumption.id,
          active: true,
          dateAdded: moment(),
          dateUpdated: moment(),
          updatedBy: 1,
          createdBy: 1,
          kassaContainerId: data.kassaContainerId,
          consumptieId: consumption.id,
          aantal: 0
        }
        cCounts.push(cCount)
      })
      state.consumptionCounts = cCounts
    },
    // update consumption count that  was saved && set cCounts when editing
    SET_CONSUMPTIE_COUNT (state, data) {
      if (data.consumptieId !== 0 && data.id !== 0) {
        const newCCounts = state.consumptionCounts
          .map(cCount => {
            if (data.consumptieId === cCount.consumptieId) {
              return data
            } else {
              return cCount
            }
          })
        state.consumptionCounts = newCCounts
      }
    },
    SET_SETCONSUMPTIONCOUNTS_BOOL (state, bool) {
      console.log('setting bool', bool)
      state.setConsumptionCounts = bool
    },
    RESET_CONSUMPTION_DATA (state) {
      console.log('resest consumption data')
      state.consumptions = []
      state.consumptionCounts = []
      state.setConsumptionCounts = false
      state.totalCost = 0
    }
  },
  actions: {
    // fetch the consumtions to generate consumption count list
    fetchConsumptions ({ state, commit, rootState, dispatch }) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}consumptie`).then(response => {
        commit('SET_CONSUMPTIONS', response.data)
        commit('SET_CONSUMPTION_COUNTS', {
          kassaContainerId: rootState.kassabladen.kassaContainer.id,
          consumptions: response.data
        })
        console.log('consumpitioncount bool', state.setConsumptionCounts)
        if (state.setConsumptionCounts === true) dispatch('fetchConsumptionCount')
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    // Call on opening old kassablad to edit - fetch tapper consumption counts
    fetchConsumptionCount ({ state, commit, rootState, dispatch }) {
      state.debug ?? console.log('calling set consumptions')
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}consumptiecount/container/${rootState.kassabladen.kassaContainer.id}`)
        .then(response => {
          response.data.forEach(item => {
            commit('SET_CONSUMPTIE_COUNT', item)
          })
          // commit('SET_SETCONSUMPTIONCOUNTS_BOOL', false)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
    },
    createConsumptionCount ({ state, commit, rootState }, data) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.post(`${rootState.controllerUrl}consumptiecount`, {
        kassaContainerId: rootState.kassabladen.kassaContainer.id,
        consumptieId: data.consumptieId,
        aantal: data.item.aantal
      }).then(response => {
        commit('SET_CONSUMPTIE_COUNT', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      }).catch(error => {
        state.debug ?? console.log('consumptie post error', error.response)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    updateConsumptionCount ({ state, commit, rootState }, item) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.put(`${rootState.controllerUrl}consumptiecount/${item.id}`, item)
        .then(response => {
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          state.debug ?? console.log('consumptie put error', error.response)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
    }
  },
  getters: {

  }
}
