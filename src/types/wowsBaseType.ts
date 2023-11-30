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
