import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/global.css'

import router from './router'

import pinia from '@/stores/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import { monitorZoom } from "@/utils/monitorZoom.js";
const m = monitorZoom();
if (window.screen.width * window.devicePixelRatio >= 3840) {
  document.body.style.zoom = 100 / (Number(m) / 2); // 屏幕为 4k 时
} else {
  document.body.style.zoom = 100 / Number(m);
}

app.use(pinia).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
