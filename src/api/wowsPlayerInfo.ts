/**
 * wows玩家数据相关接口
*/
import request from './request'
import wowsBaseStore from '@/stores/wowsBaseStore'

// const BASE_URL = 'https://v3-api.wows.shinoaki.com'
const BASE_URL = ''

export function getPlayerListByUserName (data:{userName:string}) {
  return request.post(BASE_URL + `public/wows/account/search/${wowsBaseStore().server}/user`, data)
}
