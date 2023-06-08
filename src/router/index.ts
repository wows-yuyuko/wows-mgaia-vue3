import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/layout/Lyout.vue'),
      redirect: '/playerInfo',
      children: [
        {
          path: '/playerInfo',
          name: 'PlayerInfo',
          component: () => import('@/views/player/PlayerInfo.vue')
        }
      ]
    }
  ]
})

export default router
