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
 * 获取船只类型
 * @returns
 */
export function shipType () {
  return request.get(apiPath + '/encyclopedia/ship/type', {})
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
  return request.get(apiPath + '/bind/account/platform/bind/list', data)
}

/**
 * 查询用户总体信息
 * @param data
 * @returns
 */
export function accountUserInfo (data: { server: string, accountId: number }) {
  return request.get(apiPath + '/account/v2/user/info', data)
}

/**
 * 用户战舰信息-列表
 * @param data
 * @returns
 */
export function accountShipInfoList (data: { queryType: string, userCode: string, shipType?: string, level?: string, county?: string }) {
  return request.post(apiPath + '/account/v2/ship/info/list', data)
}

/**
 * 查询用户近期数据
 * @param data
 * @returns
 */
export function accountRecentList (data: { server: string, accountId: number, seconds: number }) {
  return request.get(apiPath + '/account/recent/list', data)
}

/**
 * 解析获取用户信息请求地址
 * @param data
 * @returns
 */
export function uploadVortexDataServerUrl (data: { serverType: string, accountIdAndShipId: string[] }) {
  return request.post(import.meta.env.VITE_TARGET + '/upload/vortex/data/server/url', data)
}

/**
 * 用户信息处理
 * @param data
 * @returns
 */
export function uploadVortexDataUserInfo (data: { serverType: string, accountIdAndShipId: string[] }) {
  return request.post(import.meta.env.VITE_TARGET + '/upload/vortex/data/user/info', data)
}
