<script setup lang="ts">
import useElectron from '@/store/electron'
import lodash from 'lodash'
// 实时战绩页面

const electronStore = useElectron()

// 选择对局信息文件夹目录
const getDirectoryPath = () => {
  window.electronAPI.getDirectoryPath().then(response => {
    // 如果取消了没有选择 直接跳出
    if (lodash.isNil(response)) return
    // 保存选中的文件夹
    electronStore.setTempArenaInfoJsonPath(response[0])
  })
}
</script>
<template>
  <div>
    实时战绩
    <el-button @click="getDirectoryPath">选择文件位置</el-button>
  </div>
</template>
