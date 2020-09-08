<template>
  <div>
    <a-list
      bordered
      :data-source="kassaContainersTapper"
      style="text-align:left"
    >
      <a-list-item class="listItem" slot="renderItem" slot-scope="item">
        <!-- <a slot="actions" @click="goToTapblad">edit</a> -->
        <a slot="actions" @click="gotoKassablad(item)">edit</a>
        <a-list-item-meta :description="`Tapper: ${item.naamTapper}`">
          <a slot="title" :href="'http://localhost:3000/#/kassabladentapper/' + item.id">
            {{ moment(item.beginUur).format('DD MMM YYYY, HH:mm') }}
          </a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import moment from 'moment'
import { mapState } from 'vuex'
// import helperFunctions from '../functions/helperFunctions'
// import KassabladListItem from '@/components/Kassabladen/KassabladListItem'

export default {
  name: 'KassabladenTapperLijst',
  components: {
    // KassabladListItem
  },
  data () {
    return {
      locale
    }
  },
  computed: {
    ...mapState(['kassaContainersTapper'])
  },
  mounted () {
  },
  methods: {
    moment,
    gotoKassablad: function (item) {
      this.getKassabladData(item.id)
    },
    getKassabladData: function (id) {
      this.$store.dispatch('fetchKassaContainerTapper', id)
    }
  },
  created () {
    this.$store.dispatch('fetchKassaContainersTapper')
    moment.locale()
  }
}
</script>
<style>
.listItem {
  background-color:white;
}
</style>
