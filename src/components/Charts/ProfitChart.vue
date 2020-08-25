<script>
// import { Bar } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

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
      stacked: true
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  plugins: {
    filler: {
      propagate: true
    }
  }
}

export default {
  extends: Bar,
  props: ['profitChartData', 'stacked'],
  mounted () {
    if (this.stacked) {
      options.scales.yAxes.stacked = this.stacked
    }
    this.renderChart(this.profitChartData, options)
  },
  watch: {
    profitChartData (newData) {
      setTimeout(() => {
        if (this.stacked) {
          options.scales.yAxes[0].stacked = this.stacked
        }
        this.renderChart(this.profitChartData, options)
      }, 10)
    }
  }
}
</script>
<style>
</style>
