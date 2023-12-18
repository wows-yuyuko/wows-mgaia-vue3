import { defineStore } from 'pinia'
import { sortBattleTeamData } from '@/hooks/realTimeResults'
import { getPlayerListByUserName, getRealTimeResults } from '@/api/wowsV3/wowsPlayer'
import basicInfo from '@/stores/basicInfo'

interface ElectronStore {
  tempArenaInfoJsonRow: string,
  historyTempArenaInfoJsonRow: string[]
  // 当前对局数据
  currentMatchupData: any[]
}
// 与electron相关内容
export default defineStore('electron', {
  state: (): ElectronStore => {
    return {
      // 当前最新的实时原始战斗数据
      tempArenaInfoJsonRow: '',
      // 实时战斗数据历史记录
      historyTempArenaInfoJsonRow: [],
      // 当前对局数据 用于显示
      currentMatchupData: []
    }
  },
  actions: {
    // 设置当前最新的实时战斗数据
    async setTempArenaInfoJsonRow (rowData: string, reload = false) {
      const includeRow = this.historyTempArenaInfoJsonRow.includes(rowData)
      if (!includeRow) {
        this.historyTempArenaInfoJsonRow.unshift(rowData)
      }

      if (!includeRow || reload) {
        const useBasicInfo = basicInfo()
        this.tempArenaInfoJsonRow = rowData
        // 数据处理 获取船只信息分类排序
        this.currentMatchupData = await sortBattleTeamData(JSON.parse(rowData))
        // 获取数据
        for (const player of this.currentMatchupData) {
          // 机器人直接跳过
          if (player.name[0] === ':') { continue }
          // 需要先用名字查询id
          await getPlayerListByUserName({ server: useBasicInfo.realTimeResultServer, userName: player.name, one: true }).then(
            response => {
              player.accountId = response[0].accountId
            }
          ).catch((error) => {
            console.log(error)
          })
          getRealTimeResults({ name: player.name, server: useBasicInfo.realTimeResultServer, accountId: player.accountId, shipId: player.shipId }).then(response => {
            player.clanInfo = response.clanInfo
            player.overallPerformance = response.userInfo
            player.shipPerformance = response.shipInfo
          })
        }
      }
    }
  }
})
