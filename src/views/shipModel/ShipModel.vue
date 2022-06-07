<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
const modelIframe = ref< HTMLElement | null>(null)
const modeForm = ref<HTMLFormElement | null>(null)
const modelDiv = ref< HTMLElement | null>(null)
onMounted(async () => {
  // (modeForm.value as HTMLFormElement).submit()
  const gltf:any = await loadFile('/ssss.stl')
  setScene()
  setCamera()
  setLight()
  scene.add(gltf)
  loop()
})
// 创建场景
let scene:THREE.Scene, renderer:THREE.WebGLRenderer
const setScene = () => {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight);
  (modelDiv.value as HTMLElement).appendChild(renderer.domElement)
}
// 相机默认参数
const defaultMap = {
  x: 510,
  y: 128,
  z: 0
}
// 创建相机
let camera:THREE.PerspectiveCamera
const setCamera = () => {
  const { x, y, z } = defaultMap
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000)
  camera.position.set(x, y, z)
}
// 通过Promise处理一下loadfile函数
const isLoading = ref(true)
const loadingWidth = ref(0)
const loader = new STLLoader()
const loadFile = (url:string) => {
  return new Promise((resolve, reject) => {
    loader.load(url,
      (gltf:any) => {
        const mesh = new THREE.Mesh(gltf)
        resolve(mesh)
      }, ({ loaded, total }:{loaded:number, total:number}) => {
        const load = Math.abs(loaded / total * 100)
        loadingWidth.value = load
        if (load >= 100) {
          setTimeout(() => {
            isLoading.value = false
          }, 1000)
        }
        console.log((loaded / total * 100) + '% loaded')
      },
      (err:any) => {
        reject(err)
      }
    )
  })
}

// 设置灯光
let directionalLight, dhelper, hemisphereLight, hHelper
const setLight = () => {
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-4, 8, 4)
  dhelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
  hemisphereLight.position.set(0, 8, 0)
  hHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5)
  scene.add(directionalLight)
  scene.add(hemisphereLight)
}
// 使场景、照相机、模型不停调用
const loop = () => {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
}
</script>
<template>
  <div style="height: 100%;">
    <!-- <form ref="modeForm" method="post" style="display: none;" target="mode" action="https://gamemodels3d.com/games/worldofwarships/vehicles/pjsd107">
      <input id="view" type="hidden" name="view" value="armor" />
      <input id="vehicle" type="hidden" value="pjsd107" />
      <input
        id="params"
        type="hidden"
        value='{"airDefense":"A_AirDefense","hull":"A_Hull","artillery":"AB1_Artillery","torpedoes":"AB1_Torpedoes","finders":"AB_Finders","directors":"AB_Directors","depthCharges":"AB_DepthChargeGuns","engine":"AB_Engine","fireControl":"AB1_FireControl"}'
        name="params"
      />
    </form>
    <iframe ref="modelIframe" frameborder="no" border="0" width="100%" style="height:100%;border-style: unset;display:block" marginwidth="0" marginheight="0" allowtransparency name="mode" /> -->
    <div ref="modelDiv"></div>
  </div>
</template>
