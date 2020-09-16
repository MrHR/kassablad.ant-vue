import Vue from 'vue'
import Vuex from 'vuex'
// import moment from 'moment'
import actions from './actions'
import mutations from './mutations'
import kassabladen from './kassabladen'
import consumpties from './consumpties'
// import { List } from 'ant-design-vue'
// import nominations from '@/store/nominations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kassabladen,
    consumpties
  },
  state: {
    debug: false,
    debugUI: false,
    debugStore: false,
    controllerUrl: 'https://localhost:5001/api/',
    loadingStatus: 'notLoading',
    consumptions: [],
    consumptionCounts: [],
    visibleComponent: 'createKassabladButton',
    visibleWrapper: 'beginKassaWrapper',
    profitChartData: null,
    beginVsEndChartData: null,
    kassaContainers: [],
    kassaContainersTapper: [],
    kassaContainerDetail: null,
    resetKassaContainer: true
  },
  mutations,
  actions
})
