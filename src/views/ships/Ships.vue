<script setup lang="ts">
// 船只列表
import { ref, computed } from 'vue'
import { getWinColor } from '@/utils/getColor'
import usePlayer from '@/store/player'

const player = usePlayer()
const nation = ref<string[]>([])
const shipType = ref<string[]>([])
const level = ref<number[]>([6, 7, 8, 9, 10, 11])

// 通过计算属性拿出要显示的列表
const showShipList = computed(() => {
  if ((nation.value.length + shipType.value.length + level.value.length) === 0) return player.playerShips
  const showList = []
  for (const ship of player.playerShips) {
    // 剔除0场次的条目
    if (ship.shipInfo.battles < 1) continue
    if (nation.value.length > 0 && !nation.value.includes(ship.shipInfo.shipInfo.country)) {
      continue
    }
    if (shipType.value.length > 0 && !shipType.value.includes(ship.shipInfo.shipInfo.shipType)) {
      continue
    }
    if (level.value.length > 0 && !level.value.includes(ship.shipInfo.shipInfo.level)) {
      continue
    }
    showList.push(ship)
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
        :data="showShipList" border
        :default-sort="{ prop: 'shipInfo.shipInfo.level', order: 'descending' }"
        height="100%" style="width: 100%;"
      >
        <el-table-column type="expand">
          <!-- 展开船只详情 -->
          <template #default="props">
            <div class="ship-details">
              <table>
                <tr><th style="width:75px;text-align:left;">类型</th><th>场次</th><th>PR</th><th>胜率</th><th>伤害</th><th>经验</th><th>命中</th><th>KD</th></tr>
                <tr v-show="props.row.shipSolo.battles>0">
                  <td style="text-align:left;">单野</td><td>{{ props.row.shipSolo.battles }}</td><td :style="{color: props.row.shipSolo.pr.color}">{{ props.row.shipSolo.pr.value }}</td>
                  <td :style="{color: getWinColor(props.row.shipSolo.wins)}">{{ props.row.shipSolo.wins }}%</td><td>{{ props.row.shipSolo.damage }}</td><td>{{ props.row.shipSolo.xp }}</td>
                  <td>{{ props.row.shipSolo.hit }}</td><td>{{ props.row.shipSolo.kd }}</td>
                </tr>
                <tr v-show="props.row.shipTwo.battles>0">
                  <td style="text-align:left;">自行车</td><td>{{ props.row.shipTwo.battles }}</td><td :style="{color: props.row.shipTwo.pr.color}">{{ props.row.shipTwo.pr.value }}</td>
                  <td :style="{color: getWinColor(props.row.shipTwo.wins)}">{{ props.row.shipTwo.wins }}%</td><td>{{ props.row.shipTwo.damage }}</td><td>{{ props.row.shipTwo.xp }}</td>
                  <td>{{ props.row.shipTwo.hit }}</td><td>{{ props.row.shipTwo.kd }}</td>
                </tr>
                <tr v-show="props.row.shipThree.battles>0">
                  <td style="text-align:left;">装甲车</td><td>{{ props.row.shipThree.battles }}</td><td :style="{color: props.row.shipThree.pr.color}">{{ props.row.shipThree.pr.value }}</td>
                  <td :style="{color: getWinColor(props.row.shipThree.wins)}">{{ props.row.shipThree.wins }}%</td><td>{{ props.row.shipThree.damage }}</td><td>{{ props.row.shipThree.xp }}</td>
                  <td>{{ props.row.shipThree.hit }}</td><td>{{ props.row.shipThree.kd }}</td>
                </tr>
                <tr v-show="props.row.rankSolo.battles>0">
                  <td style="text-align:left;">排位赛</td><td>{{ props.row.rankSolo.battles }}</td><td :style="{color: props.row.rankSolo.pr.color}">{{ props.row.rankSolo.pr.value }}</td>
                  <td :style="{color: getWinColor(props.row.rankSolo.wins)}">{{ props.row.rankSolo.wins }}%</td><td>{{ props.row.rankSolo.damage }}</td><td>{{ props.row.rankSolo.xp }}</td>
                  <td>{{ props.row.rankSolo.hit }}</td><td>{{ props.row.rankSolo.kd }}</td>
                </tr>
              </table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.shipInfo.level" label="等级" align="center" width="80" sortable />
        <el-table-column prop="shipInfo.shipInfo.nameCn" label="船名" sortable>
          <template #default="scope">
            <img style="width: 50px;" :src="scope.row.shipInfo.shipInfo.imgSmall" />
            <span>{{ scope.row.shipInfo.shipInfo.nameCn }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.shipInfo.shipType" label="类别" width="100" :formatter="shipTypeFormatter" sortable />
        <el-table-column prop="shipInfo.shipInfo.country" label="国家" width="100" :formatter="countryFormatter" sortable />
        <el-table-column prop="shipInfo.battles" label="场次" align="right" width="80" sortable />
        <el-table-column prop="shipInfo.pr.value" label="PR" align="right" width="80" sortable>
          <template #default="scope">
            <div :style="{color: scope.row.shipInfo.pr.color}">{{ scope.row.shipInfo.pr.value }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.wins" label="胜率" align="right" width="80" sortable>
          <template #default="scope">
            <div :style="{color: getWinColor(scope.row.shipInfo.wins)}">{{ scope.row.shipInfo.wins }}%</div>
          </template>
        </el-table-column>
        <el-table-column label="serverAvg" align="right" width="100">
          <template #default="scope">
            <div>{{ player.avgShip[scope.row.shipInfo.shipInfo.nameEnglish]?.data?.winRate }}%</div>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.damage" label="伤害" align="right" width="100" sortable />
        <el-table-column label="serverAvg" align="right" width="100">
          <template #default="scope">
            <div>{{ player.avgShip[scope.row.shipInfo.shipInfo.nameEnglish]?.data?.averageDamageDealt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.extensionDataInfo.maxDamage" label="最大伤害" align="right" width="110" sortable />
        <el-table-column prop="shipInfo.xp" label="经验" align="right" width="80" sortable />
        <el-table-column prop="shipInfo.hit" label="命中" align="right" width="80" sortable />
        <el-table-column prop="shipInfo.kd" label="KD" align="right" width="70" sortable />
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
  height calc( 100% - 70px )
  position: absolute;
  // position: relative;
  left: 0;
  right: 0;
}
.ship-details{
  padding 10px 50px
  tr{
    text-align right

    th{
      width:60px
    }
  }
}
</style>
