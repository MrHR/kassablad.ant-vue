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
  mounted () {
    this.focusInput()
  },
  methods: {
    next () {
      this.$store.dispatch('showComponent', this.nextEl)
    },
    focusInput () {
      this.$refs.createKassabladButton.$el.focus()
    }
  },
  watch: {
    visibleComponent (newValue) {
      console.log('new value is', newValue)
      setTimeout(() => {
        if (this.$refs[newValue]) {
          this.$refs[newValue].focus()
        }
      }, 10)
    }
  }
}
</script>
<style scoped>

</style>
