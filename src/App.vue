<template>
  <a-config-provider>
    <div id="app">
      <a-layout>
        <!--side menu -->
        <a-layout-sider>
          <a-menu theme="dark" mode="inline" :defaultSelectedKeys="selectedKeys">
            <a-menu-item key="2" id="2">
              <router-link to="/kassablad">
                <a-icon type="form" />
                <span>Kassablad</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="5" id="5">
              <router-link to="/kassabladentapper">
                <a-icon type="container" />
                <span>Tapbladen Vandaag</span>
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

export default {
  components: {
    Header
  },
  data () {
    return {
      // selectedKeys: []
    }
  },
  computed: {
    ...mapState(['selectedKeys'])
  },
  created () {
    setTimeout(() => {
      const menuItem = document.getElementsByClassName('router-link-exact-active')[0]
      this.selectedKeys.push(menuItem.parentElement.id)
    }, 10)
  },
  watch: {
    $route (to, from) {
      if (from.name === 'Kassablad') {
        this.$store.commit('SET_VISIBLE_COMPONENT', 'createKassabladButton')
        this.$store.commit('SET_VISIBLE_WRAPPER', 'beginKassaWrapper')
      }
    }
  }
}
</script>
<style lang="scss">
.ant-layout {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
