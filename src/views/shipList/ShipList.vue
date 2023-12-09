<script setup lang="ts">
import playerInfo from '@/stores/playerInfo'
import basicInfo from '@/stores/basicInfo'
import { dayjs } from 'element-plus'
import { ref, computed } from 'vue'
import lodash from 'lodash'
// 舰船列表页

const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()

// 转换国家类型
const countryMap = computed(() => {
  const returnMap:{[key:string]:string} = {}
  for (const item of useBasicInfo.nationList) {
    returnMap[item.nation] = item.cn
    console.log(item)
  }
  return returnMap
})
console.log(usePlayerInfo.playerShipList)

// 表格数据
const selectShipTypeList = ref<string[]>([])
const selectNationList = ref<string[]>([])
const selectLevelList = ref<number[]>([10])
const shipListData = computed(() => {
  if (lodash.isNil(usePlayerInfo.playerShipList)) return []
  const tableData = []
  for (const shipInfo of usePlayerInfo.playerShipList.shipInfo) {
    if (!shipInfo.typeInfo.PVP.battle) continue
    if (selectShipTypeList.value.length > 0 && !selectShipTypeList.value.includes(shipInfo.shipInfo.shipType)) continue
    if (selectNationList.value.length > 0 && !selectNationList.value.includes(shipInfo.shipInfo.country)) continue
    if (selectLevelList.value.length > 0 && !selectLevelList.value.includes(shipInfo.shipInfo.level)) continue
    const shipMap = {
      rowkey: shipInfo.shipInfo.shipId,
      shipId: shipInfo.shipInfo.shipId,
      nameCn: shipInfo.shipInfo.nameCn,
      level: shipInfo.shipInfo.level,
      shipType: useBasicInfo.shipTypeMap[shipInfo.shipInfo.shipType],
      country: countryMap.value[shipInfo.shipInfo.country],
      imgSmall: shipInfo.shipInfo.imgSmall,
      prValue: shipInfo.typeInfo.PVP.prInfo.value,
      prNextValue: shipInfo.typeInfo.PVP.prInfo.nextValue,
      prName: shipInfo.typeInfo.PVP.prInfo.name,
      prColor: shipInfo.typeInfo.PVP.prInfo.color,
      battle: shipInfo.typeInfo.PVP.battleInfo.battleInfo.battle, // 战斗场次
      damage: shipInfo.typeInfo.PVP.battleInfo.avgInfo.damage, // 场均伤害
      damageColor: shipInfo.typeInfo.PVP.battleInfo.avgInfo.damageData.color,
      win: shipInfo.typeInfo.PVP.battleInfo.avgInfo.win,
      winColor: shipInfo.typeInfo.PVP.battleInfo.avgInfo.winsData.color,
      kd: shipInfo.typeInfo.PVP.battleInfo.avgInfo.kd,
      xp: shipInfo.typeInfo.PVP.battleInfo.avgInfo.xp,
      ratioMain: shipInfo.typeInfo.PVP.battleInfo.hitRatioInfo.ratioMain, // 主炮命中率
      ratioAtba: shipInfo.typeInfo.PVP.battleInfo.hitRatioInfo.ratioAtba, // 副炮命中率
      ratioTpd: shipInfo.typeInfo.PVP.battleInfo.hitRatioInfo.ratioTpd, // 鱼雷命中率
      ratioTbomb: shipInfo.typeInfo.PVP.battleInfo.hitRatioInfo.ratioTbomb, // 深水炸弹命中率
      gameContributionToCapture: shipInfo.typeInfo.PVP.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToCapture, // 占领贡献率
      gameContributionToDefense: shipInfo.typeInfo.PVP.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToDefense, // 防御贡献率
      lastBattleTime: shipInfo.typeInfo.PVP.battleInfo.lastBattleTime, // 最后战斗时间
      maxDamageDealt: shipInfo.typeInfo.PVP.battleInfo.maxInfo.maxDamageDealt.value, // 最大伤害
      maxPlanesKilled: shipInfo.typeInfo.PVP.battleInfo.maxInfo.maxPlanesKilled.value, // 最大击杀
      children: [
        {
          rowkey: shipInfo.shipInfo.shipId + '单野',
          nameCn: '单野',
          prValue: shipInfo.typeInfo.PVP_SOLO.prInfo.value,
          prNextValue: shipInfo.typeInfo.PVP_SOLO.prInfo.nextValue,
          prName: shipInfo.typeInfo.PVP_SOLO.prInfo.name,
          prColor: shipInfo.typeInfo.PVP_SOLO.prInfo.color,
          battle: shipInfo.typeInfo.PVP_SOLO.battleInfo.battleInfo.battle, // 战斗场次
          damage: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.damage, // 场均伤害
          damageColor: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.damageData.color,
          win: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.win,
          winColor: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.winsData.color,
          kd: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.kd,
          xp: shipInfo.typeInfo.PVP_SOLO.battleInfo.avgInfo.xp,
          ratioMain: shipInfo.typeInfo.PVP_SOLO.battleInfo.hitRatioInfo.ratioMain, // 主炮命中率
          ratioAtba: shipInfo.typeInfo.PVP_SOLO.battleInfo.hitRatioInfo.ratioAtba, // 副炮命中率
          ratioTpd: shipInfo.typeInfo.PVP_SOLO.battleInfo.hitRatioInfo.ratioTpd, // 鱼雷命中率
          ratioTbomb: shipInfo.typeInfo.PVP_SOLO.battleInfo.hitRatioInfo.ratioTbomb, // 深水炸弹命中率
          gameContributionToCapture: shipInfo.typeInfo.PVP_SOLO.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToCapture, // 占领贡献率
          gameContributionToDefense: shipInfo.typeInfo.PVP_SOLO.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToDefense, // 防御贡献率
          lastBattleTime: shipInfo.typeInfo.PVP_SOLO.battleInfo.lastBattleTime, // 最后战斗时间
          maxDamageDealt: shipInfo.typeInfo.PVP_SOLO.battleInfo.maxInfo.maxDamageDealt.value, // 最大伤害
          maxPlanesKilled: shipInfo.typeInfo.PVP_SOLO.battleInfo.maxInfo.maxPlanesKilled.value // 最大击杀
        },
        {
          rowkey: shipInfo.shipInfo.shipId + '自行车',
          nameCn: '自行车',
          prValue: shipInfo.typeInfo.PVP_DIV2.prInfo.value,
          prNextValue: shipInfo.typeInfo.PVP_DIV2.prInfo.nextValue,
          prName: shipInfo.typeInfo.PVP_DIV2.prInfo.name,
          prColor: shipInfo.typeInfo.PVP_DIV2.prInfo.color,
          battle: shipInfo.typeInfo.PVP_DIV2.battleInfo.battleInfo.battle, // 战斗场次
          damage: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.damage, // 场均伤害
          damageColor: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.damageData.color,
          win: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.win,
          winColor: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.winsData.color,
          kd: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.kd,
          xp: shipInfo.typeInfo.PVP_DIV2.battleInfo.avgInfo.xp,
          ratioMain: shipInfo.typeInfo.PVP_DIV2.battleInfo.hitRatioInfo.ratioMain, // 主炮命中率
          ratioAtba: shipInfo.typeInfo.PVP_DIV2.battleInfo.hitRatioInfo.ratioAtba, // 副炮命中率
          ratioTpd: shipInfo.typeInfo.PVP_DIV2.battleInfo.hitRatioInfo.ratioTpd, // 鱼雷命中率
          ratioTbomb: shipInfo.typeInfo.PVP_DIV2.battleInfo.hitRatioInfo.ratioTbomb, // 深水炸弹命中率
          gameContributionToCapture: shipInfo.typeInfo.PVP_DIV2.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToCapture, // 占领贡献率
          gameContributionToDefense: shipInfo.typeInfo.PVP_DIV2.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToDefense, // 防御贡献率
          lastBattleTime: shipInfo.typeInfo.PVP_DIV2.battleInfo.lastBattleTime, // 最后战斗时间
          maxDamageDealt: shipInfo.typeInfo.PVP_DIV2.battleInfo.maxInfo.maxDamageDealt.value, // 最大伤害
          maxPlanesKilled: shipInfo.typeInfo.PVP_DIV2.battleInfo.maxInfo.maxPlanesKilled.value // 最大击杀
        },
        {
          rowkey: shipInfo.shipInfo.shipId + '三轮车',
          nameCn: '三轮车',
          prValue: shipInfo.typeInfo.PVP_DIV3.prInfo.value,
          prNextValue: shipInfo.typeInfo.PVP_DIV3.prInfo.nextValue,
          prName: shipInfo.typeInfo.PVP_DIV3.prInfo.name,
          prColor: shipInfo.typeInfo.PVP_DIV3.prInfo.color,
          battle: shipInfo.typeInfo.PVP_DIV3.battleInfo.battleInfo.battle, // 战斗场次
          damage: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.damage, // 场均伤害
          damageColor: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.damageData.color,
          win: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.win,
          winColor: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.winsData.color,
          kd: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.kd,
          xp: shipInfo.typeInfo.PVP_DIV3.battleInfo.avgInfo.xp,
          ratioMain: shipInfo.typeInfo.PVP_DIV3.battleInfo.hitRatioInfo.ratioMain, // 主炮命中率
          ratioAtba: shipInfo.typeInfo.PVP_DIV3.battleInfo.hitRatioInfo.ratioAtba, // 副炮命中率
          ratioTpd: shipInfo.typeInfo.PVP_DIV3.battleInfo.hitRatioInfo.ratioTpd, // 鱼雷命中率
          ratioTbomb: shipInfo.typeInfo.PVP_DIV3.battleInfo.hitRatioInfo.ratioTbomb, // 深水炸弹命中率
          gameContributionToCapture: shipInfo.typeInfo.PVP_DIV3.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToCapture, // 占领贡献率
          gameContributionToDefense: shipInfo.typeInfo.PVP_DIV3.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToDefense, // 防御贡献率
          lastBattleTime: shipInfo.typeInfo.PVP_DIV3.battleInfo.lastBattleTime, // 最后战斗时间
          maxDamageDealt: shipInfo.typeInfo.PVP_DIV3.battleInfo.maxInfo.maxDamageDealt.value, // 最大伤害
          maxPlanesKilled: shipInfo.typeInfo.PVP_DIV3.battleInfo.maxInfo.maxPlanesKilled.value // 最大击杀
        },
        {
          rowkey: shipInfo.shipInfo.shipId + '排位赛',
          nameCn: '排位赛',
          prValue: shipInfo.typeInfo.RANK_SOLO.prInfo.value,
          prNextValue: shipInfo.typeInfo.RANK_SOLO.prInfo.nextValue,
          prName: shipInfo.typeInfo.RANK_SOLO.prInfo.name,
          prColor: shipInfo.typeInfo.RANK_SOLO.prInfo.color,
          battle: shipInfo.typeInfo.RANK_SOLO.battleInfo.battleInfo.battle, // 战斗场次
          damage: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.damage, // 场均伤害
          damageColor: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.damageData.color,
          win: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.win,
          winColor: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.winsData.color,
          kd: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.kd,
          xp: shipInfo.typeInfo.RANK_SOLO.battleInfo.avgInfo.xp,
          ratioMain: shipInfo.typeInfo.RANK_SOLO.battleInfo.hitRatioInfo.ratioMain, // 主炮命中率
          ratioAtba: shipInfo.typeInfo.RANK_SOLO.battleInfo.hitRatioInfo.ratioAtba, // 副炮命中率
          ratioTpd: shipInfo.typeInfo.RANK_SOLO.battleInfo.hitRatioInfo.ratioTpd, // 鱼雷命中率
          ratioTbomb: shipInfo.typeInfo.RANK_SOLO.battleInfo.hitRatioInfo.ratioTbomb, // 深水炸弹命中率
          gameContributionToCapture: shipInfo.typeInfo.RANK_SOLO.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToCapture, // 占领贡献率
          gameContributionToDefense: shipInfo.typeInfo.RANK_SOLO.battleInfo.controlCapturedAndDroppedPointsInfo.gameContributionToDefense, // 防御贡献率
          lastBattleTime: shipInfo.typeInfo.RANK_SOLO.battleInfo.lastBattleTime, // 最后战斗时间
          maxDamageDealt: shipInfo.typeInfo.RANK_SOLO.battleInfo.maxInfo.maxDamageDealt.value, // 最大伤害
          maxPlanesKilled: shipInfo.typeInfo.RANK_SOLO.battleInfo.maxInfo.maxPlanesKilled.value // 最大击杀
        }
      ]
    }
    tableData.push(shipMap)
  }
  return tableData
})
</script>

