<script setup lang="ts">
// 搜索玩家
import { Search } from '@element-plus/icons-vue'
import PlayerItem from './components/PlayerItem.vue'
import { ref } from 'vue'
import { getPlayerListByUserName, getPlatformBindList } from '@/api/wowsPlayerInfo'
import type { Account } from '@/types/player'
import wowsBaseStore from '@/stores/wowsBaseStore'

// wows基础信息
const wowsBase = wowsBaseStore()
// ==========搜索名==========
const userName = ref('')
const userNameSearchLoading = ref(false)
// 返回的账号列表
const playerList = ref<Account[]>([])
function searchPlayerListByUserName () {
  if (userName.value === '') return
  userNameSearchLoading.value = true
  getPlayerListByUserName({ userName: userName.value }).then(response => {
    console.log(response)
    playerList.value = response
    userNameSearchLoading.value = false
  }).catch(error => {
    console.log(error)
    userNameSearchLoading.value = false
  })
  return ''
}

// ==========搜uuid==========
// ==========平台id==========
// 选中的平台
const selectPlatform = ref('QQ')
const platformId = ref('')
const platformIdSearchLoading = ref(false)
const platformBindPlayerList = ref<Account[]>([])
function searchPlayerByPlatformId () {
  getPlatformBindList({ platformId: platformId.value, platformType: selectPlatform.value }).then(response => {
    console.log(response)
    platformBindPlayerList.value = response
    platformIdSearchLoading.value = false
  }).catch(error => {
    console.log(error)
    platformIdSearchLoading.value = false
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
            v-for="player of playerList"
            :key="player.accountId"
            :accountId="player.accountId"
            :userName="player.userName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="wowsUID">Role</el-tab-pane>
      <el-tab-pane label="平台id">
        <el-input
          v-model="platformId"
          :placeholder="`输入${selectPlatform}账号`"
          @keyup.enter="searchPlayerByPlatformId"
        >
          <template #prepend>
            <el-select  v-model="selectPlatform" placeholder="绑定平台" style="width: 115px">
              <el-option v-for="platform of wowsBase.platformList" :key="platform" :label="platform" :value="platform" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" :loading="platformIdSearchLoading" @click=" searchPlayerByPlatformId"/>
          </template>
        </el-input>
        <div class="play-list-div">
          <PlayerItem
            v-for="player of playerList"
            :key="player.accountId"
            :accountId="player.accountId"
            :userName="player.userName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.search-player{
  display: flex;
  justify-content: space-evenly;

  .tabs{
    width: 700px;
  }
}
.play-list-div{
  padding-top: 5px;
}
</style>
