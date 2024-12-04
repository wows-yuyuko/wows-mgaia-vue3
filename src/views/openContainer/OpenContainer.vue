<script setup lang="ts">
import { getContainerList, rollContainerList } from '@/api/wowsV3/wowsBase'
import type { ContainerInfo, ContainerContentInfo } from '@/types/wowsBaseType'
import { ref, watch } from 'vue'
import playerInfo from '@/stores/playerInfo'
import basicInfo from '@/stores/basicInfo'
// 开箱

const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()

const containerMap = ref<{[key:number]:ContainerInfo}>({})

// 箱子列表
const containerList = ref<ContainerInfo[]>([])
// 当前选中箱子
const containerKey = ref(4046640048)

const pageGetContainerList = () => {
  getContainerList({ server: useBasicInfo.useServerValue }).then(response => {
    if (useBasicInfo.useServerValue === 'ru') {
      containerKey.value = 4070757296
    } else {
      containerKey.value = 4046640048
    }
    for (const container of response) {
      containerMap.value[container.id] = container
    }
    console.log(response)
    containerList.value = response
  })
}

pageGetContainerList()

watch(() => useBasicInfo.useServerValue, () => {
  pageGetContainerList()
})
// 是否船库挂钩
const shipsHook = ref(false)
// 当前开箱数
const times = ref(10)
const serverLoading = ref(false)

// 内容物列表
// 统计
const rollContainerListResponse = ref<{
  auth: boolean
  rollCount: number
  rollTotal: number
  savePoint: number
  savePointTotal: number
  slotsList: ContainerContentInfo[]
  slotsResultList: ContainerContentInfo[]
}>()
const slotsResultMap = ref<any>({})
// 开箱
const openContainer = (boom:boolean = false) => {
  serverLoading.value = true
  const data:any = { slotsId: containerKey.value, shipId: [0], rollCount: boom ? '0' : times.value }
  data.server = useBasicInfo.useServerValue
  if (shipsHook.value) {
    data.accountId = usePlayerInfo.playerInfo?.userInfo.accountId
    data.server = usePlayerInfo.playerInfo?.userInfo.server
  }
  slotsResultMap.value = {}
  rollContainerList(data).then(response => {
    console.log('openContainer', response)
    rollContainerListResponse.value = response
    for (const item of rollContainerListResponse.value!.slotsResultList) {
      if (['ship', 'camoboost'].includes(item.type)) {
        if (slotsResultMap.value[item.type]) {
          slotsResultMap.value[item.type].push(item)
        } else {
          slotsResultMap.value[item.type] = [item]
        }
      } else {
        if (slotsResultMap.value.other) {
          slotsResultMap.value.other.push(item)
        } else {
          slotsResultMap.value.other = [item]
        }
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
      <div style="display: flex;    align-items: center;">
        <img v-if="containerMap[containerKey]" :src="containerMap[containerKey].icons.defaultUrl" style="width: 50px;margin-right: 10px;"/>
        <el-select v-model="containerKey" filterable placeholder="请选择圣诞箱子">
          <el-option
            v-for="item in containerList"
            :key="item.id"
            :label="item.shortTitle"
            :value="item.id">
            <div style="display: flex;align-items: center;">
              <img style="height: 30px; margin-right: 5px;" :src="item.icons.defaultUrl"/>
              <span style="">
                {{ item.shortTitle }}
              </span>
            </div>
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
      <!-- <div class="container-background">
        <img v-if="containerMap[containerKey]" :src="containerMap[containerKey].icons.defaultUrl" style="width: 100px;"/>
      </div> -->
      <div v-if="rollContainerListResponse">
        <div style="padding-top: 20px;    font-weight: bold;">总计：{{ rollContainerListResponse?.rollTotal }}</div>
        <div style="padding-top: 10px;    font-weight: bold;">每 {{ rollContainerListResponse?.savePoint }} 箱保底</div>
        <div style="padding-top: 10px;    font-weight: bold;">共保底 {{ rollContainerListResponse?.savePointTotal }} 次</div>
      </div>
    </div>
    <div style="padding-left: 50px;overflow-y: auto;">
      <div style="font-weight: bolder;">详情：</div>
      <div v-for="(item,index) of rollContainerListResponse?.slotsList" :key="index" class="container-content" :style="{backgroundColor: item.type==='ship'?'#ffcc6630':''}" >
        <img style=" width: 40px;" :src="item.imageUrl" />
        <div :style="{'padding-left': '10px', color: ['gold','wows_premium', 'ship'].includes(item.type)?'#fc6':'white'}">{{ item.name }} <span v-if="['camoboost', 'camouflage'].includes(item.type)">*{{ item.amount }}</span></div>
      </div>
    </div>
    <div v-for="(itemList, key) of slotsResultMap" :key="key" style="padding-left: 50px;overflow-y: auto;" >
      <div style="font-weight: bolder;">合计：{{ itemList.length }}</div>
      <div v-for="(item,index) of itemList" :key="index" class="container-content" :style="{backgroundColor: item.type==='ship'?'#ffcc6630':''}" >
        <img style=" width: 40px;" :src="item.imageUrl" />
        <div :style="{'padding-left': '10px', color: ['gold','wows_premium', 'ship'].includes(item.type)?'#fc6':'white'}">{{ item.name }} <span v-if="['camoboost', 'camouflage'].includes(item.type)">*{{ item.amount }}</span></div>
      </div>
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

.container-background{
  width: 200px;
  height: 190px;
  background-image: url(@/assets/container/background.png);
  background-size: 100%;
  background-color: red;

  img{
    padding-left: 50px;
    padding-top: 50px;
  }
}
</style>
