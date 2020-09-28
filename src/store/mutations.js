export default {
  SET_LOADING_STATUS (state, status) {
    state.loadingStatus = status
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
  SET_KASSACONTAINERS_TAPPER (state, data) {
    state.kassaContainersTapper = data
  },
  SET_PROFIT_CHART (state, data) {
    state.profitChartData = data
  },
  SET_BEGIN_VS_END_CHART (state, data) {
    state.beginVsEndChartData = data
  },
  SET_TAPPERDAGEN_CHART (state, data) {
    state.tapperdagenData = data
  },
  SET_TAPPER_CONSUMPTIES_CHART (state, data) {
    state.tapperConsumptieData = data
  },
  SET_KASSABLADEND (state, data) {
    state.kassabladen = data
  },
  SET_TITLE (state, value) {
    state.title = value
  }
}