<template>
  <div class="ship-list-page" v-loading="usePlayerInfo.playerShipListLoading">
    <SearchPlayer v-show="usePlayerInfo.playerShipList === null" />
    <div style="width: 100%; height: 100%;"  v-if="usePlayerInfo.playerShipList !== null">
      <div style="display: flex;flex-direction: column;height: 100%;">
        <div style="padding: 20px;">
          <div style="display: flex;align-items: center;">
            类型：
            <el-checkbox-group v-model="selectShipTypeList" >
              <el-checkbox-button v-for="shipType in useBasicInfo.shipTypeList" :key="shipType.shipType" :label="shipType.shipType">
                {{ shipType.typeName }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div style="display: flex;align-items: center;">
            国家：
            <el-checkbox-group style="margin-top: 10px;" v-model="selectNationList" >
              <el-checkbox-button v-for="nation in useBasicInfo.nationList" :key="nation.nation" :label="nation.nation">
                {{ nation.cn }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div style="display: flex;align-items: center;">
            等级：
            <el-checkbox-group style="margin-top: 10px;" v-model="selectLevelList" >
              <el-checkbox-button v-for="index in 11" :key="index" :label="index">
                {{ index }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div style="flex-grow: 1;height: 0;padding: 0 20px 20px 20px;">
          <el-table :data="shipListData" style="width: 100%;height: 100%;" row-key="shipId">
            <el-table-column width="160" prop="imgSmall" label="图片" >
              <template #default="scope">
                <img style="width: 100px;" :src="scope.row.imgSmall" />
              </template>
            </el-table-column>
            <el-table-column width="120" prop="nameCn" label="名称" />
            <el-table-column align="center" width="80" prop="level" label="等级" sortable />
            <el-table-column prop="shipType" label="类型"  />
            <el-table-column prop="country" label="国家" sortable />
            <el-table-column align="center" width="140" prop="prValue" label="PR" sortable >
              <template #default="scope">
                <div :style="{color: scope.row.prColor}">{{ scope.row.prName }}({{ scope.row.prValue }})</div>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="battle" label="场次" sortable />
            <el-table-column align="right"  width="120" prop="damage" label="场均伤害" sortable >
              <template #default="scope">
                <div :style="{color: scope.row.damageColor}">{{ scope.row.damage }}</div>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="win" label="胜率" sortable >
              <template #default="scope">
                <div :style="{color: scope.row.winColor}">{{ scope.row.win }}%</div>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="kd" label="kd" sortable />
            <el-table-column align="right" prop="xp" label="经验" sortable />
            <el-table-column align="right" width="120" prop="ratioMain" label="主炮命中" sortable />
            <el-table-column align="right" width="120" prop="ratioAtba" label="副炮命中" sortable />
            <el-table-column align="right" width="120" prop="ratioTpd" label="鱼雷命中率" sortable />
            <el-table-column align="right" width="150" prop="ratioTbomb" label="深水炸弹命中率" sortable />
            <el-table-column align="right" width="120" prop="gameContributionToCapture" label="占领贡献" sortable />
            <el-table-column align="right" width="120" prop="gameContributionToDefense" label="防御贡献" sortable />
            <el-table-column align="right" width="120" prop="maxDamageDealt" label="最大伤害" sortable />
            <el-table-column align="right" width="120" prop="maxPlanesKilled" label="最大击杀" sortable />
            <el-table-column align="center" width="180" prop="lastBattleTime" label="最后战斗时间" sortable >
              <template #default="scope">
                <div>{{ dayjs.unix(scope.row.lastBattleTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ship-list-page{
height: 100%;
}
</style>
