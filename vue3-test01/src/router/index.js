import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
// import IndexLayout from '@/layout/IndexLayout.vue'
import { activeRouter } from "@/utils/permission";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import("@/views/Login.vue")
    },
    {
      path: '/404',
      name: '404',
      component: () => import("@/views/404.vue")
    },
  ]
})

//每次页面刷新都会刷新router 所以需要重新挂载
// router.isReady().then(()=>{
//   activeRouter()
// })
let addOver = false;

router.beforeEach((to, from, next) => {
  
  if (localStorage.getItem("token") == null) {
    if (to.path == "/Login") {
      next()
      return
    }
    ElMessage({
      message: '您尚未登录',
      type: 'warning',
    })
    next("/Login")
    return
  }
  if (to.path == "/Login" || to.path == "/404") {
    next()
    return
  }
  if (!addOver) {
    activeRouter()
    addOver = true
    // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
    next({ ...to, replace: true })
  }
  next()

})


export default router
