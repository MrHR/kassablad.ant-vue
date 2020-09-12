<template>
  <a-table :columns="columns" :data-source="beginKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
import helpers from '../../functions/helperFunctions'
const columns = [
  {
    title: 'Nominatie',
    dataIndex: 'multiplier',
    width: '33%',
    key: 'multiplier',
    scopedSlots: { customRender: 'multiplier' }
  },
  {
    title: 'Aantal',
    dataIndex: 'amount',
    key: 'amount',
    width: '33%'
  },
  {
    title: 'Totaal',
    dataIndex: 'total',
    key: 'total',
    width: '33%',
    scopedSlots: { customRender: 'total' }
  }
]
export default {
  name: 'BeginKassaTable',
  props: ['nominations'],
  data () {
    return {
      columns
    }
  },
  computed: {
    beginKassaData: function () {
      const noms = []
      this.nominations.forEach(item => {
        const nom = {
          amount: item.amount,
          multiplier: item.multiplier,
          total: `€ ${helpers.calculatePrice(item.amount, item.multiplier)}`
        }
        noms.push(nom)
      })
      return noms
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
