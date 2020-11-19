<template>
  <a-config-provider>
    <div id="app">
      <a-layout>
        <!--left side menu -->
        <a-layout-sider class="sider">
        <div class="logo"/>
          <a-menu theme="dark" mode="inline" :defaultSelectedKeys="selectedKeys">
            <a-menu-item key="2" id="2">
              <router-link to="/kassablad">
                <a-icon type="form" />
                <span>Nieuw kassablad</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="5" id="5">
              <router-link to="/kassabladentapper">
                <a-icon type="container" />
                <span>Kassabladen van {{ moment().format('DD MMM') }}</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="4" id="4">
              <router-link to="/kassabladen">
                <a-icon type="database" />
                <span>Cafédagen</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3" id="3">
              <router-link to="/dashboard">
                <a-icon type="dashboard" />
                <span>Dashboard</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="6" id="6">
              <router-link to="/reporting">
                <a-icon type="area-chart" />
                <span>Rapportering</span>
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <!--top header and content -->
        <a-layout>
          <a-layout-header id="header">
            <Header/>
          </a-layout-header>
          <a-layout-content>
            <router-view/>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>
<script>
import { mapState } from 'vuex'
import Header from '../src/components/Menu/Header.vue'
import moment from 'moment'

export default {
  components: {
    Header
  },
  data () {
    return {
      // selectedKeys: []
      moment,
      config: null,
      mgr: null
    }
  },
  computed: {
    ...mapState(['selectedKeys', 'version'])
  },
  created () {
    // set selected menu item on startup
    setTimeout(() => {
      const menuItem = document.getElementsByClassName('router-link-exact-active')[0]
      if (menuItem) {
        this.selectedKeys.push(menuItem.parentElement.id)
      }
    }, 10)
  },
  mounted () {
  },
  watch: {
    $route (to, from) {
      console.log('changing route', to.name)
      if (to.name === 'Kassablad') {
        this.$store.commit('SET_VISIBLE_COMPONENT', 'createKassabladButton')
        this.$store.commit('SET_VISIBLE_WRAPPER', 'beginKassaWrapper')
      } else {
        this.$store.commit('SET_VISIBLE_WRAPPER', '')
      }
    }
  }
}
</script>
<style lang="scss" :version="version">
.ant-layout {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:block;
  min-height:100%;
  .ant-layout {
    min-height:100vh;
  }
  .ant-layout-header {
    background-color:white;
    box-shadow:0 5px 5px rgba(20, 20, 20, 0.01);
  }
  .ant-layout-sider {
    box-shadow:5px 0 4px rgba(20, 20, 20, 0.01);
    max-width:250px !important;
    min-width:250px !important;
    .ant-menu, .ant-menu li {
      text-align:left;
    }
  }
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#header {
  text-align:left;
  height:50px;
  line-height:50px;
}

.logo {
  margin:30px 0;
  height:100px;
  width:100%;
  box-sizing: border-box;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image:url('../src/assets/0.5x/logo_bronneken.svg');
}
</style>
