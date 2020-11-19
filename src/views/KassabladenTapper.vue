<template>
  <div class="kassabladenTapper">
    <KassabladenTapperLijst />
  </div>
</template>

<script>
// @ is an alias to /src
import KassabladenTapperLijst from '@/components/KassabladenTapperLijst.vue'
import moment from 'moment'

export default {
  name: 'KassabladenTapper',
  components: {
    KassabladenTapperLijst
  },
  data () {
    return {
      moment
    }
  }
}
</script>
<style scoped>
.title {
  margin-bottom:100px;
}
.kassabladenTapper {
  padding:20px;
  text-align: left;
}
</style>
