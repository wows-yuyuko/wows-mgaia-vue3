// 数据库相关操作
import Dexie from 'dexie'
const db = new Dexie('wows')
console.log(db)
db.version(1).stores(
  {
    player: 'accountid, server, userName, updateTime'
  }
)

class WowsDb extends Dexie {
  public constructor(){
    super()
  }
}

export default db
