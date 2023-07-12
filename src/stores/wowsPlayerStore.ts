/**
 * wows玩家数据数据
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import lodash from 'lodash'
import type { Account, PlayerInfo } from '@/types/player'
import { getPlayerInfo } from '@/api/wowsPlayerInfo'
import db from '@/db/db'

export default defineStore('wowsPlayerStore', () => {
  // 用户查询的历史记录
  const accountHistory = ref<Account[]>([])
  db.accountHistory.get('accountHistoryDB').then(accountHistoryDB => {
    const list = lodash.isNil(accountHistoryDB) ? [] : accountHistoryDB.accountHistory
    accountHistory.value = list
  })
  // 向着账号历史记录中新增数据
  const addAccountHistory = (account:Account) => {
    console.log('触发新增')
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
    console.log('触发监听', { id: 'accountHistoryDB', accountHistory: JSON.parse(JSON.stringify(accountHistory.value)) })
    db.accountHistory.put({ id: 'accountHistoryDB', accountHistory: JSON.parse(JSON.stringify(accountHistory.value)) }).then(data => {
      console.log(data)
    })
    db.accountHistory.get('accountHistoryDB').then(accountHistoryDB => {
      console.log(accountHistoryDB)
    })
  }, {
    deep: true
  })

  // 玩家基础数据信息
  const playerInfo = ref<PlayerInfo>()
  const setPlayerInfo = async (server: string, accountId:string) => {
    // 查询数据库缓存数据
    const getTime = Date.now()
    console.log('db.player', await db.player.get(accountId.toString()))
    const playerInfoDb = await db.player.get(accountId.toString())
    // console.log(getTime)
    // console.log(playerInfoDb!.playerInfo.getTime)
    // console.log(getTime - playerInfoDb!.playerInfo.getTime)
    if (lodash.isNil(playerInfoDb) || (getTime - playerInfoDb.playerInfo.getTime) > 1800000) {
      // 调用接口进行设置
      getPlayerInfo({ server, accountId }).then((response: PlayerInfo) => {
        console.log('getPlayerInfo', response)
        response.getTime = getTime
        playerInfo.value = response
        db.player.put({ accountid: accountId.toString(), playerInfo: response })
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
