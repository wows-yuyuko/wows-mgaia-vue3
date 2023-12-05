<script setup lang="ts">
import playerInfo from '@/stores/playerInfo'
import SearchPlayer from '@/components/searchPlayer/SearchPlayer.vue'
import { getRecentDayInfo } from '@/api/recent/wowsRecent'
import basicInfo from '@/stores/basicInfo'
import { dayjs } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { ref, watch, nextTick, computed, onMounted } from 'vue'
import lodash from 'lodash'
import * as echarts from 'echarts'
import type { Recentinfo } from '@/types/wowsPlayerType'
// 玩家信息页

const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()

// 各级战舰场次统计
const fightCountEchart = ref<HTMLDivElement>()
let battlesEchart!: echarts.ECharts
const buildRecentAndbattlesEchart = () => {
  if (lodash.isNil(usePlayerInfo.playerInfo)) return null
  // 获取近期数据
  getRecent()
  const xData = []
  const seriesMap:{[key:string]:number[]} = { Submarine: [], Destroyer: [], Cruiser: [], Battleship: [], AirCarrier: [], battleCountAll: [] }
  for (const key in usePlayerInfo.playerInfo.battleCount.Cruiser) {
    xData.push(key)
    seriesMap.Submarine.push(usePlayerInfo.playerInfo.battleCount.Submarine[key])
    seriesMap.Destroyer.push(usePlayerInfo.playerInfo.battleCount.Destroyer[key])
    seriesMap.Cruiser.push(usePlayerInfo.playerInfo.battleCount.Cruiser[key])
    seriesMap.Battleship.push(usePlayerInfo.playerInfo.battleCount.Battleship[key])
    seriesMap.AirCarrier.push(usePlayerInfo.playerInfo.battleCount.AirCarrier[key])
    seriesMap.battleCountAll.push(usePlayerInfo.playerInfo.battleCountAll[key])
  }
  const option = {
    backgroundColor: 'rgba(255,255,255,0)',
    title: {
      text: '舰船场次等级分布'
    },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    series: [
      {
        name: '潜艇',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesMap.Submarine
      },
      {
        name: '航母',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesMap.AirCarrier
      },
      {
        name: '驱逐',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesMap.Destroyer
      },
      {
        name: '巡洋',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesMap.Cruiser
      },
      {
        name: '战列',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: seriesMap.Battleship
      }
      // {
      //   name: '总计',
      //   type: 'bar',
      //   stack: 'battleCountAll',
      //   label: {
      //     show: true
      //   },
      //   emphasis: {
      //     focus: 'series'
      //   },
      //   data: seriesMap.battleCountAll
      // }
    ]
  }
  nextTick(() => {
    battlesEchart = echarts.init(fightCountEchart.value, 'dark')
    battlesEchart.setOption(option)
  })
}
onMounted(() => {
  buildRecentAndbattlesEchart()
})
watch(() => usePlayerInfo.playerInfo, () => {
  console.log(usePlayerInfo.playerInfo)
  buildRecentAndbattlesEchart()
})

// recent相关
const recentDate = ref(dayjs().format('YYYY-MM-DD'))
const recentNum = ref(7)
const recentData = ref<Recentinfo|null>(null)
const getRecent = () => {
  getRecentDayInfo({ server: useBasicInfo.useServerValue, accountId: usePlayerInfo.playerInfo!.userInfo.accountId!, dateTime: recentDate.value, day: recentNum.value, shipId: 0 }).then(response => {
    console.log(response)
    recentData.value = response
  }).catch(err => {
    console.log(err)
    recentData.value = null
  })
}
const recentDataComputed = computed(() => {
  if (lodash.isNil(recentData.value)) return []
  const returnData = []
  for (const item of recentData.value.shipInfoBattleList) {
    if (!item.typeInfo.PVP.battle) continue
    returnData.push({
      nameCn: item.shipInfo.nameCn, // 舰船
      imgSmall: item.shipInfo.imgSmall, // 船只图
      level: item.shipInfo.level, // 等级
      battle: item.typeInfo.PVP.battleInfo.battleInfo.battle, // 场次
      prValue: item.typeInfo.PVP.prInfo.value,
      prName: item.typeInfo.PVP.prInfo.name,
      prNextValue: item.typeInfo.PVP.prInfo.nextValue,
      prColor: item.typeInfo.PVP.prInfo.color,
      win: item.typeInfo.PVP.battleInfo.avgInfo.win,
      winColor: item.typeInfo.PVP.battleInfo.avgInfo.winsData.code,
      damage: item.typeInfo.PVP.battleInfo.avgInfo.damage,
      damageColor: item.typeInfo.PVP.battleInfo.avgInfo.damageData.color,
      xp: item.typeInfo.PVP.battleInfo.avgInfo.xp,
      hitRatio: item.typeInfo.PVP.battleInfo.hitRatioInfo.ratioMain,
      kd: item.typeInfo.PVP.battleInfo.avgInfo.kd
    })
  }
  return returnData
})
</script>

