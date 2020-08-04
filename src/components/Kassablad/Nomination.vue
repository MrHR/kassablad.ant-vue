
<template>
  <div class="nomination">
    <div v-if="toggleElement = count === index">
      <a-form-model-item label="Valuta">
        <span class="nom-item nom-multi nom-multi-left">&euro; {{ item.multiplier }}</span>
        <span class="nom-item">x</span>
        <a-input-number
          ref="multiplierInput"
          :default-value="item.defaultAmount"
          :min="0"
          :max="maxValue"
          :precision="0"
          id="Multiplier"
          v-model="amount"
          @pressEnter="goToNextItem(item)"
          @change="updateAmount(item, amount)"
          @focus="$event.target.select()"
          help="De waarde moet een nummer zijn, lager dan ${maxValue}"
        />
        <span class="nom-item nom-item-equal">=</span>
        <span class="nom-item nom-multi nom-multi-right">&euro; {{ nomTotal }}</span>
      </a-form-model-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nomination',
  props: ['item', 'count', 'index', 'value', 'next'],
  data () {
    return {
      amount: this.item.defaultAmount,
      tickCounter: 0,
      maxValue: 500,
      toggleElement: false
    }
  },
  methods: {
    updateAmount (item, amount) {
      item.defaultAmount = amount
      item.total = `€ ${this.nomTotal}`
    },
    goToNextItem (item) {
      this.$emit('goto-next', item)
    }
  },
  computed: {
    nomTotal: function () {
      return ((this.item.multiplier * 100) * this.amount) / 100
    }
  },
  mounted: function () {
    this.tickCounter = 0
  },
  watch: {
    toggleElement (newValue) {
      setTimeout(() => {
        this.tickCounter++
        if (this.$refs.multiplierInput) {
          this.$refs.multiplierInput.focus()
        }
      }, 10)
    },
    next (newValue) {
      setTimeout(() => {
        if (this.next && this.count === this.index) {
          // console.log('next', this.next, 'item 2', this.item, 'amount 2', this.amount)
          this.goToNextItem(this.item, this.amount)
        }
      }, 10)
    }
  }
}
</script>
<style>
  .nomination .ant-form-item-children::before {
    content:'';
    position:absolute;
    top:-16px;
    left:-5px;
    right:-5px;
    bottom:0;
    padding:25px 35px 25px 25px;
    border-radius:10px;
    border:1px solid rgb(240, 240, 240);
    background-color:rgb(250, 250, 250);
    /* box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.06); */
    z-index:-1;
  }
  .nom-multi {
    display:inline-block;
    width:40px;
    text-align:left;
  }
  .nom-multi-left {
    width:40px;
    margin-right:5px !important;
    margin-left:15px !important;
  }
  .nom-multi-right {
    width:80px;
    text-align: right;
  }
  .nom-item {
    margin: 0 15px 0 0;
  }
  .nom-item-equal {
    text-align:right;
    margin:0 0 0 50px;
  }
</style>
