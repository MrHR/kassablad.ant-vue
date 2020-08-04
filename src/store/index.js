import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
// import nominations from '@/store/nominations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: false,
    debugUI: false,
    controllerUrl: 'https://localhost:5001/api/',
    loadingStatus: 'notLoading',
    nominations: [],
    beginNominations: [],
    visibleComponent: 'createKassabladButton',
    visibleWrapper: 'beginKassaWrapper',
    kassaContainerId: 0,
    kassaContainer: {
      id: 0,
      beginUur: moment(),
      eindUur: moment(),
      naamTapper: '',
      naamTapperSluit: '',
      Errors: []
    },
    kassaId: 0,
    kassaType: null,
    kassas: []
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = status
    },
    SET_NOMINATIONS (state, nominations) {
      state.nominations = nominations
      if (this.debug) console.log('set Nominations triggered with', nominations)
    },
    SET_BEGIN_NOMINATIONA (state, beginNominations) {
      state.beginNominations = beginNominations
      if (this.debug) console.log('set begin Nominations triggered with', beginNominations)
    },
    SET_VISIBLE_COMPONENT (state, componentName) {
      state.visibleComponent = componentName
    },
    SET_VISIBLE_WRAPPER (state, wrapperName) {
      state.visibleWrapper = wrapperName
    },
    SET_KASSACONTAINER (state, data) {
      state.kassaContainer = data
      state.kassaContainerId = data.id
    },
    ADD_KASSA (state, data) {
      state.kassas.push(data)
      state.kassaId = data.id
      state.kassaType = data.type
    },
    RESET_KASSA_DATA (state) {
      state.kassas = []
      state.kassaId = 0
      state.kassaType = null
      state.kassaContainerId = 0
      state.kassaContainer = {
        id: 0,
        beginUur: moment(),
        eindUur: moment(),
        naamTapper: '',
        naamTapperSluit: '',
        Errors: []
      }
      state.beginNominations = []
    }
  },
  actions: {
    fetchNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}nomination`).then(response => {
        context.commit('SET_NOMINATIONS', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    showComponent (context, componentName) {
      context.commit('SET_VISIBLE_COMPONENT', componentName)
    },
    showWrapper (context, wrapperName) {
      context.commit('SET_VISIBLE_WRAPPER', wrapperName)
    },
    createKassablad (context, kassaType) {
      context.commit('SET_LOADING_STATUS', 'loading')
      if (this.state.kassaContainerId === 0) {
        axios.post(`${this.state.controllerUrl}kassacontainer`, {
          beginUur: moment(this.state.kassaContainer.beginUur).format('YYYY-MM-DDThh:mm:ss'),
          naamTapper: this.state.kassaContainer.naamTapper
        }).then(response => {
          context.commit('SET_KASSACONTAINER', response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading')
          this.dispatch('createKassa', 'begin')
          // console.log('kassacontainer post response: ', response.data)
        }).catch(error => {
          console.log('kassacontainer post error', error)
          context.commit('SET_LOADING_STATUS', 'notLoading')
        })
      } else {
        axios.put(
          `${this.state.controllerUrl}kassacontainer/${this.state.kassaContainer.id}`,
          this.state.kassaContainer
        ).then(response => {
          context.commit('SET_LOADING_STATUS', 'notLoading')
          if (kassaType === 'end') {
            this.dispatch('createKassa', 'end')
          }
          // console.log('kassacontainer put response: ', response)
        }).catch(error => {
          console.log('kassacontainer put error', error.response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading')
        })
      }
    },
    createKassa (context, kassaType) {
      context.commit('SET_LOADING_STATUS', 'loading')
      if ((this.state.kassaId === 0 || kassaType !== this.state.kassaType) && this.state.kassaContainerId !== 0) {
        axios.post(`${this.state.controllerUrl}kassa`, {
          kassaContainerId: this.state.kassaContainerId,
          type: kassaType
        }).then(response => {
          context.commit('ADD_KASSA', response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading')
        }).catch(error => {
          console.log('kassa post error', error.response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading')
        })
      } else {
        console.log('Kassa already exists or KassaContainerID is 0')
      }
    },
    saveNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      this.state.nominations.forEach(el => {
        axios.post(`${this.state.controllerUrl}KassaNominations`, {
          kassaId: this.state.kassaId,
          nominationId: el.id,
          amount: el.defaultAmount
        }).then(response => {
          if (this.state.kassaType === 'begin') {
            this.dispatch('showWrapper', 'eindKassaWrapper')
            this.dispatch('showComponent', 'createKassabladButton')
          } else {
            this.dispatch('showWrapper', 'beginKassaWrapper')
            this.dispatch('showComponent', 'createKassabladButton')
            this.dispatch('resetKassaData')
          }
          context.commit('SET_LOADING_STATUS', 'notLoading')
        }).catch(error => {
          console.log('saveNominations post error', error.response.data)
          context.commit('SET_LOADING_STATUS', 'notLoading')
        })
      })
    },
    resetKassaData (context) {
      context.commit('RESET_KASSA_DATA')
    },
    fetchBeginNominations (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}beginnomination`).then(response => {
        context.commit('SET_BEGIN_NOMINATIONS', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    }
  },
  getters: {
  },
  modules: {
    // nominations: nominations
  }
})
