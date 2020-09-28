<template>
  <div class="kassabladen_detail">
    <a-table
      :columns="columns"
      :data-source="kassaData"
      :pagination="true"
      bordered
    >
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'ReportingTable',
  props: ['kassaData', 'columns'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
.kassabladen_detail {
  padding:40px;
}
</style>
