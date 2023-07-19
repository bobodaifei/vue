import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/Layout/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Layout,
    redirect: "/home/index",
    mate: {
      name: "首页",
      icon: "el-icon-location",
    },
    children: [
      {
        path: "index",
        name: 'home',
        mate: {
          name: "首页",
          hidden: false,
        },
        component: () => import("../views/HomeView.vue")
      }
    ]
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    redirect: "/about/index",
    mate: {
      name: "关于",
      icon: "el-icon-location",
    },
    children: [
      {
        path: "index",
        name: 'about',
        mate: {
          name: "关于",
          hidden: false
        },
        component: () => import("../views/AboutView.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
