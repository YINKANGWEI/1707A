import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/about',
  name: 'about',
  component: () => import('../views/About.vue')
}, {
  path: '/login',
  component: () => import('../views/Login/login.vue')
},{
  path: '/registry',
  component: () => import('../views/Registry/registry.vue')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
