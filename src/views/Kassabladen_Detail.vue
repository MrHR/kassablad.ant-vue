<template>
  <div class="kassabladen_detail">
    <a-table :columns="columns" :data-source="kassaData" :pagination="false" bordered>
      <div slot="multiply" slot-scope="text" class="extraIconWrapper">{{ text }} <a-icon class="extraIcon" type="close" /></div>
      <div slot="equals" slot-scope="text" class="extraIconWrapper">
        <a>€ {{ text }}</a>
        <span class="extraIcon">=</span>
      </div>
      <b slot="difference" slot-scope="text">{{ text }}</b>
    </a-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import helperFunctions from '../functions/helperFunctions'
const columns = [
  {
    title: 'Beginkassa',
    children: [
      {
        title: 'Nominatie',
        dataIndex: 'nomination',
        key: 'nomination',
        width: '14.28%',
        className: 'nomination, right'
      },
      {
        title: 'Begin Aantal',
        dataIndex: 'beginAmount',
        key: 'beginAmount',
        width: '14.28%',
        className: 'amount, right',
        scopedSlots: { customRender: 'multiply' }
      },
      {
        title: 'Begin Totaal',
        dataIndex: 'beginTotal',
        key: 'beginTotal',
        width: '14.28%',
        className: 'end-total, right',
        scopedSlots: { customRender: 'equals' }
      }
    ]
  },
  {
    title: 'Eindkassa',
    children: [
      {
        title: 'Nominatie',
        dataIndex: 'nomination',
        key: 'nomination, right',
        with: '14.28 %',
        className: 'nomination, right'
      },
      {
        title: 'Eind Aantal',
        dataIndex: 'endAmount',
        key: 'endAmount',
        width: '14.28%',
        className: 'amount, right',
        scopedSlots: { customRender: 'multiply' }
      },
      {
        title: 'Eind Totaal',
        dataIndex: 'endTotal',
        key: 'endTotal',
        width: '14.28%',
        className: 'end-total, right',
        scopedSlots: { customRender: 'equals' }
      }
    ]
  },
  {
    title: 'Verschil',
    dataIndex: 'difference',
    key: 'difference',
    width: '14.28%',
    className: 'right',
    scopedSlots: { customRender: 'difference' }
  }
]
export default {
  name: 'Kassabladen_Detail',
  data () {
    return {
      columns,
      kassaData: []
    }
  },
  computed: {
    ...mapState(['kassaContainer'])
  },
  created () {
    this.$store.dispatch('fetchKassaContainer', this.$route.params.id)
  },
  mounted: function () {
  },
  watch: {
    kassaContainer (newValue) {
      this.kassaContainer.beginKassa.nominationList.forEach(beginNom => {
        const eindNom = this.kassaContainer.eindKassa.nominationList
          .filter(endNom => endNom.nominationId === beginNom.nominationId)[0]
        const tempObj = {
          nomination: `€ ${beginNom.nomination.multiplier}`,
          beginAmount: `${beginNom.amount}`,
          beginTotal: `${helperFunctions.calculatePrice(beginNom.amount, beginNom.nomination.multiplier)}`,
          endAmount: `${eindNom.amount}`,
          endTotal: `${helperFunctions.calculatePrice(eindNom.amount, eindNom.nomination.multiplier)}`,
          difference: `€ ${helperFunctions.subtractPrices(
            helperFunctions.calculatePrice(eindNom.amount, eindNom.nomination.multiplier),
            helperFunctions.calculatePrice(beginNom.amount, beginNom.nomination.multiplier))
          }`
        }
        this.kassaData.push(tempObj)
      })
    }
  }
}
</script>
<style>
.kassabladen_detail {
  padding:40px;
}
.kassabladen_detail .ant-table-tbody tr td {
  border-right:0px solid transparent;
  padding:10px;
  background-color: white;
  text-align:center;
}

.kassabladen_detail .ant-table-tbody tr td:nth-child(3),
.kassabladen_detail .ant-table-tbody tr td:nth-child(6) {
  border-right:1px solid #e8e8e8;
}

.kassabladen_detail .extraIconWrapper {
  position:relative;
}

.kassabladen_detail .extraIcon {
  position:absolute;
  left:-15px;
  top:4px;
  opacity:0.2;
}

.kassabladen_detail .iconMultipli svg {
  width:10px;
}
</style>
