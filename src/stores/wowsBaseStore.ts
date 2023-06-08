/**
 * wows基础数据
 */
import { defineStore } from 'pinia'
import { getServerList } from '@/api/wowsBase'
import { ref, watch } from 'vue'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/auth'
import lodash from 'lodash'

interface Server {
  keu: string
  value: string
}

export default defineStore('wowsBaseStore', () => {
  // 服务器列表
  const serverList = ref<Server[]>([])
  // 当前选择得服务器
  const server = ref('')

  // 监听 如果服务器列表发生变动 且服务器缓存为空 则设置服务器为第一个
  watch(serverList, (newSL, oldSL) => {
    console.log('newSL', newSL, 'oldSL', oldSL)
    console.log('触发服务器列表变动', serverList.value[0].keu)
    console.log('getLocalStorage', getLocalStorage('server'))
    lodash.isNil(getLocalStorage('server')) ? server.value = serverList.value[0].keu : server.value = getLocalStorage('server')
  })

  watch(server, () => {
    setLocalStorage('server', server.value)
  })

  // 检查缓存基础信息
  async function checkBaseInfoCache () {
    const baseInfoCacheTime = getLocalStorage('baseInfoCacheTime')
    const nowTime = new Date()
    // 没有缓存信息 或者缓存已经过一天 则更新数据
    if (
      lodash.isNil(baseInfoCacheTime) ||
      (nowTime.getTime() - parseInt(baseInfoCacheTime)) > (1000 * 60 * 60 * 24)
    ) {
      // 从服务器更新基础信息
      await updateBaseInfo().then(() => {
        // 更新缓存时间
        setLocalStorage('baseInfoCacheTime', nowTime.getTime())
      })
    } else {
      // 有缓存信息则取出
      serverList.value = getLocalStorage('serverList')
    }
  }

  function updateBaseInfo () {
    // 获取服务器信息
    const promiseGetServerList = new Promise((resolve, reject) => {
      getServerList().then((response:Server[]) => {
        serverList.value = response
        setLocalStorage('serverList', response)
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    })

    return Promise.all([promiseGetServerList])
  }

  /**
   * 清空缓存
   */
  function cleanCache () {
    removeLocalStorage()
  }

  return {
    serverList,
    server,
    updateBaseInfo,
    checkBaseInfoCache,
    cleanCache
  }
})
