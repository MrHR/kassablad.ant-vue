import moment from 'moment'
import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    kassaContainer: {
      nominations: [],
      kassaNominations: []
    }
  }),
  mutations: {
    SET_NOMINATIONS (state, data) {
      state.kassaContainer.nominations = data
    },
    SET_KASSA_NOMINATIONS (state, data) {
      const noms = []
      data.forEach(nom => {
        const Nom = {
          active: true,
          dateAdded: moment(),
          dateUpdated: moment(),
          updatedBy: 1,
          createdBy: 1,
          kassaId: this.state.kassaContainer.kassaId,
          nominationId: nom.id,
          amount: nom.defaultAmount
        }
        noms.push(Nom)
      })
      state.kassaContainer.kassaNominations = noms
      state.kassaNominations = noms
    }
  },
  actions: {
    fetchNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${this.state.controllerUrl}nomination`).then(response => {
        context.commit('SET_NOMINATIONS', response.data)
        context.commit('SET_KASSA_NOMINATIONS', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    saveKassaNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading', { root: true })
      this.state.kassaContainer.kassaNominations.forEach(nom => {
        axios.post(`${this.state.controllerUrl}KassaNominations`, {
          active: nom.active,
          dateAdded: nom.dateAdded,
          dateUpdated: nom.dateUpdated,
          updatedBy: nom.updatedBy,
          createdBy: nom.createdBy,
          kassaId: nom.kassaId,
          nominationId: nom.nominationId,
          amount: nom.amount
        }).then(response => {
          if (this.state.kassaType === 'begin') {
            this.commit('SET_BEGINKASSA_NOMINATIONS', { root: true })
            this.dispatch('showWrapper', 'consumpiteWrapper')
            // this.dispatch('showWrapper', 'eindKassaWrapper')
            this.dispatch('showComponent', 'createKassabladButton', { root: true })
          } else {
            this.dispatch('showWrapper', 'beginKassaWrapper', { root: true })
            this.dispatch('showComponent', 'createKassabladButton', { root: true })
            this.dispatch('resetKassaData', { root: true })
          }
          context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('saveNominations post error', error.response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      })
    }
  },
  getters: {
  }
}
