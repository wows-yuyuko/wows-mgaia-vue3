<script setup lang="ts">
// 个人综合
import { ref, onMounted, nextTick, onActivated } from 'vue'
import PlayerInfoOverview from './component/PlayerInfoOverview.vue'
import Avatar from './component/Avatar.vue'
import { Search, Promotion, Delete } from '@element-plus/icons-vue'
import { setLocalStorage } from '@/utils/storage'
import { wowsLog, accountSearchUserList, accountPlatformBindList, accountUserInfo, accountShipInfoList, accountRecentListV2 } from '@/api/wows/wows'
import { getWinColor, getDamageColor, getPrShowObj } from '@/utils/getColor'
import usePlayer, { Player } from '@/store/player'
import lodash from 'lodash'
import moment from 'moment'
import * as echarts from 'echarts'
import n404 from '@/assets/404.png'
import { ElMessage } from 'element-plus'
import { buildBattlesEchart, buildRecentBattlesEchart } from './hooks/buildChart'
import { Base64 } from 'js-base64'
import { useRoute } from 'vue-router'
const player = usePlayer()
const query = ref('')
const queryMode = ref('userName')
const searchUserListLoading = ref(false)

// 如果浏览器地址栏有参数则直接查询
const route = useRoute()
// 详情展示
const infoShow = ref(false)
// 搜索出的用户列表
const searchUserList = ref<{
  accountId: number,
  userName: string,
  server: string
}[]>([])
// 远程搜索方法
const remoteMethodAccountSearchUserList = () => {
  query.value = query.value.trim()
  if (query.value === '') {
    return null
  }
  searchUserListLoading.value = true
  // 用户名 userName
  // QQ号(限绑定) qq
  // accountId
  switch (queryMode.value) {
    case 'userName':
      searchUserListByUserName()
      break
    case 'qq':
      searchUserListByQq()
      break
    case 'accountId':
      searchUserByAccountId()
      break
    default:
      break
  }
}

// 通过用户名模糊查询列表
const searchUserListByUserName = () => {
  wowsLog({ type: '查用户', server: player.server, userName: query.value })
  accountSearchUserList({ server: player.server, userName: query.value, limit: 5 }).then(
    response => {
      searchUserList.value = response.data
      searchUserListLoading.value = false
    }
  ).catch(() => {
    searchUserListLoading.value = false
  })
}

// 通过绑定qq查询列表
const searchUserListByQq = () => {
  wowsLog({ type: '查用户', platformType: 'QQ', platformId: query.value })
  accountPlatformBindList({ platformType: 'QQ', platformId: query.value }).then(
    response => {
      for (const user of response.data) {
        user.server = user.serverType
      }
      searchUserList.value = response.data
      searchUserListLoading.value = false
    }
  ).catch(() => {
    searchUserListLoading.value = false
  })
}

// 通过绑定accountId查询
const searchUserByAccountId = () => {
  accountUserInfo({ server: player.server, accountId: parseInt(query.value) }).then(
    response => {
      searchUserList.value = [{
        accountId: parseInt(query.value),
        userName: response.data.userInfo.userName,
        server: player.server
      }]
      searchUserListLoading.value = false
    }
  ).catch(() => {
    searchUserListLoading.value = false
  })
}

// 翻译服务器
const translateServer = (server: string) => {
  const getServer = (el:{key: string, value: string}) => {
    return el.key === server
  }

  if (player.serverList.find(getServer)) {
    return player.serverList.find(getServer)?.value
  } else {
    return server
  }
}

// 点击选择账号
const submitPlayer = (playerItem: Player) => {
  if (lodash.isNil(playerItem.server) || playerItem.server === '') playerItem.server = player.server
  wowsLog({ type: '查信息', ...playerItem })
  getUserInfo(playerItem)
}

