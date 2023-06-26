/**
 * wows玩家数据数据
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import lodash from 'lodash'
import type { Account, PlayerInfo } from '@/types/player'
import { getPlayerInfo } from '@/api/wowsPlayerInfo'
import db from '@/db/db'

export default defineStore('wowsPlayerStore', async () => {
  // 用户查询的历史记录
  const accountHistoryDB = await db.accountHistory.get('accountHistoryDB')
  // const accountHistoryDB = { accountHistory: [] }
  const list = lodash.isNil(accountHistoryDB) ? [] : accountHistoryDB.accountHistory
  const accountHistory = ref<Account[]>(list)
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
  watch(accountHistory, () => {
    db.accountHistory.add({ id: 'accountHistoryDB', accountHistory: accountHistory.value })
  })

  // 玩家基础数据信息
  const playerInfo = ref<PlayerInfo>()
  const setPlayerInfo = async (server: string, accountId:string) => {
    // 查询数据库缓存数据
    const getTime = Date.now()
    debugger
    console.log('db.player', await db.player.get(accountId))
    const playerInfoDb = await db.player.get(accountId)
    if (lodash.isNil(playerInfoDb) || (getTime - playerInfoDb.playerInfo.getTime) > 1800000) {
      // 调用接口进行设置
      getPlayerInfo({ server, accountId }).then((response: PlayerInfo) => {
        console.log('getPlayerInfo', response)
        response.getTime = getTime
        playerInfo.value = response
        db.player.add({ accountid: accountId, playerInfo: response }, accountId)
      })
    } else {
      playerInfo.value = playerInfoDb.playerInfo
    }
  }
  return {
    accountHistory,
    addAccountHistory,
    deleteAccountHistory,
    setPlayerInfo
  }
})
