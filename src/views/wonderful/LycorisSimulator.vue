<script setup lang="ts">
// 石蒜模拟器
import { ref, onMounted } from 'vue'
import background from '@/assets/lycorisSimulator/background.jpg'
// import sight from '@/assets/lycorisSimulator/sight.png'
import lycoris from '@/assets/lycorisSimulator/object.png'

// 加载图片
const loadImg = (src:string):Promise<HTMLImageElement> => {
  return new Promise(function (resolve, reject) {
    const img = new Image()
    img.src = src
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(img)
    }
  })
}
// 设置鼠标在画布位置信息
let mouseX = 0
// let mouseY = 0
const setMouse = (event:MouseEvent) => {
  mouseX = event.offsetX
  // mouseY = event.offsetY
}

// 画布相关
const content = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
let context!:CanvasRenderingContext2D

const windowHeight = ref(0)
const windowWidth = ref(0)
// 石蒜坐标
let lycorisX = 0

// 设置各种尺寸
const setSize = () => {
  windowWidth.value = (content.value as HTMLElement).clientWidth
  windowHeight.value = (content.value as HTMLElement).clientHeight
  lycorisX = windowWidth.value / 2
}
// dom准备好之后设置画布尺寸
onMounted(() => {
  setSize()
  context = (canvas.value as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  window.requestAnimationFrame(() => {
    paint(context)
  })
  // setInterval(() => {
  //   paint(context)
  // }, 20)
})

// 绘制
const paint = async (contextPaint:CanvasRenderingContext2D) => {
  // 清除画布
  // contextPaint.clearRect(0, 0, windowWidth.value, windowHeight.value)
  // 绘制背景
  const backgroundImg = await loadImg(background)
  // 进行背景图比例缩放
  let imgWidth = backgroundImg.width
  let imgHeight = backgroundImg.height
  const backgroundRatio = backgroundImg.height / backgroundImg.width
  if (windowWidth.value > windowHeight.value) {
    imgWidth = windowWidth.value
    imgHeight = windowHeight.value * backgroundRatio
  }
  contextPaint.drawImage(backgroundImg, 0, 0, imgWidth, imgHeight)
  // 绘制对象
  const lycorisImg = await loadImg(lycoris)
  const lycorisRatio = lycorisImg.height / lycorisImg.width
  imgHeight = windowHeight.value * 0.6
  imgWidth = imgHeight / lycorisRatio
  // 目标图像中线
  const midlineX = lycorisX + imgWidth / 2
  // 准心距目标距离
  let distance = midlineX - mouseX
  // 移动距离
  let moveDistance = imgWidth / 4 / distance
  if (shootingType && Math.abs(distance) < imgWidth / 2) {
    shootingType = false
    distance = distance / Math.abs(distance) * imgWidth / 2
    moveDistance = distance
    if (lycorisX + moveDistance < 0 || lycorisX + moveDistance > windowWidth.value - imgWidth) {
      moveDistance = -moveDistance
    }
  }
  if (moveDistance > 0.1 || moveDistance < -0.1) {
    if (lycorisX > -1 && lycorisX < (windowWidth.value - imgWidth + 1)) {
      lycorisX += moveDistance
    }
    // 靠左边
    if (lycorisX < 0 && distance > -lycorisImg.width / 2) {
      lycorisX = (mouseX + 2) - (imgWidth / 2)
    }
    // 靠右边
    console.log(distance)
    if (lycorisX > windowWidth.value - imgWidth && distance < lycorisImg.width / 2) {
      lycorisX = (mouseX - 2) - (imgWidth / 2)
    }
  }
  contextPaint.drawImage(lycorisImg, lycorisX, windowHeight.value - imgHeight, imgWidth, imgHeight)
  // 绘制准星 设置鼠标准星后不用绘制了
  // const sightImg = await loadImg(sight)
  // contextPaint.drawImage(sightImg, mouseX - sightImg.width / 2, mouseY - sightImg.height / 2, sightImg.width, sightImg.height)

  window.requestAnimationFrame(() => {
    paint(context)
  })
}

let shootingType = false
const shooting = () => {
  shootingType = true
}
const stoping = () => {
  shootingType = false
}
// 页面变动时重算刷新
window.addEventListener('resize', () => {
  setSize()
  // paint(context)
})

</script>
<template>
  <div ref="content" class="main-content">
    <canvas
      ref="canvas"
      class="canvas"
      :height="windowHeight"
      :width="windowWidth"
      :style="{width:windowWidth+'px', height:windowHeight+'px'}"
      @mousemove="setMouse"
      @mousedown="shooting"
      @mouseup="stoping"
    />
  </div>
</template>
<style scoped lang="stylus">
.main-content{
  width 100%
  height 100%
  background-color #c6ffe5
}
.canvas{
  display block
  cursor: url('@/assets/lycorisSimulator/sight.png'), default
}
</style>
