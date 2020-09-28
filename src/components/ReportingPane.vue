<template>
  <div class="reportingPaneWrapper">
    <a-card
      :loading="loading"
      :tab-list="tabList"
      :active-tab-key="tabListKey"
      @tabChange="key => onTabChange(key, 'tabListKey')"
    >
      <a-range-picker v-model="dateString" @change="OnDateChange" slot="tabBarExtraContent" style="margin:10px"/>
      <a-button slot="tabBarExtraContent" @click="onDownloadExcel">
        <a-icon type="file-excel" />
      </a-button>
      <div v-if="tabListKey === 'rapporteringKasboek'">
        <ReportingTable
          v-bind:kassaData="kassaData"
          v-bind:columns="columns"
        />
      </div>
    </a-card>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import helperFunctions from '../functions/helperFunctions'
import moment from 'moment'
import { mapState } from 'vuex'
import ReportingTable from '@/components/Reporting/ReportingTable.vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Datum',
    dataIndex: 'datum',
    key: 'datum'
  },
  {
    title: 'Dag',
    dataIndex: 'dag',
    key: 'dag'
  },
  {
    title: 'Openingsuur',
    dataIndex: 'beginUur',
    key: 'beginUur'
  },
  {
    title: 'Activiteit',
    dataIndex: 'activiteit',
    key: 'Activiteit'
  },
  {
    title: 'Einduur',
    dataIndex: 'eindUur',
    key: 'eindUur'
  },
  {
    title: 'Aantal uren geopend',
    dataIndex: 'geopendeUren',
    key: 'endAmount'
  },
  {
    title: 'Naam Tapper',
    dataIndex: 'naamTapper',
    key: 'naamTapper'
  },
  {
    title: 'Afgesloten door',
    dataIndex: 'naamTapperSluit',
    key: 'naamTapperSluit'
  },
  {
    title: 'Inkomsten',
    dataIndex: 'inkomsten',
    key: 'inkomsten'
  },
  {
    title: 'Aantal geschatte bezoekers',
    dataIndex: 'bezoekers',
    key: 'bezoekers'
  }
]

export default {
  name: 'KassabladenTapperLijst',
  data () {
    return {
      columns,
      locale,
      kassaData: [],
      loading: false,
      dateString: '',
      tabList: [
        {
          key: 'rapporteringKasboek',
          tab: 'Rapportering Kasboek'
        }
      ],
      tabListKey: 'rapporteringKasboek'
    }
  },
  components: {
    ReportingTable
  },
  computed: {
    ...mapState([
      'kassaContainers',
      'routUrl'
    ])
  },
  mounted () {
    if (this.kassaContainers.length === 0 || !this.kassaContainers) {
      this.$store.dispatch('fetchKassaContainers')
    } else {
      this.drawLines()
    }
  },
  watch: {
    kassaContainers (newValue) {
      this.drawLines()
    }
  },
  methods: {
    moment,
    onDownloadExcel (e) {
      const dateStrings = this.dateString.map(date => moment(date).format('YYYY-MM-DD'))
      console.log('download excel', dateStrings)
      this.$store.dispatch('fetchExcelReport', { startDate: dateStrings[0], endDate: dateStrings[1] })
    },
    onTabChange (key, type) {
      this[type] = key
    },
    OnDateChange (date, dateString) {
      this.$store.dispatch('fetchKassaContainers', { startDate: dateString[0], endDate: dateString[1] })
    },
    drawLines () {
      // Filter kassacontainer from list
      const kassaLines = []
      this.kassaContainers.forEach(kassaContainer => {
        let inkomsten = 0
        if (kassaContainer.beginKassa) {
          kassaContainer.beginKassa.nominationList.forEach(nom => {
            inkomsten += helperFunctions.calculatePrice(nom.nomination.multiplier, nom.amount) || 0
          })
          const reportLine = {
            key: kassaContainer.id,
            datum: `${moment(kassaContainer.beginUur).format('DD-MM-YYYY')}`,
            dag: `${moment(kassaContainer.beginUur).format('ddd')}`,
            beginUur: `${moment(kassaContainer.beginUur).format('hh:mm')}`,
            activiteit: `${kassaContainer.activiteit}`,
            eindUur: `${moment(kassaContainer.eindUur).format('hh:mm')}`,
            geopendeUren: `${Math.round(moment.duration(moment(new Date(kassaContainer.eindUur)).diff(moment(kassaContainer.beginUur))).asHours())}`,
            naamTapper: `${kassaContainer.naamTapper}`,
            naamTapperSluit: `${kassaContainer.naamTapperSluit}`,
            bezoekers: `${kassaContainer.bezoekers}`,
            inkomsten: `${inkomsten}`
          }
          kassaLines.push(reportLine)
        }
        this.kassaData = kassaLines
      })
    }
  }
}
</script>
<style>
.listItem {
  background-color:white;
}
.ant-tabs-nav-scroll {
  text-align:left;
}
.reportingPaneWrapper {
  margin:10px;
}
</style>
