<template>
  <div  v-if="visibleWrapper === 'consumpiteWrapper'" class="consumptieblad">
    <div v-if="this.debug">
      <b>consumptions: </b>{{ consumptions }}<br />
      <b>consumptieCounts: </b>{{ consumptionCounts }}<br />
      <b>totalConsumptionCost: </b>{{ totalConsumptionCost }}<br />
      <b>cosumptionCounts: </b>{{ consumptionCounts }}<br />
    </div>
    <Consumptie
      v-for="(item, index) in consumptionCounts"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item.key || item.id"
    />
    <div class="consumptieRow">
      <span class="consumptieName">
        <b>Total</b>
      </span>
      <span><b>€ {{ totalConsumptionCost }}</b></span>
    </div>
    <a-button @click="showEinde">
      Einde Avond
    </a-button>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import moment from 'moment'
import Consumptie from '@/components/Consumptieblad/Consumptie.vue'
import { mapState, mapActions } from 'vuex'
import helperFunctions from '../functions/helperFunctions'

export default {
  name: 'Consumptieblad',
  components: {
    Consumptie
  },
  data () {
    return {
      locale
    }
  },
  computed: {
    ...mapState([
      'loadingStatus',
      'visibleWrapper'
    ]),
    ...mapState('consumpties', ['consumptions', 'consumptionCounts', 'debug']),
    totalConsumptionCost: function () {
      let totalCost = 0
      this.consumptions.forEach(el => {
        const consumptieCount = this.consumptionCounts.filter(x => x.consumptieId === el.id)[0]
        if (el && consumptieCount) {
          const amount = consumptieCount.aantal
          const prijs = helperFunctions.calculatePriceNoRound(amount, el.prijs)
          totalCost = helperFunctions.sumPrices(totalCost, prijs)
        }
      })
      return totalCost
    }
  },
  methods: {
    moment,
    ...mapActions('consumpties', ['fetchConsumptions']),
    showEinde () {
      this.$store.dispatch('showWrapper', 'eindKassaWrapper')
    }
  },
  created () {
    this.fetchConsumptions()
  }
}
</script>
<style>
  .consumptieblad {
    padding: 50px;
  }
  .consumptieRow {
    display:flex;
    flex-wrap:none;
    align-items:center;
    justify-content:space-between;
    margin:10px;
    padding:5px 5px 15px 5px;
    border-bottom:1px solid #ccc;
    position:relative;
  }
  .consumptieName {
    min-width:100px;
    text-align: left;
  }
  .consumptieRow .consumptieName {
    margin-right:20px;
  }
  .consumptieRow .ant-row {
    margin-bottom:0;
  }
</style>
