<script setup lang="ts">
import { Search, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getPlatformApi } from '@/api/wowsV3/wowsBase'
import { getPlayerListByUserName, getPlayerByAccountId, getPlatformBindList } from '@/api/wowsV3/wowsPlayer'
import basicInfo from '@/stores/basicInfo'
import type { Account } from '@/types/wowsPlayerType'
import PlayerItem from './components/PlayerItem.vue'
import playerInfo from '@/stores/playerInfo'
// 搜索玩家
const useBasicInfo = basicInfo()
const usePlayerInfo = playerInfo()

// =========通过名字搜索=========
const userName = ref('')
const searchPlayerList = ref<Account[]>([])
const userNameSearchLoading = ref(false)

const searchPlayerListByUserName = () => {
  if (userName.value === '') return
  userNameSearchLoading.value = true
  getPlayerListByUserName({ userName: userName.value, server: useBasicInfo.useServerValue, limit: 5 }).then(response => {
    searchPlayerList.value = response
    console.log(response)
    userNameSearchLoading.value = false
  })
}
// =========通过uuid搜索=========
const uuid = ref('')
const searchUuidPlayerList = ref<Account[]>([])
const uuidSearchLoading = ref(false)
const searchPlayerByUUID = () => {
  uuidSearchLoading.value = true
  // 先通过用户信息接口查询
  getPlayerByAccountId({ server: useBasicInfo.useServerValue, accountId: uuid.value }).then(response => {
    console.log(response)
    searchUuidPlayerList.value = [
      {
        accountId: response.userInfo.accountId,
        userName: response.userInfo.userName,
        server: useBasicInfo.useServerValue
      }
    ]
    uuidSearchLoading.value = false
  }).catch(err => {
    console.log(err)
    searchUuidPlayerList.value = []
    uuidSearchLoading.value = false
  })
}

// =========通过平台账号搜索=========
// 获取平台列表
const platformList = ref([])
const platformType = ref('QQ')
getPlatformApi().then(response => {
  console.log(response)
  platformList.value = response
  platformType.value = response[0]
})
const platformId = ref('')
const searchPlatformPlayerList = ref<Account[]>([])
const platformSearchLoading = ref(false)
const searchPlayerByPlatform = () => {
  platformSearchLoading.value = true
  getPlatformBindList({ platformType: platformType.value, platformId: platformId.value }).then(response => {
    console.log(response)
    searchPlatformPlayerList.value = response
    platformSearchLoading.value = false
  }).catch(err => {
    console.log(err)
    searchPlatformPlayerList.value = []
    platformSearchLoading.value = false
  })
}
</script>

<template>
  <div class="search-player">
    <el-tabs class="tabs" type="border-card">
      <el-tab-pane label="wows昵称">
        <el-input
          v-model="userName"
          placeholder="通过wows昵称搜索 (注意右上角选择对应服务器)"
          @keyup.enter="searchPlayerListByUserName"
        >
          <template #append>
            <el-button :loading="userNameSearchLoading" :icon="Search" @click="searchPlayerListByUserName"/>
          </template>
        </el-input>
        <div class="play-list-div">
          <PlayerItem
            v-for="player of searchPlayerList"
            :key="player.accountId"
            :server="player.server"
            :accountId="player.accountId"
            :userName="player.userName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="wowsUID">
        <el-input
          v-model="uuid"
          :placeholder="`输入wowsUID`"
          @keyup.enter="searchPlayerByUUID"
        >
          <template #append>
            <el-button :icon="Search" :loading="uuidSearchLoading" @click=" searchPlayerByUUID"/>
          </template>
        </el-input>
        <div class="play-list-div">
          <PlayerItem
            v-for="player of searchPlayerList"
            :key="player.accountId"
            :server="player.server"
            :accountId="player.accountId"
            :userName="player.userName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="平台账号">
        <el-input
          v-model="platformId"
          :placeholder="`输入平台账号`"
          @keyup.enter="searchPlayerByPlatform"
        >
          <template #prepend>
            <el-select v-model="platformType" placeholder="Select" style="width: 115px">
              <el-option :label="item" :value="item"  v-for="item in platformList" :key="item"/>
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" :loading="platformSearchLoading" @click=" searchPlayerByPlatform"/>
          </template>
        </el-input>
        <div class="play-list-div">
          <PlayerItem
            v-for="player of searchPlatformPlayerList"
            :key="player.accountId"
            :server="player.server"
            :accountId="player.accountId"
            :userName="player.userName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史">
        <div class="play-list-div">
          <PlayerItem
            v-for="player of usePlayerInfo.historyPlayerAccountList"
            :key="player.accountId"
            :server="player.server"
            :accountId="player.accountId"
            :userName="player.userName"
          >
            <el-button :icon="Delete" size="small" circle @click.stop="usePlayerInfo.delHistoryPlayerAccount(player)" />
          </PlayerItem>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.search-player{
  max-width: $mg-max-width;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
