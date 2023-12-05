import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { getServerListApi, getShipTypeApi, getNationApi, getShipInfoList } from '@/api/wowsV3/wowsBase'
import type { WowsServer, ShipType, NationType, ShipInfo } from '@/types/wowsBaseType'
import wowsDB from '@/lib/database'
import lodash from 'lodash'

// 基础信息
export default defineStore('basicInfo', () => {
  // ======服务器信息======（举个例子）
  // 当前选中服务器
  const useServerValue = ref('')
  // 实时战绩当前选中服务器
  const realTimeResultServer = ref('')
  wowsDB.getWowsCache('useServerValue').then(data => {
    if (lodash.isNil(data)) {
      useServerValue.value = 'eu'
      realTimeResultServer.value = 'eu'
    } else {
      useServerValue.value = data
      realTimeResultServer.value = data
    }
  })
  watch(useServerValue, () => {
    wowsDB.setWowsCache('useServerValue', useServerValue.value)
  })
  // 获取服务器列表
  const getServerList = async () => {
    let serverList:WowsServer[] = []
    // 查询数据库中是否有数据
    console.log(wowsDB.wowsServerList)
    await wowsDB.getWowsServerList().then(wowsServerList => {
      console.log(wowsServerList)
      if (!lodash.isNil(wowsServerList)) {
        serverList = wowsServerList
      }
    }).catch(wowsServerList => {
      console.log(wowsServerList)
    })
    // 数据库中无数据 则调用接口
    if (serverList.length === 0) {
      await getServerListApi().then((response:WowsServer[]) => {
        console.log(response)
        serverList = response
        wowsDB.setWowsServerList(response)
      })
    }
    return serverList
  }

  // ======舰船种类信息======
  const shipTypeList = ref<ShipType[]>([])
  getShipTypeApi().then(response => {
    shipTypeList.value = response
  })

  // ======舰船国家信息======
  const nationList = ref<NationType[]>([])
  getNationApi().then(response => {
    nationList.value = response
  })

  // ======获取船只信息======
  const shipInfoMap = ref<{[key:number]:ShipInfo}>({})
  getShipInfoList().then(response => {
    for (const item of response) {
      shipInfoMap.value[item.shipId] = item
    }
  })

  return { useServerValue, realTimeResultServer, getServerList, shipTypeList, nationList, shipInfoMap }
})
