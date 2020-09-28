<script>
// import { Bar } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

var options = {
  responsive: true,
  responsiveAnimationDuration: 100,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 30,
      right: 50,
      top: 50,
      bottom: 50
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true
      }
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
    options.scales.yAxes[0].stacked = this.stacked
    options.scales.xAxes[0].stacked = this.stacked
    this.renderChart(this.profitChartData, options)
  },
  watch: {
    profitChartData (newData) {
      options.scales.yAxes[0].stacked = this.stacked
      options.scales.xAxes[0].stacked = this.stacked
      this.renderChart(this.profitChartData, options)
    }
  }
}
</script>
<style>
</style>
