<script setup lang="ts">
// 个人综合
import { ref, onMounted, nextTick } from 'vue'
import PlayerInfoOverview from './component/PlayerInfoOverview.vue'
import { Search } from '@element-plus/icons-vue'
import { accountSearchUserList, accountPlatformBindList, accountUserInfo, accountShipInfoList, accountRecentList } from '@/api/wows/wows'
import usePlayer, { Player } from '@/store/player'
import lodash from 'lodash'
import moment from 'moment'
import * as echarts from 'echarts'
import n404 from '@/assets/404.png'

const player = usePlayer()

const query = ref('')
const queryMode = ref('userName')
const searchUserListLoading = ref(false)
// 搜索到的用户列表是否显示
const playerListShow = ref(true)
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
  accountSearchUserList({ server: player.server, userName: query.value, limit: 5 }).then(
    response => {
      searchUserList.value = response.data
      searchUserListLoading.value = false
      playerListShow.value = true
    }
  ).catch(() => {
    searchUserListLoading.value = false
  })
}

// 通过绑定qq查询列表
const searchUserListByQq = () => {
  accountPlatformBindList({ platformType: 'QQ', platformId: query.value }).then(
    response => {
      for (const user of response.data) {
        user.server = user.serverType
      }
      searchUserList.value = response.data
      searchUserListLoading.value = false
      playerListShow.value = true
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
  playerListShow.value = false
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
        battlesEchart.resize()
      })
    }
  ).catch(() => {
    loading.value = false
  })
  // 拿用户单船数据
  getUserShip(playerItem)
  // 拿近期数据
  recentDate.value = {}
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
      player.playerShips = response.data.recentList
      // 将船分类整合
      const classifyShip: any = {}
      for (const ship of player.playerShips) {
        // 构建数据结构 先进性判空初始化
        if (lodash.isNil(classifyShip[ship.shipInfo.level])) {
          classifyShip[ship.shipInfo.level] = {}
        }
        if (lodash.isNil(classifyShip[ship.shipInfo.level][ship.shipInfo.shipType])) {
          classifyShip[ship.shipInfo.level][ship.shipInfo.shipType] = {}
        }
        if (lodash.isNil(classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles)) {
          classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles = 0
          classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].wins = 0
        }
        classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].battles += ship.battles
        classifyShip[ship.shipInfo.level][ship.shipInfo.shipType].wins += ship.wins
      }
      buildEchart(classifyShip)
    })
}

// 构建战斗图表
const buildEchart = (classifyShip: any) => {
  window.addEventListener('resize', () => {
    battlesEchart.resize()
  })
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
    battlesEchart.resize()
  })
}
// 获取玩家近期数据
const recentDate = ref<any>({})
const getUserRecent = (playerItem: Player) => {
  for (let i = 1; i < 8; i++) {
    accountRecentList({ ...playerItem, seconds: Math.round(moment().subtract(i, 'days').toDate().getTime() / 1000) }).then(response => {
      recentDate.value[i] = response.data
    })
    console.log(recentDate.value)
  }
}
const closeInfoShow = () => {
  infoShow.value = false
  player.playerShips = []
}

// 近几天
const recentDay = ref(7)
const recentDayFormat = (day: number) => {
  return `近${day}天`
}

// getUserInfo({ server: 'eu', accountId: 558241106, userName: 'missile_gaia' })

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
            <div v-for="user in (searchUserList.length>0)?searchUserList:player.historyPlayer" :key="user.accountId" class="player-item" @click="submitPlayer(user)">
              <div style="width: 50%;">{{ user.userName }}</div>
              <div>{{ translateServer(user.server?user.server:player.server) }}</div>
              <div>{{ user.accountId }}</div>
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
            <div>
              <span :style="{color: playerInfo?.clanInfo?.colorRgb}">[{{ playerInfo?.clanInfo?.tag }}]</span>
              {{ playerInfo?.userName }}
              <sup class="like">{{ playerInfo?.karma }}</sup>
              <span class="registration-time">最后战斗: {{ moment(playerInfo?.lastDateTime*1000).format('YYYY-MM-DD') }}</span>
            </div>
          </div>
          <el-button :icon="Search" @click="closeInfoShow()" />
        </div>
        <!-- 概览信息 -->
        <div class="overview">
          <PlayerInfoOverview :pr="playerInfo?.pr" :pvp="playerInfo?.pvp" :dwp-data-v-o="playerInfo?.dwpDataVO" />
          <el-divider />
          <!-- 组队情况 -->
          <div class="overview-team">
            <div>
              <div class="account-title">单野</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpSolo?.battles }}</div>
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
                <div>胜率</div><div>{{ playerInfo?.pvpSolo?.wins }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">自行车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpTwo?.battles }}</div>
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
                <div>胜率</div><div>{{ playerInfo?.pvpTwo?.wins }}%</div>
              </div>
            </div>
            <div>
              <div class="account-title">装甲车</div>
              <div class="team-item">
                <div>场次</div><div>{{ playerInfo?.pvpThree?.battles }}</div>
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
                <div>胜率</div><div>{{ playerInfo?.pvpThree?.wins }}%</div>
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
                  <td class="value">{{ playerInfo?.type?.Destroyer?.wins }}%</td>
                  <td class="value">{{ playerInfo?.type?.Destroyer?.damage }}</td>
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
                  <td class="value">{{ playerInfo?.type?.Cruiser?.wins }}%</td>
                  <td class="value">{{ playerInfo?.type?.Cruiser?.damage }}</td>
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
                  <td class="value">{{ playerInfo?.type?.Battleship?.wins }}%</td>
                  <td class="value">{{ playerInfo?.type?.Battleship?.damage }}</td>
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
                  <td class="value">{{ playerInfo?.type?.AirCarrier?.wins }}%</td>
                  <td class="value">{{ playerInfo?.type?.AirCarrier?.damage }}</td>
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
                近{{ recentDay }}天数据
              </div>
              <div class="select"><el-slider v-model="recentDay" :format-tooltip="recentDayFormat" :min="1" :max="7" /></div>
            </div>
            <div v-if="recentDate[recentDay]">
              <PlayerInfoOverview :pr="recentDate[recentDay]?.data?.pr" :pvp="recentDate[recentDay]?.data" :dwp-data-v-o="{}" />
              <!-- 近期船数据 -->
              <div>
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
                      <tr v-for="ship of recentDate[recentDay]?.recentList" :key="ship.shipId">
                        <td class="icon"><img style="width:150px" :src="ship.shipInfo.imgSmall" /></td>
                        <td class="name">{{ ship.shipInfo.nameCn }}</td>
                        <td class="value">{{ ship.battles }}</td>
                        <td class="value">
                          <span :style="{color: ship?.pr?.color}">
                            {{ ship?.pr?.value }} {{ ship?.pr?.name }}
                          </span>
                        </td>
                        <td class="value">{{ ship.wins }}%</td>
                        <td class="value">{{ ship.damage }}</td>
                        <td class="value">{{ ship.hit }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无数据" :image="n404" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
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
  .select {
    flex-grow 1
    padding-right 20px
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
    max-width 400px
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

  .player-top {
    display flex
    justify-content space-between

    &>div:nth-of-type(1){
      &>div:nth-of-type(1){
        font-size: 34px;
        line-height: 40px;
        color: #fff;

        &>span:nth-of-type(1) {
          font-weight: bold;
          margin-right 20px
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
      &>div:nth-of-type(2){
        font-size: 18px;
        line-height: 30px;
        color: #fff;
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
          width: 30%;
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
        width 28%
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
</style>
