import moment from 'moment'
import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    kassaId: 0,
    kassaType: null,
    kassaContainer: {
      id: 0,
      nominations: [],
      beginKassaNominations: [],
      endKassaNominations: [],
      eindUur: null,
      bezoekers: 0,
      afroomkluis: 0
    }
  }),
  mutations: {
    SET_KASSACONTAINER (state, data) {
      // console.log('response data kassaContainer', moment(data.beginUur))
      state.kassaContainer.active = data.active
      state.kassaContainer.afroomkluis = data.afroomkluis
      state.kassaContainer.bezoekers = data.bezoekers
      state.kassaContainer.createdBy = data.createdBy
      state.kassaContainer.dateAdded = data.dateAdded
      state.kassaContainer.dateUpdated = data.dateUpdated
      state.kassaContainer.beginUur = moment(data.beginUur).format('YYYY-MM-DD HH:mm:ss')
      state.kassaContainer.eindUur = data.eindUur || null
      state.kassaContainer.id = data.id
      state.kassaContainer.inkomstBar = data.inkomstBar
      state.kassaContainer.inkomstLidkaart = data.inkomstLidkaart
      state.kassaContainer.kassas = data.kassas || []
      state.kassaContainer.naamTapper = data.naamTapper
      state.kassaContainer.notes = data.notes
      state.kassaContainer.updatedBy = data.updatedBy
      state.kassaContainer.naamTapperSluit = state.kassaContainer.naamTapper
      state.kassaContainerId = data.id
    },
    ADD_KASSA (state, data) {
      state.kassaContainer.kassas.push(data)
      state.kassaId = data.id
      state.kassaType = data.type
    },
    SET_NOMINATIONS (state, data) {
      state.kassaContainer.nominations = data
    },
    SET_KASSA_NOMINATIONS (state, data) {
      const noms = []
      data.forEach(nom => {
        const Nom = {
          key: nom.id,
          active: true,
          dateAdded: moment(),
          dateUpdated: moment(),
          updatedBy: 1,
          createdBy: 1,
          kassaId: state.kassaId,
          nominationId: nom.id,
          amount: nom.defaultAmount
        }
        noms.push(Nom)
      })
      switch (state.kassaType) {
        case 'begin':
          state.kassaContainer.beginKassaNominations = noms
          break
        case 'end':
          state.kassaContainer.endKassaNominations = noms
          break
      }
    },
    SET_EIND_UUR (state, data) {
      state.kassaContainer.eindUur = data
    },
    SET_BEZOEKERS (state, data) {
      state.kassaContainer.bezoekers = data
    },
    SET_AFROOMKLUIS (state, data) {
      state.kassaContainer.afroomkluis = data
    },
    RESET_KASSA_DATA (state) {
      state.kassaId = 0
      state.kassaType = null
      state.kassaContainer = {
        id: 0,
        nominations: [],
        beginKassaNominations: [],
        endKassaNominations: [],
        eindUur: null,
        bezoekers: 0,
        afroomkluis: 0
      }
    }
  },
  actions: {
    createKassaContainer ({ state, commit, rootState, dispatch }, kassaType) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      // Do this on start evening
      if (state.kassaContainer.id === 0) {
        axios.post(`${rootState.controllerUrl}kassacontainer`, {
          beginUur: moment(state.kassaContainer.beginUur).format('YYYY-MM-DDTHH:mm:ss'),
          eindUur: moment(state.beginUur).add('4', 'hours').format('YYYY-MM-DDTHH:mm:ss'),
          naamTapper: state.kassaContainer.naamTapper
        }).then(response => {
          commit('SET_KASSACONTAINER', response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
          dispatch('createKassa', 'begin')
        }).catch(error => {
          console.log('kassacontainer post error', error)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else if (state.kassaContainer.id !== 0 && kassaType === 'end') { // do this on end evening
        console.log('is not zero')
        axios.put(
          `${rootState.controllerUrl}kassacontainer/${state.kassaContainer.id}`,
          {
            id: state.kassaContainer.id,
            beginuur: moment(state.kassaContainer.beginUur).format('YYYY-MM-DDTHH:mm:ss'),
            eindUur: moment(state.kassaContainer.eindUur).format('YYYY-MM-DDTHH:mm:ss'),
            naamTapper: state.kassaContainer.naamTapper,
            naamTapperSluit: state.kassaContainer.naamTapperSluit,
            active: state.kassaContainer.active,
            dateAdded: state.kassaContainer.dateAdded,
            dateUpdated: state.kassaContainer.dateUpdated,
            updatedBy: state.kassaContainer.updatedBy,
            createdBy: state.kassaContainer.createdBy,
            notes: state.kassaContainer.notes,
            bezoekers: state.kassaContainer.bezoekers,
            afroomkluis: state.kassaContainer.afroomkluis,
            inkomstBar: state.kassaContainer.inkomstBar,
            inkomstLidkaart: state.kassaContainer.inkomstLidkaart
          }
        ).then(response => {
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
          if (kassaType === 'end') {
            dispatch('createKassa', 'end')
          }
          console.log('kassacontainer put response: ', response)
        }).catch(error => {
          console.log('kassacontainer put error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      }
    },
    createKassa ({ state, commit, rootState, dispatch }, kassaType) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      if ((state.kassaId === 0 || kassaType !== state.kassaType) && state.kassaContainer.id !== 0) {
        axios.post(`${rootState.controllerUrl}kassa`, {
          kassaContainerId: state.kassaContainerId,
          type: kassaType
        }).then(response => {
          // console.log('create kassa response', response.data)
          commit('ADD_KASSA', response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
          dispatch('fetchNominations')
        }).catch(error => {
          console.log('kassa post error', error)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else {
        dispatch('saveKassaNominations', 'end')
      }
    },
    fetchNominations ({ state, commit, rootState }) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}nomination`).then(response => {
        commit('SET_NOMINATIONS', response.data)
        commit('SET_KASSA_NOMINATIONS', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    saveKassaNominations ({ state, commit, rootState, dispatch }, type) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      var kassaNoms = type === 'begin'
        ? state.kassaContainer.beginKassaNominations
        : state.kassaContainer.endKassaNominations
      kassaNoms.forEach(nom => {
        axios.post(`${rootState.controllerUrl}KassaNominations`, {
          active: nom.active,
          dateAdded: nom.dateAdded,
          dateUpdated: nom.dateUpdated,
          updatedBy: nom.updatedBy,
          createdBy: nom.createdBy,
          kassaId: nom.kassaId,
          nominationId: nom.nominationId,
          amount: nom.amount
        }).then(response => {
          if (state.kassaType === 'begin') {
            // commit('SET_USER_KASSA_NOMINATIONS', 'begin')
            dispatch('showWrapper', 'consumpiteWrapper', { root: true })
            dispatch('showComponent', 'createKassabladButton', { root: true })
          } else {
            dispatch('showWrapper', 'beginKassaWrapper', { root: true })
            dispatch('showComponent', 'createKassabladButton', { root: true })
            // dispatch('resetKassaData', { root: true })
            commit('RESET_KASSA_DATA')
          }
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('saveNominations post error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      })
    },
    fetchKassa ({ state, commit, rootState, dispatch }, type, id) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}kassa?id=${id}&type=${type}`).then(response => {
        commit('ADD_KASSA', response.data)
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    }
  },
  getters: {
  }
}
