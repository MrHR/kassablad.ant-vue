import axios from 'axios'
import moment from 'moment'

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
    axios.get(`${this.state.controllerUrl}kassacontainer/tapper/${id}`).then(response => {
      context.commit('SET_KASSACONTAINER_TAPPER', response.data)
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
  fetchKassaContainersTapper (context) {
    context.commit('SET_LOADING_STATUS', 'loading')
    axios.get(`${this.state.controllerUrl}kassacontainer/tapper`).then(response => {
      context.commit('SET_KASSACONTAINERS_TAPPER', response.data)
      context.commit('SET_LOADING_STATUS', 'notLoading')
    })
  },
  showComponent (context, componentName) {
    context.commit('SET_VISIBLE_COMPONENT', componentName)
  },
  showWrapper (context, wrapperName) {
    context.commit('SET_VISIBLE_WRAPPER', wrapperName)
  },
  createKassaContainer (context, kassaType) {
    context.commit('SET_LOADING_STATUS', 'loading')
    console.log('kassaContainer Id ', this.state.kassaContainerId)
    // Do this on start evening
    if (this.state.kassaContainerId === 0) {
      axios.post(`${this.state.controllerUrl}kassacontainer`, {
        beginUur: moment(this.state.kassaContainer.beginUur).format('YYYY-MM-DDThh:mm:ss'),
        eindUur: moment(this.state.beginUur).add('4', 'hours').format('YYYY-MM-DDThh:mm:ss'),
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
    } else if (this.state.kassaContainerId !== 0 && kassaType === 'end') { // do this on end evening
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
        console.log('response', response)
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
        nominationId: el.nominationId,
        amount: el.amount
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
}
