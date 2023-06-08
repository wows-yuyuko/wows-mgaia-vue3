/**
 * wows基础数据
 */

import request from './request'

const BASE_URL = 'https://v3-api.wows.shinoaki.com'
// const BASE_URL = ''
/**
 * 获取服务器列表
 * @returns
 */
export function getServerList () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/server/list', {})
}

/**
 * 获取舰船种类
 * @returns
 */
export function getShipType () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/ship/type', {})
}

/**
 * 获取pr信息
 * @returns
 */
export function getPrInfo () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/pr/list', {})
}

/**
 * 获取地区列表
 * @returns
 */
export function getNation () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/nation/list', {})
}

/**
 * 获取地区列表
 * @returns
 */
export function getPlatform () {
  return request.get(BASE_URL + '/public/wows/encyclopedia/server/platform', {})
}
