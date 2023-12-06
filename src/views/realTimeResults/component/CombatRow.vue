<script setup lang="ts">
import playerInfo from '@/stores/playerInfo'
import basicInfo from '@/stores/basicInfo'
import router from '@/router'
import lodash from 'lodash'
const props = defineProps(['matchupRow'])
const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()
// 跳转到用户详情战绩
function goPlayer () {
  if (lodash.isNil(props.matchupRow.accountId)) return
  usePlayerInfo.searchPlayerInfo(props.matchupRow.accountId, useBasicInfo.realTimeResultServer)
  router.push('/player')
}
// props.matchupRow.overallPerformance
</script>
<template>
  <div class="matchup-row" :style="{'background-color': props.matchupRow.overallPerformance?.prInfo.color + '38'}" @dblclick="goPlayer">
  <!-- <div class="matchup-row" @dblclick="goPlayer"> -->
    <div class="pr-color" :style="{'background-color': props.matchupRow.overallPerformance?.prInfo.color}"></div>
    <div style="width: 85px;">
      <img class="ship-img" :src="props.matchupRow.shipInfo.imgSmall" />
    </div>
    <div class="name">
      <div class="text"><span v-if="props.matchupRow.overallPerformance?.userInfo?.clanInfo?.tag">[{{ props.matchupRow.overallPerformance?.userInfo?.clanInfo?.tag }}]</span>{{ props.matchupRow.name }}</div>
      <div class="text">{{ props.matchupRow.shipInfo.nameCn }}</div>
    </div>
    <!-- 场次 -->
    <div class="number">
      <div class="text">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.battleInfo.battle }}</div>
      <div class="text">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.battleInfo.battle }}</div>
    </div>
    <!-- pr -->
    <div class="number">
      <div class="text" :style="{'color': props.matchupRow.overallPerformance?.prInfo.color}">{{ props.matchupRow.overallPerformance?.prInfo.value }}</div>
      <div class="text" :style="{'color': props.matchupRow.shipPerformance?.typeInfo.PVP.prInfo.color}">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.prInfo.value }}</div>
    </div>
    <!-- 胜率 -->
    <div class="number">
      <div class="text" :style="{'color': props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.winsData.color}">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.win }}</div>
      <div class="text" :style="{'color': props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.winsData.color}">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.win }}</div>
    </div>
    <!-- 伤害 -->
    <div class="number" style="width: 70px;">
      <!-- <div class="text" :style="{'color': props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.damageData.color}">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.damage }}</div>
      <div class="text" :style="{'color': props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.damageData.color}">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.damage }}</div> -->
      <div class="text">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.damage }}</div>
      <div class="text">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.damage }}</div>
    </div>
    <!-- 命中 -->
    <div class="number">
      <div class="text">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
      <div class="text">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.hitRatioInfo.ratioMain }}</div>
    </div>
    <!-- kd -->
    <div class="number">
      <div class="text">{{ props.matchupRow.overallPerformance?.battleTypeInfo.PVP.shipInfo.avgInfo.kd }}</div>
      <div class="text">{{ props.matchupRow.shipPerformance?.typeInfo.PVP.battleInfo.avgInfo.kd }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.matchup-row{
  display: flex;
  margin: 2px 0;
  padding-right: 5px;
  font-size: 14px;
  background-color: #171e490f;
}
.ship-img{
  height: 50px;
}
.text{
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name{
  width: 150px;
}
.number{
  width: 50px;
  text-align: right;
}
.pr-color{
  width: 4px;
}
</style>
