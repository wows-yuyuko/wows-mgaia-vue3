import lodash from 'lodash'
import router from '@/router'
import { ElNotification, ElMessageBox } from 'element-plus'
import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage } from '@/lib/storage'
import { sortBattleTeamData } from '@/hooks/realTimeResults'
import { getPlayerListByUserName, getPlayerByAccountId, getPlayerShipInfo } from '@/api/wowsV3/wowsPlayer'
import basicInfo from '@/stores/basicInfo'

interface ElectronStore {
  electronEnable: boolean,
  tempArenaInfoJsonPath: string,
  tempArenaInfoJsonRow: string,
  historyTempArenaInfoJsonRow: string[]
  // 当前对局数据
  currentMatchupData: any[]
}
// 与electron相关内容
export default defineStore('electron', {
  state: (): ElectronStore => {
    return {
      electronEnable: false,
      tempArenaInfoJsonPath: '',
      // 当前最新的实时原始战斗数据
      tempArenaInfoJsonRow: '',
      // 实时战斗数据历史记录
      historyTempArenaInfoJsonRow: [],
      // 当前对局数据 用于显示
      currentMatchupData: []
    }
  },
  actions: {
    // 设置electron相关内容启用状态
    setElectronEnable (enable: boolean) {
      this.electronEnable = enable
      // 如果localstorage中存在地址 则进行初始化
      const path = getLocalStorage('tempArenaInfoJsonPath')
      if (!lodash.isNil(path)) {
        this.tempArenaInfoJsonPath = path
      }
      // 添加路由
      router.addRoute('Layout', {
        // 实时战绩
        path: 'realRimeResults',
        component: () => import('@/views/realTimeResults/RealTimeResults.vue')
      })
      router.push('/realRimeResults')

      // 暴露更新相关交互接口
      window.electronAPI.electronMessage((event:any, message:any) => {
        ElNotification({
          message,
          title: '提示'
        })
      })
      window.electronAPI.shouldUpdateHandleCounter(() => {
        ElMessageBox.confirm('检查到新版本，是否更新?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.electronAPI.electronUpdateNow()
        })
      })
      // 检查更新
      window.electronAPI.checkForUpdates()
    },
    // 设置战斗临时文件地址
    setTempArenaInfoJsonPath (path: string) {
      this.tempArenaInfoJsonPath = path
      // 设置到localstorage
      setLocalStorage('tempArenaInfoJsonPath', path)
    },
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
          // 综合战绩
          getPlayerByAccountId({ server: useBasicInfo.realTimeResultServer, accountId: player.accountId }).then(
            response => {
              player.overallPerformance = response
            }
          ).catch((error) => {
            console.log(error)
          })
          // 单船战绩
          getPlayerShipInfo({ server: useBasicInfo.realTimeResultServer, accountId: player.accountId, shipId: player.shipId }).then(
            response => {
              player.shipPerformance = response
            }
          ).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
})
