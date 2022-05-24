<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { accountSearchUserList, accountPlatformBindList, accountUserInfo } from '@/api/wows/wows'
import usePlayer, { Player } from '@/store/player'
import lodash from 'lodash'

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
      debugger
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
    }
  )
}

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
        <div class="player-top">
          <div>
            <div>
              <span>[TEIO]</span>
              missile_gaia
              <span>注册于: 2021-01-02</span>
            </div>
            <div></div>
          </div>
          <el-button :icon="Search" />
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
      font-size: 34px;
      line-height: 40px;
      color: #fff;
      &>div:nth-of-type(1)>span:nth-of-type(1) {
        font-weight: bold;
        margin-right 20px
      }
      &>div:nth-of-type(1)>span:nth-of-type(2){
        font-size: 16px;
        color: #ccc;
        line-height: 40px;
        padding-left 20px
      }
    }
  }
}

</style>
