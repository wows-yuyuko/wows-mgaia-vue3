import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/style/base.css'
// import '@/assets/style/variable.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
