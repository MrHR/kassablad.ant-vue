<template>
  <a-card :title="'Kassabladen vandaag: ' + moment().format('DD MMM YYYY')">
    <div slot="extra">
      <a-button icon="sync" @click="refresh" :loading="loadingStatus === 'loading'">
        Refresh
      </a-button>
    </div>
    <a-list
      bordered
      :data-source="kassaContainersTapper"
      style="text-align:left"
    >
      <a-list-item class="listItem" slot="renderItem" slot-scope="item" v-if="item.concept === true">
        <a slot="actions" v-if="item.concept === true" @click="gotoKassablad(item)">finish</a>
        <a slot="actions" v-else @click="gotoKassablad(item)">edit</a>
        <a-list-item-meta :description="`Tapper: ${item.naamTapper} Datum: ${moment(item.beginUur).format('HH:mm')}`">
          <!-- <a slot="title" :href="`${routUrl}/#/kassabladen/${item.id}`"> --> <!--TODO: fix query returns empty on no begin or eindkassa error -->
          <a slot="title" @click="gotoKassablad(item)">
            <b>{{ item.activiteit }}</b>
          </a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import moment from 'moment'
import { mapState } from 'vuex'
// import helpers from '../functions/helperFunctions.js'

export default {
  name: 'KassabladenTapperLijst',
  data () {
    return {
      locale
    }
  },
  computed: {
    ...mapState(['kassaContainersTapper', 'routUrl', 'selectedKeys', 'loadingStatus'])
  },
  methods: {
    moment,
    refresh: function () {
      this.$store.dispatch('fetchKassaContainersTapper') // Fetches all the kassacontainers(only kassaContainer itself)
    },
    // Routes to startEvening page and gets kassaContainer by Id
    gotoKassablad: function (item) {
      this.$store.commit('SET_RESET_KASSACONTAINER', false)
      // this.$store.commit('consumpties/SET_SETCONSUMPTIONCOUNTS_BOOL', true)
      this.$store.dispatch('fetchKassaContainerTapper', item.id).then(() => { // Fetches all kassaContainers with begin- and endkassa + kassanominations
        this.$router.push('kassablad')
        // helpers.setMenuItem(2)
        this.selectedKeys.push(2)
      })
    }
  },
  created () { // On Component created
    this.$store.dispatch('fetchKassaContainersTapper') // Fetches all the kassacontainers(only kassaContainer itself)
    moment.locale()
  }
}
</script>
<style>
.listItem {
  background-color:white;
}
</style>
