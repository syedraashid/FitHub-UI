import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router