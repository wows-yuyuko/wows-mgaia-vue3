import { defineStore } from 'pinia'
import { serverList, nationList, shipType } from '@/api/wows/wows'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import lodash from 'lodash'
export interface Player {
  accountId: number
  userName: string
  server: string
}

interface PlayerStore {
  player: Player
  historyPlayer: Player[]
  server: string
  serverList: {key: string, value:string}[]
  nationList: {nation: string, cn:string}[]
  shipTypeList: {key: string, value:string}[]
  playerShips: any[]
}
// 玩家数据
export default defineStore('player', {
  state: ():PlayerStore => {
    return {
      player: {
        accountId: 0,
        userName: '',
        server: ''
      },
      historyPlayer: [],
      server: 'eu',
      serverList: [
        {
          key: 'asia',
          value: '亚服'
        },
        {
          key: 'eu',
          value: '欧服'
        },
        {
          key: 'na',
          value: '美服'
        },
        {
          key: 'ru',
          value: '俄服'
        },
        {
          key: 'cn',
          value: '国服'
        }
      ],
      nationList: [
        {
          nation: 'commonwealth',
          cn: '英联邦'
        },
        {
          nation: 'europe',
          cn: '欧洲'
        },
        {
          nation: 'france',
          cn: '法国'
        },
        {
          nation: 'germany',
          cn: '德国'
        },
        {
          nation: 'italy',
          cn: '意大利'
        },
        {
          nation: 'japan',
          cn: '日本'
        },
        {
          nation: 'pan_america',
          cn: '泛美'
        },
        {
          nation: 'pan_asia',
          cn: '泛亚'
        },
        {
          nation: 'United_Kingdom',
          cn: '英国'
        },
        {
          nation: 'usa',
          cn: '美国'
        },
        {
          nation: 'ussr',
          cn: '苏联'
        },
        {
          nation: 'netherlands',
          cn: '荷兰'
        },
        {
          nation: 'spain',
          cn: '西班牙'
        }
      ],
      shipTypeList: [],
      // 用户单船信息
      playerShips: []
    }
  },
  actions: {
    // 初始化数据
    init () {
      serverList().then((response) => {
        this.serverList = response.data
      })
      nationList().then((response) => {
        this.nationList = response.data
      })
      shipType().then((response) => {
        const list = []
        for (const key in response.data) {
          list.push(response.data[key])
        }
        this.shipTypeList = list
      })
      if (!lodash.isNil(getLocalStorage('historyPlayer'))) {
        this.historyPlayer = getLocalStorage('historyPlayer')
      }
    },
    // 添加历史查询
    addHistoryPlayer (playerItem: Player) {
      const getHistoryPlayer = (el: Player) => {
        return (el.userName + el.server + el.accountId) === (playerItem.userName + playerItem.server + playerItem.accountId)
      }
      if (!this.historyPlayer.find(getHistoryPlayer)) {
        this.historyPlayer.unshift(playerItem)
      }
      setLocalStorage('historyPlayer', this.historyPlayer)
    }
  }
})
