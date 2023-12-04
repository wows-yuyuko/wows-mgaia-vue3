import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PlayerInfo, Account, PlayerShipList } from '@/types/wowsPlayerType'
import wowsDB from '@/lib/database'
import lodash from 'lodash'

// 玩家信息
export default defineStore('playerInfo', () => {
  /** ============玩家战绩信息============ */
  const playerInfo = ref<PlayerInfo|null>(null)
  const playerShipList = ref<PlayerShipList|null>(null)
  /** ============历史查询记录相关============ */
  // 历史查询得账号列表
  const historyPlayerAccountList = ref<Account[]>([])
  // 从数据库中获取缓存的历史查询列表
  wowsDB.getWowsCache('historyPlayerAccountList').then(dbdata => {
    if (!lodash.isNil(dbdata)) {
      historyPlayerAccountList.value = dbdata
    }
  })
  // 判断历史列表中是否存在此数据
  const historyPlayerAccountListFind = (account: Account) => {
    return historyPlayerAccountList.value.find(item => (item.accountId + item.userName) === (account.accountId + account.userName))
  }
  // 向着历史列表中添加
  const addHistoryPlayerAccount = (account: Account) => {
    if (!historyPlayerAccountListFind(account)) {
      // 不存在则添加
      historyPlayerAccountList.value.push(account)
      wowsDB.setWowsCache('historyPlayerAccountList', JSON.parse(JSON.stringify(historyPlayerAccountList.value)))
    }
  }
  // 删除列表中元素
  const delHistoryPlayerAccount = (account: Account) => {
    for (let index = 0; index < historyPlayerAccountList.value.length; index++) {
      if ((historyPlayerAccountList.value[index].accountId + historyPlayerAccountList.value[index].userName) === (account.accountId + account.userName)) {
        historyPlayerAccountList.value.splice(index, 1)
        wowsDB.setWowsCache('historyPlayerAccountList', JSON.parse(JSON.stringify(historyPlayerAccountList.value)))
        return
      }
    }
  }
  return {
    playerInfo,
    playerShipList,
    historyPlayerAccountList,
    addHistoryPlayerAccount,
    delHistoryPlayerAccount
  }
})
