<template>
  <div v-if="visibleComponent === 'createKassabladButton'">
    <a-button
      type="primary"
      ref="createKassabladButton"
      @click="next"
    >
      {{ buttonText }}
    </a-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['buttonText', 'nextEl'],
  computed: {
    ...mapState(['visibleComponent'])
  },
  methods: {
    next () {
      this.$store.dispatch('showComponent', this.nextEl)
    }
  }
}
</script>
<style scoped>

</style>
