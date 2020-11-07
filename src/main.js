import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
// import oidc from '../node_modules/oidc-client/dist/oidc-client'
import '../node_modules/oidc-client/dist/oidc-client'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Vuelidate)
// Vue.use(Input)
// Vue.use(Form)

Vue.prototype.$http = axios
// Vue.prototype.$form = Form

// eslint-disable-next-line no-unused-vars
var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
