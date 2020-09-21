import moment from 'moment'
import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    kassaId: 0,
    kassaType: null,
    setKassaNominations: true,
    count: 0,
    kassaContainer: {
      id: 0,
      beginUur: moment(),
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
      console.log('set kassacontainer', data)
      // console.log('response data kassaContainer', moment(data.beginUur))
      state.kassaContainer.active = data.active
      state.kassaContainer.afroomkluis = data.afroomkluis
      state.kassaContainer.bezoekers = data.bezoekers
      state.kassaContainer.createdBy = data.createdBy
      state.kassaContainer.dateAdded = data.dateAdded
      state.kassaContainer.dateUpdated = data.dateUpdated
      state.kassaContainer.beginUur = data.beginUur != null ? moment(data.beginUur).format('YYYY-MM-DD HH:mm:ss') : null
      state.kassaContainer.eindUur = data.eindUur || null
      state.kassaContainer.id = data.id
      state.kassaContainer.inkomstBar = data.inkomstBar
      state.kassaContainer.inkomstLidkaart = data.inkomstLidkaart
      state.kassaContainer.kassas = data.kassas || [data.beginKassa, data.eindKassa] || []
      state.kassaContainer.naamTapper = data.naamTapper
      state.kassaContainer.activiteit = data.activiteit
      state.kassaContainer.notes = data.notes
      state.kassaContainer.updatedBy = data.updatedBy
      state.kassaContainer.naamTapperSluit = state.kassaContainer.naamTapper
      state.kassaContainerId = data.id
    },
    SET_KASSACONTAINER_TAPPER (state, data) {
      console.log('set kassacontainer tapper')
      state.kassaContainer.active = data.active
      state.kassaContainer.afroomkluis = data.afroomkluis
      state.kassaContainer.bezoekers = data.bezoekers
      state.kassaContainer.createdBy = data.createdBy
      state.kassaContainer.dateAdded = data.dateAdded
      state.kassaContainer.dateUpdated = data.dateUpdated
      state.kassaContainer.beginUur = data.beginUur != null ? moment(data.beginUur) : null
      state.kassaContainer.eindUur = data.eindUur !== null ? moment(data.eindUur).format('YYYY-MM-DD HH:mm:ss') : null
      state.kassaContainer.id = data.id
      state.kassaContainer.inkomstBar = data.inkomstBar
      state.kassaContainer.inkomstLidkaart = data.inkomstLidkaart
      state.kassaContainer.kassas = [data.beginKassa, data.eindKassa] || []
      state.kassaContainer.naamTapper = data.naamTapper
      state.kassaContainer.activiteit = data.activiteit || ''
      state.kassaContainer.notes = data.notes
      state.kassaContainer.updatedBy = data.updatedBy
      state.kassaContainer.naamTapperSluit = state.kassaContainer.naamTapper
      state.kassaContainerId = data.id
      state.kassaContainer.beginKassaNominations = data.beginKassa != null ? data.beginKassa.nominationList : []
      state.kassaContainer.endKassaNominations = data.eindKassa != null ? data.eindKassa.nominationList : []
      state.kassaId = data.beginKassa != null ? data.beginKassa.id : 0
      state.kassaType = data.beginKassa != null ? data.beginKassa.type : null
      console.log('state', state)
    },
    ADD_KASSA (state, data) {
      state.kassaContainer.kassas.push(data)
      state.kassaId = data.id
      state.kassaType = data.type
    },
    SET_NOMINATIONS (state, data) {
      state.kassaContainer.nominations = data
    },
    SET_KASSA_NOMINATION (state, data) {
      if (state.kassaType === 'begin') {
        const newArr = state.kassaContainer.beginKassaNominations
          .map(nom => {
            if (data.nominationId === nom.nominationId) {
              console.log('found nom match', nom)
              return data
            } else {
              return nom
            }
          })
        state.kassaContainer.beginKassaNominations = newArr
        console.log('new Array', state.kassaContainer.beginKassaNominations)
      } else if (state.kassaType === 'end') {
        const newArr = state.kassaContainer.endKassaNominations
          .map(nom => {
            if (data.nominationId === nom.nominationId) {
              console.log('found nom match', nom)
              return data
            } else {
              return nom
            }
          })
        state.kassaContainer.endKassaNominations = newArr
        console.log('new Array', state.kassaContainer.endKassaNominations)
      }
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
          if (state.kassaContainer.beginKassaNominations.length <= 0) {
            state.kassaContainer.beginKassaNominations = noms
          }
          break
        case 'end':
          if (state.kassaContainer.endKassaNominations.length <= 0) {
            state.kassaContainer.endKassaNominations = noms
          }
          break
      }
    },
    SET_CREATED_KASSA_NOMINATIONS (state, response) {
      switch (response.kassaType) {
        case 'begin':
          console.log('kassanominations', state.kassaContainer.beginKassaNominations)
          state.kassaContainer.beginKassaNominations = response.data
          console.log('kassanominations updated', state.kassaContainer.beginKassaNominations)
          state.count++
          console.log('this is called', state.count, 'times')
          break
        case 'end':
          state.kassaContainer.endKassaNominations = response.data
          break
      }
    },
    SET_EIND_UUR (state, data) {
      state.kassaContainer.eindUur = data
    },
    SET_BEGIN_UUR (state, data) {
      state.kassaContainer.beginUur = data
    },
    SET_BEZOEKERS (state, data) {
      state.kassaContainer.bezoekers = data
    },
    SET_AFROOMKLUIS (state, data) {
      state.kassaContainer.afroomkluis = data
    },
    SET_ACTIVITY (state, data) {
      console.log(`%c setting activiteit ${data}`, 'color:blue')
      state.kassaContainer.activiteit = data
      console.log('kassaContainer', state.kassaContainer.activiteit)
    },
    RESET_KASSA_DATA (state) {
      state.kassaContainerId = 0
      state.kassaId = 0
      state.kassaType = null
      state.kassaContainer = {
        id: 0,
        beginUur: moment(),
        nominations: [],
        beginKassaNominations: [],
        endKassaNominations: [],
        eindUur: null,
        bezoekers: 0,
        afroomkluis: 0
      }
    },
    SET_SETKASSANOMINATIONS_BOOL (state, bool) {
      state.setKassaNominations = bool
    }
  },
  actions: {
    createKassaContainer ({ state, commit, rootState, dispatch }, kassaType) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      // Do this on start evening
      if (state.kassaContainer.id === 0) {
        commit('SET_SETKASSANOMINATIONS_BOOL', true)
        axios.post(`${rootState.controllerUrl}kassacontainer`, {
          beginUur: moment(state.kassaContainer.beginUur).format('YYYY-MM-DDTHH:mm:ss'),
          eindUur: moment(state.beginUur).add('4', 'hours').format('YYYY-MM-DDTHH:mm:ss'),
          naamTapper: state.kassaContainer.naamTapper,
          activiteit: state.kassaContainer.activiteit
        }).then(response => {
          commit('SET_KASSACONTAINER', response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
          dispatch('createKassa', 'begin')
        }).catch(error => {
          console.log('kassacontainer post error', error)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else if (state.kassaContainer.id !== 0) { // do this when kassaContainer exits
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
            inkomstLidkaart: state.kassaContainer.inkomstLidkaart,
            activiteit: state.kassaContainer.activiteit
          }
        ).then(response => {
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
          if (kassaType === 'end') { // do this to make endkassa if none exists
            commit('SET_SETKASSANOMINATIONS_BOOL', true)
            dispatch('createKassa', 'end')
          }
          console.log('kassacontainer put response: ', response)
        }).catch(error => {
          console.log('kassacontainer put error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else {
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
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
          commit('SET_SETKASSANOMINATIONS_BOOL', true)
          dispatch('fetchNominations')
        }).catch(error => {
          console.log('kassa post error', error)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else {
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      }
    },
    fetchNominations ({ state, commit, rootState }) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      axios.get(`${rootState.controllerUrl}nomination`).then(response => {
        commit('SET_NOMINATIONS', response.data)
        if (state.setKassaNominations === true) {
          commit('SET_KASSA_NOMINATIONS', response.data)
        }
        commit('SET_LOADING_STATUS', 'notLoading', { root: true })
      })
    },
    saveKassaNomination ({ state, commit, rootState }, nom) {
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      console.log('nomination: ', nom.id)
      if (nom.id !== 0 && typeof nom.id !== 'undefined') {
        axios.put(`${rootState.controllerUrl}kassaNominations/${nom.id}`, {
          id: nom.id,
          active: nom.active,
          dateAdded: nom.dateAdded,
          dateUpdated: nom.dateUpdated,
          updatedBy: nom.updatedBy,
          createdBy: nom.createdBy,
          kassaId: nom.kassaId,
          nominationId: nom.nominationId,
          amount: nom.amount
        }).then(response => {
          console.log('kassaNomination was updated', response.data)
          commit('SET_KASSA_NOMINATION', response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('save post error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      } else {
        axios.post(`${rootState.controllerUrl}kassaNominations`, {
          active: nom.active,
          dateAdded: nom.dateAdded,
          dateUpdated: nom.dateUpdated,
          updatedBy: nom.updatedBy,
          createdBy: nom.createdBy,
          kassaId: nom.kassaId,
          nominationId: nom.nominationId,
          amount: nom.amount
        }).then(response => {
          console.log('kassaNomination was created and saved', response.data)
          commit('SET_KASSA_NOMINATION', response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('save post error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      }
    },
    saveKassaNominations ({ state, commit, rootState, dispatch }, type) { // DEPRECATED
      commit('SET_LOADING_STATUS', 'loading', { root: true })
      const kassaNoms = type === 'begin'
        ? state.kassaContainer.beginKassaNominations
        : state.kassaContainer.endKassaNominations
      const kassaNominationsResult = []
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
            dispatch('showWrapper', 'consumpiteWrapper', { root: true })
            dispatch('showComponent', 'createKassabladButton', { root: true })
          } else {
            dispatch('showWrapper', 'beginKassaWrapper', { root: true })
            dispatch('showComponent', 'createKassabladButton', { root: true })
            commit('RESET_KASSA_DATA')
          }
          kassaNominationsResult.push({ ...response.data, key: response.data.id })
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        }).catch(error => {
          console.log('saveNominations post error', error.response.data)
          commit('SET_LOADING_STATUS', 'notLoading', { root: true })
        })
      })
      switch (state.kassaType) {
        case 'begin':
          console.log('query result kassanominations begin', kassaNominationsResult)
          commit('SET_CREATED_KASSA_NOMINATIONS', { data: kassaNominationsResult, kassaType: 'begin' })
          break
        case 'end':
          console.log('query result kassanominations end', kassaNominationsResult)
          commit('SET_CREATED_KASSA_NOMINATIONS', { data: kassaNominationsResult, kassaType: 'end' })
          break
      }
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
