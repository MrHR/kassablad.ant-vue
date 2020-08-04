<template>
  <a-table :columns="columns" :data-source="beginKassaData" :pagination="false" bordered>
    <a slot="multiplier" slot-scope="text">€ {{ text }}</a>
  </a-table>
</template>
<script>
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
    dataIndex: 'defaultAmount',
    key: 'defaultAmount',
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
    // console.log(this.cacheData)
    return {
      beginKassaData: [],
      columns
    }
  },
  mounted: function () {
    this.beginKassaData = this.nominations
    this.cacheData = this.beginKassaData.map(item => ({ ...item }))
    // console.log('beginKassaCashedData', this.cacheData)
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
