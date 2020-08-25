<template>
    <div class="profitChartWrapper">
      <a-card
        :loading="loading"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div v-if="noTitleKey === 'profitChart'">
          <ProfitChart :profitChartData="profitChartData" :stacked="false"/>
        </div>
        <div v-if="noTitleKey === 'beginVsEindChart'">
          <ProfitChart :profitChartData="beginVsEndChartData" :stacked="true" />
        </div>
        <a-range-picker @change="onChangeSetProfitChartDate" slot="tabBarExtraContent" style="margin:10px"/>
      </a-card>
    </div>
</template>
<script>
import ProfitChart from '../Charts/ProfitChart'
import { mapState } from 'vuex'

export default {
  components: {
    ProfitChart
  },
  computed: {
    ...mapState([
      'profitChartData',
      'beginVsEndChartData'
    ])
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
    },
    onChangeSetProfitChartDate (date, dateString) {
      console.log('date', date, 'datestring', dateString)
      this.$store.dispatch('fetchProfitChartData', { startDate: dateString[0], endDate: dateString[1] })
      this.$store.dispatch('fetchBeginVsEndChartData', { startDate: dateString[0], endDate: dateString[1] })
    }
  },
  mounted () {
    this.$store.dispatch('fetchProfitChartData')
    this.$store.dispatch('fetchBeginVsEndChartData')
  },
  data () {
    return {
      loading: false,
      size: 'large',
      tabListNoTitle: [
        {
          key: 'profitChart',
          tab: 'Opbrengsten per avond'
        },
        {
          key: 'beginVsEindChart',
          tab: 'Begin-kassa vs Eind-kassa'
        }
      ],
      noTitleKey: 'profitChart'
    }
  }
}
</script>
<style>
  .ant-tabs-nav-scroll {
    text-align:left;
  }
  .profitChartWrapper {
    width:100%;
    margin:10px;
    height:450px;
    background-color: white;
    /* box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.4); */
  }
  .profitChartWrapper h2 {
    text-align:left;
    padding:10px 10px 0 10px;
  }
  .line {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
