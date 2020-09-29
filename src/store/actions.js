import axios from 'axios'

export default {
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
  fetchConsumptionCount (context) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}consumptie?id=${this.state.kassaContainerId}`).then(response => {
      context.commit('SET_CONSUMPTIONS_COUNT', response.data)
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
  fetchTapperdagenChartData (context, data = []) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}chart/tapperdagenchart?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
      context.commit('SET_TAPPERDAGEN_CHART', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  fetchTapperConsumptieChartData (context, data = []) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}chart/tapperconsumptieschart?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
      context.commit('SET_TAPPER_CONSUMPTIES_CHART', response.data)
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
  fetchKassaContainerTapper (context, id) {
    context.commit('SET_LOADING_STATUS', 'loading')
    context.commit('kassabladen/SET_SETKASSANOMINATIONS_BOOL', false)
    context.commit('consumpties/SET_SETCONSUMPTIONCOUNTS_BOOL', true)
    axios.get(`${this.state.controllerUrl}kassacontainer/tapper/${id}`).then(response => {
      context.commit('kassabladen/SET_KASSACONTAINER_TAPPER', response.data)
      context.dispatch('kassabladen/fetchNominations')
      context.dispatch('consumpties/fetchConsumptions')
      // context.commit('kassabladen/SET_KASSACONTAINER', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  fetchKassaContainers (context, data = []) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}kassacontainer/ext?startdate=${data.startDate}&enddate=${data.endDate}`).then(response => {
      context.commit('SET_KASSACONTAINERS', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  fetchKassaContainersTapper (context) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}kassacontainer/tapper`).then(response => {
      context.commit('SET_KASSACONTAINERS_TAPPER', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  fetchExcelReport (context, data = []) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios({
      url: `${this.state.controllerUrl}reporting`,
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.xlsx')
      document.body.appendChild(link)
      link.click()
      console.log('response download excel', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  showComponent (context, componentName) {
    context.commit('SET_VISIBLE_COMPONENT', componentName)
  },
  showWrapper (context, wrapperName) {
    context.commit('SET_VISIBLE_WRAPPER', wrapperName)
  }
}
