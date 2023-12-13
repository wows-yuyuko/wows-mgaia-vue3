/**
 * recent数据
 */
import wowsDB, { DAY_TIME } from '@/lib/database'
import lodash from 'lodash'
import request from '@/api/request'

const BASE_URL = 'https://recent.wows.shinoaki.com:8890'

/**
 * 查询近期战斗数据
 * @param data
 */
export async function getRecentDayInfo (data:{server:string, accountId:string|number, dateTime:string, day:number, shipId:number }) {
  let returnData!:Promise<{}>
  const dbdata = await wowsDB.getWowsCache('getRecentDayInfo' + JSON.stringify(data))
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/api/wows/recent/day/info', data).then((response) => {
      wowsDB.setWowsCache(
        'getRecentDayInfo' + JSON.stringify(data),
        response,
        DAY_TIME
      )
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      // returnData = Promise.reject(err)
      returnData = Promise.reject(err)
    })
  }
  return returnData
}
