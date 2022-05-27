<script setup lang="ts">
// 船只列表
import { ref, computed } from 'vue'
import usePlayer from '@/store/player'

const player = usePlayer()
const nation = ref<string[]>([])
const shipType = ref<string[]>([])
const level = ref<number[]>([])

// 通过计算属性拿出要显示的列表
const showShipList = computed(() => {
  if ((nation.value.length + shipType.value.length + level.value.length) === 0) return player.playerShips
  const showList = []
  for (const ship of player.playerShips) {
    if (nation.value.length > 0 && !nation.value.includes(ship.shipInfo.country.toLocaleLowerCase())) {
      continue
    }
    if (shipType.value.length > 0 && !shipType.value.includes(ship.shipInfo.shipType)) {
      continue
    }
    if (level.value.length > 0 && !level.value.includes(ship.shipInfo.level)) {
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
      <el-table :data="showShipList" border height="100%" style="width: 100%;">
        <el-table-column prop="shipInfo.level" label="等级" align="center" width="80" sortable />
        <el-table-column prop="shipInfo.nameCn" label="船名" width="220" sortable>
          <template #default="scope">
            <img style="width: 50px;" :src="scope.row.shipInfo.imgSmall" />
            <span>{{ scope.row.shipInfo.nameCn }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shipInfo.shipType" label="类别" width="100" :formatter="shipTypeFormatter" sortable />
        <el-table-column prop="shipInfo.country" label="国家" width="100" :formatter="countryFormatter" sortable />
        <el-table-column prop="pr.value" label="PR" align="right" sortable>
          <template #default="scope">
            <div :style="{color: scope.row.pr.color}">{{ scope.row.pr.value }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="battles" label="场次" align="right" sortable />
        <el-table-column prop="damage" label="伤害" align="right" sortable />
        <el-table-column prop="extensionDataInfo.maxDamage" label="最大伤害" align="right" sortable />
        <el-table-column prop="xp" label="经验" align="right" sortable />
        <el-table-column prop="hit" label="命中" align="right" sortable />
        <el-table-column prop="kd" label="KD" align="right" sortable />
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
</style>
