export default {
  SET_LOADING_STATUS (state, status) {
    state.loadingStatus = status
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
    for (const i in state.consumptions) {
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
  SET_KASSACONTAINERS (state, data) {
    state.kassaContainers = data
  },
  SET_KASSACONTAINER (state, data) {
  },
  SET_KASSACONTAINERS_TAPPER (state, data) {
    state.kassaContainersTapper = data
  },
  SET_PROFIT_CHART (state, data) {
    state.profitChartData = data
  },
  SET_BEGIN_VS_END_CHART (state, data) {
    state.beginVsEndChartData = data
  },
  SET_KASSABLADEND (state, data) {
    state.kassabladen = data
  }
}
