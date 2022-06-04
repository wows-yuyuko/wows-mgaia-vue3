<script setup lang="ts">
// 个人综合
import { ref, onMounted, nextTick } from 'vue'
import PlayerInfoOverview from './component/PlayerInfoOverview.vue'
import Avatar from './component/Avatar.vue'
import { Search } from '@element-plus/icons-vue'
import { wowsLog, accountSearchUserList, accountPlatformBindList, accountUserInfo, accountShipInfoList, accountRecentListV2 } from '@/api/wows/wows'
import { getWinColor, getDamageColor, getPrShowObj } from '@/utils/getColor'
import usePlayer, { Player } from '@/store/player'
import lodash from 'lodash'
import moment from 'moment'
import * as echarts from 'echarts'
import n404 from '@/assets/404.png'
import { ElMessage } from 'element-plus'

const player = usePlayer()

const query = ref('')
const queryMode = ref('userName')
const searchUserListLoading = ref(false)
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
  console.log()
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
  player.addHistoryPlayer(playerItem)
  // 存在qq号的情况 导致服务器不统一   反向覆写一下
  player.setServer(playerItem.server)
  player.player.accountId = playerItem.accountId
  player.player.server = playerItem.server
  player.player.userName = playerItem.userName
  wowsLog({ type: '查信息', ...playerItem })
  getUserInfo(playerItem)
}

const playerInfo = ref()
const loading = ref(false)
// 查询用户总体信息
const getUserInfo = (playerItem: Player) => {
  loading.value = true
  // 拿用户综合统计信息
  accountUserInfo({ server: playerItem.server, accountId: playerItem.accountId }).then(
    response => {
      playerInfo.value = response.data
      infoShow.value = true
      loading.value = false
      // echarts.init()
      nextTick(() => {
        echartsResize()
      })
    }
  ).catch(() => {
    loading.value = false
  })
  // 拿用户单船数据
  getUserShip(playerItem)
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
})
const getUserShip = (playerItem: Player) => {
  battlesEchart.clear()
  accountShipInfoList({ queryType: playerItem.server, userCode: playerItem.accountId + '' })
    .then(response => {
      // 扔store里 方便船只列表用
      player.playerShips = response.data.shipInfoList
      // 将船分类整合
      const classifyShip: any = {}
      for (const ship of player.playerShips) {
        // 构建数据结构 先进性判空初始化
        if (lodash.isNil(classifyShip[ship.shipInfo.shipInfo.level])) {
          classifyShip[ship.shipInfo.shipInfo.level] = {}
        }
        if (lodash.isNil(classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType])) {
          classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType] = {}
        }
        if (lodash.isNil(classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType].battles)) {
          classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType].battles = 0
          classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType].wins = 0
        }
        classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType].battles += ship.shipInfo.battles
        classifyShip[ship.shipInfo.shipInfo.level][ship.shipInfo.shipInfo.shipType].wins += ship.shipInfo.wins
      }
      buildEchart(classifyShip)
    })
}

