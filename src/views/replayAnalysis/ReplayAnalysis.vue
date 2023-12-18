<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadUserFile } from 'element-plus'
import replay from '@/stores/replay'
import basicInfo from '@/stores/basicInfo'
import { ref, computed } from 'vue'
import CombatRow from '@/views/realTimeResults/component/CombatRow.vue'
import type { WowsServer } from '@/types/wowsBaseType'

// replay战绩解析

const useBasicInfo = basicInfo()
const useReplay = replay()
const serverList = ref<WowsServer[]>([])
useBasicInfo.getServerList().then(response => {
  serverList.value = response
})

// 计算属性 显示对局内容
const showMatchupData = computed(() => {
  const left = []
  const right = []
  for (const player of useReplay.currentMatchupData) {
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
  useReplay.setTempArenaInfoJsonRow(useReplay.tempArenaInfoJsonRow, true)
}

// 上传相关
const replayLsit = ref<UploadUserFile[]>([])
const uploadChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles)
  if (uploadFiles.length > 1) uploadFiles.shift()
  if (uploadFiles[0]) analysis(uploadFiles[0].raw!)
}

const onExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  console.log(files, uploadFiles)
}
const reader = new FileReader()
reader.onload = function (event) {
  // event.target.result就是文件文本内容
  // 然后你就可以为所欲为了
  // 例如如果是JSON数据可以解析
  // 如果是HTML数据，可以直接插入到页面中
  // 甚至字幕文件，各种滤镜，自定义文件格式，都可以玩弄于鼓掌之间……

  console.log('event.target?.result', event.target?.result)
  // let fileContent = toChineseWords(event.target?.result)
  let fileContent = event.target?.result as string
  const result = fileContent.match(/{.*[\]}"]}/)
  fileContent = result![0]
  console.log('fileContent', fileContent)
  useReplay.setTempArenaInfoJsonRow(fileContent)
}
const analysis = (file:File) => {
  reader.readAsText(file)
}

</script>

<template>
  <div class="replay-analysis">
    <div style="padding: 20px 0;">
      <el-upload
        style="width: 400px;    margin: 0 auto;"
        v-model:file-list="replayLsit"
        drag
        :limit="2"
        accept=".wowsreplay"
        :on-change="uploadChange"
        :on-exceed="onExceed"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">
          拖拽relplay文件至此 或者 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            上传成功后自动解析当局双方数据
          </div>
        </template>
      </el-upload>
    </div>
    <div style="text-align: center;width: 1305px; padding: 0px 0 10px 0;  margin: 0 auto;">
        <el-select v-model="useReplay.tempArenaInfoJsonRow" size="small" style="margin-right: 5px;" @change="reload">
          <el-option
            v-for="item in useReplay.historyTempArenaInfoJsonRow"
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
        >
          <el-option
            v-for="item in serverList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
        <el-button size="small" style="margin-right: 5px;" @click="reload">重载数据</el-button>
      </div>
      <!-- 信息列表 -->
      <div class="combat-table">
        <div class="combat-row">
          <div style="display:flex;flex-grow: 1;">
            <div style="width:240px;"></div>
            <div class="cell-title">场次</div>
            <div class="cell-title">pr</div>
            <div class="cell-title">胜率</div>
            <div class="cell-title">伤害</div>
            <div class="cell-title">命中</div>
            <div class="cell-title">kd</div>
          </div>
          <div style="width: 5px;"></div>
          <div style="display:flex;flex-grow: 1;">
            <div style="width:268px;"></div>
            <div class="cell-title">场次</div>
            <div class="cell-title">pr</div>
            <div class="cell-title">胜率</div>
            <div class="cell-title" style="width: 70px;">伤害</div>
            <div class="cell-title">命中</div>
            <div class="cell-title">kd</div>
          </div>
        </div>
        <div v-for="item of showMatchupData" :key="item.left?.id+''+item.right?.id" class="combat-row">
          <!-- {{ item }} -->
          <CombatRow :matchupRow="item.left" v-if="item.left"/>
          <div style="width: 20px;"></div>
          <CombatRow :matchupRow="item.right" v-if="item.right" />
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.replay-analysis{
  padding-bottom: 20px;
}
.combat-table{
    display: flex;
    flex-direction: column;
    align-items: center;
  .combat-row{
    display: flex;
    justify-content: center;
    margin-top: 5px;
    padding: 0 5px;
  }

  /* 奇数行 */
  // .combat-row:nth-child(odd){
  //   background: #0f1c25;
  // }
  // /* 偶数行 */
  // .combat-row:nth-child(even){
  //   background: #293e4e;
  // }

}
.cell-title{
  width: 50px;
  text-align: right;
}
</style>