const playerInfo = ref()
const loading = ref(false)
// 查询用户总体信息
const getUserInfo = (playerItem: Player) => {
  battlesEchart.clear()
  loading.value = true
  // 拿用户综合统计信息
  accountUserInfo({ server: playerItem.server, accountId: playerItem.accountId }).then(
    response => {
      // 查到数据后再加入历史
      // 存在qq号的情况 导致服务器不统一   反向覆写一下
      player.setServer(playerItem.server)
      player.player.accountId = playerItem.accountId
      player.player.server = playerItem.server
      player.player.userName = response.data.userInfo.userName
      playerItem.userName = response.data.userInfo.userName
      player.addHistoryPlayer(playerItem)
      // 切地址栏
      history.replaceState(null, document.title, `${window.location.href.split('?')[0]}?server=${player.player.server}&accountId=${player.player.accountId}`)
      playerInfo.value = response.data
      playerInfo.value.accountId = playerItem.accountId
      infoShow.value = true
      loading.value = false
      // echarts.init()
      // 构建战斗图表
      buildBattlesEchart(response.data.battleCount, battlesEchart)
      nextTick(() => {
        echartsResize()
      })
    }
  ).catch(() => {
    loading.value = false
  })
  // 拿用户单船数据
  // 拿近期数据 先做清空
  recentDate.value = {}
  recentDay.value = ''
  recentSevenDate.value = {}
  getUserRecent(playerItem)
}

const battlesDiv = ref<HTMLElement|null>(null)
let battlesEchart!: echarts.ECharts
onMounted(() => {
  battlesEchart = echarts.init(battlesDiv.value as HTMLElement)
  if (!lodash.isNil(route.query.server) && !lodash.isNil(route.query.accountId)) {
    getUserInfo({ server: route.query.server as string, accountId: parseInt(route.query.accountId as string), userName: '' })
  }
})
// const getUserShip = (playerItem: Player) => {
//   battlesEchart.clear()
//   accountShipInfoList({ server: playerItem.server, accountId: playerItem.accountId + '' })
//     .then(response => {
//       // 扔store里 方便船只列表用
//       player.playerShips = response.data.shipInfo
//       // 将船分类整合
//       const classifyShip: any = {}
//       for (const ship of player.playerShips) {
//         debugger
//         // 构建数据结构 先进性判空初始化
//         if (lodash.isNil(classifyShip[ship.shipInfo.level])) {
//           classifyShip[ship.shipInfo.level] = {}
//         }
//         if (lodash.isNil(classifyShip[ship.shipInfo.level][ship.shipInfo.shipType])) {
//           classifyShip[ship.shipInfo.level][ship.shipInfo.shipType] = {}
//         }
//         if (lodash.isNil(classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles)) {
//           classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles = 0
//           classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].wins = 0
//         }
//         classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles += ship.shipInfo.battles
//         classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].wins += ship.shipInfo.wins
//       }
//       // 构建战斗图表
//       buildBattlesEchart(classifyShip, battlesEchart)
//       nextTick(() => {
//         echartsResize()
//       })
//     })
// }

