<script setup lang="ts">
import electron from '@/stores/electron'
import basicInfo from '@/stores/basicInfo'
import lodash from 'lodash'
import { ref, computed } from 'vue'
import { setLocalStorage } from '@/lib/storage'
import CombatRow from './component/CombatRow.vue'
import type { WowsServer } from '@/types/wowsBaseType'

// 实时战绩
const useBasicInfo = basicInfo()
const useElectron = electron()
const serverList = ref<WowsServer[]>([])
useBasicInfo.getServerList().then(response => {
  serverList.value = response
})

// 选择对局信息文件夹目录
const getDirectoryPath = () => {
  window.electronAPI.getDirectoryPath().then(response => {
    // 如果取消了没有选择 直接跳出
    if (lodash.isNil(response)) return
    // 保存选中的文件夹
    useElectron.setTempArenaInfoJsonPath(response[0])
  })
}

// 计算属性 显示对局内容
const showMatchupData = computed(() => {
  const left = []
  const right = []
  for (const player of useElectron.currentMatchupData) {
    player.relation === 2 ? right.push(player) : left.push(player)
  }
  const matchupData = []
  for (const index in left) {
    matchupData.push({ left: left[index], right: right[index] })
  }
  return matchupData
})

// 重载数据
function reload () {
  useElectron.setTempArenaInfoJsonRow(useElectron.tempArenaInfoJsonRow, true)
}

function serverChange () {
  setLocalStorage('realTimeResultServer', useBasicInfo.realTimeResultServer)
}
</script>

<template>
  <div class="real-time-results">
    <div style="padding: 20px;"><span style=" color: #fe7903;font-size: 14px;">双击跳转查询战绩详情 注意服务器选择 卡住请重启</span></div>
    <div style="text-align: center;width: 1305px; padding: 0px 0 10px 0;  margin: 0 auto;">
      <el-select v-model="useElectron.tempArenaInfoJsonRow" size="small" style="margin-right: 5px;" @change="reload">
        <el-option
          v-for="item in useElectron.historyTempArenaInfoJsonRow"
          :key="item"
          :label="JSON.parse(item).dateTime"
          :value="item"
        />
      </el-select>
      <!-- 服务器选择 -->
      <el-select
        v-model="useBasicInfo.realTimeResultServer"
        placeholder="Select"
        size="small"
        style="width:80px;margin-right: 5px;"
        @change="serverChange"
      >
        <el-option
          v-for="item in serverList"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-button size="small" style="margin-right: 5px;" @click="reload">重载数据</el-button>
      <el-button size="small" @click="getDirectoryPath">选择replays文件夹位置</el-button>
      <span style="padding-left: 10px;">{{ useElectron.tempArenaInfoJsonPath }}</span>
    </div>
    <!-- 信息列表 -->
    <div class="combat-table">
      <div class="combat-row">
        <div style="display:flex;">
          <div style="width:239px;"></div>
          <div class="cell-title">场次</div>
          <div class="cell-title">pr</div>
          <div class="cell-title">胜率</div>
          <div class="cell-title">伤害</div>
          <div class="cell-title">命中</div>
          <div class="cell-title">kd</div>
        </div>
        <div style="width: 5px;"></div>
        <div style="display:flex;">
          <div style="width:239px;"></div>
          <div class="cell-title">场次</div>
          <div class="cell-title">pr</div>
          <div class="cell-title">胜率</div>
          <div class="cell-title" style="width: 70px;">伤害</div>
          <div class="cell-title">命中</div>
          <div class="cell-title">kd</div>
        </div>
      </div>
      <div v-for="item of showMatchupData" :key="item.left?.id+''+item.right?.id" class="combat-row">
        <CombatRow :matchupRow="item.left" v-if="item.left"/>
        <div style="width: 5px;"></div>
        <CombatRow :matchupRow="item.right" v-if="item.right" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.real-time-results{
  height: 100%;
}
.combat-table{
  .combat-row{
    display: flex;
    justify-content: center;
  }
}
.cell-title{
  width: 50px;
  text-align: right;
}
</style>
