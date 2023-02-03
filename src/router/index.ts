import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/layouts/Main.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/<>',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/Home.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/pages/Register.vue')
        }
      ]
    }
  ]
})

export default router
