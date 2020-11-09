<template>
  <div class="kassabladen">
    <KassabladenLijst />
  </div>
</template>

<script>
// @ is an alias to /src
import KassabladenLijst from '@/components/KassabladenLijst.vue'

export default {
  name: 'Kassabladen',
  components: {
    KassabladenLijst
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.kassabladen {
  padding:20px;
  background-color:rgba(0,0,0,0.03);
  text-align: left;
}
</style>
