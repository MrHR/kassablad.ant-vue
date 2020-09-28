<template>
  <div class="dashboard">
    <ProfitChartWrapper />
    <TapperChartWrapper />
  </div>
</template>

<script>
import ProfitChartWrapper from '../components/Charts/ProfitChartWrapper'
import TapperChartWrapper from '../components/Charts/TapperChartWrapper'

export default {
  name: 'Kassablad',
  components: {
    ProfitChartWrapper,
    TapperChartWrapper
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
