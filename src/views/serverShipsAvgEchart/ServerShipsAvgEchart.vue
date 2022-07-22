<script setup lang="ts">

// 服务器日均数据
import { ref, computed, onMounted, onActivated, watch } from 'vue'
import * as echarts from 'echarts'
import usePlayer from '@/store/player'
// import echartData from './data'
import moment from 'moment'
import lodash from 'lodash'
import { encyclopediaShipAvgHistory } from '@/api/wows/wows'
import { db } from '@/utils/db'

const echartData = ref<any>({})

const player = usePlayer()
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

//  筛选图表显示逻辑相关
const selectShips = ref<number[]>([4276041424])
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

// 胜率图
const winRateDiv = ref<HTMLElement|null>(null)
const averageDamageDealtDiv = ref<HTMLElement|null>(null)
const averageFragsDiv = ref<HTMLElement|null>(null)
let winRateEchart!: echarts.ECharts
let averageDamageDealtEchart!: echarts.ECharts
let averageFragsEchart!: echarts.ECharts
onMounted(async () => {
  winRateEchart = echarts.init(winRateDiv.value as HTMLElement)
  averageDamageDealtEchart = echarts.init(averageDamageDealtDiv.value as HTMLElement)
  averageFragsEchart = echarts.init(averageFragsDiv.value as HTMLElement)
  const dbData = await db.encyclopediaShipAvgHistoryData.get('encyclopediaShipAvgHistoryData')
  if (lodash.isNil(dbData) || dbData.day !== moment().format('YYYY-MM-DD')) {
    await encyclopediaShipAvgHistory().then(
      response => {
        db.encyclopediaShipAvgHistoryData.put({
          id: 'encyclopediaShipAvgHistoryData',
          day: moment().format('YYYY-MM-DD'),
          data: JSON.stringify(response)
        })
        echartData.value = response
      }
    )
  } else {
    echartData.value = JSON.parse(dbData.data)
  }

  for (const serverShip of echartData.value.data) {
    serveShipAvgData[serverShip.shipId] = serverShip
  }
  buildEchart()
})
// 刷新图表操作
const echartsResize = () => {
  winRateEchart?.resize()
  averageDamageDealtEchart?.resize()
  averageFragsEchart?.resize()
}
// 页面变动时刷新图表
window.addEventListener('resize', () => {
  echartsResize()
})
// keep-alive激活时调用
onActivated(() => {
  echartsResize()
})
watch(() => [selectShips.value], () => {
  console.log('触发监听')
  buildEchart()
}, { deep: true })
// 渲染图表
const buildEchart = () => {
  winRateEchart.clear()
  // 补齐时间
  let date: string[] = []
  for (const shipId of selectShips.value) {
    if (date.length < serveShipAvgData[shipId].data.length) {
      const dayDate = []
      for (const day of serveShipAvgData[shipId].data) {
        dayDate.push(moment(day.recordTime * 1000).format('YYYY-MM-DD'))
      }
      date = dayDate
    }
  }
  // 对齐数据
  interface AvgMap {
    [key: number]: {
      nameCn: string
      winRateList:number[] // 胜率
      averageDamageDealtList:number[] // 场均
      averageFragsList:number[] // 击杀
    }
  }
  const avgMap:AvgMap = {}
  for (const shipId of selectShips.value) {
    // 如果此船数据长度小于最长的  则需要对齐进行补齐
    avgMap[shipId] = {
      nameCn: serveShipAvgData[shipId].shipInfo.nameCn,
      winRateList: [],
      averageDamageDealtList: [],
      averageFragsList: []
    }
    if (serveShipAvgData[shipId].data.length < date.length) {
      const num = date.length - serveShipAvgData[shipId].data.length
      avgMap[shipId].winRateList = new Array(num)
      avgMap[shipId].averageDamageDealtList = new Array(num)
      avgMap[shipId].averageFragsList = new Array(num)
    }
    // 数据插入
    for (const item of serveShipAvgData[shipId].data) {
      avgMap[shipId].winRateList.push(item.winRate)
      avgMap[shipId].averageDamageDealtList.push(item.averageDamageDealt)
      avgMap[shipId].averageFragsList.push(item.averageFrags)
    }
  }

  // winRateEchart
  const winRateOption = getTemplateOption()
  const averageDamageDealtOption = getTemplateOption()
  const averageFragsOption = getTemplateOption()
  // 时间
  winRateOption.xAxis.data = date
  averageDamageDealtOption.xAxis.data = date
  averageFragsOption.xAxis.data = date
  winRateOption.title.text = '服务器平均胜率'
  averageDamageDealtOption.title.text = '服务器平均伤害'
  averageFragsOption.title.text = '服务器平均击杀'
  for (const shipId in avgMap) {
    winRateOption.series.push({
      name: avgMap[shipId].nameCn,
      type: 'line',
      data: avgMap[shipId].winRateList
    })
    averageDamageDealtOption.series.push({
      name: avgMap[shipId].nameCn,
      type: 'line',
      data: avgMap[shipId].averageDamageDealtList
    })
    averageFragsOption.series.push({
      name: avgMap[shipId].nameCn,
      type: 'line',
      data: avgMap[shipId].averageFragsList
    })
  }
  console.log(winRateOption)
  winRateEchart.setOption(winRateOption)
  averageDamageDealtEchart.setOption(averageDamageDealtOption)
  averageFragsEchart.setOption(averageFragsOption)
}

// 构建
const getTemplateOption = ():any => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 阴影指示器
      }
    },
    dataZoom: {
      show: true
    },
    legend: {
      textStyle: {
        // color: 'white'
      }
      // data: []
    },
    title: {
      text: '',
      textStyle: {
        // color: 'white',
        fontSize: 24
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        fontSize: 16
        // color: 'white'
      }
    }],
    xAxis: {
      type: 'category',
      data: ['1'],
      axisLabel: {
        // color: 'white'
      }
    },
    series: []
  }
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
        <el-table-column prop="data.averageFrags" label="平均击杀" align="right" sortable />
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
    <!-- 胜率 -->
    <div style="height:15px"></div>
    <div ref="winRateDiv" class="echart-div"></div>
    <div style="height:15px"></div>
    <div ref="averageDamageDealtDiv" class="echart-div"></div>
    <div style="height:15px"></div>
    <div ref="averageFragsDiv" class="echart-div"></div>
    <div style="height:15px"></div>
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
.echart-div{
  height: 500px
  max-width: $global-v-div-max-width;
  margin: 0 auto;
}
</style>
