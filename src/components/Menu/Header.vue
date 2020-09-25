<template>
  <div id="title">
    <h1>{{ title }}</h1>
    <div class="loading" v-if="loadingStatus == 'loading'">
      <a-icon type="loading" />
    </div>
    <div class="concept" v-if="kassaContainer.concept">
      <a-tag class="loading" color="pink">
        concept
      </a-tag>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['title', 'loadingStatus']),
    ...mapState('kassabladen', ['kassaContainer'])
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
    position:absolute;
    right:20px;
    top:2px;
  }
  .concept {
    position:absolute;
    right:50px;
    top:12px;
    color:rgba(255, 100, 0, 1);
  }
</style>
