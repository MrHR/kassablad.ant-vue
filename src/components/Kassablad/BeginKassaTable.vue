<template>
  <a-table :columns="columns" :data-source="beginKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
import helpers from '../../functions/helperFunctions'
import { mapState } from 'vuex'

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
  props: ['kassaContainer'],
  data () {
    return {
      columns
    }
  },
  computed: {
    kassaNominations: function () {
      return this.kassaContainer.kassaNominations
    },
    multiplier: function () {
      return this.kassaContainer.nominations.find(x => x.id === this.item.nominationId).multiplier
    },
    beginKassaData: function () {
      const noms = []
      const _this = this
      _this.kassaNominations.forEach(item => {
        const nom = {
          amount: item.amount,
          multiplier: _this.multiplier,
          total: `€ ${helpers.calculatePrice(item.amount, _this.multiplier)}`
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
