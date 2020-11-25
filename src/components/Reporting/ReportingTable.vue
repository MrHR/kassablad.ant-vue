<template>
  <div class="kassabladen_detail">
    <a-table
      class="reportingTable"
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
.reportingTable table {
  font-size:0.9rem;
}
.reportingTable table td {
  padding:4px;
}
</style>
