import * as echarts from 'echarts'
import lodash from 'lodash'
import { getWinColor } from '@/utils/getColor'

/**
 * 构建用户综合战斗数图表
 * @param classifyShip
 * @param battlesEchart
 */
export const buildBattlesEchart = (classifyShip: any, battlesEchart: echarts.ECharts) => {
  const option:any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 阴影指示器
      }
    },
    legend: {
      textStyle: {
        color: 'white'
      },
      data: ['DD', 'CA', 'BB', 'CV']
    },
    title: {
      text: '战斗数',
      textStyle: {
        color: 'white',
        fontSize: 24
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        fontSize: 16,
        color: 'white'
      }
    }],
    xAxis: [
      {
        type: 'category',
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'X', 'Xl'],
        axisLabel: {
          color: 'white'
        }
      }
    ],
    series: []
  }
  option.series.push(
    {
      name: 'DD',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Destroyer?.battles,
        classifyShip[2]?.Destroyer?.battles,
        classifyShip[3]?.Destroyer?.battles,
        classifyShip[4]?.Destroyer?.battles,
        classifyShip[5]?.Destroyer?.battles,
        classifyShip[6]?.Destroyer?.battles,
        classifyShip[7]?.Destroyer?.battles,
        classifyShip[8]?.Destroyer?.battles,
        classifyShip[9]?.Destroyer?.battles,
        classifyShip[10]?.Destroyer?.battles,
        classifyShip[11]?.Destroyer?.battles
      ]
      // label: {
      //   show: true
      // }
    }
  )
  option.series.push(
    {
      name: 'CA',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Cruiser?.battles,
        classifyShip[2]?.Cruiser?.battles,
        classifyShip[3]?.Cruiser?.battles,
        classifyShip[4]?.Cruiser?.battles,
        classifyShip[5]?.Cruiser?.battles,
        classifyShip[6]?.Cruiser?.battles,
        classifyShip[7]?.Cruiser?.battles,
        classifyShip[8]?.Cruiser?.battles,
        classifyShip[9]?.Cruiser?.battles,
        classifyShip[10]?.Cruiser?.battles,
        classifyShip[11]?.Cruiser?.battles
      ]
    }
  )
  option.series.push(
    {
      name: 'BB',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.Battleship?.battles,
        classifyShip[2]?.Battleship?.battles,
        classifyShip[3]?.Battleship?.battles,
        classifyShip[4]?.Battleship?.battles,
        classifyShip[5]?.Battleship?.battles,
        classifyShip[6]?.Battleship?.battles,
        classifyShip[7]?.Battleship?.battles,
        classifyShip[8]?.Battleship?.battles,
        classifyShip[9]?.Battleship?.battles,
        classifyShip[10]?.Battleship?.battles,
        classifyShip[11]?.Battleship?.battles
      ]
    }
  )
  option.series.push(
    {
      name: 'CV',
      type: 'bar',
      stack: 'battles',
      data: [
        classifyShip[1]?.AirCarrier?.battles,
        classifyShip[2]?.AirCarrier?.battles,
        classifyShip[3]?.AirCarrier?.battles,
        classifyShip[4]?.AirCarrier?.battles,
        classifyShip[5]?.AirCarrier?.battles,
        classifyShip[6]?.AirCarrier?.battles,
        classifyShip[7]?.AirCarrier?.battles,
        classifyShip[8]?.AirCarrier?.battles,
        classifyShip[9]?.AirCarrier?.battles,
        classifyShip[10]?.AirCarrier?.battles,
        classifyShip[11]?.AirCarrier?.battles
      ]
    }
  )
  const count = []
  function null0 (value: any) {
    if (lodash.isNumber(value)) {
      return value
    } else {
      return 0
    }
  }
  for (let i = 0; i < 11; i++) {
    count[i] = null0(classifyShip[i + 1]?.Destroyer?.battles) +
      null0(classifyShip[i + 1]?.Cruiser?.battles) +
      null0(classifyShip[i + 1]?.Battleship?.battles) +
      null0(classifyShip[i + 1]?.AirCarrier?.battles)
  }
  option.series.push(
    {
      name: '总计',
      type: 'bar',
      barGap: '-100%', // 左移100%，stack不再与上面两个在一列,
      data: count,
      label: {
        normal: {
          show: true, // 显示数值
          position: 'top', //  位置设为top
          formatter: '{c}',
          textStyle: { color: 'white' } // 设置数值颜色
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(128, 128, 128, 0)' // 设置背景颜色为透明
        }
      }
    }
  )
  battlesEchart.setOption(option)
}

