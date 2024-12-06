import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

const _afterAuthenticated = (isAuthenticated: boolean, next: NavigationGuardNext) => {
  if (isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}

router.beforeEach(async (to: RouteLocationNormalized, __: unknown, next: NavigationGuardNext) => {
  const { isAuthenticated } = useAuthStore()
  const _isRequiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (_isRequiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    _afterAuthenticated(!_isRequiresAuth && isAuthenticated, next)
  }
})

export default router
