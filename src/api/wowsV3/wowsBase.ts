/**
 * wows基础数据
 */
import wowsDB, { WEEK_TIME } from '@/lib/database'
import lodash from 'lodash'
import request from '@/api/request'
import type { ShipType } from '@/types/wowsBaseType'

const BASE_URL = 'https://v3-api.wows.shinoaki.com:8443'
// const BASE_URL = ''
/**
 * 获取服务器列表
 * @returns
 */
export function getServerListApi () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/server/list', {})
}

/**
 * 获取舰船种类
 * @returns
 */
export async function getShipTypeApi () {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getShipTypeApi')
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/encyclopedia/ship/type', {}).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getShipTypeApi', response, WEEK_TIME)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
}

/**
 * 获取pr信息
 * @returns
 */
export function getPrInfoApi () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/pr/list', {})
}

/**
 * 获取地区列表
 * @returns
 */
export function getNationApi () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/nation/list', {})
}

/**
 * 获取平台列表
 * @returns
 */
export async function getPlatformApi () {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getPlatformApi')
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/encyclopedia/server/platform', {}).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getPlatformApi', response, WEEK_TIME)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
}