// 刷新图表操作
const echartsResize = () => {
  recentBattlesEchart?.resize()
  battlesEchart?.resize()
}
// 页面变动时刷新图表
window.addEventListener('resize', () => {
  echartsResize()
})
// keep-alive激活时调用
onActivated(() => {
  if (player.player.accountId !== 0 && (lodash.isNil(playerInfo.value) || player.player.accountId !== playerInfo.value.accountId)) {
    getUserInfo({ server: player.server as string, accountId: player.player.accountId, userName: '' })
  }
  echartsResize()
})
// 获取玩家近期数据
const recentDate = ref<any>({})
const recentDay = ref('') // 当前选中的日期
const recentSevenDate = ref<any>({}) // 近七天数据统计
const recentBattlesDiv = ref<HTMLElement|null>(null)
let recentBattlesEchart!: echarts.ECharts
const getUserRecent = async (playerItem: Player) => {
  // 获取近期数据
  accountRecentListV2({ ...playerItem }).then(
    response => {
      // 近七天各种数据统计
      let countBattles = 0
      let countPr = 0
      let countDamage = 0
      let countWins = 0
      let countXp = 0
      let countKd = 0
      let countHit = 0
      // 场次图表所需要的数据
      const battlesEchartData: any[] = []
      for (const dayData of response.data.shipData) {
        // 统计七天均值
        countBattles += dayData.pvpInfo.battles
        countPr += dayData.pvpInfo.pr.value * dayData.pvpInfo.battles
        countWins += dayData.pvpInfo.wins * dayData.pvpInfo.battles
        countDamage += dayData.pvpInfo.damage * dayData.pvpInfo.battles
        countXp += dayData.pvpInfo.xp * dayData.pvpInfo.battles
        countKd += dayData.pvpInfo.kd * dayData.pvpInfo.battles
        countHit += dayData.pvpInfo.hit * dayData.pvpInfo.battles

        const dateKey = moment(dayData.recordDateTime).format('YYYY-MM-DD')
        // 构建图表详情所需数据
        battlesEchartData.push({
          battles: dayData.pvpInfo.battles,
          winColor: getWinColor(dayData.pvpInfo.wins),
          date: dateKey
        })
        // 近期每天数据整理
        recentDate.value[dateKey] = dayData
        // 船列表默认显示有数据的最后一个
        if (dayData.pvpInfo.battles > 0) {
          recentDay.value = dateKey
        }
      }
      recentSevenDate.value.pr = getPrShowObj(lodash.floor(countPr / countBattles))
      recentSevenDate.value.pvp = {
        battles: countBattles,
        wins: lodash.round(countWins / countBattles, 2),
        damage: lodash.floor(countDamage / countBattles),
        xp: lodash.floor(countXp / countBattles),
        kd: lodash.round(countKd / countBattles, 2),
        hit: lodash.round(countHit / countBattles, 2)
      }
      // 配置近期战斗图表
      recentBattlesEchart = echarts.init(recentBattlesDiv.value as HTMLElement)
      buildRecentBattlesEchart(battlesEchartData, recentDate, recentBattlesEchart)
      recentBattlesEchart.on('click', (params) => {
        // 控制台打印数据的名称
        recentDay.value = params.name
      })
      nextTick(() => {
        echartsResize()
      })
    }
  )
}
const closeInfoShow = () => {
  infoShow.value = false
  player.playerShips = []
}

// getUserInfo({ server: 'eu', accountId: 558241106, userName: 'missile_gaia' })

// 复制文字信息
const copyCommand = (text:string) => {
  navigator.clipboard.writeText(text).then(() => {
    // 剪贴板设置成功
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }, () => {
    // 剪贴板写入失败
    ElMessage.error('复制失败！ 可能没开权限 请手打命令吧')
    ElMessage.error(text)
  })
}

const copyUrl = () => {
  copyCommand(`${window.location.href.split('?')[0]}?server=${player.player.server}&accountId=${player.player.accountId}`)
}

// 删除某个玩家的历史缓存
const deleteHistoryPlayer = (playerItem: Player) => {
  const index = player.historyPlayer.indexOf(playerItem)
  if (index < 0) return null
  player.historyPlayer.splice(index, 1)
  // 更新localStorage存储
  setLocalStorage('historyPlayer', player.historyPlayer)
}
</script>

