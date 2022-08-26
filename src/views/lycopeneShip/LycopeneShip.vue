<script setup lang="ts">
import { ref, computed, onMounted, onActivated, watch } from 'vue'
let device = String(navigator.userAgent.match(/steam|macos/i)).toLowerCase()
if (
  /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
) device = 'ios'
document.documentElement.setAttribute('data-device', device)

const sticky = 0.1 // 阻力？
const maxR = 60
const maxY = 110
const minY = -maxY

const elRef = ref<HTMLElement>()
const boxElRef = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()

const inertia = 0.1 // 惯性

const values = {
  chisato: {
    r: 1, // 角度
    y: 40, // 高度
    t: 0, // 垂直速度
    w: 0, // 横向速度
    d: 0.99 // 衰减
  },
  takina: {
    r: 12, // 角度
    y: 2, // 高度
    t: 0, // 垂直速度
    w: 0, // 横向速度
    d: 0.988 // 衰减
  }
}

let runing = true
// 深拷贝方法
type DeepCopy = {
  <T>(v:T):T
}
const deepCopy:DeepCopy = v => JSON.parse(JSON.stringify(v))

onMounted(() => {
  const el = elRef.value as HTMLElement
  const boxEl = boxElRef.value as HTMLElement
  const canvas = canvasRef.value as HTMLCanvasElement
  // dom 加载完成后进行操作
  // 属性深拷贝出来
  const v = deepCopy(values.takina)
  let width:number
  let height:number

  // 画弹簧杆
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const resize = () => {
    width = Math.min(document.documentElement.offsetWidth, 800)
    height = 800

    canvas.width = width
    canvas.height = height
  }

  resize()
  //  旋转
  const rotate = (cx:number, cy:number, x:number, y:number, angle:number) => {
    const radians = (Math.PI / 180) * angle
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    const nx = cos * (x - cx) + sin * (y - cy) + cx
    const ny = cos * (y - cy) - sin * (x - cx) + cy
    return {
      x: nx,
      y: ny
    }
  }
  const draw = () => {
    const { r, y, t, w, d } = v
    const x = r * 1
    const _y = y // - Math.abs(x);
    el.style.transform = `rotate(${r}deg) translateX(${x}px) translateY(${y}px)`

    ctx.clearRect(0, 0, width, height)
    ctx.save()

    ctx.strokeStyle = '#182562'
    ctx.lineWidth = 10

    ctx.beginPath()
    ctx.translate(
      width / 2,
      640 // height - 160
    )
    ctx.moveTo(0, 140)

    const cx = 0
    const cy = -100

    const n = rotate(cx, cy, x, -y, r)

    const nx = n.x
    const ny = -n.y - 100

    ctx.quadraticCurveTo(0, 75, nx, ny)

    ctx.stroke()
    ctx.restore()
  }

  const loadImage = (src: string, onOver: any) => {
    const el = new Image()
    el.onload = _ => onOver(el)
    el.src = src
  }
  let sakanaImageEl
  const init = (onOver:any) => {
    loadImage('sakana.png', (el:HTMLImageElement) => {
      sakanaImageEl = el
      onOver()
    })
  }
  const or = 0
  const run = () => {
    if (!runing) return

    requestAnimationFrame(run)

    let { r, y, t, w, d } = v

    w = w - r * 2 - or
    r = r + w * inertia * 1.2
    v.w = w * d
    v.r = r

    t = t - y * 2
    y = y + t * inertia * 2
    v.t = t * d
    v.y = y

    draw()
  }

  init(() => {
    requestAnimationFrame(run)
  })
  const move = (x:number, y:number) => {
    let r = x * sticky

    r = Math.max(-maxR, r)
    r = Math.min(maxR, r)

    y = y * sticky * 2

    y = Math.max(minY, y)
    y = Math.min(maxY, y)

    v.r = r
    v.y = y
    v.w = 0
    v.t = 0
    draw()
  }
  el.onmousedown = e => {
    e.preventDefault()
    runing = false
    const { pageX, pageY } = e
    const _downPageX = pageX
    const _downPageY = pageY

    document.onmouseup = e => {
      e.preventDefault()
      document.onmousemove = null
      document.onmouseup = null

      runing = true
      run()
    }
    document.onmousemove = e => {
      const rect = boxEl.getBoundingClientRect()

      const leftCenter = rect.left + rect.width / 2
      const topCenter = rect.top

      const { pageX, pageY } = e

      const x = pageX - leftCenter
      const y = pageY - _downPageY
      move(x, y)
    }
  }

  el.ontouchstart = e => {
    e.preventDefault()
    runing = false
    if (!e.touches[0]) return

    const { pageX, pageY } = e.touches[0]
    const _downPageX = pageX
    const _downPageY = pageY

    document.ontouchend = e => {
      document.ontouchmove = null
      document.ontouchend = null

      runing = true
      run()
    }
    document.ontouchmove = e => {
      if (!e.touches[0]) return

      const rect = boxEl.getBoundingClientRect()
      // console.log(rect);
      const leftCenter = rect.left + rect.width / 2
      const topCenter = rect.top

      const { pageX, pageY } = e.touches[0]

      const x = pageX - leftCenter
      const y = pageY - _downPageY
      move(x, y)
    }
  }
  const canOrientation = !!(
    window.DeviceOrientationEvent &&
    typeof window.DeviceOrientationEvent['requestPermission'] === 'function'
  )

  document.documentElement.setAttribute('data-can-orientation', canOrientation)

  const getOrientationPermission = onOver => {
    if (!canOrientation) return onOver()

    window.DeviceOrientationEvent['requestPermission']().then(permissionState => {
      // console.log({permissionState})
      if (permissionState !== 'granted') return //alert('获取权限失败');

      document.documentElement.setAttribute('data-permission-state', true)
      onOver()
    })
  }
  const setOrientationListener = _ => {
    getOrientationPermission(_ => {
      if (window.DeviceOrientationEvent) {
        let lastPower
        let lastOriUnix = 0
        window.addEventListener('deviceorientation', e => {
          const { alpha, beta, gamma, acceleration } = e
          const unix = +new Date()
          // if((unix - lastOriUnix) < 50) return;

          // console.log( { alpha, beta, gamma });

          or = -gamma / 2
          // or = or * (alpha > 180?-1:1);
          or = Math.min(maxR, or)
          or = Math.max(-maxR, or)
          // console.log({or})
          // out.innerHTML = JSON.stringify({ alpha, beta, gamma },0,2);
          return

          lastOriUnix = unix
          const power = Math.max(
            // alpha,
            beta,
            gamma
          )

          // console.log(e,beta,gamma);
          if (lastPower === undefined) {
            lastPower = power
          }
          const g = power - lastPower
          const gg = Math.abs(g * 0.5)
          if (Math.abs(v.w) < gg) {
            v.w = (v.w < 0 ? -1 : 1) * (Math.abs(v.w) + gg)
          }
          lastPower = power
        })
      }
    })
  }

  setOrientationListener()

  document.querySelector('.bed').addEventListener('click', e => {
    e.preventDefault()
    el.classList.toggle('chisato')

    if (el.classList.contains('chisato')) {
      v = deepCopy(Values['chisato'])
      history.replaceState({}, '', '?v=chisato')
    } else {
      v = deepCopy(Values['takina'])
      history.replaceState({}, '', '?v=takina')
    }
  })

  window.addEventListener('resize', resize)
})

</script>
<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div ref="boxEl" class="single-box">
      <div ref="el" class="main"></div>
      <div class="bed"></div>
    </div>
  </div>
</template>
<style scoped lang="stylus">

</style>
