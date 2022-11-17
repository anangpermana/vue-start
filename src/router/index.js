import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../store/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiredAuth: true
      }
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
  const auth = useAuthStore();
  if(to.meta.requiredAuth && !auth.user) {
    next({name: 'login'})
  }else if (to.meta.isGuest && auth.user) {
    next({name:'home'})
  }else{
    next()
  }
})


export default router
