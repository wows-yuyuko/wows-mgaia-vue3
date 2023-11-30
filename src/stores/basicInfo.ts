import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getServerListApi } from '@/api/wowsV3/wowsBase'
import type { WowsServer } from '@/types/wowsBaseType'
import wowsDB from '@/lib/database'
import lodash from 'lodash'

// 基础信息
export default defineStore('basicInfo', () => {
  // ======服务器信息======（举个例子）
  // 当前选中服务器
  const useServerValue = ref('')
  wowsDB.getWowsCache('useServerValue').then(data => {
    if (lodash.isNil(data)) {
      useServerValue.value = 'eu'
    } else {
      useServerValue.value = data
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
      debugger
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
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment () {
    count.value++
  }

  return { useServerValue, getServerList, count, doubleCount, increment }
})
