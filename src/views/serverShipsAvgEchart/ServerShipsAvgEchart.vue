<script setup lang="ts">

// 服务器日均数据
import { ref, computed } from 'vue'
import usePlayer from '@/store/player'
import echartData from './data'

const player = usePlayer()
const nation = ref<string[]>([])
const shipType = ref<string[]>([])
const level = ref<number[]>([10, 11])

// 船id->船名
const idToName:{[key: number]:string} = {}
for (const index in player.avgShip) {
  idToName[player.avgShip[index].shipId] = player.avgShip[index].shipInfo.nameCn
}
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

//  筛选图表显示逻辑相关
const selectShips = ref<number[]>([])
// 删除选中船只
const deleteShipId = (shipId: number) => {
  for (let index = 0; index < selectShips.value.length; index++) {
    if (selectShips.value[index] === shipId) {
      selectShips.value.splice(index, 1)
      return
    }
  }
}
// 渲染图表
const serveShipAvgData:any = {}
for (const serverShip of echartData.data) {
  serveShipAvgData[serverShip.shipId] = serverShip
}

// 渲染图表
const buildEchart = () => {
  // 补齐时间
  let date = []
  for (const shipId of selectShips.value) {
    if (date.length < serveShipAvgData[shipId].data.length) {
      const dayDate = []
      for (const day of serveShipAvgData[shipId].data) {
        dayDate.push(day.recordTime)
      }
      date = dayDate
    }
  }
  // 对其数据
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
        :data="showServerShipList" border
        :default-sort="{ prop: 'shipInfo.level', order: 'descending' }"
        height="100%" style="width: 100%;"
      >
        <el-table-column prop="shipInfo.level" label="等级" align="center" width="80" sortable />
        <el-table-column prop="shipInfo.nameCn" label="船名" sortable>
          <template #default="scope">
            <el-checkbox-group v-model="selectShips">
              <el-checkbox :label="scope.row.shipId">
                <div style="display: flex;align-items: center;">
                  <img style="width: 50px;" :src="scope.row.shipInfo.imgSmall" />
                  <span>{{ scope.row.shipInfo.nameCn }}</span>
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.shipType" label="类别" :formatter="shipTypeFormatter" sortable />
        <el-table-column prop="shipInfo.country" label="国家" :formatter="countryFormatter" sortable />
        <el-table-column prop="data.winRate" label="平均胜率" align="right" sortable></el-table-column>
        <el-table-column prop="data.averageDamageDealt" label="平均伤害" align="right" sortable />
        <el-table-column prop="data.averageFrags" label="平均占点" align="right" sortable />
      </el-table>
    </div>
    <!-- 当前选中舰船 -->
    <div class="ship-tags">
      <el-tag
        v-for="shipId in selectShips"
        :key="shipId"
        class="tag"
        closable
        @close="deleteShipId(shipId)"
      >
        {{ idToName[shipId] }}
      </el-tag>
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

  .tag{
    margin 10px 5px 0px 0
  }
}
</style>
