<script setup lang="ts">

// 排行榜
import { ref, computed, onMounted, onActivated, watch } from 'vue'
import * as echarts from 'echarts'
import usePlayer from '@/store/player'
// import echartData from './data'
import moment from 'moment'
import lodash from 'lodash'
import { rankShip } from '@/api/wows/wows'
import { db } from '@/utils/db'

const player = usePlayer()
if (Object.keys(player.avgShip).length < 5) {
  player.getEncyclopediaShipAvg()
}
const nation = ref<string[]>([])
const shipType = ref<string[]>([])
const level = ref<number[]>([10, 11])

// 船id->船名
const idToName = computed(() => {
  const idToName:any = {}
  for (const index in player.avgShip) {
    idToName[player.avgShip[index].shipId] = player.avgShip[index].shipInfo.nameCn
  }
  return idToName
})

// 通过计算属性拿出要显示的列表
const showServerShipList = computed(() => {
  const showList = []
  for (const index in player.avgShip) {
    if (player.avgShip[index].data.averageDamageDealt < 1) {
      continue
    }
    if (nation.value.length > 0 && !nation.value.includes(player.avgShip[index].shipInfo.country)) {
      continue
    }
    if (shipType.value.length > 0 && !shipType.value.includes(player.avgShip[index].shipInfo.shipType)) {
      continue
    }
    if (level.value.length > 0 && !level.value.includes(player.avgShip[index].shipInfo.level)) {
      continue
    }
    showList.push(player.avgShip[index])
  }
  return showList
})
const countryFormatter = (row:any, column:any, cellValue:string) => {
  for (const countryItem of player.nationList) {
    if (countryItem.nation.toLocaleLowerCase() === cellValue.toLocaleLowerCase()) return countryItem.cn
  }
  return cellValue
}

const shipTypeFormatter = (row:any, column:any, cellValue:string) => {
  for (const shipTypeItem of player.shipTypeList) {
    if (shipTypeItem.key.toLocaleLowerCase() === cellValue.toLocaleLowerCase()) return shipTypeItem.value
  }
  return cellValue
}

// 选中的排行榜
const leaderboardShipId = ref<number>(4276041424)
const leaderboardServer = ref<string>(player.server)
const leaderboardPage = ref<number>(1)
const leaderboardPageOver = ref<boolean>(false)
const leaderboardList = ref<any[]>([])
const leaderboardLoading = ref(false)

