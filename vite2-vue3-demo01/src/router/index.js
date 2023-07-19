import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from "@/Layout/HomeLayout.vue";
import InfoLayout from "@/Layout/InfoLayout.vue";
import { ElMessage } from 'element-plus';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import("@/views/Login.vue")
    },
    {
      path: '/ConfirmPay',
      name: 'ConfirmPay',
      component: () => import("@/views/ConfirmPay.vue")
    },
    {
      path: '/',
      name: 'HomeLayout',
      component: HomeLayout,
      redirect: "/Home",
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: () => import("@/views/Home.vue")
        },
        {
          path: '/PayProcedure',
          name: 'PayProcedure',
          component: () => import("@/views/PayProcedure.vue")
        },

      ]
    },
    {
      path: '/Info',
      name: 'Info',
      component: InfoLayout,
      children: [
        {
          path: '/Info/GoodsInfo',
          name: 'GoodsInfo',
          component: () => import("@/views/GoodsInfo.vue")
        },
        {
          path: '/Info/ShopCar',
          name: 'ShopCar',
          component: () => import("@/views/ShopCar.vue")
        },
        {
          path: '/Info/Order',
          name: 'Order',
          component: () => import("@/views/Order.vue")
        },
        
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('redirectPath', from.fullPath)
  if (localStorage.getItem("token") == null) {
    if (to.path == "/Login" || to.path == "/Home" || to.path == "/Info/GoodsInfo" || to.path == "/ConfirmPay") {
      next()
      return
    }
    next('/Login')
    return
  } else {
    next()
    return
  }

})


export default router
