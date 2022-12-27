import lodash from 'lodash'
import { createApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import usePlayer from '@/store/player'
import useElectron from '@/store/electron'
import { loopGetTempArenaInfoJson } from '@/hooks/realTimeResults'
// import '@/hooks/mqtt'
createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .mount('#app')

const player = usePlayer()
const electronStore = useElectron()
player.init()
window.addEventListener('resize', () => {
  (document.querySelector('body') as HTMLBodyElement).style.height = window.innerHeight + 'px'
});

(document.querySelector('body') as HTMLBodyElement).style.height = window.innerHeight + 'px'

if (window.console) {
  console.log('%c水下小人血妈爆炸', 'color:red')
}

// ElMessage({
//   showClose: true,
//   message: '老群炸了 请加新群 578477683',
//   type: 'warning'
// })

// 获取判断是否在electron中
if (!lodash.isNil(window.electronAPI)) {
  // 启用electron相关内容
  electronStore.setElectronEnable(true)
  // 循环获取实时战绩配置项
  loopGetTempArenaInfoJson()
}