// 构建战斗图表
const buildEchart = (classifyShip: any) => {
  const option:any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 阴影指示器
      }
    },
    legend: {
      textStyle: {
        color: 'white'
      },
      data: ['DD', 'CA', 'BB', 'CV']
    },
    title: {
      text: '战斗数',
      textStyle: {
        color: 'white',
        fontSize: 24
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        fontSize: 16,
        color: 'white'
      }
    }],
    xAxis: [
      {
        type: 'category',
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'X', 'Xl'],
        axisLabel: {
          color: 'white'
        }
      }
    ],
    series: []
  }
  option.series.push(
    {
      name: 'DD',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Destroyer?.battles,
        classifyShip[2]?.Destroyer?.battles,
        classifyShip[3]?.Destroyer?.battles,
        classifyShip[4]?.Destroyer?.battles,
        classifyShip[5]?.Destroyer?.battles,
        classifyShip[6]?.Destroyer?.battles,
        classifyShip[7]?.Destroyer?.battles,
        classifyShip[8]?.Destroyer?.battles,
        classifyShip[9]?.Destroyer?.battles,
        classifyShip[10]?.Destroyer?.battles,
        classifyShip[11]?.Destroyer?.battles
      ]
      // label: {
      //   show: true
      // }
    }
  )
  option.series.push(
    {
      name: 'CA',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Cruiser?.battles,
        classifyShip[2]?.Cruiser?.battles,
        classifyShip[3]?.Cruiser?.battles,
        classifyShip[4]?.Cruiser?.battles,
        classifyShip[5]?.Cruiser?.battles,
        classifyShip[6]?.Cruiser?.battles,
        classifyShip[7]?.Cruiser?.battles,
        classifyShip[8]?.Cruiser?.battles,
        classifyShip[9]?.Cruiser?.battles,
        classifyShip[10]?.Cruiser?.battles,
        classifyShip[11]?.Cruiser?.battles
      ]
    }
  )
  option.series.push(
    {
      name: 'BB',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Battleship?.battles,
        classifyShip[2]?.Battleship?.battles,
        classifyShip[3]?.Battleship?.battles,
        classifyShip[4]?.Battleship?.battles,
        classifyShip[5]?.Battleship?.battles,
        classifyShip[6]?.Battleship?.battles,
        classifyShip[7]?.Battleship?.battles,
        classifyShip[8]?.Battleship?.battles,
        classifyShip[9]?.Battleship?.battles,
        classifyShip[10]?.Battleship?.battles,
        classifyShip[11]?.Battleship?.battles
      ]
    }
  )
  option.series.push(
    {
      name: 'CV',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.AirCarrier?.battles,
        classifyShip[2]?.AirCarrier?.battles,
        classifyShip[3]?.AirCarrier?.battles,
        classifyShip[4]?.AirCarrier?.battles,
        classifyShip[5]?.AirCarrier?.battles,
        classifyShip[6]?.AirCarrier?.battles,
        classifyShip[7]?.AirCarrier?.battles,
        classifyShip[8]?.AirCarrier?.battles,
        classifyShip[9]?.AirCarrier?.battles,
        classifyShip[10]?.AirCarrier?.battles,
        classifyShip[11]?.AirCarrier?.battles
      ]
    }
  )
  const count = []
  function null0 (value: any) {
    if (lodash.isNumber(value)) {
      return value
    } else {
      return 0
    }
  }
  for (let i = 0; i < 11; i++) {
    count[i] = null0(classifyShip[i + 1]?.Destroyer?.battles) +
      null0(classifyShip[i + 1]?.Cruiser?.battles) +
      null0(classifyShip[i + 1]?.Battleship?.battles) +
      null0(classifyShip[i + 1]?.AirCarrier?.battles)
  }
  option.series.push(
    {
      name: '总计',
      type: 'bar',
      barGap: '-100%', // 左移100%，stack不再与上面两个在一列,
      data: count,
      label: {
        normal: {
          show: true, // 显示数值
          position: 'top', //  位置设为top
          formatter: '{c}',
          textStyle: { color: 'white' } // 设置数值颜色
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(128, 128, 128, 0)' // 设置背景颜色为透明
        }
      }
    }
  )
  battlesEchart.setOption(option)
  nextTick(() => {
    echartsResize()
  })
}
// 刷新图表操作
const echartsResize = () => {
  recentBattlesEchart?.resize()
  battlesEchart?.resize()
}
// 获取玩家近期数据
const recentDate = ref<any>({})
const recentDay = ref('') // 当前选中的日期
const recentSevenDate = ref<any>({}) // 近七天数据统计
const recentBattlesDiv = ref<HTMLElement|null>(null)
let recentBattlesEchart!: echarts.ECharts
// 页面变动时刷新图表
window.addEventListener('resize', () => {
  echartsResize()
})
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
        // 单船数据收集
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
      const recentBattlesOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 阴影指示器
          },
          formatter: (params: any) => {
            let text = '<div style="display: flex;justify-content:space-between;"><div>' + params[0].name + '</div></div>'
            if (recentDate.value[params[0].name].pvpInfo.battles > 0) {
              text += `<div style="display: flex;justify-content:space-between;"><div>PR： </div><div style="color:${recentDate.value[params[0].name].pvpInfo.pr.color}">${recentDate.value[params[0].name].pvpInfo.pr.value}</div></div>`
              text += `<div style="display: flex;justify-content:space-between;"><div>胜率： </div><div style="color:${getWinColor(recentDate.value[params[0].name].pvpInfo.wins)}">${recentDate.value[params[0].name].pvpInfo.wins}%</div></div>`
            }
            text += `<div style="display: flex;justify-content:space-between;"><div>战斗数： </div><div>${params[0].value}</div></div>`
            if (recentDate.value[params[0].name].pvpSoloInfo.battles > 0) {
              text += `<div style="display: flex;justify-content:space-between;"><div>单野： </div><div>${recentDate.value[params[0].name].pvpSoloInfo.battles}</div></div>`
            }
            if (recentDate.value[params[0].name].pvpTwoInfo.battles > 0) {
              text += `<div style="display: flex;justify-content:space-between;"><div>自行车： </div><div>${recentDate.value[params[0].name].pvpTwoInfo.battles}</div></div>`
            }
            if (recentDate.value[params[0].name].pvpThreeInfo.battles > 0) {
              text += `<div style="display: flex;justify-content:space-between;"><div>装甲车： </div><div>${recentDate.value[params[0].name].pvpThreeInfo.battles}</div></div>`
            }
            return text
          }
        },
        title: {
          text: '近期战斗数（点击柱状图切换每日详情）',
          textStyle: {
            color: 'white',
            fontSize: 24
          }
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            fontSize: 16,
            color: 'white'
          }
        }],
        xAxis: [
          {
            type: 'category',
            data: battlesEchartData.map((value:any) => value.date),
            axisLabel: {
              color: 'white'
            }
          }
        ],
        series: [
          {
            name: '战斗数',
            data: battlesEchartData.map((value:any) => {
              return {
                value: value.battles,
                itemStyle: {
                  color: getWinColor(value.wins)
                }
              }
            }),
            type: 'bar',
            barMaxWidth: '10%',
            label: {
              normal: {
                show: true, // 显示数值
                position: 'top', //  位置设为top
                formatter: '{c}',
                textStyle: { color: 'white' } // 设置数值颜色
              }
            }
          }
        ]
      }
      recentBattlesEchart.setOption(recentBattlesOption)
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
                <!-- <el-option label="accountId" value="accountId" /> -->
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
            <div v-for="user in (searchUserList.length>0)?searchUserList:player.historyPlayer" :key="user.accountId" style="display: flex;">
              <div class="player-item" @click="submitPlayer(user)">
                <div style="width: 50%;">{{ user.userName }}</div>
                <div>{{ translateServer(user.server?user.server:player.server) }}</div>
                <div>{{ user.accountId }}</div>
              </div>
              <div style="padding-left: 20px;">
                <el-button
                  link
                  type="info"
                  size="small"
                  @click="copyCommand('wws 特殊绑定 '+(user.server?user.server:player.server)+' '+user.accountId)"
                >
                  复制绑定命令
                </el-button>
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
                <span v-show="playerInfo?.clanInfo?.tag" :style="{color: playerInfo?.clanInfo?.colorRgb}">[{{ playerInfo?.clanInfo?.tag }}]</span>
                <span :class="player.avatarMap[player.player.accountId]?'mirage-text':''">{{ playerInfo?.userName }}</span>
                <sup class="like">{{ playerInfo?.karma }}</sup>
                <span v-show="playerInfo?.lastDateTime > 0" class="registration-time">最后战斗: {{ moment(playerInfo?.lastDateTime*1000).format('YYYY-MM-DD') }}</span>
              </div>
            </div>
          </div>
          <el-button :icon="Search" @click="closeInfoShow()" />
        </div>
        <!-- 概览信息 -->
        <div class="overview">
          <PlayerInfoOverview :pr="playerInfo?.pr" :pvp="playerInfo?.pvp" :dwp-data-v-o="playerInfo?.dwpDataVO" />
          <el-divider />
          <!-- 组队和排位情况 -->
          <div class="overview-team">
            <div>
              <div class="account-title">单野</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpSolo?.battles }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.pvpSolo?.pr?.color}">{{ playerInfo?.pvpSolo?.pr?.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.pvpSolo?.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.pvpSolo?.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.pvpSolo?.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.pvpSolo?.hit }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: getWinColor(playerInfo?.pvpSolo?.wins)}">{{ playerInfo?.pvpSolo?.wins }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">自行车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpTwo?.battles }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.pvpTwo?.pr?.color}">{{ playerInfo?.pvpTwo?.pr?.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.pvpTwo?.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.pvpTwo?.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.pvpTwo?.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.pvpTwo?.hit }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: getWinColor(playerInfo?.pvpTwo?.wins)}">{{ playerInfo?.pvpTwo?.wins }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">装甲车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpThree?.battles }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.pvpThree?.pr?.color}">{{ playerInfo?.pvpThree?.pr?.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.pvpThree?.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.pvpThree?.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.pvpThree?.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.pvpThree?.hit }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: getWinColor(playerInfo?.pvpThree?.wins)}">{{ playerInfo?.pvpThree?.wins }}%</div>
              </div>
            </div>
            <div v-show="playerInfo?.rankSolo?.battles > 0">
              <div class="account-title">排位赛</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.rankSolo?.battles }}</div>
              </div>
              <div class="team-item">
                <div>PR</div><div :style="{color:playerInfo?.rankSolo?.pr?.color}">{{ playerInfo?.rankSolo?.pr?.value }}</div>
              </div>
              <div class="team-item">
                <div>经验</div><div>{{ playerInfo?.rankSolo?.xp }}</div>
              </div>
              <div class="team-item">
                <div>场均</div><div>{{ playerInfo?.rankSolo?.damage }}</div>
              </div>
              <div class="team-item">
                <div>K/D</div><div>{{ playerInfo?.rankSolo?.kd }}</div>
              </div>
              <div class="team-item">
                <div>命中</div><div>{{ playerInfo?.rankSolo?.hit }}%</div>
              </div>
              <div class="team-item">
                <div>胜率</div><div :style="{color: getWinColor(playerInfo?.rankSolo?.wins)}">{{ playerInfo?.rankSolo?.wins }}%</div>
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
                  <td class="value">{{ playerInfo?.type?.Destroyer?.battles }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.type?.Destroyer?.pr?.color}">
                      {{ playerInfo?.type?.Destroyer?.pr?.value }} {{ playerInfo?.type?.Destroyer?.pr?.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: getWinColor(playerInfo?.type?.Destroyer?.wins)}">{{ playerInfo?.type?.Destroyer?.wins }}%</td>
                  <td class="value" :style="{color: getDamageColor('Destroyer', playerInfo?.type?.Destroyer?.damage)}">{{ playerInfo?.type?.Destroyer?.damage }}</td>
                  <td class="value">{{ playerInfo?.type?.Destroyer?.hit }}</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-ca"></div></td>
                  <td class="name">巡洋舰</td>
                  <td class="value">{{ playerInfo?.type?.Cruiser?.battles }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.type?.Cruiser?.pr?.color}">
                      {{ playerInfo?.type?.Cruiser?.pr?.value }} {{ playerInfo?.type?.Cruiser?.pr?.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: getWinColor(playerInfo?.type?.Cruiser?.wins)}">{{ playerInfo?.type?.Cruiser?.wins }}%</td>
                  <td class="value" :style="{color: getDamageColor('Cruiser', playerInfo?.type?.Cruiser?.damage)}">{{ playerInfo?.type?.Cruiser?.damage }}</td>
                  <td class="value">{{ playerInfo?.type?.Cruiser?.hit }}</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-bb"></div></td>
                  <td class="name">战列舰</td>
                  <td class="value">{{ playerInfo?.type?.Battleship?.battles }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.type?.Battleship?.pr?.color}">
                      {{ playerInfo?.type?.Battleship?.pr?.value }} {{ playerInfo?.type?.Battleship?.pr?.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: getWinColor(playerInfo?.type?.Battleship?.wins)}">{{ playerInfo?.type?.Battleship?.wins }}%</td>
                  <td class="value" :style="{color: getDamageColor('Battleship', playerInfo?.type?.Battleship?.damage)}">{{ playerInfo?.type?.Battleship?.damage }}</td>
                  <td class="value">{{ playerInfo?.type?.Battleship?.hit }}</td>
                </tr>
                <tr>
                  <td class="icon"><div class="icon-cv"></div></td>
                  <td class="name">航空母舰</td>
                  <td class="value">{{ playerInfo?.type?.AirCarrier?.battles }}</td>
                  <td class="value">
                    <span :style="{color: playerInfo?.type?.AirCarrier?.pr?.color}">
                      {{ playerInfo?.type?.AirCarrier?.pr?.value }} {{ playerInfo?.type?.AirCarrier?.pr?.name }}
                    </span>
                  </td>
                  <td class="value" :style="{color: getWinColor(playerInfo?.type?.AirCarrier?.wins)}">{{ playerInfo?.type?.AirCarrier?.wins }}%</td>
                  <td class="value" :style="{color: getDamageColor('AirCarrier', playerInfo?.type?.AirCarrier?.damage)}">{{ playerInfo?.type?.AirCarrier?.damage }}</td>
                  <td class="value">{{ playerInfo?.type?.AirCarrier?.hit }}</td>
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
                    1.我绑定了为什么查不到,可能是服务器那几天宕机了导致没数据,建议看看公告近期是否有宕机.<br />
                    2.如果你是以前绑定的现在请重新绑定一次,之前的记录清理了<br />
                    3.recent会定期清理掉,隐藏战绩的账号,一个月没有玩的账号<br />
                  </template>
                  <span>近7日统计<sup>?</sup></span>
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
                    <tr v-for="ship of recentDate[recentDay]?.shipData" :key="ship.shipInfo.shipInfo.nameEnglish">
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
        <span>yuyuko群(有bot可绑定)：872725671</span> &ensp;&ensp;&ensp; <span>网页及憨批系列工具反馈群：1050053532</span> &ensp;&ensp;&ensp; <span>战舰世界开发者交流群：967546463</span>
        &ensp;&ensp;&ensp; <span>@missile_gaia</span>&ensp;&ensp;&ensp;<span>@西行寺雨季</span>
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