<template>
  <div v-loading="loading" class="main-content" element-loading-background="rgba(122, 122, 122, 0.5)">
    <div class="main-content-top">
      <div class="background">
        <div class="portrait">
          <img style=" padding-top: 40px;" src="https://mgaia.oss-cn-hangzhou.aliyuncs.com/wows/yuyuko_3.png">
          <!-- <img src="@/assets/portrait/mgaia_boom.png"> -->
          <img src="https://mgaia.oss-cn-hangzhou.aliyuncs.com/wows/mgaia_boom.png">
        </div>
      </div>
    </div>
    <div v-show="!infoShow" style="position: relative;    padding-bottom: 50px;">
      <div style="display: flex;justify-content: center;overflow: hidden;">
        <el-space direction="vertical" class="query-input" fill :size="20">
          <el-input
            v-model="query"
            placeholder="搜索玩家"
            @keyup.enter="remoteMethodAccountSearchUserList"
          >
            <template #prepend>
              <el-select v-model="queryMode" placeholder="Select" style="width: 130px">
                <el-option label="用户名" value="userName" />
                <el-option label="QQ号(限绑定)" value="qq" />
                <el-option label="accountId" value="accountId" />
              </el-select>
            </template>
            <template #append>
              <el-button :icon="Search" :loading="searchUserListLoading" @click="remoteMethodAccountSearchUserList" />
            </template>
          </el-input>
          <!-- 卡片展示人员列表 -->
          <el-card>
            <template #header>
              <div class="card-header">
                <span>{{ searchUserList.length>0?'搜索结果':'历史搜索' }}</span>
                <el-button v-show="searchUserList.length>0" class="button" text @click="searchUserList = [];">清空</el-button>
              </div>
            </template>
            <div v-for="user in (searchUserList.length>0)?searchUserList:player.historyPlayer" :key="user.accountId" style="display: flex;padding-bottom: 3px;">
              <div v-if="!['7048454946', 7048454946, '7049850854', 7049850854].includes(user.accountId)" class="player-item" @click="submitPlayer(user)">
                <div style="width: 50%;">{{ user.userName }}</div>
                <div>{{ translateServer(user.server?user.server:player.server) }}</div>
                <div>{{ user.accountId }}</div>
              </div>
              <div v-if="!['7048454946', 7048454946, '7049850854', 7049850854].includes(user.accountId)" style="padding-left: 20px;">
                <el-button
                  link
                  type="info"
                  size="small"
                  @click="copyCommand('wws 特殊绑定 '+(user.server?user.server:player.server)+' '+user.accountId)"
                >
                  复制绑定命令
                </el-button>
                <el-button v-if="searchUserList.length<1" :icon="Delete" size="small" circle @click="deleteHistoryPlayer(user)" />
              </div>
            </div>
          </el-card>
        </el-space>
      </div>
    </div>
    <div v-show="infoShow" style="position: relative; display:flex; justify-content: center;">
      <div class="palyer-info">
        <!-- 头部基础信息 -->
        <div class="player-top">
          <div>
            <div style="display: flex;">
              <Avatar :account-id="player.player.accountId" />
              <div class="name-info">
                <span v-show="playerInfo?.userInfo?.clanInfo?.tag" :style="{color: playerInfo?.userInfo?.clanInfo?.colorRgb}">[{{ playerInfo?.userInfo?.clanInfo?.tag }}]</span>
                <span :class="player.avatarMap[player.player.accountId]?'mirage-text':''">{{ playerInfo?.userInfo?.userName }}</span>
                <!-- <sup class="like">{{ playerInfo?.karma }}</sup> 此数据暂时无效 -->
                <span v-show="playerInfo?.lastDateTime > 0" class="registration-time">最后战斗: {{ moment(playerInfo?.lastDateTime*1000).format('YYYY-MM-DD') }}</span>
              </div>
            </div>
          </div>
          <el-button :icon="Promotion" :loading="searchUserListLoading" @click="copyUrl()">复制分享链接</el-button>
          <el-button :icon="Search" @click="closeInfoShow()" />
        </div>
        <!-- 概览信息 -->
        <div class="overview">
          <PlayerInfoOverview :pr="playerInfo?.prInfo" :pvp="playerInfo?.battleTypeInfo" :dwp-data-v-o="playerInfo?.dwpData" />
          <el-divider />
          <!-- 组队和排位情况 -->
          <div class="overview-team">
            <div>
              <div class="account-title">单野</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.battleTypeInfo?.PVP_SOLO?.shipInfo.battleInfo.battle }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.battleTypeInfo?.PVP_SOLO.prInfo.color}">{{ playerInfo?.battleTypeInfo?.PVP_SOLO.prInfo.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.avgInfo.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.avgInfo.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.avgInfo.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.hitRatioInfo.ratioAtba }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.battleTypeInfo?.PVP_SOLO.shipInfo.avgInfo.win }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">自行车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.battleInfo.battle }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.battleTypeInfo?.PVP_DIV2.prInfo.color}">{{ playerInfo?.battleTypeInfo?.PVP_DIV2.prInfo.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.avgInfo.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.avgInfo.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.avgInfo.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.hitRatioInfo.ratioAtba }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.battleTypeInfo?.PVP_DIV2.shipInfo.avgInfo.win }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">装甲车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.battleInfo.battle }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.battleTypeInfo?.PVP_DIV3.prInfo.color}">{{ playerInfo?.battleTypeInfo?.PVP_DIV3.prInfo.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.avgInfo.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.avgInfo.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.avgInfo.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.hitRatioInfo.ratioAtba }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.battleTypeInfo?.PVP_DIV3.shipInfo.avgInfo.win }}%</div>
              </div>
            </div>
            <div v-show="playerInfo?.rankSolo?.battles > 0">
              <div class="account-title">排位赛</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.battleInfo.battle }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.battleTypeInfo?.RANK_SOLO.prInfo.color}">{{ playerInfo?.battleTypeInfo?.RANK_SOLO.prInfo.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.avgInfo.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.avgInfo.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.avgInfo.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.hitRatioInfo.ratioAtba }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.battleTypeInfo?.RANK_SOLO.shipInfo.avgInfo.win }}%</div>
              </div>
            </div>
          </div>
          <el-divider />
          <!-- 各种类船只数据 -->
          <div class="overview-ship">
            <table class="table-wows ships-detail-stats">
              <thead>
                <tr>
                  <th class="icon"><div class="icon-ship"></div></th>
                  <th class="name">战舰</th>
                  <th class="value">
                    <div class="icon-battles"></div>
                    <span>场次</span>
                  </th>
                  <th class="value">
                    <div class="icon-battles"></div>
                    <span>PR</span>
                  </th>
                  <th class="value">
                    <div class="icon-wins"></div>
                    <span>胜率</span>
                  </th>
                  <th class="value">
                    <div class="icon-damage"></div>
                    <span>场均</span>
                  </th>
                  <th class="value">
                    <div class="icon-hit"></div>
                    <span>命中</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="icon"><div class="icon-dd"></div></td>
                  <td class="name">驱逐舰</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.battleInfo.battle }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.shipTypeInfo.Destroyer.PVP.prInfo.color}">
                      {{ playerInfo?.shipTypeInfo.Destroyer.PVP.prInfo.value }} {{ playerInfo?.shipTypeInfo.Destroyer.PVP.prInfo.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.win }}%</td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.damageData.color}">{{ playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.damage }}</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Destroyer.PVP.shipInfo.hitRatioInfo.ratioMain }}%</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-ca"></div></td>
                  <td class="name">巡洋舰</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.battleInfo.battle }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.shipTypeInfo.Cruiser.PVP.prInfo.color}">
                      {{ playerInfo?.shipTypeInfo.Cruiser.PVP.prInfo.value }} {{ playerInfo?.shipTypeInfo.Cruiser.PVP.prInfo.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.win }}%</td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.damageData.color}">{{ playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.damage }}</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Cruiser.PVP.shipInfo.hitRatioInfo.ratioMain }}%</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-bb"></div></td>
                  <td class="name">战列舰</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.battleInfo.battle }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.shipTypeInfo.Battleship.PVP.prInfo.color}">
                      {{ playerInfo?.shipTypeInfo.Battleship.PVP.prInfo.value }} {{ playerInfo?.shipTypeInfo.Battleship.PVP.prInfo.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.win }}%</td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.damageData.color}">{{ playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.damage }}</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Battleship.PVP.shipInfo.hitRatioInfo.ratioMain }}%</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-cv"></div></td>
                  <td class="name">航空母舰</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.battleInfo.battle }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.shipTypeInfo.AirCarrier.PVP.prInfo.color}">
                      {{ playerInfo?.shipTypeInfo.AirCarrier.PVP.prInfo.value }} {{ playerInfo?.shipTypeInfo.AirCarrier.PVP.prInfo.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.win }}%</td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.damageData.color}">{{ playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.damage }}</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.AirCarrier.PVP.shipInfo.hitRatioInfo.ratioAtba }}%</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-ss"></div></td>
                  <td class="name">潜艇</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.battleInfo.battle }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.shipTypeInfo.Submarine.PVP.prInfo.color}">
                      {{ playerInfo?.shipTypeInfo.Submarine.PVP.prInfo.value }} {{ playerInfo?.shipTypeInfo.Submarine.PVP.prInfo.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.winsData.color}">{{ playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.win }}%</td>
                  <td class="value" :style="{color: playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.damageData.color}">{{ playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.damage }}</td>
                  <td class="value">{{ playerInfo?.shipTypeInfo.Submarine.PVP.shipInfo.hitRatioInfo.ratioTpd }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 图表展示 -->
          <el-divider />
          <div>
            <!-- 战斗数图表 -->
            <div ref="battlesDiv" class="battles-div"></div>
          </div>
          <el-divider />
          <div>
            <!-- 近期数据 -->
            <div class="recent-select">
              <div class="label">
                <el-tooltip
                  effect="dark"
                  content=""
                  placement="bottom-start"
                >
                  <template #content>
                    需要通过bot在yuyuko平台绑定QQ号才会统计近期数据<br />
                    recent是基于你绑定账号那天起,服务器会在每日凌晨开始记录你的战绩数据,所以理论上是第一天绑定第二天才可以查询当日的数据.<br />
                    recent计算方式: <br />
                    按照日期存档点至下一个存档点区间的战斗记录;<br />
                    未到下一存档点则是最新日期存档点至今的战斗记录。查询时请注意查看日期的记录时间<br />
                    服务器可能宕机导致存档点丢失  不保证记录日期准确性<br />
                    常见问题：<br />
                    1.我绑定了为什么查不到,可能是服务器那几天宕机了导致没数据,建议看看公告近期是否有宕机.<br />
                    2.如果你是以前绑定的现在请重新绑定一次,之前的记录清理了<br />
                    3.recent会定期清理掉,隐藏战绩的账号,一个月没有玩的账号<br />
                  </template>
                  <span>近30日统计<sup>?</sup></span>
                </el-tooltip>
              </div>
            </div>
            <div v-show="recentDay!==''">
              <PlayerInfoOverview :pr="recentSevenDate.pr" :pvp="recentSevenDate.pvp" :dwp-data-v-o="{}" />
              <!-- 近期船图表 -->
              <div ref="recentBattlesDiv" class="battles-div"></div>
              <!-- 近期船数据 -->
              <div class="recent-select">
                <div class="label">
                  <span>每日详情</span>
                </div>
                <div style="font-size: 20px;color: white;text-align: right;flex-grow: 1;"><span>{{ recentDay }}</span></div>
              </div>
              <div class="overview-ship">
                <table class="table-wows ships-detail-stats">
                  <thead>
                    <tr>
                      <th class="icon"></th>
                      <th class="name">战舰</th>
                      <th class="value">
                        <div class="icon-battles"></div>
                        <span>场次</span>
                      </th>
                      <th class="value">
                        <div class="icon-battles"></div>
                        <span>PR</span>
                      </th>
                      <th class="value">
                        <div class="icon-wins"></div>
                        <span>胜率</span>
                      </th>
                      <th class="value">
                        <div class="icon-damage"></div>
                        <span>场均</span>
                      </th>
                      <th class="value">
                        <div class="icon-hit"></div>
                        <span>命中</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="ship of recentDate[recentDay]?.shipData" :key="ship.shipInfo.shipInfo.nameEnglish">
                      <tr v-if="ship.shipInfo.battles > 0">
                        <td class="icon"><img style="width:150px" :src="ship.shipInfo.shipInfo.imgSmall" /></td>
                        <td class="name">{{ ship.shipInfo.shipInfo.nameCn }}</td>
                        <td class="value">{{ ship.shipInfo.battles }}</td>
                        <td class="value">
                          <span :style="{color: ship.shipInfo.pr?.color}">
                            {{ ship.shipInfo?.pr?.value }} {{ ship.shipInfo?.pr?.name }}
                          </span>
                        </td>
                        <td class="value" :style="{color: getWinColor(ship.shipInfo.wins)}">{{ ship.shipInfo.wins }}%</td>
                        <td class="value" :style="{color: getDamageColor(ship.shipInfo.shipInfo.shipType, ship.shipInfo.damage)}">{{ ship.shipInfo.damage }}</td>
                        <td class="value">{{ ship.shipInfo.hit }}</td>
                      </tr>
                    </template>
                    <template v-for="ship of recentDate[recentDay]?.shipData" :key="ship.rankSolo.shipInfo.nameEnglish">
                      <tr v-if="ship.rankSolo.battles > 0">
                        <td class="icon"><img style="width:150px" :src="ship.rankSolo.shipInfo.imgSmall" /></td>
                        <td class="name">{{ ship.rankSolo.shipInfo.nameCn }}(rank)</td>
                        <td class="value">{{ ship.rankSolo.battles }}</td>
                        <td class="value">
                          <span :style="{color: ship.rankSolo.pr?.color}">
                            {{ ship.rankSolo?.pr?.value }} {{ ship.rankSolo?.pr?.name }}
                          </span>
                        </td>
                        <td class="value" :style="{color: getWinColor(ship.rankSolo.wins)}">{{ ship.rankSolo.wins }}%</td>
                        <td class="value" :style="{color: getDamageColor(ship.rankSolo.shipInfo.shipType, ship.rankSolo.damage)}">{{ ship.rankSolo.damage }}</td>
                        <td class="value">{{ ship.rankSolo.hit }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <el-empty v-show="recentDay===''" description="暂无数据" :image="n404" />
          </div>
        </div>
      </div>
    </div>
    <div style="flex-grow: 1;"></div>
    <div class="bottom-info">
      <div style="padding-bottom: 5px;">
        @本心  yuyuko战绩bot搭建：
        <a href="https://www.bilibili.com/video/BV1r5411X7pr" target="_Blank">Hikari搭建教程</a>
        <a href="https://github.com/benx1n/HikariBot" target="_Blank">Hikari(一键安装)github</a>
        <a href="https://gitee.com/benx1n/HikariBot" target="_Blank">Hikari(一键安装)gitee</a>

        <a href="https://github.com/benx1n/wows-stats-bot" target="_Blank">Hoshino(动手能力较强)github</a>
        <a href="https://gitee.com/benx1n/wows-stats-bot" target="_Blank">Hoshino(动手能力较强)gitee</a>
      </div>
      <div>
        <span>yuyuko群(有bot可绑定)：872725671</span> &ensp;&ensp;&ensp; <span>网页及憨批系列工具反馈群：578477683</span> &ensp;&ensp;&ensp; <span>战舰世界开发者交流群：967546463</span>
        &ensp;&ensp;&ensp; <span>@missile_gaia</span>&ensp;&ensp;&ensp;<span>@西行寺雨季</span>
      </div>
      <div>
        兵工厂：
        <a href="https://armory.wowsgame.cn/zh-cn/" target="_Blank">国服</a>
        <a href="https://armory.worldofwarships.asia/zh-sg/" target="_Blank">亚服</a>
        <a href="https://armory.worldofwarships.eu/zh-sg/" target="_Blank">欧服</a>
        <a href="https://armory.worldofwarships.com/zh-sg/" target="_Blank">美服</a>
        <a href="https://armory.worldofwarships.ru/zh-sg/" target="_Blank">毛服</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.bottom-info {
  background: #252525;
  color #a7a7a7
  padding 10px
  text-align center

  a{
    color #a7a7a7
    padding 0 5px
    text-decoration:none
  }
  a:hover{
    color #f7f7f7
  }
}
.recent-select{
  display flex
  padding 20px 10px
  align-items center
  padding-bottom 20px
  .label {
    font-family: "RobotoCondensed", sans-serif;
    font-size: 30px;
    color: #ffab34;
    padding-right 40px
  }
}

.portrait{
  width: 100%
  height 100%
  position: absolute;
  user-select: none;
  display flex
  justify-content space-between
  &>img{
    height 100%
  }
}
.main-content {
  background-color: $global-v-page-background-color;
  min-height 100%
  position: relative;
  display: flex;
  flex-direction: column;
}
.main-content-top {
  height: 250px;
  position: relative;
  .background {
    background: url('@/assets/player/top_background.png')
    height: 435px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .background:after {
    content: ' ';
    background: linear-gradient(180deg, transparent, transparent 50%, $global-v-page-background-color) 0 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.query-input {
  width:50%
  max-width $global-v-page-max-width

  :deep().el-card__header {
    padding 10px
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .player-item {
    display: flex;
    justify-content space-between
    width 400px
    line-height: 24px;
    cursor:pointer
    padding: 0 5px
  }
  .player-item:hover {
    background #efefef
  }
}

.palyer-info {
  max-width: $global-v-div-max-width;
  flex-grow: 1;
  width 0

  .player-top {
    display flex
    justify-content space-between
    .name-info{
      font-size: 34px;
      line-height: 40px;
      color: #fff;

      &>span:nth-of-type(1) {
        font-weight: bold;
      }
      .like {
        font-size 12px
      }
      .registration-time{
        font-size: 16px;
        color: #ccc;
        line-height: 40px;
        padding-left 20px
      }
    }
  }

  // 概览信息
  .overview{

    .overview-ship{
      width: 100%;
      table-layout: fixed;
      padding: 0;
      margin: 0 auto;
      margin-bottom: 10px;

      .table-wows{
        width 100%
        border-collapse: collapse;
        border-spacing: 0;
        >thead{
          background-color: rgba(14, 22, 24, 0.3);

          tr{
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }
        }
        >tbody{
          tr{
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
        th,td{
          color: #fff;
          padding: 10px 1em;
          font-size: 16px;
          text-align: center;
          line-height: 2;
          font-weight: normal;
          color: #fff;
        }
        .icon{
          width: 40px;
        }
        [class*="icon-"]{
          display: inline-block;
          vertical-align: middle;
          width: 19px;
          height: 20px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          margin-right: 10px;
        }
        .name{
          // width: 30%;
          text-align: left;
        }
        .icon-ship{
          background-image: url('@/assets/ship/ship.png');
        }
        .icon-battles{
          background-image: url('@/assets/player/icon/battles.png');
        }
        .icon-wins{
          background-image: url('@/assets/player/icon/wins.png');
        }
        .icon-damage{
          background-image: url('@/assets/player/icon/damage.png');
        }
        .icon-hit{
          background-image: url('@/assets/player/icon/hit.png');
        }
        .icon-dd{
          background-image: url('@/assets/ship/dd.svg');
        }
        .icon-ca{
          background-image: url('@/assets/ship/ca.svg');
        }
        .icon-bb{
          background-image: url('@/assets/ship/bb.svg');
        }
        .icon-cv{
          background-image: url('@/assets/ship/cv.svg');
        }
        .icon-ss{
          background-image: url('@/assets/ship/ss.svg');
        }
      }
    }

    .overview-team {
      display flex
      justify-content space-between
      padding: 0 20px;
      >div{
        flex-grow 1
        padding 0 20px
      }
      .account-title{
        margin-bottom: 20px;
        font-family: "RobotoCondensed", sans-serif;
        font-size: 30px;
        color: #ffab34;
      }
      .team-item{
        display flex
        justify-content space-between
        font-size: 18px;
        color: #ccc;
        line-height: 2;
      }
    }
  }
}

.battles-div{
  height: 500px
  // background white
}
.mirage-text{
  background: -webkit-linear-gradient(45deg, #00e9f5, #f78651, #f7d73c, #8d67ff, #549bff)
  color: transparent;
  /*设置字体颜色透明*/
  -webkit-background-clip: text;
  /*背景裁剪为文本形式*/
  animation: ran 10s linear infinite;
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 2000px 0;
  }
}
</style>
