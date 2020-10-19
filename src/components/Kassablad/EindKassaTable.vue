<template>
  <a-table :columns="columns" :data-source="eindKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
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
  props: ['kassaContainer', 'beginKassaNominations'],
  data () {
    return {
      columns,
      eindKassaData: []
    }
  },
  mounted: function () {
    console.log('kassaContainer', this.kassaContainer)
    this.beginKassaNominations.forEach(beginNom => {
      const eindNom = this.kassaContainer.endKassaNominations.filter(el => el.nominationId === beginNom.nominationId)[0]
      const multiplier = this.kassaContainer.nominations.filter(x => x.id === eindNom.nominationId)[0].multiplier
      const tempObj = {
        key: eindNom.id * Math.random(),
        multiplier: multiplier,
        beginAantal: beginNom.amount,
        eindAantal: eindNom.amount,
        total: `€ ${helperFunctions.calculatePrice(eindNom.amount, multiplier)}`,
        endTotal: `€ ${helperFunctions.subtractPrices(
          helperFunctions.calculatePrice(eindNom.amount, multiplier),
          helperFunctions.calculatePrice(beginNom.amount, multiplier))
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
