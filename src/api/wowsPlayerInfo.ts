/**
 * wows玩家数据相关接口
*/
import request from './request'
import wowsBaseStore from '@/stores/wowsBaseStore'

const BASE_URL = 'https://v3-api.wows.shinoaki.com'
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
  return request.get(BASE_URL + '/api/user/platform/bind/list', data)
}
