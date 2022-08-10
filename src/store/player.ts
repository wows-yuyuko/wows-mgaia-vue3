import { defineStore } from 'pinia'
import { serverList, nationList, shipType, encyclopediaShipAvg } from '@/api/wows/wows'
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
  serverList: { key: string, value: string }[]
  nationList: { nation: string, cn: string }[]
  shipTypeList: { key: string, value: string }[]
  playerShips: any[]
  avatarMap: {[key:number]:string}
  avgShip: {
    [key: string]: {
      data: {
        winRate: number
        averageDamageDealt: number
        averageFrags: number
      }
      shipId: number
      shipInfo: {
        country: string
        imgLarge: string
        imgMedium: string
        imgSmall: string
        level: number
        nameCn: string
        nameEnglish: string
        shipType: string
      }
    }
  }
}
// 玩家数据
export default defineStore('player', {
  state: (): PlayerStore => {
    return {
      player: {
        accountId: 0,
        userName: '',
        server: ''
      },
      avatarMap: {},
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
        { nation: 'Commonwealth', cn: '英联邦' },
        { nation: 'Europe', cn: '欧洲' },
        { nation: 'France', cn: '法国' },
        { nation: 'Germany', cn: '德国' },
        { nation: 'Italy', cn: '意大利' },
        { nation: 'Japan', cn: '日本' },
        { nation: 'Pan_America', cn: '泛美' },
        { nation: 'Pan_Asia', cn: '泛亚' },
        { nation: 'United_Kingdom', cn: '英国' },
        { nation: 'USA', cn: '美国' },
        { nation: 'Russia', cn: '苏联' },
        { nation: 'Netherlands', cn: '荷兰' },
        { nation: 'Spain', cn: '西班牙' }
      ],
      shipTypeList: [],
      // 用户单船信息
      playerShips: [],
      // 服务器平均数据
      avgShip: {}
    }
  },
  actions: {
    getEncyclopediaShipAvg () {
      // 获取服务器平均数据列表
      encyclopediaShipAvg().then((response) => {
        const avgShip:any = {}
        for (const ship of response.data) {
          if (lodash.isNil(ship.shipInfo.nameEnglish)) continue
          ship.data.winRate = lodash.round(ship.data.winRate, 2)
          ship.data.averageDamageDealt = lodash.round(ship.data.averageDamageDealt, 2)
          ship.data.averageFrags = lodash.round(ship.data.averageFrags, 2)
          avgShip[ship.shipInfo.nameEnglish] = ship
        }
        this.avgShip = avgShip
      })
    },
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
      // 从localStorage中导入历史账号及服务器
      if (!lodash.isNil(getLocalStorage('historyPlayer'))) {
        this.historyPlayer = getLocalStorage('historyPlayer')
      }
      if (!lodash.isNil(getLocalStorage('server'))) {
        this.server = getLocalStorage('server')
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
    },
    // 设置服务器
    setServer (server:string) {
      this.server = server
      setLocalStorage('server', server)
    }
  }
})
