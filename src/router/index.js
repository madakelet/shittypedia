import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/szocikkek/:slug',
      name: 'article',
      component: () => import('@/views/ArticlePage.vue'),
    },
    {
      path: '/kategoria',
      name: 'categories',
      component: () => import('@/views/CategoryPage.vue'),
    },
    {
      path: '/kategoria/:slug',
      name: 'category',
      component: () => import('@/views/CategoryPage.vue'),
    },
    {
      path: '/abc',
      name: 'abc',
      component: () => import('@/views/AbcPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
