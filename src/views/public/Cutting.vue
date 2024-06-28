<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted, nextTick } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadUserFile } from 'element-plus'

let cropper: Cropper | null = null
onMounted(() => {
})

// 比例
const proportion = ref(true)

const imgFileList = ref<UploadUserFile[]>([])
const imgSrc = ref('')
const cuttingImgDom = ref<HTMLImageElement>()
const uploadChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles)
  if (uploadFiles.length > 1) {
    uploadFiles.shift()
    // if (cropper) {
    //   cropper.destroy()
    // }
  }
  if (uploadFiles[0]) {
    imgSrc.value = URL.createObjectURL(uploadFiles[0].raw!)
    // 创建剪裁
    nextTick(() => {
      if (cropper) {
        cropper.replace(imgSrc.value)
      } else {
        cropper = new Cropper(cuttingImgDom.value!, {
          aspectRatio: proportion.value ? (14 / 3) : (1 / 1),
          viewMode: 2,
          crop (event) {
            console.log(event.detail.x)
            console.log(event.detail.y)
            console.log(event.detail.width)
            console.log(event.detail.height)
            console.log(event.detail.rotate)
            console.log(event.detail.scaleX)
            console.log(event.detail.scaleY)
          }
        })
      }
    })
  }
}
const onExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  console.log(files, uploadFiles)
}

// 剪裁比例变化
function proportionChange () {
  if (!cropper) return
  cropper!.setAspectRatio(proportion.value ? (14 / 3) : (1 / 1))
}

function save () {
  if (!cropper) return
  const downloadLink = document.createElement('a')
  downloadLink.href = cropper.getCroppedCanvas().toDataURL('image/jpeg')
  downloadLink.download = `${proportion.value ? '背景图' : '头像'}.png`
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
</script>

<template>
  <div class="cutting">
    <el-upload
      style="width: 400px;    margin: 0 10px;"
      v-model:file-list="imgFileList"
      accept=".jpg,.png"
      drag
      :limit="2"
      :on-change="uploadChange"
      :on-exceed="onExceed"
      :auto-upload="false"
    >
      <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
      <div class="el-upload__text">
        拖拽图片文件至此 或者 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          上传后进行裁切
        </div>
      </template>
    </el-upload>
    <div>
      <el-switch
        v-model="proportion"
        style="--el-switch-off-color:#13ce66"
        active-text="背景图"
        inactive-text="头像"
        @change="proportionChange"
      />
      <el-button type="primary" style="margin-left: 40px" @click="save">裁切保存</el-button>
    </div>
    <div class='cutting-div'>
      <img ref="cuttingImgDom" :src="imgSrc" class="cutting-img">
    </div>
  </div>
</template>

<style scoped lang="scss">
.cutting{
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .cutting-div{
    margin-top: 20px;
    width: 500px;
    height: 500px;
    .cutting-img{
      width: 100%;
    }
  }
}
</style>
