<template>
  <div>
    testing
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Callback',
  methods: {
    ...mapActions([
      'oidcSignInCallback'
    ])
  },
  mounted () {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        console.log('redirecting to path', redirectPath)
        this.$router.push(redirectPath)
      })
      .catch((err) => {
        // console.log('Error', err)
        console.error('error etc.', err)
        // this.$router.push('/oidc-callback-error') // Handle errors any way you want
      })
  }
}
</script>
