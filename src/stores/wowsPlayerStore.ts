/**
 * wows玩家数据数据
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import lodash from 'lodash'
import type { Account } from '@/types/player'
import { getPlayerInfo } from '@/api/wowsPlayerInfo'
import db from '@/db/db'

export default defineStore('wowsPlayerStore', () => {
  // 用户查询的历史记录
  const accountHistory = ref<Account[]>([])
  // 向着账号历史记录中新增数据
  const addAccountHistory = (account:Account) => {
    const findAccount = accountHistory.value.find(item => {
      return item.accountId === account.accountId
    })
    if (lodash.isNil(findAccount)) {
      accountHistory.value.push(account)
      return true
    }
    return false
  }
  // 删除某数据
  const deleteAccountHistory = (account:Account) => {
    const findIndex = accountHistory.value.findIndex(item => {
      return item.accountId === account.accountId
    })
    if (findIndex > -1) {
      accountHistory.value.splice(findIndex, 1)
      return true
    }
    return false
  }

  const setPlayerInfo = (server: string, accountId:string|number) => {
    // 查询数据库缓存数据

    // 调用接口进行设置
    getPlayerInfo({ server, accountId }).then(response => {
      console.log('getPlayerInfo', response)
      console.log(db.table('player').get({ accountid: '123' }))
    })
  }
  return {
    accountHistory,
    addAccountHistory,
    deleteAccountHistory,
    setPlayerInfo
  }
})