// 表格点击事件
function handleCurrentChange (currentRow: any) {
  leaderboardShipId.value = currentRow.shipId
  reloadLeaderboard()
}
// 重载排行榜
function reloadLeaderboard () {
  leaderboardPage.value = 1
  leaderboardList.value = []
  leaderboardPageOver.value = false
  getLeaderboard()
}
// 查询排行榜
function getLeaderboard () {
  if (leaderboardPageOver.value) return
  leaderboardLoading.value = true
  rankShip({ page: leaderboardPage.value, server: leaderboardServer.value, shipId: leaderboardShipId.value }).then(
    response => {
      leaderboardLoading.value = false
      if (response.data.length === 0) {
        // 页加载完了
        leaderboardPageOver.value = true
      }
      leaderboardList.value.push(...response.data)
      leaderboardPage.value++
    }
  ).catch(() => {
    leaderboardLoading.value = false
  })
}
getLeaderboard()
</script>
<template>
  <div class="main-content">
    <!-- 查询框 -->
    <div class="query-div">
      <div>
        <div class="lable">国家:</div>
        <div class="select">
          <el-select
            v-model="nation"
            multiple placeholder="国家" size="small"
            style="width: 100%;"
          >
            <el-option
              v-for="item in player.nationList"
              :key="item.nation"
              :label="item.cn"
              :value="item.nation"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="lable">类别:</div>
        <div class="select">
          <el-select
            v-model="shipType"
            multiple placeholder="类别" size="small"
            style="width: 100%;"
          >
            <el-option
              v-for="item in player.shipTypeList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="lable">等级:</div>
        <div class="select">
          <el-select
            v-model="level"
            multiple placeholder="等级" size="small"
            style="width: 100%;"
          >
            <el-option
              v-for="item in 11"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="table-div">
      <el-table
        :data="showServerShipList"
        border
        :default-sort="{ prop: 'shipInfo.level', order: 'descending' }"
        highlight-current-row
        height="100%" style="width: 100%;"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="shipInfo.level" label="等级" align="center" width="80" sortable />
        <el-table-column prop="shipInfo.nameCn" label="船名" sortable>
          <template #default="scope">
            <div style="display: flex;align-items: center;">
              <img style="width: 50px;" :src="scope.row.shipInfo.imgSmall" />
              <span>{{ scope.row.shipInfo.nameCn }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.shipType" label="类别" :formatter="shipTypeFormatter" sortable />
        <el-table-column prop="shipInfo.country" label="国家" :formatter="countryFormatter" sortable />
        <el-table-column prop="data.winRate" label="平均胜率" align="right" sortable></el-table-column>
        <el-table-column prop="data.averageDamageDealt" label="平均伤害" align="right" sortable />
        <el-table-column prop="data.averageFrags" label="平均击杀" align="right" sortable />
      </el-table>
    </div>

    <!-- 当前选中舰船 -->
    <div class="ship-tags">
      {{ idToName[leaderboardShipId] }}排行榜
      <!-- 服务器选择 -->
      <el-select
        v-model="leaderboardServer"
        placeholder="Select"
        size="small"
        style="margin-left: 5px;"
        @change="reloadLeaderboard"
      >
        <el-option
          v-for="item in player.serverList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-button
        :disabled="leaderboardPageOver" size="small"
        :loading="leaderboardLoading"
        style="margin-left: 5px;"
        @click="getLeaderboard"
      >
        {{leaderboardPageOver?'已加载全部':'加载下一页'}}
      </el-button>
    </div>
    <!-- 排行榜 -->
    <div class="table-div" style="height: 800px;padding-bottom: 20px;">
      <el-table
        :data="leaderboardList"
        border
        height="100%" style="width: 100%;"
      >
        <el-table-column prop="rankRow" width="50" />
        <el-table-column prop="userName" label="玩家" sortable>
          <template #default="scope">
            <span v-if="scope.row.clanTag">[{{ scope.row.clanTag }}]</span>
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pr" align="right" label="pr" />
        <el-table-column prop="battle" align="right" label="场次" />
        <el-table-column prop="damage" align="right" label="场均伤害" />
        <el-table-column prop="maxDamage" align="right" label="最大伤害" />
        <el-table-column prop="maxDamage" align="right" label="最大伤害" />
        <el-table-column prop="wins" align="right" label="胜率" />
        <!-- <el-table-column prop="xp" align="right" label="经验" /> -->
        <el-table-column prop="frags" align="right" label="击杀" />
        <el-table-column prop="maxFrags" align="right" label="最高击杀" />
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.main-content {
  background-color: $global-v-page-background-color;
  background-color: white;
  min-height 100%
  position: relative;
}
.query-div{
  display flex
  position: relative;
  padding 20px
  // color white
  max-width: $global-v-div-max-width;
  margin: 0 auto;

  &>div{
    display flex
    align-items center
    padding-right 20px

    .lable{
      width 56px
      letter-spacing: 5px;
    }
    .select{
      width 300px
    }
  }
}
.table-div {
  max-width: $global-v-div-max-width;
  margin: 0 auto;
  height 500px
  // position: absolute;
  position: relative;
  left: 0;
  right: 0;
}
.ship-tags{
  max-width: $global-v-div-max-width;
  margin: 0 auto;
  padding 20px 0 10px 0

  .tag{
    margin 10px 5px 0px 0
  }
}
.echart-div{
  height: 500px
  max-width: $global-v-div-max-width;
  margin: 0 auto;
}
</style>
