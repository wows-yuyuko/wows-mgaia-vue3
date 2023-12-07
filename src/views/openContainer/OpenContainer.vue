<script setup lang="ts">
import { getContainerList, rollContainerList } from '@/api/wowsV3/wowsBase'
import type { ContainerInfo } from '@/types/wowsBaseType'
import { ref, computed } from 'vue'
import lodash from 'lodash'
import playerInfo from '@/stores/playerInfo'
// 开箱

const usePlayerInfo = playerInfo()

const imgs = import.meta.glob('@/assets/container/*')
const containerImgs = ref<{[key:string]:string}>({})
for (const path in imgs) {
  imgs[path]().then((img:any) => {
    const pathArry = (img.default as string).split('/')
    containerImgs.value[pathArry[pathArry.length - 1].split('.')[0]] = img.default
  })
}

// 箱子列表
const containerList = ref<ContainerInfo[]>([])
// 当前选中箱子
const containerKey = ref('4285715376')
getContainerList().then(response => {
  console.log(response)
  containerList.value = response
})
// 是否船库挂钩
const shipsHook = ref(false)
// 当前开箱数
const times = ref(1)
const serverLoading = ref(false)

// 当前需要传输的船id列表
const playerShipIdList = computed(() => {
  if (!shipsHook.value || lodash.isNil(usePlayerInfo.playerShipList)) return [0]
  const returnShipIdList = []
  for (const item of usePlayerInfo.playerShipList!.shipInfo) {
    returnShipIdList.push(item.shipInfo.shipId)
  }
  if (returnShipIdList.length === 0) returnShipIdList.push(0)
  return returnShipIdList
})

// 开箱
const openContainer = () => {
  rollContainerList({ slotsId: parseInt(containerKey.value), shipId: playerShipIdList.value }).then(response => {
    console.log('openContainer', response)
    const temp:any = {}
    for (const containerInfo of response.slotsList) {
      temp[containerInfo.type] = containerInfo.name
    }
    console.log('temp', temp)
  })
}
// 氪穿
const serverBoom = () => {}
// 清空
const clear = () => {}
</script>

<template>
  <div class="open-container">
    <div>
      <div>
        <el-select v-model="containerKey" placeholder="请选择圣诞箱子">
          <el-option
            v-for="item in containerList"
            :key="item.key"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div>与当前查询账号船库挂钩：<el-switch v-model="shipsHook" /></div>
      <div style="padding:0 0 10px 0;">
        开 <el-input-number v-model="times" :min="1" :max="200" /> 箱
      </div>
      <div>
        <el-button type="" @click="openContainer()">开箱</el-button>
        <!-- <el-button type="" style="margin-left:20px;" @click="boom">氪穿</el-button> -->
        <el-button type="" style="margin-left:20px;" :loading="serverLoading" @click="serverBoom">氪穿</el-button>
        <el-button style="margin-left:20px;" type="" @click="clear">清空</el-button>
      </div>
      <img v-if="containerImgs[containerKey]" :src="containerImgs[containerKey]" style="width: 200px;"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-container{
  padding: 20px 0 0 50px;
}
</style>
