// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/global.css'

import router from './router'

import pinia from '@/stores/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import permissionDirective from './utils/directives/vpermission'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('permission', permissionDirective)




app.use(pinia).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
