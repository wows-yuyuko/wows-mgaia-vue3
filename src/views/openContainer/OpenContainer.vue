<script setup lang="ts">
import { getContainerList, rollContainerList } from '@/api/wowsV3/wowsBase'
import type { ContainerInfo, ContainerContentInfo } from '@/types/wowsBaseType'
import { ref } from 'vue'
import playerInfo from '@/stores/playerInfo'
// 开箱

const usePlayerInfo = playerInfo()

const containerMap = ref<{[key:number]:ContainerInfo}>({})

// 箱子列表
const containerList = ref<ContainerInfo[]>([])
// 当前选中箱子
const containerKey = ref(4285715376)
getContainerList().then(response => {
  for (const container of response) {
    containerMap.value[container.id] = container
  }
  console.log(response)
  containerList.value = response
})
// 是否船库挂钩
const shipsHook = ref(false)
// 当前开箱数
const times = ref(10)
const serverLoading = ref(false)

// 内容物列表
const containerContentInfoList = ref<ContainerContentInfo[]>([])
// 统计
const statistics = ref<{[key:string]:number}>({})
const rollContainerListResponse = ref<any>()
// 开箱
const openContainer = (boom:boolean = false) => {
  serverLoading.value = true
  statistics.value = {}
  const data:any = { slotsId: containerKey.value, shipId: [0], rollCount: boom ? '0' : times.value }
  if (shipsHook.value) {
    data.accountId = usePlayerInfo.playerInfo?.userInfo.accountId
    data.server = usePlayerInfo.playerInfo?.userInfo.server
  }
  rollContainerList(data).then(response => {
    console.log('openContainer', response)
    rollContainerListResponse.value = response
    containerContentInfoList.value = response.slotsList
    for (const item of containerContentInfoList.value) {
      if (statistics.value[item.name]) {
        statistics.value[item.name] = statistics.value[item.name] + 1
      } else {
        statistics.value[item.name] = 1
      }
    }
    serverLoading.value = false
  }).catch(() => {
    serverLoading.value = false
  })
}
</script>

<template>
  <div class="open-container">
    <div>
      <div>
        <el-select v-model="containerKey" filterable placeholder="请选择圣诞箱子">
          <el-option
            v-for="item in containerList"
            :key="item.id"
            :label="item.shortTitle"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>与当前查询账号船库挂钩：<el-switch v-model="shipsHook" /></div>
      <div style="padding:0 0 10px 0;">
        开 <el-input-number v-model="times" :min="1" :max="200" /> 箱
      </div>
      <div>
        <el-button type="" :loading="serverLoading" @click="openContainer()">开箱</el-button>
        <!-- <el-button type="" style="margin-left:20px;" @click="boom">氪穿</el-button> -->
        <el-button type="" style="margin-left:20px;" :loading="serverLoading" @click="openContainer(true)">氪穿</el-button>
      </div>
      <img v-if="containerMap[containerKey]" :src="containerMap[containerKey].icons.defaultUrl" style="width: 200px;"/>
    </div>
    <div style="padding-left: 50px;overflow-y: auto;">
      <div v-for="(item,index) of containerContentInfoList" :key="index" class="container-content" :style="{backgroundColor: item.type==='ship'?'#ffcc6630':''}" >
        <img style=" width: 40px;" :src="item.imageUrl" />
        <div :style="{'padding-left': '10px', color: ['gold','wows_premium', 'ship'].includes(item.type)?'#fc6':'white'}">{{ item.name }} <span v-if="['camoboost', 'camouflage'].includes(item.type)">*{{ item.amount }}</span></div>
      </div>
    </div>
    <div style="padding-left: 50px;overflow-y: auto;" v-if="containerContentInfoList.length>0">
      <div>总计：{{ rollContainerListResponse.rollTotal }}</div>
      <div v-for="(item,index) of statistics" :key="index">{{index }} {{ item }} 次</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-container{
  padding: 20px 0 0 50px;
  display: flex;
  height: 100%;
  box-sizing: border-box;
}
.container-content{
  display: flex;align-items: center;padding-right: 20px;padding-bottom: 5px;
}
</style>
