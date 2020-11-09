<template>
  <div class="home">
    <a-card class="card" :title="visibleWrapper === 'consumpiteWrapper' ? 'Consumpties' : ''">
      <KassabladSteps />
      <StartEvening />
      <EndEvening />
      <Consumptieblad />
    </a-card>
  </div>
</template>

<script>
// @ is an alias to /src
import StartEvening from '@/components/StartEvening.vue'
import EndEvening from '@/components/EndEvening.vue'
import Consumptieblad from '@/components/Consumptieblad.vue'
import KassabladSteps from '@/components/Kassablad/KassabladSteps.vue'
import { mapState } from 'vuex'

export default {
  name: 'Kassablad',
  components: {
    StartEvening,
    EndEvening,
    Consumptieblad,
    KassabladSteps
  },
  computed: {
    ...mapState(['visibleWrapper', 'visibleComponent'])
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.home {
  padding:20px;
}

.home .card .ant-card-head {
  text-align:left !important;
}
</style>
