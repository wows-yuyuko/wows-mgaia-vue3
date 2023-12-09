import Dexie from 'dexie'
import type { WowsServer } from '@/types/wowsBaseType'
import lodash from 'lodash'

// 时间转换毫秒
export const SECOND_TIME = 1000
export const MINUTE_TIME = SECOND_TIME * 60
export const HOUR_TIME = MINUTE_TIME * 60
export const DAY_TIME = HOUR_TIME * 24
// eslint-disable-next-line no-unused-vars
export const WEEK_TIME = DAY_TIME * 7

// 更新时间设置
interface UpdateTimeInfo {
  updateTime: number // 更新时间（毫秒时间）
  periodOfValidity: number // 保质期
}

// 服务器
interface WowsServerListDB extends UpdateTimeInfo {
  id: 'wowsServerListKey'
  data: WowsServer[]
}

// 公共缓存表
interface WowsCacheDB extends UpdateTimeInfo {
  id: string
  data: any
}

// 检查数据是否过期
const checkPeriodOfValidity = (dbData: WowsCacheDB | undefined) => {
  if (lodash.isNil(dbData)) {
    // 判断是否存在
    return undefined
  } else if (dbData.periodOfValidity !== -1 && new Date().getTime() - dbData.updateTime > dbData.periodOfValidity) {
    // 判断是否过期
    return undefined
  } else {
    return dbData.data
  }
}
class WowsDb extends Dexie {
  // 特殊表例子  服务器信息
  public wowsServerList: Dexie.Table<WowsServerListDB, string>
  public getWowsServerList
  public setWowsServerList

  // 公共缓存表
  public wowsCache: Dexie.Table<WowsCacheDB, string>
  public getWowsCache: (id: string) => Promise<any>
  public setWowsCache: (id: string, data:any, periodOfValidity?:number) => Promise<any>

  public constructor () {
    super('wows')
    this.version(2).stores({
      wowsServerList: '&id',
      wowsCache: '&id'
    }).upgrade(tx => {
      tx.table('wowsServerList').clear()
      tx.table('wowsCache').clear()
    })
    // ===============公共缓存表===============
    this.wowsCache = this.table('wowsCache')
    this.getWowsCache = async (id: string) => {
      const dbData = await this.wowsCache.get(id)
      return checkPeriodOfValidity(dbData)
    }
    this.setWowsCache = async (id, data, periodOfValidity = -1) => {
      return this.wowsCache.put({
        id,
        data,
        updateTime: new Date().getTime(), // 更新时间
        periodOfValidity// 有效期
      })
    }

    // ===============服务器列表相关===============
    this.wowsServerList = this.table('wowsServerList')
    this.getWowsServerList = async () => {
      const dbData = await this.wowsServerList.get('wowsServerListKey')
      return checkPeriodOfValidity(dbData)
    }
    this.setWowsServerList = (wowsServerList: WowsServer[]) => {
      return this.wowsServerList.put({
        id: 'wowsServerListKey',
        data: wowsServerList,
        updateTime: new Date().getTime(), // 更新时间
        periodOfValidity: WEEK_TIME // 有效期
      })
    }
  }
}

const wowsDB = new WowsDb()

export default wowsDB
