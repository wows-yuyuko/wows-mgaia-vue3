import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/style/base.css'
// import '@/assets/style/variable.scss'
import electron from '@/stores/electron'
import { loopGetTempArenaInfoJson } from '@/hooks/realTimeResults'
import lodash from 'lodash'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const useElectron = electron()
// 获取判断是否在electron中
if (!lodash.isNil(window.electronAPI)) {
  // 启用electron相关内容
  useElectron.setElectronEnable(true)
  // 循环获取实时战绩配置项
  loopGetTempArenaInfoJson()
}
