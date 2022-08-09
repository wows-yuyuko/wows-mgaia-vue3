// 实时战绩相关
import useElectron from '@/store/electron'
import usePlayer from '@/store/player'
import { Base64 } from 'js-base64'
import { accountUserInfo, accountSearchUser, accountShipInfo } from '@/api/wows/wows'

// 开始获循环获取文件夹内容
export function loopGetTempArenaInfoJson () {
  const electronStore = useElectron()
  setInterval(() => {
    window.electronAPI.getTempArenaInfoJson(electronStore.tempArenaInfoJsonPath + '//tempArenaInfo.json').then(response => {
      console.log(response)
      electronStore.setTempArenaInfoJsonRow(response)
    }).catch(error => {
      console.log(error)
    })
  }, 5000)
}

// 解析战斗数据
export async function analysisBattleTeamData (dataJson: any) {
  const playerStore = usePlayer()
  // 添加战斗团队
  for (const player of dataJson.vehicles) {
    player.dateTime = dataJson.dateTime
    // 查询船只信息

    // 机器人直接跳过
    if (player.name[0] === ':') { continue }
    // 需要先用名字查询id
    await accountSearchUser({ server: playerStore.server, userName: Base64.encode(player.name) }).then(
      response => {
        console.log(response)
        player.accountId = response.data.accountId
      }
    ).catch((error) => {
      console.log(error)
    })
    // 综合战绩
    accountUserInfo({ server: playerStore.server, accountId: player.accountId }).then(
      response => {
        player.overallPerformance = response.data
      }
    ).catch((error) => {
      console.log(error)
    })
    // 单船战绩
    accountShipInfo({ server: playerStore.server, accountId: player.accountId, shipId: player.shipId }).then(
      response => {
        player.shipPerformance = response.data
      }
    ).catch((error) => {
      console.log(error)
    })
  }
}
