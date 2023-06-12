/**
 * wows玩家数据数据
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import lodash from 'lodash'
import type { Account } from '@/types/player'

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
  return {
    accountHistory,
    addAccountHistory,
    deleteAccountHistory
  }
})
