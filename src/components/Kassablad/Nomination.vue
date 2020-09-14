
<template>
  <div class="nomination">
    <div v-if="toggleElement = count === index">
      <a-form-model-item label="Valuta">
        <span class="nom-item nom-multi nom-multi-left">&euro; {{ multiplier }}</span>
        <span class="nom-item">x</span>
        <a-input-number
          ref="multiplierInput"
          :default-value="item.amount"
          :min="0"
          :max="maxValue"
          :precision="0"
          id="Multiplier"
          v-model="item.amount"
          @pressEnter="goToNextItem(item)"
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
import helperFunctions from '../../functions/helperFunctions.js'

export default {
  name: 'Nomination',
  props: ['item', 'count', 'index', 'next', 'nominations'],
  data () {
    return {
      amount: this.item.amount,
      maxValue: 500,
      toggleElement: false
    }
  },
  methods: {
    goToNextItem (item) {
      this.$emit('goto-next', item)
    }
  },
  computed: {
    nomTotal: function () {
      return helperFunctions.calculatePrice(this.multiplier, this.item.amount)
    },
    multiplier: function () {
      return this.nominations.find(x => x.id === this.item.nominationId).multiplier
    }
  },
  watch: {
    toggleElement (newValue) {
      setTimeout(() => {
        if (this.$refs.multiplierInput) {
          this.$refs.multiplierInput.focus()
        }
      }, 10)
    },
    next (newValue) {
      setTimeout(() => {
        if (this.next && this.count === this.index) {
          this.goToNextItem(this.item)
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
    top:-18px;
    left:-5px;
    right:-5px;
    bottom:0;
    padding:25px 35px 25px 25px;
    border-radius:10px;
    border:1px solid rgb(220, 220, 220);
    background-color:rgb(255, 255, 255);
    /* box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.06); */
    z-index:-1;
  }
  .nomination .ant-form-item-children {
    z-index: 0;
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
