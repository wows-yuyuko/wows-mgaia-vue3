<script setup lang="ts">
import type { Account } from '@/types/wowsPlayerType'
import basicInfo from '@/stores/basicInfo'
import playerInfo from '@/stores/playerInfo'
import { ref } from 'vue'
import { copyCommand } from '@/lib/commonUtils'
// 玩家搜索展示
const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()
const props = defineProps<Account>()
const serverstr = ref('')
useBasicInfo.getServerList().then(serverList => {
  // serverList.find()
  serverstr.value = serverList.find(serverItem => {
    return serverItem.key === props.server
  })!.value
})

// 点击事件
const clickPlayerItem = () => {
  // 设置服务器
  useBasicInfo.useServerValue = props.server
  usePlayerInfo.searchPlayerInfo(props.accountId, props.server)
  usePlayerInfo.searchPlayerShipList(props.accountId, props.server)
}

</script>

<template>
  <div class="player-item" @click="clickPlayerItem">
    <span>{{ userName }}</span>
    <span>{{ serverstr }}</span>
    <span class="account-id">{{ accountId }}</span>
    <el-button
      link
      type="info"
      size="small"
      @click.stop="copyCommand('wws 特殊绑定 '+ server +' '+ accountId)"
    >
      复制绑定命令
    </el-button>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.player-item {
  cursor: pointer;
  padding: 4px 10px;
  border-bottom: 1px solid var(--el-border-color);

  span{
    padding: 0 5px
  }
  .account-id{
    font-size: 12px;
    color: var(--el-color-primary-light-5);
  }
}
.player-item:hover {
  background-color: var(--el-menu-hover-bg-color)
}
</style>
