/**
 * wows基础数据
 */
import wowsDB, { WEEK_TIME, HOUR_TIME } from '@/lib/database'
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
export async function getNationApi () {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getNationApi')
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/encyclopedia/nation/list', {}).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getNationApi', response, WEEK_TIME)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
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

/**
 * 获取船只信息列表
 * @returns
 */
export async function getShipInfoList () {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getShipInfoList')
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/encyclopedia/ship/search', { groupType: 'default' }).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getShipInfoList', response, HOUR_TIME)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
}

/**
 * 获取箱子列表
 * @returns
 */
export async function getContainerList () {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getContainerList')
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/wows/roll/info', {}).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getContainerList', response, HOUR_TIME)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
}

/**
 * 箱子抽奖-列表
 * @param data
 * @returns
 */
export function rollContainerList (data: {shipId: number[], slotsId:number, rollCount:number, accountId?: number, server?: string}) {
  return request.post(BASE_URL + '/public/wows/roll/slots/user', data)
}

/**
 * 船排行榜
 * @returns
 */
export async function getRankShipList (data:{shipId:number, type:number, page:number, desc:boolean}) {
  let returnData!:Promise<ShipType[]>
  // 查询数据库中是否有数据
  const dbdata = await wowsDB.getWowsCache('getRankShipList' + JSON.stringify(data))
  console.log(dbdata)
  if (!lodash.isNil(dbdata)) {
    return Promise.resolve(dbdata)
  } else {
    await request.get(BASE_URL + '/public/rank/ship/cn', data).then((response) => {
      console.log(response)
      wowsDB.setWowsCache('getRankShipList' + JSON.stringify(data), response, HOUR_TIME * 3)
      returnData = Promise.resolve(response)
    }).catch(err => {
      console.log(err)
      returnData = Promise.reject(err)
    })
    return returnData
  }
}
