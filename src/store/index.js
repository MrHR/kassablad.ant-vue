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
    debugStore: false,
    title: 'Hello World',
    controllerUrl: 'https://localhost:5001/api/',
    loadingStatus: 'notLoading',
    nominations: [],
    beginKassaNominations: [],
    consumptions: [],
    consumptionCounts: [],
    visibleComponent: 'createKassabladButton',
    visibleWrapper: 'beginKassaWrapper',
    kassaContainerId: 0,
    kassaContainer: {
      id: 0,
      beginUur: moment(),
      eindUur: moment(),
      naamTapper: '',
      naamTapperSluit: '',
      Errors: [],
      bezoekers: 0
    },
    kassaId: 0,
    kassaType: null,
    kassas: [],
    profitChartData: null,
    beginVsEndChartData: null,
    kassabladen: [],
    kassaContainers: []
  },
  mutations: {
    SET_LOADING_STATUS (state, status) {
      state.loadingStatus = status
    },
    SET_NOMINATIONS (state, nominations) {
      state.nominations = nominations
      if (state.debug) console.log('set Nominations triggered with', nominations)
    },
    SET_BEGINKASSA_NOMINATIONS (state) {
      state.beginKassaNominations = JSON.parse(JSON.stringify(state.nominations))
      if (state.debugStore) console.log('beginkassanominations triggered with', this.state.beginKassaNominations)
    },
    SET_CONSUMPTIONS (state, consumptions) {
      for (let i = 0; i < consumptions.length; i++) {
        consumptions[i].aantal = 0
        consumptions[i].total = 0
      }
      state.consumptions = consumptions
      if (this.state.debugStore) console.log('set Consumptions triggered with', consumptions)
    },
    SET_CONSUMPTION_COUNT (state, consumptionCount) {
      for (var i in state.consumptions) {
        if (state.consumptions[i].id === consumptionCount.consumptieId) {
          state.consumptions[i].consumptieCountId = consumptionCount.id
          break
        }
      }
      this.state.consumptionCounts.push(consumptionCount)
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
    SET_KASSACONTAINERS (state, data) {
      state.kassaContainers = data
    },
    SET_PROFIT_CHART (state, data) {
      state.profitChartData = data
    },
    SET_BEGIN_VS_END_CHART (state, data) {
      state.beginVsEndChartData = data
    },
    SET_KASSABLADEND (state, data) {
      state.kassabladen = data
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
        Errors: [],
        bezoekers: 0
      }
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
    fetchConsumptions (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}consumptie`).then(response => {
        context.commit('SET_CONSUMPTIONS', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    fetchProfitChartData (context, data = []) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}chart?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
        context.commit('SET_PROFIT_CHART', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    fetchBeginVsEndChartData (context, data = []) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}chart/beginvsendchart?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
        context.commit('SET_BEGIN_VS_END_CHART', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    fetchKassabladen (context, data = []) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}kassa?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
        context.commit('SET_KASSABLADEND', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    fetchKassaContainer (context, id) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}kassacontainer/ext/${id}`).then(response => {
        context.commit('SET_KASSACONTAINER', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      })
    },
    fetchKassaContainers (context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get(`${this.state.controllerUrl}kassacontainer/ext`).then(response => {
        context.commit('SET_KASSACONTAINERS', response.data)
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
      // if kassacontainer does not exist
      if (this.state.kassaContainerId === 0) {
        console.log('is zero')
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
      } else { // if kassacontainer does exist
        console.log('is not zero')
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
            this.commit('SET_BEGINKASSA_NOMINATIONS')
            this.dispatch('showWrapper', 'consumpiteWrapper')
            // this.dispatch('showWrapper', 'eindKassaWrapper')
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
    createConsumption (context, item) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.post(`${this.state.controllerUrl}consumptiecount`, {
        kassaContainerId: this.state.kassaContainerId,
        consumptieId: item.id,
        aantal: item.aantal
      }).then(response => {
        context.commit('SET_CONSUMPTION_COUNT', response.data)
        context.commit('SET_LOADING_STATUS', 'notLoading')
      }).catch(error => {
        console.log('consumptie post error', error.response)
        console.log('SET_LOADING_STATUS', 'notLoading')
      })
    },
    updateConsumption (context, item) {
      context.commit('SET_LOADING_STATUS', 'loading')
      let objConsumptionCount = null
      for (var i in this.state.consumptionCounts) {
        if (this.state.consumptionCounts[i].id === item.consumptieCountId) {
          this.state.consumptionCounts[i].aantal = item.aantal
          objConsumptionCount = this.state.consumptionCounts[i]
        }
      }
      axios.put(`${this.state.controllerUrl}consumptiecount/${objConsumptionCount.id}`, objConsumptionCount)
        .then(response => {
          context.commit('SET_LOADING_STATUS', 'notLoading')
        }).catch(error => {
          console.log('consumptie put error', error.response)
          console.log('SET_LOADING_STATUS', 'notLoading')
        })
    },
    resetKassaData (context) {
      context.commit('RESET_KASSA_DATA')
    }
  },
  getters: {
  },
  modules: {
    // nominations: nominations
  }
})
