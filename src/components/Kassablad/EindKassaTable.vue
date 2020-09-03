<template>
  <a-table :columns="columns" :data-source="eindKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
import { mapState } from 'vuex'
import helperFunctions from '../../functions/helperFunctions'
const columns = [
  {
    title: 'Nominatie',
    dataIndex: 'multiplier',
    width: '20%',
    key: 'multiplier',
    scopedSlots: { customRender: 'multiplier' }
  },
  {
    title: 'Begin Aantal',
    dataIndex: 'beginAantal',
    key: 'beginAantal',
    width: '20%'
  },
  {
    title: 'Aantal',
    dataIndex: 'eindAantal',
    key: 'eindAantal',
    width: '20%'
  },
  {
    title: 'Totaal',
    dataIndex: 'total',
    key: 'total',
    width: '20%',
    scopedSlots: { customRender: 'total' }
  },
  {
    title: 'Verschil',
    dataIndex: 'endTotal',
    key: 'endTotal',
    width: '20%'
  }
]
export default {
  name: 'EindKassaTable',
  props: ['nominations'],
  data () {
    return {
      columns,
      eindKassaData: []
    }
  },
  computed: {
    ...mapState(['beginKassaNominations'])
  },
  mounted: function () {
    // this.cacheData = this.eindKassaData.map(item => ({ ...item }))
    this.beginKassaNominations.forEach(beginNom => {
      const eindNom = this.nominations.filter(el => el.id === beginNom.id)[0]
      const tempObj = {
        multiplier: eindNom.multiplier,
        beginAantal: beginNom.defaultAmount,
        eindAantal: eindNom.defaultAmount,
        total: eindNom.total,
        endTotal: `€ ${helperFunctions.subtractPrices(
          helperFunctions.calculatePrice(eindNom.defaultAmount, eindNom.multiplier),
          helperFunctions.calculatePrice(beginNom.defaultAmount, beginNom.multiplier))
        }`
      }
      this.eindKassaData.push(tempObj)
    })
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.ant-table-row {
  background-color:white !important;
}
.ant-table-row {
  background-color:white !important;
}
</style>
