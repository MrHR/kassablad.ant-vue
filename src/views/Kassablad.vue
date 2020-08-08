<template>
  <div class="home">
    <StartEvening />
    <EndEvening />
    <Consumptieblad />
  </div>
</template>

<script>
// @ is an alias to /src
import StartEvening from '@/components/StartEvening.vue'
import EndEvening from '@/components/EndEvening.vue'
import Consumptieblad from '@/components/Consumptieblad.vue'

export default {
  name: 'Kassablad',
  components: {
    StartEvening,
    EndEvening,
    Consumptieblad
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
</style>
