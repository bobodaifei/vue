import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//配置文件根据elementPlus官网给的链接配置vite.config.js。这都没什么问题
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   // Auto import functions from Vue, e.g. ref, reactive, toRef...
    //   // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    //   imports: ['vue'],

    //   // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
    //   // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    //   resolvers: [
    //     ElementPlusResolver(),

    //     // Auto import icon components
    //     // 自动导入图标组件
    //     IconsResolver({
    //       prefix: 'Icon',
    //     }),
    //   ]
    // }),

    // Components({
    //   resolvers: [
    //     // Auto register icon components
    //     // 自动注册图标组件
    //     IconsResolver({
    //       enabledCollections: ['ep'],
    //     }),
    //     // Auto register Element Plus components
    //     // 自动导入 Element Plus 组件
    //     ElementPlusResolver(),
    //   ],
    // }),

    // Icons({
    //   autoInstall: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 9876,//启动端口
    open: true,
    proxy: {
      '/proxy': {   // 路径中有 /proxy 的请求都会走这个代理 
        target: 'http://localhost:8080',    // 目标代理接口地址,实际跨域要访问的接口，记得是填你后端springboot的端口，
        changeOrigin: true,  // 开启代理，在本地创建一个虚拟服务端
        rewrite: (path) => path.replace(/^\/proxy/, '')
        // pathRewrite: {   // 去掉 路径中的  /api  的这一截
        //   '/proxy': ''
        // }
      },
    },
    cors: true
  }
})
