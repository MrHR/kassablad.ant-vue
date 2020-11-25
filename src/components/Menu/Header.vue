<template>
  <div id="title">
    <!-- Titel van app - wordt gehaald uit de huidige kassablad activiteit -->
    <h1>{{ title }}</h1>
    <div class="content-right">
      <!-- Tag om aan te duiden of het tapblad en concept is -->
      <a-tag
        class="concept"
        v-if="kassaContainer.concept &&
          (visibleWrapper === 'beginKassaWrapper'
            || visibleWrapper === 'consumpiteWrapper'
            || visibleWrapper === 'eindKassaWrapper')"
        color="pink"
      >
        concept
      </a-tag>
      <!-- Popover met info over gebruiker -->
      <a-popover placement="bottom">
        <template slot="content">
          <p>{{ oidcUser.email }}</p>
          <a-button @click="signOutOidc">
            Log Out
          </a-button>
        </template>
        <template slot="title">
          <span>Info</span>
        </template>
        <a-avatar v-if="oidcUser" shape="square" icon="user" id="avatar" size="small" class="loggedIn"/>
      </a-popover>
    </div>
    <!-- Loading icon -->
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
    ...mapGetters(['oidcUser'])
  },
  methods: {
    ...mapActions(['signOutOidc'])
  }
}
</script>
<style>
  #title {
    width:calc(100% - 16px);
    height:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    float:right;
    padding-left:20px;
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
    background-color: #87d068 !important;
  }
</style>
