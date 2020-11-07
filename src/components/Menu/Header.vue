<template>
  <div id="title">
    <h1>{{ title }}</h1>
    <div class="content-right">
      <a-tag class="concept" v-if="kassaContainer.concept && (visibleWrapper === 'beginKassaWrapper' || visibleWrapper === 'consumpiteWrapper' || visibleWrapper === 'eindKassaWrapper')" color="pink">
        concept
      </a-tag>
      <a-avatar v-if="oidcUser" shape="square" icon="user" id="avatar" size="small" @click="signOutOidc"/>
    </div>
    <a-icon class="loading" v-if="loadingStatus == 'loading'" type="loading" />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['title', 'loadingStatus', 'visibleWrapper']),
    ...mapState('kassabladen', ['kassaContainer']),
    ...mapState('users', ['loggedIn']),
    ...mapGetters(['oidcUser'])
  },
  methods: {
    login () {
    },
    ...mapActions(['signOutOidc'])
  },
  watch: {
    loggedIn (newValue) {
      switch (newValue) {
        case true:
          document.getElementById('avatar').classList.add('loggedIn')
          console.log('logged in ', document.getElementById('avatar').classList)
          break
        case false:
          document.getElementById('avatar').classList.remove('loggedIn')
          console.log('logged out ', document.getElementById('avatar').classList)
          break
      }
    }
  }
}
</script>
<style>
  #title {
    min-width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  #title h1 {
    display:inline-block;
    margin:0;
  }
  .loading {
    display:inline-block;
    position:absolute;
    right:17px;
  }
  .content-right {
    float:right;
    display:flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
  }
  .content-right div:first-child, .content-right i.loading {
    padding: 10px;
  }
  .concept {
    display: inline-block;
    color:rgba(255, 100, 0, 1);
  }
  #avatar {
    cursor:pointer;
  }
  #avatar:hover {
    background-color: #bbbbbb;
  }
  .loggedIn {
    background-color: #87d068;
  }
</style>
