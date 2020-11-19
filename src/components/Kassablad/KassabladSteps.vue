<template>
  <a-steps size="small" :current="0" class="steps" v-if="visibleComponent !== 'createKassabladButton' || visibleWrapper === 'consumpiteWrapper'">
    <a-step status="finish" title="Open de kassa">
      <span slot="description">Vul info in en tel de kassa</span>
      <a-icon v-if="visibleWrapper === 'beginKassaWrapper'" slot="icon" type="loading" />
      <a-icon v-else slot="icon" type="idcard" />
    </a-step>
    <a-step status="finish" title="Consumptieblad">
      <span slot="description">Hou als tapper je consumpties bij</span>
      <a-icon v-if="visibleWrapper === 'consumpiteWrapper'" slot="icon" type="loading" />
      <a-icon v-else slot="icon" type="solution" />
    </a-step>
    <a-step status="finish" title="Sluit het café">
      <span slot="description">Vul info in en tel de kassa</span>
      <a-icon v-if="visibleWrapper === 'eindKassaWrapper'" slot="icon" type="loading" />
      <a-icon v-else slot="icon" type="euro" />
    </a-step>
  </a-steps>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['visibleWrapper', 'visibleComponent'])
  }
}
</script>

<style>
.steps {
  justify-content: space-between !important;
  text-align: left;
  padding:20px 15% !important;
}
</style>
