import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import usePlayer from '@/store/player'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .mount('#app')

const player = usePlayer()
player.init()
window.addEventListener('resize', () => {
  (document.querySelector('body') as HTMLBodyElement).style.height = window.innerHeight + 'px'
});

(document.querySelector('body') as HTMLBodyElement).style.height = window.innerHeight + 'px'