<template>
  <div class="player-page"  v-loading="usePlayerInfo.playerInfoLoading">
    <SearchPlayer v-show="usePlayerInfo.playerInfo === null" />
    <div  v-if="usePlayerInfo.playerInfo !== null" class="player-info">
      <div class="portrait">
        <!-- 看板娘 -->
        <img src="https://mgaia.oss-cn-hangzhou.aliyuncs.com/wows/yuyuko_3.png">
        <img src="https://mgaia.oss-cn-hangzhou.aliyuncs.com/wows/mgaia_boom.png">
      </div>
      <div class="data-view">
        <div class="name-time-row">
          <div>
            <span
              :style="{
                color:usePlayerInfo.playerInfo.userInfo.clanInfo.color,
                'font-size': '18px',
                'font-weight': 600
              }"
            >
              [{{ usePlayerInfo.playerInfo.userInfo.clanInfo.tag }}]
            </span>
            <span style="font-size: 18px;">{{  usePlayerInfo.playerInfo.userInfo.userName }}</span>
            <span style="font-size: 12px;margin-left: 30px;color: #999999;">注册时间: {{ dayjs.unix(usePlayerInfo.playerInfo.userInfo.accountCreateTime).format('YYYY-MM-DD') }}</span>
            <span style="font-size: 12px;margin-left: 30px;color: #999999;">最后战斗: {{ dayjs.unix(usePlayerInfo.playerInfo.lastBattleTime).format('YYYY-MM-DD') }}</span>

          </div>
          <div><el-button :icon="Search" circle @click="usePlayerInfo.playerInfo = null"/></div>
        </div>
        <div class="pr-row" :style="{
          backgroundColor:usePlayerInfo.playerInfo.prInfo.color
        }">
          <span>{{ usePlayerInfo.playerInfo.prInfo.name }}</span>
          <span>{{ usePlayerInfo.playerInfo.prInfo.value }}</span>
          <span>下一级：{{ usePlayerInfo.playerInfo.prInfo.nextValue }}</span>
        </div>
        <div class="overview-data">
          <div class="data-card">
            <div><img src="@/assets/player/overview/battles.png" /></div>
            <div class="title">场次</div>
            <div class="value">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.battleInfo.battle }}</div>
          </div>
          <div class="data-card">
            <div><img src="@/assets/player/overview/damage.png" /></div>
            <div class="title">场均</div>
            <div class="value" :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.avgInfo.damage }}</div>
          </div>
          <div class="data-card background">
            <div><img src="@/assets/player/overview/xp.png" /></div>
            <div class="title">场均经验</div>
            <div class="value">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.avgInfo.xp }}</div>
          </div>
          <div class="data-card">
            <div><img src="@/assets/player/overview/wins.png" /></div>
            <div class="title">胜率</div>
            <div class="value">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.avgInfo.win }}</div>
          </div>
          <div class="data-card">
            <div><img src="@/assets/player/overview/hit.png" /></div>
            <div class="title">命中</div>
            <div class="value">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          </div>
        </div>
        <!-- 综合战绩分类 -->
        <div class="table-row" style="background-color: #29292999;">
          <div>类型</div>
          <div>场次</div>
          <div>PR</div>
          <div>经验</div>
          <div>场均</div>
          <div>K/D</div>
          <div>命中</div>
          <div>胜率</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.battle">
          <div>单野</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.prInfo.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.prInfo.name }} {{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_SOLO.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.battle">
          <div>自行车</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.prInfo.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.prInfo.name }} {{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV2.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.battle">
          <div>三轮车</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.prInfo.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.prInfo.name }} {{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.PVP_DIV3.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.battle">
          <div>排位赛</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.prInfo.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.prInfo.name }} {{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.battleTypeInfo.RANK_SOLO.shipInfo.avgInfo.win }}</div>
        </div>

        <!-- 船只种类分类 -->
        <div class="table-row" style="margin-top: 50px;    background-color: #29292999;">
          <div>类型</div>
          <div>场次</div>
          <div>PR</div>
          <div>经验</div>
          <div>场均</div>
          <div>K/D</div>
          <div>命中</div>
          <div>胜率</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.battle">
          <div>驱逐舰</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Destroyer.PVP.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.battle">
          <div>巡洋舰</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Cruiser.PVP.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.battle">
          <div>战列舰</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Battleship.PVP.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.battle">
          <div>航空母舰</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.AirCarrier.PVP.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.battle">
          <div>辅助</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Auxiliary.PVP.shipInfo.avgInfo.win }}</div>
        </div>
        <div class="table-row" v-if="usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.battle">
          <div>潜艇</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.battleInfo.battle }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.prInfo.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.prInfo.name }} {{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.prInfo.value }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.xp }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.damageData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.damage }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.kd }}</div>
          <div>{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.hitRatioInfo.ratioMain }}</div>
          <div :style="{color: usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.winsData.color}">{{ usePlayerInfo.playerInfo.shipTypeInfo.Submarine.PVP.shipInfo.avgInfo.win }}</div>
        </div>

        <!-- 场次数量 -->
        <div ref="fightCountEchart" style="height: 500px; margin-top: 50px;" />

        <!-- recent 最近n天数据 -->
        <div style="display: flex;align-items: center; padding-bottom: 20px;">
          <el-date-picker style="margin-right: 20px;" v-model="recentDate" type="date" placeholder="Pick a day" size="small" />
          起,前
          <el-input-number style="margin:0 20px;" v-model="recentNum" :min="1" size="small" />
          天数据
          <el-button style="margin-left: 20px;" type="primary" :icon="Search" @click="getRecent" size="small">查询</el-button>
        </div>
        <div style="padding-bottom: 60px;">
          <el-empty v-if="recentData === null" description="所选时间段无数据" />
          <div v-else>
            <el-table :data="recentDataComputed" style="width: 100%">
              <el-table-column prop="imgSmall" label="等级" width="130" >
                <template #default="scope">
                  <img style="width: 100px;" :src="scope.row.imgSmall" />
                </template>
              </el-table-column>
              <el-table-column prop="level" label="等级" width="60" />
              <el-table-column prop="nameCn" label="舰船" />
              <el-table-column prop="battle" label="场次" />
              <el-table-column prop="prValue" label="PR"  width="160" >
                <template #default="scope">
                  <div :style="{color: scope.row.prColor}">{{ scope.row.prName }}({{ scope.row.prValue }})</div>
                </template>
              </el-table-column>
              <el-table-column prop="win" label="胜率" >
                <template #default="scope">
                  <div :style="{color: scope.row.winColor}">{{ scope.row.win }}%</div>
                </template>
              </el-table-column>
              <el-table-column prop="damage" label="伤害" >
                <template #default="scope">
                  <div :style="{color: scope.row.damageColor}">{{ scope.row.damage }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="xp" label="经验" />
              <el-table-column prop="hitRatio" label="命中率" />
              <el-table-column prop="kd" label="KD" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-page{

  .player-info{
    max-width: 1000px;
    margin: 0 auto;
    .portrait{
      width: 100%;
      height: 400px;
      user-select: none;
      display: flex;
      justify-content: space-between;
      position: relative;
      &>img{
        height: 100%;
        margin: 0 60px;
      }
    }
    .portrait:after {
      content: ' ';
      background: linear-gradient(180deg, transparent, transparent 30%, $mg-background-color) 0 0;
      display: block;
      width: 100%;
      height: 500px;
      position: absolute;
    }

    .data-view{
    margin-top: -200px;
    position: relative;
      .name-time-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .pr-row{
        height: 30px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;

        span{
          padding:0 5px;
        }
      }

      .overview-data{
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;

        .data-card{
          width:120px;
          height: 220px;
          // background-color: red;
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .title{
            padding: 5px 0;
          }
          .value{
            font-size: 22px;
          }
        }
      }
      .background{
        background-image: url(@/assets/player/overview/flag.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position:50% 50%;
      }
      .table-row{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        border-bottom: 1px solid var(--el-border-color);
        padding: 5px 0;

        div{
          flex-grow: 1;
          width: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
