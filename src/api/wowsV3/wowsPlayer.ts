/**
 * wows玩家数据
 */
import wowsDB, { DAY_TIME, HOUR_TIME } from '@/lib/database'
import lodash from 'lodash'
import request from '@/api/request'
import type { Account } from '@/types/wowsPlayerType'

const BASE_URL = 'https://v3-api.wows.shinoaki.com:8443'

/**
 * 通过用户名查询用户账号信息列表
 * @param data userName用户名模糊  limit返还条目
 * @returns
 */
export async function getPlayerListByUserName (data:{userName:string, server:string, limit?:number}) {
  let returnData!:Promise<Account[]>
  const dbdata = await wowsDB.getWowsCache('getPlayerListByUserName' + JSON.stringify(data))
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.post(BASE_URL + `/public/wows/account/search/${data.server}/user`, data).then((response) => {
      for (const item of response) {
        item.server = data.server
      }
      wowsDB.setWowsCache(
        'getPlayerListByUserName' + JSON.stringify(data),
        response,
        DAY_TIME
      )
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      // returnData = Promise.reject(err)
      returnData = Promise.resolve([])
    })
  }
  return returnData
}

/**
 * 通过用户accountId查询用户详细信息
 * @param data
 * @returns
 */
export async function getPlayerByAccountId (data:{accountId:number|string, server:string}) {
  let returnData!:Promise<{}>
  const dbdata = await wowsDB.getWowsCache('getPlayerByAccountId' + JSON.stringify(data))
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/account/user/info', data).then((response) => {
      wowsDB.setWowsCache(
        'getPlayerByAccountId' + JSON.stringify(data),
        response,
        HOUR_TIME
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

/**
 * 查询用户绑定列表
 * @param data platformType 平台类型 platformId 平台账号
 */
export async function getPlatformBindList (data:{platformType:string, platformId:string}) {
  let returnData!:Promise<{}>
  const dbdata = await wowsDB.getWowsCache('getPlatformBindList' + JSON.stringify(data))
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/api/user/platform/bind/list', data).then((response) => {
      wowsDB.setWowsCache(
        'getPlatformBindList' + JSON.stringify(data),
        response,
        HOUR_TIME
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
