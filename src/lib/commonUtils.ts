import { ElMessage } from 'element-plus'

/**
 * 跳转打开新标签页
 * @param url
 */
export function openTab (url:string) {
  window.open(url, '_blank')
}

/**
 * 复制文字信息
 * @param text
 * @returns
 */
export function copyCommand (text:string) {
  if (!navigator.clipboard) {
    console.log('无权限复制')
    ElMessage.error('复制失败！ 可能没开权限 请手打命令吧')
    ElMessage.error(text)
    return
  }

  navigator.clipboard.writeText(text).then(() => {
    // 剪贴板设置成功
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }, () => {
    // 剪贴板写入失败
    ElMessage.error('复制失败！ 可能没开权限 请手打命令吧')
    ElMessage.error(text)
  })
}
