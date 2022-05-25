<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { accountSearchUserList, accountPlatformBindList, accountUserInfo } from '@/api/wows/wows'
import usePlayer, { Player } from '@/store/player'
import lodash from 'lodash'
import moment from 'moment'
import * as echarts from 'echarts'

const player = usePlayer()

const query = ref('')
const queryMode = ref('userName')
const searchUserListLoading = ref(false)
const playerListShow = ref(true)
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
  )
}

// 通过绑定qq查询列表
const searchUserListByQq = () => {
  accountPlatformBindList({ platformType: 'QQ', platformId: query.value }).then(
    response => {
      searchUserList.value = response.data
      searchUserListLoading.value = false
      playerListShow.value = true
    }
  )
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
  const getHistoryPlayer = (el: Player) => {
    return (el.userName + el.server + el.accountId) === (playerItem.userName + playerItem.server + playerItem.accountId)
  }
  if (!player.historyPlayer.find(getHistoryPlayer)) {
    player.historyPlayer.unshift(playerItem)
  }
  // 存在qq号的情况 导致服务器不统一   反向覆写一下
  player.server = playerItem.server
  playerListShow.value = false
  getUserInfo(playerItem)
}

const playerInfo = ref()
// 查询用户总体信息
const getUserInfo = (playerItem: Player) => {
  accountUserInfo({ server: playerItem.server, accountId: playerItem.accountId }).then(
    response => {
      console.log(response.data)
      playerInfo.value = response.data

      // echarts.init()
    }
  )
}
getUserInfo({ server: 'eu', accountId: 558241106, userName: 'missile_gaia' })

</script>

<template>
  <div class="main-content">
    <div class="main-content-top">
      <div class="background"></div>
    </div>
    <div v-show="false" style="position: relative;">
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
          <el-card v-show="playerListShow">
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
    <div style="position: relative; display:flex; justify-content: center;">
      <div class="palyer-info">
        <!-- 头部基础信息 -->
        <div class="player-top">
          <div>
            <div>
              <span>[{{ playerInfo?.clanInfo?.tag }}]</span>
              {{ playerInfo?.userName }}
              <sup class="like">{{ playerInfo?.karma }}</sup>
              <span class="registration-time">最后战斗: {{ moment(playerInfo?.lastDateTime*1000).format('YYYY-MM-DD') }}</span>
            </div>
          </div>
          <el-button :icon="Search" />
        </div>
        <!-- 概览信息 -->
        <div class="overview">
          <div class="pr" :style="{background: playerInfo?.pr?.color}">
            <span>{{ playerInfo?.pr?.name }}</span>
            <span>{{ playerInfo?.pr?.value }} ({{ playerInfo?.dwpDataVO?.pr }})</span>
            <span>下一级:{{ playerInfo?.pr?.nextValue }}</span>
          </div>
          <div class="overview-1">
            <div>
              <div>
                <img src="@/assets/player/overview/battles.png">
              </div>
              <div class="title">场次</div>
              <div class="value">{{ playerInfo?.pvp?.battles }}</div>
            </div>
            <div>
              <div>
                <img src="@/assets/player/overview/wins.png">
              </div>
              <div class="title">胜率</div>
              <div class="value">{{ playerInfo?.pvp?.wins }}% <sup>({{ playerInfo?.dwpDataVO?.wins }})</sup></div>
              <div style="color: white;">KD: 2.53</div>
            </div>
            <div class="flag">
              <div>
                <img src="@/assets/player/overview/xp.png">
              </div>
              <div class="title">场均经验</div>
              <div class="value">{{ playerInfo?.pvp?.xp }}</div>
            </div>
            <div>
              <div>
                <img src="@/assets/player/overview/hit.png">
              </div>
              <div class="title">命中</div>
              <div class="value">{{ playerInfo?.pvp?.hit }}%</div>
            </div>
            <div>
              <div>
                <img src="@/assets/player/overview/damage.png">
              </div>
              <div class="title">场均</div>
              <div class="value">{{ playerInfo?.pvp?.damage }}<sup>({{ playerInfo?.dwpDataVO?.damage }})</sup></div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.main-content {
  background-color: #171e49;
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
    background: linear-gradient(180deg, transparent, transparent 50%, #171e49) 0 0;
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
    .pr{
      color white
      background #318000
      text-align center

      >span{
        padding 2px 10px
      }
    }
    .overview-1{
      display flex
      // justify-content center
      justify-content space-around
      background-image: url('@/assets/player/overview/light.png');
      background-repeat: no-repeat;
      background-position: center top;

      .flag{
        background: url('@/assets/player/overview/flag.png')
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: 100%;
        padding-top: 30px;
      }
      >div{
        width 180px
        height 280px
        text-align: center;
        padding-top: 40px;

        .title{
          font-size: 18px;
          color: white;
          padding 10px 0
        }
        .value{
          font-size: 34px;
          font-weight: bold;
          color: white;

          >sup{
            font-size 14px
            font-weight: lighter;
          }
        }
      }
    }

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

</style>
