<template>
  <div>
    <a-list
      bordered
      :data-source="kassaContainersTapper"
      style="text-align:left"
    >
      <a-list-item class="listItem" slot="renderItem" slot-scope="item">
        <a slot="actions" @click="gotoKassablad(item)">edit</a>
        <a-list-item-meta :description="`Tapper: ${item.naamTapper} Datum: ${moment(item.beginUur).format('DD MMM YYYY, HH:mm')}`">
          <a slot="title" :href="`${routUrl}/#/kassabladen/${item.id}`">
            <b>{{ item.activiteit }}</b>
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
// import helpers from '../functions/helperFunctions.js'

export default {
  name: 'KassabladenTapperLijst',
  data () {
    return {
      locale
    }
  },
  computed: {
    ...mapState(['kassaContainersTapper', 'routUrl', 'selectedKeys'])
  },
  methods: {
    moment,
    gotoKassablad: function (item) {
      this.$store.commit('SET_RESET_KASSACONTAINER', false)
      this.$store.dispatch('fetchKassaContainerTapper', item.id).then(() => {
        this.$router.push('kassablad')
        // helpers.setMenuItem(2)
        this.selectedKeys.push(2)
      })
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
