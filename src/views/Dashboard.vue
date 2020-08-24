<template>
  <div class="dashboard">
    <ProfitChartWrapper />
  </div>
</template>

<script>
import ProfitChartWrapper from '../components/Charts/ProfitChartWrapper'

export default {
  name: 'Kassablad',
  components: {
    ProfitChartWrapper
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.dashboard {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding:20px;
}
</style>
