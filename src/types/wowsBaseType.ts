/**
 * 后台接口返回的服务器列表格式
 */
export interface WowsServer {
  key: string // eu
  value: string // 欧服
}
/**
 * 后台接口返回的舰船种类格式
 */
export interface ShipType {
  shipType: string // "Battleship"
  typeName: string // "战列舰"
}

/**
 * 舰船国家
 */
export interface NationType {
  nation: string
  cn: string
}

/**
 * 船只信息
 */
export interface ShipInfo {
  shipId: number // 船只id
  nameCn: string
  nameEnglish: string
  nameNumbers: string
  level: number
  shipType: string
  country: string
  imgSmall: string
  imgLarge: string
  imgMedium: string
  shipIndex: 'PJSD111'
  groupType: 'superShip'
}

/**
 * 开箱 箱子信息
 */
export interface ContainerInfo {
  id: number
  title: '超级补给箱'
  shortTitle: '超级补给箱'
  icons: {
    defaultUrl: string
  }
  premium: false
}

/**
 * 箱子内容物信息
 */
export interface ContainerContentInfo {
  id: 3765352144
  type: string
  amount: 1
  name: '矢矧'
  cashBack: false
  imageUrl: 'https:////wows-gloss-icons.wgcdn.co/icons/vehicle/small/PJSC505_f3444e89f551cae2620d8d24f4a80ff0b1713e631936fca70bb8fe01d57db7de.png'
}
export interface RankShipPlayer {
  sortIndex: 3
  accountId: 7050680327
  userInfo: {
    server: 'cn'
    serverCn: '国服'
    clanInfo: {
      clanId: 0
      tag: ''
      name: ''
      description: ''
      color: '#FFFAFA'
      activeLevel: -1
    }
    accountId: 7050680327
    userName: 'Lockome'
    accountCreateTime: 0
  }
  pr: {
    code: 8
    value: 3077
    nextValue: 0
    name: '神佬水平'
    englishName: 'Super Unicum'
    color: '#A00DC5'
    details: {
      pr: 3077
      originalServer: {
        shipId: 4276041424
        damage: 80025.15076977527
        frags: 0.6051159086886789
        wins: 46.304684126703776
      }
      user: {
        shipId: 4276041424
        damage: 22344944
        frags: 240
        wins: 136
      }
      userServer: {
        shipId: 4276041424
        damage: 12323873.218545392
        frags: 93.18784993805656
        wins: 71.30921355512382
      }
      two: {
        shipId: 4276041424
        damage: 1.8131429627476654
        frags: 2.57544304498421
        wins: 1.9071869288653502
      }
      three: {
        shipId: 4276041424
        damage: 2.355238271246109
        frags: 2.750492272204678
        wins: 4.023956429551167
      }
    }
  }
  shipId: 4276041424
  battle: 154
  wins: 88.31
  winsColor: {
    code: 6
    value: 65
    color: '#673ab7'
  }
  damage: 145097
  damageColor: {
    code: 4
    value: 108000
    color: '#A00DC5'
  }
  frags: 1.56
  xp: 2906
  originalXp: 1919
  hit: 30.64
  maxXp: 5156
  maxOriginalXp: 3437
  maxDamage: 296591
  maxDamageColor: null
  maxFrags: 6
  maxScoutingDamage: 96645
  maxPlanesKilled: 21
  maxTotalAgro: 4644870
  lastUpdate: 1697751645545
}
