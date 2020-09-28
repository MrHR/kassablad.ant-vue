<template>
  <div class="kassabladenTapper">
    <ReportingPane />
  </div>
</template>

<script>
// @ is an alias to /src
import ReportingPane from '@/components/ReportingPane.vue'

export default {
  name: 'Reporting',
  components: {
    ReportingPane
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
</style>
