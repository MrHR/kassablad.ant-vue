<template>
  <div class="consumptieRow">
    <span class="consumptieName">
      <b>{{ consumptieName }} </b>
    </span>
    <span style="min-width:30px">€ {{ this.item.prijs }}</span>
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
          v-model="consumptieAmount"
        />
      </a-form-model-item>
    </span>
    <span style="min-width:30px">=</span>
    <span style="min-width:40px">€ {{ this.item.total }}</span>
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
import helperFunctions from '../../functions/helperFunctions.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Consumptie',
  props: ['item', 'consumptieName'],
  data () {
    return {
      size: null,
      disabled: true,
      amount: 0,
      consumptieAmount: 0
    }
  },
  computed: {
    ...mapState('consumpties', ['consumptions', 'consumptionCounts'])
  },
  methods: {
    ...mapActions('consumpties', ['updateConsumption', 'createConsumption']),
    addConsumptie () {
      this.consumptieAmount += 1
      this.item.aantal = this.consumptieAmount
      if (!this.item.consumptieCountId) {
        this.createConsumption(this.item) // create consumption count in db
      } else {
        this.updateConsumption(this.item) // update consumption count in db
      }
    },
    subtractConsumptie () {
      if (this.consumptieAmount > 0) {
        this.consumptieAmount -= 1
        this.item.aantal = this.consumptieAmount
        this.updateConsumption(this.item) // update consumption count in db
      }
    }
  },
  watch: {
    consumptieAmount (newValue) {
      // Update Row Total
      this.item.total = helperFunctions.calculatePrice(newValue, this.item.prijs)
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
