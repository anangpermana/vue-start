import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

import { useAuthStore } from '../store/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        group: 'Dashboard',
        requiredAuth: true
      },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/setting/profile',
      name: 'Profile',
      meta: {
        group: 'Settings',
        requiredAuth: true
      },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        isGuest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name;

  const auth = useAuthStore();
  if(to.meta.requiredAuth && !auth.user) {
    next({name: 'login'})
  }else if (to.meta.isGuest && auth.user) {
    next({name:'Home'})
  }else{
    next()
  }
})


export default router
