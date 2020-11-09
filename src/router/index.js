import Vue from 'vue'
import VueRouter from 'vue-router'
import Kassablad from '../views/Kassablad.vue'
import Callback from '../views/Callback.vue'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Kassablad,
    meta: { title: 'menu.home' },
    redirect: '/dashboard'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/kassablad',
    name: 'Kassablad',
    component: Kassablad
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/kassabladen',
    name: 'Kassabladen',
    component: () => import('../views/Kassabladen.vue')
  },
  {
    path: '/kassabladen/:id',
    name: 'Kassabladen_Detail',
    component: () => import('../views/Kassabladen_Detail.vue')
  },
  {
    path: '/kassabladenTapper',
    name: 'KassabladenTapper',
    component: () => import('../views/KassabladenTapper.vue')
  },
  {
    path: '/reporting',
    name: 'Reporting',
    component: () => import('../views/Reporting.vue')
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store))

export default router
