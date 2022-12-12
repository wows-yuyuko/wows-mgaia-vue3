import request from '@/api/request'
import axios from 'axios'
import pako from 'pako'

/**
 * https://api.worldoftanks.eu/wot/auth/login/?application_id=cf82e0d66424f5cbdc2634a046495be2&redirect_uri=https://api.wows.linxun.link/public/wows/oauth/wows/yuyuko/success
 * 去毛子那拿token
 */
//  https://api.wows.linxun.link/public/wows/oauth/wows/yuyuko/success?&status=ok&access_token=031982de4dc0fb282b4876f9cb6489ffcdb7093c&nickname=missile_gaia&account_id=558241106&expires_at=1669705559
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
export async function accountUserInfo (data: { server: string, accountId: number }) {
  // if (data.server === 'cn') {
  //   await cacheCheck(data.accountId.toString(), data.server)
  // }
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
export async function accountShipInfo (data: { server: string, accountId: string, shipId: string }) {
  // if (data.server === 'cn') {
  //   await cacheCheck(data.accountId.toString(), data.server)
  // }
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

/**
 * 通过shipId获取船只信息
 * @returns
 */
export function shipInfo (data: {shipId: string|number}) {
  return request.get(apiPath + '/encyclopedia/ship/info', data)
}

/**
 * 获取战舰排行榜 分服务器
 * @param data
 * @returns
 */
export function rankShip (data: {page: number, server: string, shipId: number}) {
  return request.get(import.meta.env.VITE_TARGET + '/wows/rank/ship/server', data)
}

/**
 * 传入id获取毛子授权地址后回调数据上传
 * @param data
 * @returns
 */
export function yuyukoSuccess (data: {accountId: string, server: string}) {
  return request.get(apiPath + '/public/wows/oauth/wows/yuyuko/success', data)
}

/**
 * 缓存检查
 */
async function cacheCheck (accountId: string, server: string) {
  await request.post(import.meta.env.VITE_TARGET + '/api/wows/cache/check', {
    accountId,
    server
  }).then(async data => {
    console.log('data', data)
    if (data.code === 201) {
      for (const key in data.data) {
        await axios.post(data.data[key]).then(async reData => {
          console.log('reData', reData)
          if (reData.status === 200) {
            data.data[key] = JSON.stringify(reData.data) // dev中内容转string
            data.data = bytesToBase64(pako.gzip(JSON.stringify(data.data)))
            await request.post(import.meta.env.VITE_TARGET + '/api/wows/cache/check', {
              accountId,
              server,
              data: data.data
            }).then(endData => {
              console.log('endData', endData)
            })
          }
        })
      }
    }
  })
}

const base64abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
  'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
]

function bytesToBase64 (bytes:any) {
  let result = ''
  let i
  const l = bytes.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)]
    result += base64abc[bytes[i] & 0x3f]
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[(bytes[i - 2] & 0x03) << 4]
    result += '=='
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[(bytes[i - 1] & 0x0f) << 2]
    result += '='
  }
  return result
}
