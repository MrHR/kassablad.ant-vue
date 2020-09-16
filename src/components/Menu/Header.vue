<template>
  <div id="title">
    <h1>{{ title }}</h1>
    <div class="loading" v-if="loadingStatus == 'loading'">
      <a-icon type="loading" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['title', 'loadingStatus'])
  }
}
</script>
<style>
  #title {
    min-width:100%;
  }
  #title h1 {
    display:inline-block;
  }
  .loading {
    float: right;
  }
</style>
