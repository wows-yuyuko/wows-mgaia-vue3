// 设置不同颜色
const colorData = {
  bad: '#FE0E00', // 差
  belowAverage: '#FE7903', // 低于平均
  average: '#FFC71F', // 平均
  good: '#44B300',
  great: '#02C9B3', // 太棒了
  unicum: '#D042F3', // 出类拔萃
  superUnicum: '#A00DC5'
}

/**
 * 设置胜率颜色
 * @param value
 * @returns 颜色值
 */
export const getWinColor = (value: number) => {
  if (value < 45) return colorData.bad
  if (value < 50) return colorData.belowAverage
  if (value < 55) return colorData.average
  if (value < 60) return colorData.good
  if (value < 65) return colorData.great
  if (value < 70) return colorData.unicum
  return colorData.superUnicum
}

/**
 * 获取伤害颜色
 * @param type
 * @param value
 * @returns
 */
export const getDamageColor = (type: string, value: number) => {
  if (type === 'Destroyer') {
    if (value < 33000) return colorData.bad
    if (value < 40000) return colorData.good
    if (value < 55000) return colorData.great
    if (value < 64000) return colorData.unicum
    return colorData.superUnicum
  } else if (type === 'Cruiser') {
    if (value < 47000) return colorData.bad
    if (value < 55000) return colorData.good
    if (value < 83000) return colorData.great
    if (value < 95000) return colorData.unicum
    return colorData.superUnicum
  } else if (type === 'AirCarrier') {
    if (value < 60000) return colorData.bad
    if (value < 71000) return colorData.good
    if (value < 84000) return colorData.great
    if (value < 113000) return colorData.unicum
    return colorData.superUnicum
  } else {
    if (value < 60000) return colorData.bad
    if (value < 71000) return colorData.good
    if (value < 84000) return colorData.great
    if (value < 113000) return colorData.unicum
    return colorData.superUnicum
  }
}

const prSelect = [
  {
    value: 0,
    name: '还需努力',
    englishName: 'Bad',
    color: '#FE0E00'
  },
  {
    value: 750,
    name: '低于平均',
    englishName: 'Below Average',
    color: '#FE7903'
  },
  {
    value: 1100,
    name: '平均水平',
    englishName: 'Average',
    color: '#FFC71F'
  },
  {
    value: 1350,
    name: '好',
    englishName: 'Good',
    color: '#44B300'
  },
  {
    value: 1550,
    name: '很好',
    englishName: 'Very Good',
    color: '#318000'
  },
  {
    value: 1750,
    name: '非常好',
    englishName: 'Great',
    color: '#02C9B3'
  },
  {
    value: 2100,
    name: '大佬水平',
    englishName: 'Unicum',
    color: '#D042F3'
  },
  {
    value: 2450,
    name: '神佬水平',
    englishName: 'Super Unicum',
    color: '#A00DC5'
  }
]
/**
 * 获取pr显示信息
 * @param value
 */
export const getPrShowObj = (value: number) => {
  for (let i = 0; i < prSelect.length; i++) {
    if (prSelect[i + 1]) {
      if (value > prSelect[i + 1].value) continue
      return {
        value,
        nextValue: prSelect[i + 1].value - value,
        name: prSelect[i].name,
        englishName: prSelect[i].englishName,
        color: prSelect[i].color
      }
    } else {
      return {
        value,
        nextValue: 0,
        name: prSelect[i].name,
        englishName: prSelect[i].englishName,
        color: prSelect[i].color
      }
    }
  }
}
