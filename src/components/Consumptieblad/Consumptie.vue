<template>
  <div class="consumptieRow">
    <span class="consumptieName">
      <b>{{ consumptie.naam }} </b>
    </span>
    <span style="min-width:30px">€ {{ consumptie.prijs }}</span>
    <span>x</span>
    <span class="consumptieAmount" style="margin-right:10px;min-width:50px;text-align:right;">
      <!-- {{ consumptieAmount }} -->
      <a-form-model-item>
        <a-input-number
          ref="amountInput"
          :default-value="0"
          :min="0"
          :max="1000"
          :precision="0"
          v-model="item.aantal"
        />
      </a-form-model-item>
    </span>
    <span style="min-width:30px">=</span>
    <span style="min-width:40px">€ {{ this.total }}</span>
    <a-button-group class="consumptieButtons">
      <a-button class="subtractConsumptie" :size="size" @click="subtractConsumptie">
        <a-icon type="minus" />
      </a-button>
      <a-button class="consumptie" :size="size" @click="addConsumptie" type="primary">
        <a-icon type="plus" />
      </a-button>
    </a-button-group>
  </div>
</template>
<script>
// import helperFunctions from '../../functions/helperFunctions.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Consumptie',
  props: ['item'],
  data () {
    return {
      size: null,
      disabled: true,
      amount: 0,
      consumptieAmount: 0
    }
  },
  computed: {
    ...mapState('consumpties', ['consumptions', 'consumptionCounts']),
    consumptie: function () {
      return this.consumptions.filter(x => x.id === this.item.consumptieId)[0]
    },
    total: function () {
      return (this.item.aantal * (this.consumptie.prijs * 100)) / 100
    }
  },
  methods: {
    ...mapActions('consumpties', ['updateConsumptionCount', 'createConsumptionCount']),
    addConsumptie () {
      this.item.aantal += 1
      if (!this.item.id) {
        console.log('consumptionCount created')
        this.createConsumptionCount({ item: this.item, consumptieId: this.consumptie.id }) // create consumption count in db
      } else {
        console.log('consumptionCount updated')
        this.updateConsumptionCount(this.item) // update consumption count in db
      }
    },
    subtractConsumptie () {
      if (this.item.aantal > 0) {
        this.item.aantal -= 1
        console.log('consumptionCount updated')
        this.updateConsumptionCount(this.item) // update consumption count in db
      }
    }
  }
}
</script>
<style scoped>
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
