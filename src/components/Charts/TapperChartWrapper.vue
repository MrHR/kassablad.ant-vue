<template>
    <div class="tapperChartWrapper">
      <a-card
        class="chartCard"
        :loading="loading"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div v-if="noTitleKey === 'TapperCafedagen'">
          <ProfitChart :profitChartData="tapperdagenData" :stacked="true" />
        </div>
        <div v-if="noTitleKey === 'TapperConsumpties'">
          <ProfitChart :profitChartData="tapperConsumptieData" :stacked="false" />
        </div>
        <a-range-picker @change="onChangeSetChartDate" slot="tabBarExtraContent" style="margin:10px"/>
      </a-card>
    </div>
</template>
<script>
import ProfitChart from '../Charts/ProfitChart'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      size: 'large',
      stacked: false,
      tabListNoTitle: [
        {
          key: 'TapperCafedagen',
          tab: 'Cafédagen per tapper'
        },
        {
          key: 'TapperConsumpties',
          tab: 'Consumptiekost per tapper'
        }
      ],
      noTitleKey: 'TapperCafedagen'
    }
  },
  components: {
    ProfitChart
  },
  computed: {
    ...mapState([
      'tapperdagenData',
      'tapperConsumptieData'
    ])
  },
  methods: {
    onTabChange (key, type) {
      this[type] = key
    },
    onChangeSetChartDate (date, dateString) {
      this.$store.dispatch('fetchTapperdagenChartData', { startDate: dateString[0], endDate: dateString[1] })
      this.$store.dispatch('fetchTapperConsumptieChartData', { startDate: dateString[0], endDate: dateString[1] })
    }
  },
  mounted () {
    this.$store.dispatch('fetchTapperdagenChartData')
    this.$store.dispatch('fetchTapperConsumptieChartData')
  }
}
</script>
<style>
  .ant-tabs-nav-scroll {
    text-align:left;
  }
  .tapperChartWrapper {
    width:100%;
    margin:10px;
    height:450px;
    margin-top:60px;
    background-color: white;
    /* box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.4); */
  }
  .tapperChartWrapper h2 {
    text-align:left;
    padding:10px 10px 0 10px;
  }
  .line {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
