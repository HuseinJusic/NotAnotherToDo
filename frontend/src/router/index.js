import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Logout')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register')
  },
  {
    path: '/notanothertodo',
    name: 'NotAnotherToDo',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "notanothertodo" */ '../views/NotAnothertoDo')
  },
  {
    path: '/notanothertodo/edit/:id?',
    name: 'TodoEdit',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "notanothertodo" */ '../views/todo/Edit')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
