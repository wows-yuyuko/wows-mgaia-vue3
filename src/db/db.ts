// 数据库相关操作
import Dexie from 'dexie'
import type { PlayerInfo } from '@/types/player'

class WowsDb extends Dexie {
  public player: Dexie.Table<PlayerInfo, string>
  public constructor () {
    super('wows')
    this.version(1).stores({
      player: '&accountid'
    })
    this.player = this.table('player')
  }
}
const db = new WowsDb()

export default db