/**
 * 构建用户每日战斗数据图表
 * @param battlesEchartData 用户战斗数图表数据
 * @param recentDate 用户每日数据用于显示详情
 * @param recentBattlesEchart
 */
export const buildRecentBattlesEchart = (battlesEchartData:any[], recentDate:any, recentBattlesEchart: echarts.ECharts) => {
  const recentBattlesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 阴影指示器
      },
      formatter: (params: any) => {
        let text = '<div style="display: flex;justify-content:space-between;"><div>' + params[0].name + '</div></div>'
        if (recentDate.value[params[0].name].pvpInfo.battles > 0) {
          text += `<div style="display: flex;justify-content:space-between;"><div>PR： </div><div style="color:${recentDate.value[params[0].name].pvpInfo.pr.color}">${recentDate.value[params[0].name].pvpInfo.pr.value}</div></div>`
          text += `<div style="display: flex;justify-content:space-between;"><div>胜率： </div><div style="color:${getWinColor(recentDate.value[params[0].name].pvpInfo.wins)}">${recentDate.value[params[0].name].pvpInfo.wins}%</div></div>`
        }
        text += `<div style="display: flex;justify-content:space-between;"><div>战斗数： </div><div>${params[0].value}</div></div>`
        if (recentDate.value[params[0].name].pvpSoloInfo.battles > 0) {
          text += `<div style="display: flex;justify-content:space-between;"><div>单野： </div><div>${recentDate.value[params[0].name].pvpSoloInfo.battles}</div></div>`
        }
        if (recentDate.value[params[0].name].pvpTwoInfo.battles > 0) {
          text += `<div style="display: flex;justify-content:space-between;"><div>自行车： </div><div>${recentDate.value[params[0].name].pvpTwoInfo.battles}</div></div>`
        }
        if (recentDate.value[params[0].name].pvpThreeInfo.battles > 0) {
          text += `<div style="display: flex;justify-content:space-between;"><div>装甲车： </div><div>${recentDate.value[params[0].name].pvpThreeInfo.battles}</div></div>`
        }
        if (recentDate.value[params[0].name].rankInfo.battles > 0) {
          text += `<div style="display: flex;justify-content:space-between;"><div>排位(不计入总计)： </div><div>${recentDate.value[params[0].name].rankInfo.battles}</div></div>`
        }
        return text
      }
    },
    title: {
      text: '近期战斗数（点击柱状图切换每日详情）',
      textStyle: {
        color: 'white',
        fontSize: 24
      }
    },
    yAxis: [{
      type: 'value',
      axisLabel: {
        fontSize: 16,
        color: 'white'
      }
    }],
    xAxis: [
      {
        type: 'category',
        data: battlesEchartData.map((value:any) => value.date),
        axisLabel: {
          color: 'white'
        }
      }
    ],
    series: [
      {
        name: '战斗数',
        data: battlesEchartData.map((value:any) => {
          return {
            value: value.battles,
            itemStyle: {
              color: getWinColor(value.wins)
            }
          }
        }),
        type: 'bar',
        barMaxWidth: '20%',
        label: {
          normal: {
            show: true, // 显示数值
            position: 'top', //  位置设为top
            formatter: '{c}',
            textStyle: { color: 'white' } // 设置数值颜色
          }
        }
      }
    ]
  }
  recentBattlesEchart.setOption(recentBattlesOption)
}
