// 数据库相关操作
import Dexie from 'dexie'
import type { PlayerInfo, Account } from '@/types/player'

interface PlayerInfoDB {
  accountid: string
  playerInfo: PlayerInfo
}

interface AccountHistoryDB {
  id: 'accountHistoryDB'
  accountHistory: Account[]
}
class WowsDb extends Dexie {
  public player: Dexie.Table<PlayerInfoDB, string> // 基础战绩信息
  public accountHistory: Dexie.Table<AccountHistoryDB, string> // 玩家账号搜索记录

  public constructor () {
    super('wows')
    this.version(1).stores({
      player: '&accountid',
      accountHistory: '&id'
    })
    this.player = this.table('player')
    this.accountHistory = this.table('accountHistory')
  }
}
const db = new WowsDb()

export default db
