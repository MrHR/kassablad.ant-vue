<template>
  <div class="consumptieblad">
    <h2>Hello World</h2>
    <Consumptie consumptieName="Cola"/>
  </div>
</template>
<script>
import locale from 'ant-design-vue/es/date-picker/locale/nl_BE'
import moment from 'moment'
import Consumptie from '@/components/Consumptieblad/Consumptie.vue'

export default {
  name: 'Consumptieblad',
  components: {
    Consumptie
  },
  data () {
    return {
      locale
    }
  },
  computed: {
  },
  methods: {
    moment
  },
  created () {
  },
  watch: {
  }
}
</script>
<style>
  .consumptieblad {
    padding: 50px;
  }
</style>
