<template>
  <div class="kassabladenTapper">
    <KassabladenTapperLijst />
  </div>
</template>

<script>
// @ is an alias to /src
import KassabladenTapperLijst from '@/components/KassabladenTapperLijst.vue'

export default {
  name: 'KassabladenTapper',
  components: {
    KassabladenTapperLijst
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.kassabladenTapper {
  padding:20px;
}
</style>
