<script setup lang="ts">
// 搜索玩家
import { Search } from '@element-plus/icons-vue'
import PlayerItem from './components/PlayerItem.vue'
import { ref } from 'vue'
import { getPlayerListByUserName } from '@/api/wowsPlayerInfo'
import type { Account } from '@/types/player'

// 搜索名
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
      <el-tab-pane label="平台id">Config</el-tab-pane>
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
