import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import LoginView from '../views/AuthDashBoardView.vue'
import GoogleCallback from '../components/googleCallback.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/auth/callback',
    name: 'About',
    component: GoogleCallback
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router