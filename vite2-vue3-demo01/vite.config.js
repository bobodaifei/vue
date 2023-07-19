import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // port: 9876,//启动端口
    open: true,
    proxy: {
      '/api': {   // 路径中有 /proxy 的请求都会走这个代理 
        target: 'http://m.jnbat.com',    // 目标代理接口地址,实际跨域要访问的接口，记得是填你后端springboot的端口，
        // target: 'http://127.0.0.1:8081',    // 目标代理接口地址,实际跨域要访问的接口，记得是填你后端springboot的端口，
        changeOrigin: true,  // 开启代理，在本地创建一个虚拟服务端
        // rewrite: (path) => path.replace(/^\/api/, '')
        // pathRewrite: {   // 去掉 路径中的  /api  的这一截
        //   '/proxy': ''
        // }
      },
    },
    cors: true
  }
})
