/**
 * wows玩家数据相关接口
*/
import request from './request'
import wowsBaseStore from '@/stores/wowsBaseStore'

const BASE_URL = 'https://v3-api.wows.shinoaki.com:8443'
// const BASE_URL = ''

/**
 * 通过用户名查询用户账号信息
 * @param data
 * @returns
 */
export function getPlayerListByUserName (data:{userName:string}) {
  return request.post(BASE_URL + `/public/wows/account/search/${wowsBaseStore().server}/user`, data)
}

/**
 * 获取平台绑定的账号
 * @param data
 * @returns
 */
export function getPlatformBindList (data:{platformType:string, platformId: string}) {
  return request.get(BASE_URL + '/public/user/platform/bind/list', data)
}

/**
 * 通过accountid获取用户信息
 * @param data
 * @returns
 */
export function getPlayerByUUID (data:{accountId:string}) {
  return request.get(BASE_URL + `/public/wows/account/search/db/${data.accountId}`, {})
}

/**
 * 查询用户基础战绩信息
 * @param data:{server:string, accountid: string}
 * @returns
 */
export function getPlayerInfo (data:{server:string, accountId: string|number}) {
  return request.get(BASE_URL + '/public/wows/account/user/info', data)
}
