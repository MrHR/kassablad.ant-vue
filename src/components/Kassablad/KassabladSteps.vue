<template>
  <a-steps class="steps" v-if="visibleComponent !== 'createKassabladButton'">
    <a-step status="finish" title="Open het café">
      <a-icon v-if="visibleWrapper === 'beginKassaWrapper'" slot="icon" type="loading" />
      <a-icon v-else  slot="icon" type="idcard" />
    </a-step>
    <a-step status="finish" title="Consumptieblad">
      <a-icon v-if="visibleWrapper === 'consumpiteWrapper'" slot="icon" type="loading" />
      <a-icon v-else slot="icon" type="solution" />
    </a-step>
    <a-step status="finish" title="Sluit het café">
      <a-icon v-if="visibleWrapper === 'eindKassaWrapper'" slot="icon" type="loading" />
      <a-icon v-else slot="icon" type="euro" />
    </a-step>
    <a-step status="wait" title="Tot de volgende!">
      <a-icon slot="icon" type="smile-o" />
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
  padding:3rem 0 !important;
}
</style>
