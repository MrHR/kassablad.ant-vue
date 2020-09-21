<template>
  <div>
    <a-list
      bordered
      :data-source="kassaContainers"
      style="text-align:left"
    >
      <a-list-item class="listItem" slot="renderItem" slot-scope="item">
        <a slot="actions" :href="'http://localhost:3000/#/kassabladen/' + item.id">edit</a>
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
import moment from 'moment'
import 'ant-design-vue/es/date-picker/locale/nl_BE'
import { mapState } from 'vuex'

export default {
  name: 'KassabladenLijst',
  data () {
    return {
      moment
    }
  },
  computed: {
    ...mapState(['kassaContainers'])
  },
  created () {
    this.$store.dispatch('fetchKassaContainers')
  }
}
</script>
<style>
.listItem {
  background-color:white;
}
</style>
