<template>
  <div>
    <h1>ID: {{ $route.params.id }}</h1>
    <a-table :columns="columns" :data-source="kassaData" :pagination="false" bordered>
      <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
    </a-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import helperFunctions from '../functions/helperFunctions'
const columns = [
  {
    title: 'Begin Aantal',
    dataIndex: 'beginAantal',
    key: 'beginAantal',
    width: '16,6%'
  },
  {
    title: 'Beginwaarde',
    dataIndex: 'beginWaarde',
    key: 'beginWaarde',
    width: '16,6%',
    scopedSlots: { customRender: 'multiplier' }
  },
  {
    title: 'Eind Aantal',
    dataIndex: 'eindAantal',
    key: 'eindAantal',
    width: '16,6%'
  },
  {
    title: 'Eindwaarde',
    dataIndex: 'total',
    key: 'total',
    width: '16,6%',
    scopedSlots: { customRender: 'multiplier' }
  },
  {
    title: 'Verschil',
    dataIndex: 'endTotal',
    key: 'endTotal',
    width: '16,6%'
  }
]
export default {
  name: 'Kassabladen_Detail',
  data () {
    return {
      columns,
      kassaData: []
    }
  },
  computed: {
    ...mapState(['kassaContainer'])
  },
  created () {
    this.$store.dispatch('fetchKassaContainer', this.$route.params.id)
  },
  mounted: function () {
  },
  watch: {
    kassaContainer (newValue) {
      this.cacheData = this.kassaData.map(item => ({ ...item }))
      this.kassaContainer.beginKassa.nominationList.forEach(beginNom => {
        const eindNom = this.kassaContainer.eindKassa.nominationList
          .filter(endNom => endNom.nominationId === beginNom.nominationId)[0]
        const tempObj = {
          multiplier: eindNom.nomination.multiplier,
          beginAantal: `€ ${beginNom.nomination.multiplier} x ${beginNom.amount}`,
          beginWaarde: `${helperFunctions.calculatePrice(beginNom.amount, beginNom.nomination.multiplier)}`,
          eindAantal: `€ ${eindNom.nomination.multiplier} x ${eindNom.amount}`,
          total: `${helperFunctions.calculatePrice(eindNom.amount, eindNom.nomination.multiplier)}`,
          endTotal: `€ ${helperFunctions.subtractPrices(
            helperFunctions.calculatePrice(eindNom.amount, eindNom.nomination.multiplier),
            helperFunctions.calculatePrice(beginNom.amount, beginNom.nomination.multiplier))
          }`
        }
        this.kassaData.push(tempObj)
      })
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
