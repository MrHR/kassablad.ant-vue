import Vue from 'vue'
import Vuex from 'vuex'
// import moment from 'moment'
import actions from './actions'
import mutations from './mutations'
import kassabladen from './kassabladen'
// import { List } from 'ant-design-vue'
// import nominations from '@/store/nominations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kassabladen
  },
  state: {
    debug: true,
    debugUI: false,
    debugStore: false,
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
      beginUur: null,
      eindUur: null,
      naamTapper: '',
      naamTapperSluit: '',
      Errors: [],
      bezoekers: 0,
      afroomkluis: 0.00
    },
    kassaId: 0,
    kassaType: null,
    kassas: [],
    profitChartData: null,
    beginVsEndChartData: null,
    kassabladen: [],
    kassaContainers: [],
    kassaContainersTapper: [],
    kassaContainerDetail: null,
    resetKassaContainer: true
  },
  mutations,
  actions
})
