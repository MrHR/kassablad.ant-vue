<script>
import { Bar } from 'vue-chartjs'
import { mapState } from 'vuex'

var options = {
  responsive: true,
  responsiveAnimationDuration: 100,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 40,
      right: 80,
      top: 60,
      bottom: 60
    }
  },
  scales: {
    xAxes: [{
      barPercentage: 0.3,
      stacked: true
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      stacked: false
    }]
  }
}

export default {
  extends: Bar,
  computed: {
    ...mapState(['profitChartData'])
  },
  mounted () {
    this.$store.dispatch('fetchProfitChartData')
  },
  watch: {
    profitChartData (newData) {
      setTimeout(() => {
        this.renderChart(this.profitChartData, options)
      }, 10)
    }
  }
}
</script>
<style>
</style>
