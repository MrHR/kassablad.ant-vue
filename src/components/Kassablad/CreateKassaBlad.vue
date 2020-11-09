<template>
  <div v-if="visibleComponent === 'createKassabladButton'" class="kassabladButton">
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
      setTimeout(() => {
        if (this.$refs.createKassabladButton) {
          this.$refs.createKassabladButton.$el.focus()
        }
      }, 10)
    }
  },
  watch: {
    visibleComponent (newValue) {
      setTimeout(() => {
        if (this.$refs[newValue]) {
          this.$refs[newValue].$el.focus()
        }
      }, 10)
    }
  }
}
</script>
<style scoped>
.kassabladButton {
  text-align:center;
}
</style>
