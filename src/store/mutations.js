import moment from 'moment'

export default {
  SET_LOADING_STATUS (state, status) {
    state.loadingStatus = status
  },
  SET_NOMINATIONS (state, nominations) {
    const noms = []
    nominations.forEach(nom => {
      const Nom = {
        kassaId: this.state.kassaId,
        nominationId: nom.id,
        amount: nom.defaultAmount,
        multiplier: nom.multiplier
      }
      noms.push(Nom)
    })
    state.nominations = noms
    if (state.debug) console.log('set Nominations triggered with', nominations)
    if (state.debug) console.log('set Noms triggered with', noms)
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
  SET_KASSACONTAINER (state, data) {
    state.kassaContainer = data
    state.kassaContainer.naamTapperSluit = state.kassaContainer.naamTapper
    state.kassaContainerId = data.id
  },
  SET_KASSACONTAINER_TAPPER (state, data) {
    console.log('beginUur', data.beginUur)

    state.resetKassaContainer = false
    state.kassaContainer.id = data.id
    state.kassaContainer.beginUur = moment(data.beginUur)
    state.kassaContainer.eindUur = moment()
    state.kassaContainer.naamTapper = ''
    state.kassaContainer.naamTapperSluit = ''
    state.kassaContainer.Errors = []
    state.kassaContainer.bezoekers = 0
    state.kassaContainer.afroomkluis = 0.00
    state.kassaContainer = data
    state.kassaContainerId = data.id
    state.kassaId = data.beginKassa.id
    var nominations = []
    data.beginKassa.nominationList.forEach(item => {
      var nomination = {
        id: item.id,
        active: item.active,
        dateAdded: item.dateAdded,
        dateUpdated: item.dateUpdated,
        updatedBy: item.UpdateBy,
        createdBy: item.createdBy,
        nomination: item.nomination,
        multiplier: item.nomination.multiplier,
        amount: item.amount,
        total: `€ ${item.amount * item.nomination.multiplier}`
      }
      nominations.push(nomination)
    })
    state.beginKassaNominations = nominations
    state.nominations = nominations

    console.log('kassaContainer', state.kassaContainer)
    console.log('nominations', state.nominations)
    console.log('begin nominations', state.beginKassaNominations)
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
  SET_KASSABLADEND (state, data) {
    state.kassabladen = data
  },
  ADD_KASSA (state, data) {
    state.kassas.push(data)
    console.log('add kassa', data.id)
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
      bezoekers: 0,
      afroomkluis: 0.00
    }
  }
}
