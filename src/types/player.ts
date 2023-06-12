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
