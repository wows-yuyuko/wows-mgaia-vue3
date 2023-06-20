// 玩家相关类型声明

/**
 * wows账号信息
 */
export interface Account {
  userName: string,
  accountId: number,
  server?: string
}

/**
 * 后台接口返回的服务器列表格式
 */
export interface Server {
  keu: string
  value: string
}

/**
 * 舰队信息
 */
export interface ClanInfo {
  clanId: number // 舰队id
  tag: string
  name: string
  description: string // 舰队介绍
  color: string // 舰队等级颜色
}

/**
 * 近期变化数据
 */
export interface DwpData {
  damage: number
  wins: number
  pr: number
}

/**
 * pr信息
 */
export interface PrInfo {
  code: number
  value: number
  nextValue: number
  name: string
  englishName: string
  color: string
}
/**
 * 玩家账号信息
 */
export interface UserInfo extends Account {
  server: string
  serverCn: string
  accountCreateTime: number // 注册时间
  clanInfo: ClanInfo
}

/**
 * 战斗数据
 */
export interface BattleInfo {
  battle: number
  wins: number
  losses: number
  survived: number
  winAndSurvived: number
}

/**
 * pr区间
 */
export interface PrIntervalClass {
  code: number
  value: number
  color: string
}

/**
 * 平均战绩信息
 */
export interface AvgInfo {
  damage: number
  damageData: PrIntervalClass
  scoutingDamage: number
  win: number
  winsData: PrIntervalClass
  kd: number
  frags: number
  shipsSpotted: number
  planesKilled: number
  artAgro: number
  tpdAgro: number
  xp: number
  basicXp: number
}

/**
 * 击杀数据
 */
export interface FragsInfo {
  frags: number // 击杀数
  fragsByMain: number // 主炮击杀
  fragsByAtba: number // 副炮击杀
  fragsByPlanes: number // 舰载机击杀
  fragsByTpd: number // 鱼雷击杀
  fragsByRam: number // 撞击击杀
  fragsByDbomb: number // 深水炸弹击杀-注意目前深弹不算起火和进水
}

/**
 * 舰船某数据信息
 */
interface ShipIdValue {
  shipId: number
  value: number
}

/**
 * 最大数据产生船只
 */
export interface MaxInfo {
  maxFrags: ShipIdValue // 最大击杀
  maxFragsByMain: ShipIdValue
  maxFragsByTpd: ShipIdValue
  maxFragsByDbomb: ShipIdValue
  maxFragsByRam: ShipIdValue
  maxFragsByAtba: ShipIdValue
  maxDamageDealtToBuildings: ShipIdValue
  maxFragsByPlanes: ShipIdValue
  maxDamageDealt: ShipIdValue
  maxScoutingDamage: ShipIdValue
  maxPlanesKilled: ShipIdValue
  maxShipsSpotted: ShipIdValue
  maxTotalAgro: ShipIdValue
  maxSuppressionsCount: ShipIdValue
  maxXp: ShipIdValue
  maxBasicXp: ShipIdValue
}

/**
 * 占点贡献信息
 */
export interface ControlCapturedAndDroppedPointsInfo {
  gameContributionToCapture: number // 占点贡献率
  gameContributionToDefense: number // 防御贡献率
}

/**
 * 命中率数据
 */
export interface HitRatioInfo {
  ratioMain: number // 主炮命中
  ratioAtba: number // 副炮命中
  ratioTpd: number // 鱼雷命中
  ratioTbomb: number // 深水炸弹命中
}

/**
 * 战斗信息
 */
export interface BattleTypeInfo<T> {
  type: T
  battle: boolean // 是否有战斗信息
  prInfo: PrInfo
  shipInfo: {
    battleInfo: BattleInfo
    avgInfo: AvgInfo
    fragsInfo: FragsInfo
    maxInfo: MaxInfo
    controlCapturedAndDroppedPointsInfo: ControlCapturedAndDroppedPointsInfo
    hitRatioInfo: HitRatioInfo
    lastBattleTime: number // 最后战斗时间 秒
    recordTime: number // 最后战斗时间 毫秒
  }
}

/**
 * 玩家战斗信息类型规整
 */
interface PlayerBattleTypeInfo {
  PVP: BattleTypeInfo<'PVP'>
  PVP_SOLO: BattleTypeInfo<'PVP_SOLO'>
  PVP_DIV2: BattleTypeInfo<'PVP_DIV2'>
  PVP_DIV3: BattleTypeInfo<'PVP_DIV3'>
  RANK_SOLO: BattleTypeInfo<'RANK_SOLO'>
}
/**
 * 玩家综合数据信息
 */
export interface PlayerInfo {
  userInfo: UserInfo
  dwpData: DwpData
  prInfo: PrInfo
  battleTypeInfo: PlayerBattleTypeInfo
  shipTypeInfo: {
    Cruiser: PlayerBattleTypeInfo
    Auxiliary: PlayerBattleTypeInfo
    Destroyer: PlayerBattleTypeInfo
    Submarine: PlayerBattleTypeInfo
    Battleship: PlayerBattleTypeInfo
    AirCarrier: PlayerBattleTypeInfo
  }
  battleCountAll: { [key: string]: number } // 战斗数量 合计
  battleCount: { // 战斗数舰种分类 key为数字字符串 标记等级
    Cruiser: { [key: string]: number }
    Auxiliary: { [key: string]: number }
    Submarine: { [key: string]: number }
    Destroyer: { [key: string]: number }
    Battleship: { [key: string]: number }
    AirCarrier: { [key: string]: number }
  }
  lastBattleTime: number // 最后战斗时间 秒
  recordTime: number // 服务器记录时间 毫秒
}
