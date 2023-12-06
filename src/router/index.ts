import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/v2'),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/player',
      children: [
        {
          path: '/player',
          name: 'Player',
          component: () => import('@/views/player/Player.vue')
        },
        {
          path: '/clan',
          name: 'Clan',
          component: () => import('@/views/clan/Clan.vue')
        },
        {
          path: '/shipList',
          name: 'ShipList',
          component: () => import('@/views/shipList/ShipList.vue')
        },
        {
          path: '/banLike',
          name: 'BanLike',
          component: () => import('@/views/banLike/BanLike.vue')
        },
        {
          path: '/rankingList',
          name: 'RankingList',
          component: () => import('@/views/rankingList/RankingList.vue')
        },
        {
          path: '/other',
          name: 'Other',
          component: () => import('@/views/other/Other.vue')
        }

      ]
    }
  ]
})

export default router
