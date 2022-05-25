import request from '@/api/request'

const apiPath: string = import.meta.env.VITE_TARGET + import.meta.env.VITE_PUBLIC_PATH

/**
 * 获取服务器列表
 * @returns 服务器列表
 */
export function serverList () {
  return request.get(apiPath + '/encyclopedia/server/list', {})
}

/**
 * 获取地区列表
 * @returns 地区列表
 */
export function nationList () {
  return request.get(apiPath + '/encyclopedia/nation/list', {})
}

/**
 * 查找用户-模糊查询
 * @param data
 * @returns
 */
export function accountSearchUserList (data: { server: string, userName: string, limit:number }) {
  return request.get(apiPath + '/account/search/user/list', data)
}

/**
 * 平台绑定的ID列表
 * @param data
 * @returns
 */
export function accountPlatformBindList (data: { platformType : string, platformId : string }) {
  return request.get(apiPath + '/account/platform/search/clan/user', data)
}

/**
 * 查询用户总体信息
 * @param data
 * @returns
 */
export function accountUserInfo (data: { server: string, accountId: number }) {
  return request.get(apiPath + '/account/user/info', data)
}

/**
 * 用户战舰信息-列表
 * @param data
 * @returns
 */
export function accountShipInfoList (data: { queryType: string, userCode: string, shipType: string, level: string, county: string }) {
  return request.get(apiPath + '/public/wows/account/ship/info/list', data)
}
