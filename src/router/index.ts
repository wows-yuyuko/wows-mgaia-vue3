import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    redirect: '/player',
    children: [
      {
        path: 'player',
        component: () => import('@/views/player/Player.vue')
      },
      {
        path: 'clan',
        component: () => import('@/views/clan/Clan.vue')
      },
      {
        path: 'ships',
        component: () => import('@/views/ships/Ships.vue')
      },
      {
        path: 'shipModel',
        component: () => import('@/views/shipModel/ShipModel.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
