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
export const getWinColor = (value:number) => {
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
