<template>
  <div>
    <a-list
      bordered
      :data-source="kassaContainers"
      style="text-align:left"
    >
      <a-list-item class="listItem" slot="renderItem" slot-scope="item">
        <a slot="actions">edit</a>
        <a-list-item-meta
          :description="'' + item.type"
        >
          <a slot="title" :href="'http://localhost:3000/#/kassabladen/' + item.id">Tapper: {{ item.naamTapper }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>{{ moment(item.beginUur).format('DD MMM YYYY, HH:mm') }}</div>
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
  name: 'KassabladenLijst',
  components: {
    // KassabladListItem
  },
  data () {
    return {
      locale
    }
  },
  computed: {
    ...mapState(['kassaContainers'])
  },
  mounted () {
  },
  methods: {
    moment
  },
  created () {
    this.$store.dispatch('fetchKassaContainers')
    moment.locale()
  }
}
</script>
<style>
.listItem {
  background-color:white;
}
</style>
