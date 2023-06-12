<script setup lang="ts">
// 玩家搜索展示
import wowsBaseStore from '@/stores/wowsBaseStore'
import wowsPlayerStore from '@/stores/wowsPlayerStore'
import type { Account } from '@/types/player'
const props = defineProps<Account>()
const server = props.server ? props.server : wowsBaseStore().server
function translateServer () {
  return wowsBaseStore().serverList.find((serverItem) => {
    return serverItem.keu === server
  })?.value
}
// 点击用户
function clickAccount () {
  wowsPlayerStore().addAccountHistory({ accountId: props.accountId, server, userName: props.userName })
}
</script>

<template>
  <div class="player-item" @click="clickAccount">
    <span>{{ userName }}</span>
    <span>{{ translateServer() }}</span>
    <span class="account-id">{{ accountId }}</span>
  </div>
</template>

<style scoped lang="less">
.player-item {
  cursor: pointer;
  padding: 2px 0;
  border-bottom: 1px solid var(--el-color-primary-light-8);

  span{
    padding: 0 5px
  }
  .account-id{
    font-size: 12px;
    color: var(--el-color-primary);
  }
}
.player-item:hover {
  background-color: var(--el-color-primary-light-8);
}
</style>
