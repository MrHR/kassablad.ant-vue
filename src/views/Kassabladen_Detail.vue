<template>
  <div class="kassabladen_detail" style="text-align:left">
    <a-card :title="kassaContainerDetail != null && kassaContainerDetail != undefined ? kassaContainerDetail.activiteit  : 'loading...'" style="margin-bottom:30px">
      <ul class="infoList" v-if="kassaContainerDetail != null && kassaContainerDetail != undefined">
        <li><span>Tapper:</span><span>{{ kassaContainerDetail.naamTapper}}</span></li>
        <li v-if="kassaContainerDetail.naamTapperSluit !== kassaContainerDetail.naamTapper">
          <span>Tapper sluit:</span>
          <span>{{ kassaContainerDetail.naamTapperSluit }}</span>
        </li>
        <li><span>Openingsuur:</span><span>{{ moment(kassaContainerDetail.beginUur).format('ddd, DD MMM YYYY, HH:mm') }}</span></li>
        <li><span>Sluitingsuur:</span><span>{{ moment(kassaContainerDetail.eindUur).format('ddd, DD MMM YYYY, HH:mm') }}</span></li>
        <li><span>Bezoekers:</span><span>{{ kassaContainerDetail.bezoekers }}</span></li>
        <li><span>Bedrag naar afroomkluis:</span><span>€ {{ kassaContainerDetail.afroomkluis }}</span></li>
      </ul>
      <div v-if="!kassaContainerDetail && kassaContainerDetail != undefined">loading...</div>
    </a-card>
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
import moment from 'moment'
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
      moment,
      columns,
      kassaData: [],
      kassaContainerDetail: null
    }
  },
  computed: {
    ...mapState(['kassaContainers'])
  },
  created () {
  },
  mounted: function () {
    if (this.kassaContainers.length === 0 || !this.kassaContainers) {
      this.$store.dispatch('fetchKassaContainers').then(() => {
        this.drawKassaContainers()
      })
    } else {
      this.drawKassaContainers()
    }
  },
  watch: {
    kassaContainers (newValue) {
      this.drawKassaContainers()
    }
  },
  methods: {
    drawKassaContainers () {
      // Filter kassacontainer from list
      const kassaContainer = this.kassaContainers
        .filter(kc => kc.id === parseInt(this.$route.params.id))[0]
      this.kassaContainerDetail = kassaContainer
      console.log('this.kassaContainers', this.kassaContainers)
      console.log('id', this.$route.params.id)
      if (kassaContainer) {
        kassaContainer.beginKassa.nominationList.forEach(beginNom => {
          let eindNom = kassaContainer.eindKassa.nominationList
            .filter(endNom => endNom.nominationId === beginNom.nominationId)[0]
          if (!eindNom || eindNom === 'undefined') {
            eindNom = {
              amount: 0,
              nomination: {
                multiplier: 0
              }
            }
            // eindNom.amount = 0
            // eindNom.nomination.multiplier = 0
          }
          const tempObj = {
            key: beginNom.id,
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

.infoList {
  list-style: none;
  padding:0;
  margin:0;
}
.infoList li {
  display: flex;
  justify-content: space-between;
  padding:4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.infoList li span:first-child {
  opacity:0.7;
}
</style>
