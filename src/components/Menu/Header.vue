<template>
  <div id="title">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['title'])
  }
}
</script>
<style lang="scss">
</style>
