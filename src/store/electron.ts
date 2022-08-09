import lodash from 'lodash'
import router from '@/router'
import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import { analysisBattleTeamData } from '@/hooks/realTimeResults'

interface ElectronStore {
  electronEnable: boolean,
  tempArenaInfoJsonPath: string,
  tempArenaInfoJsonRow: string,
  historyTempArenaInfoJsonRow: string[]
}
// 与electron相关内容
export default defineStore('electron', {
  state: (): ElectronStore => {
    return {
      electronEnable: false,
      tempArenaInfoJsonPath: '',
      // 当前最新的实施战斗数据
      tempArenaInfoJsonRow: '',
      // 实时战斗数据历史记录
      historyTempArenaInfoJsonRow: []
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
      router.addRoute('Home', {
        // 实时战绩
        path: 'realRimeResults',
        component: () => import('@/views/realTimeResults/RealTimeResults.vue')
      })
      router.push('/realRimeResults')
    },
    // 设置战斗临时文件地址
    setTempArenaInfoJsonPath (path: string) {
      this.tempArenaInfoJsonPath = path
      // 设置到localstorage
      setLocalStorage('tempArenaInfoJsonPath', path)
    },
    // 设置当前最新的实时战斗数据
    setTempArenaInfoJsonRow (rowData: string) {
      if (rowData !== this.tempArenaInfoJsonRow) {
        this.tempArenaInfoJsonPath = rowData
        this.historyTempArenaInfoJsonRow.unshift(rowData)
        // 进行解析操作
        analysisBattleTeamData(JSON.parse(rowData))
      }
    }
  }
})
