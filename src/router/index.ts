import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    redirect: '/player',
    children: [
      {
        // 战绩信息
        path: 'player',
        component: () => import('@/views/player/Player.vue')
      },
      {
        // 舰队（还没做）
        path: 'clan',
        component: () => import('@/views/clan/Clan.vue')
      },
      {
        // 单船数据
        path: 'ships',
        component: () => import('@/views/ships/Ships.vue')
      },
      {
        // 单船服务器平均数据
        path: 'serverShips',
        component: () => import('@/views/serverShips/ServerShips.vue')
      },
      {
        // 单船服务器平均数据 日度图表
        path: 'serverShipsAvgEchart',
        component: () => import('@/views/serverShipsAvgEchart/ServerShipsAvgEchart.vue')
      },
      {
        // 排行榜
        path: 'leaderboard',
        component: () => import('@/views/leaderboard/Leaderboard.vue')
      },
      {
        // 开箱模拟
        path: 'container',
        component: () => import('@/views/container/Container.vue')
      },
      {
        // 相关下载
        path: 'relatedDownloads',
        component: () => import('@/views/relatedDownloads/RelatedDownloads.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
