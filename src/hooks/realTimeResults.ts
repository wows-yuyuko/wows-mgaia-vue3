// 实时战绩相关
import useElectron from '@/stores/electron'
import basicInfo from '@/stores/basicInfo'

// 开始获循环获取文件夹内容
export function loopGetTempArenaInfoJson () {
  const electronStore = useElectron()
  setInterval(() => {
    window.electronAPI.getTempArenaInfoJson(electronStore.tempArenaInfoJsonPath + '//tempArenaInfo.json').then(response => {
      electronStore.setTempArenaInfoJsonRow(response)
    }).catch(error => {
      console.log(error)
    })
  }, 5000)
}
// 等级比较排序
function levelCompare (player: any, nextPlayer:any) {
  if (player.shipInfo.level < nextPlayer.shipInfo.level) {
    return 1
  } else if (player.shipInfo.level > nextPlayer.shipInfo.level) {
    return -1
  } else {
    return 0
  }
}
// 实时战斗分类排序
export async function sortBattleTeamData (dataJson: any) {
  const useBasicInfo = basicInfo()
  const AirCarrier = [] // 航母
  const Battleship = [] // 战列
  const Cruiser = [] // 巡洋
  const Destroyer = [] // 驱逐舰
  const Submarine = [] // 潜艇
  // 添加战斗团队
  for (const player of dataJson.vehicles) {
    player.dateTime = dataJson.dateTime
    // 查询船只信息
    player.shipInfo = useBasicInfo.shipInfoMap[player.shipId]
    switch (player.shipInfo.shipType) {
      case 'AirCarrier':
        AirCarrier.push(player)
        break
      case 'Battleship':
        Battleship.push(player)
        break
      case 'Cruiser':
        Cruiser.push(player)
        break
      case 'Destroyer':
        Destroyer.push(player)
        break
      case 'Submarine':
        Submarine.push(player)
        break
    }
  }
  AirCarrier.sort(levelCompare)
  Battleship.sort(levelCompare)
  Cruiser.sort(levelCompare)
  Destroyer.sort(levelCompare)
  Submarine.sort(levelCompare)

  return [
    ...AirCarrier,
    ...Battleship,
    ...Cruiser,
    ...Destroyer,
    ...Submarine
  ]
}
