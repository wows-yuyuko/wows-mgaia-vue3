import request from '@/api/request'
import axios from 'axios'

/**
 * 日志
 * @param data
 * @returns
 */
export function wowsLog (data:any) {
  return axios.post('/wows/wowsLog', data)
}

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
  return request.post(apiPath + '/account/search/user/list', data)
}

/**
 * 查找用户
 * @param data
 * @returns
 */
export function accountSearchUser (data: { server: string, userName: string}) {
  return request.post(apiPath + '/account/search/user', data)
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
export function accountShipInfoList (data: { server: string, accountId: string, shipType?: string, level?: string, county?: string }) {
  return request.post(apiPath + '/account/ship/info/list', data)
}

/**
 * 用户战舰信息
 * @param data
 * @returns
 */
export function accountShipInfo (data: { server: string, accountId: string, shipId: string }) {
  return request.get(apiPath + '/account/ship/info', data)
}

/**
 * 查询用户近期数据v2
 * @param data
 * @returns
 */
export function accountRecentListV2 (data: { server: string, accountId: number }) {
  return request.get(apiPath + '/account/v2/recent/list', { server: data.server, accountId: data.accountId })
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

/**
 * 战舰平均数据列表
 * @returns
 */
export function encyclopediaShipAvg () {
  return request.get(apiPath + '/encyclopedia/ship/avg', {})
}

/**
 * 箱子抽奖氪穿-返回详细列表
 * @param data
 * @returns
 */
export function rollSlotsUserList (data: {shipId: number[], slotsId:number}) {
  return request.post(apiPath + '/roll/slots/user/list', data)
}

/**
 * 箱子抽奖-单抽
 * @param data
 * @returns
 */
export function rollSlotsUser (data: {shipId: number[], slotsId:number}) {
  return request.post(apiPath + '/roll/slots/user', data)
}

/**
 * 战舰平均数据列表
 * @returns
 */
export function encyclopediaShipAvgHistory () {
  return request.get(apiPath + '/encyclopedia/ship/avg/history', {})
}
