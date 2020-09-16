<template>
  <a-table :columns="columns" :data-source="beginKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
import helpers from '../../functions/helperFunctions'
// import { mapState } from 'vuex'

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
  methods: {
    multiplier: function (item) {
      return this.kassaContainer.nominations.find(x => x.id === item.nominationId).multiplier
    }
  },
  computed: {
    kassaNominations: function () {
      return this.kassaContainer.beginKassaNominations
    },
    beginKassaData: function () {
      const noms = []
      this.kassaContainer.beginKassaNominations.forEach(item => {
        const nom = {
          key: item.key,
          amount: item.amount,
          multiplier: this.multiplier(item),
          total: `€ ${helpers.calculatePrice(item.amount, this.multiplier(item))}`
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
