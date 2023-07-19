import { defineAsyncComponent } from "vue"
import IndexLayout from '@/layout/IndexLayout.vue'
import { useUserStore } from '@/stores/counter'
import pinia from '@/stores/store'
import router from '@/router'
import { h } from 'vue'

// 注意：这个文件是设置动态路由的
// permissions是一个资源的数组



export function activeRouter() {
  const store = useUserStore(pinia);
  let rootMenu = store.user.menu[0]

  if (rootMenu) {
    let root = {
      path: rootMenu.routePath,
      name: rootMenu.routeName,
      component: IndexLayout,
      redirect: "/Home",
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: () => import("@/views/Home.vue")
        },
      ]
    }
    rootMenu.children.forEach((menus) => {
      menus.children.forEach((menu) => {

        // const modules = import.meta.glob('@/views/*.vue')
        let child = {
          path: menu.routePath,
          name: menu.routeName,
          meta: {
            title: menu.title,
            permissionList: []
          },
          // component: () => import(`/src/views${menu.path}.vue`)
          component: {
            render: () => h(defineAsyncComponent(() => import(/* @vite-ignore */`../views/${menu.routeName}.vue`)))
          }

          // component: defineAsyncComponent(() => import(/* @vite-ignore */`@/views/StockList.vue`))
          // component: modules[`/src/views${menu.path}.vue`]
        };
        menu.childPermission.forEach((permission) => {
          child.meta.permissionList.push(permission)
        })
        root.children.push(child)
      })

    })
    if (router) {
      console.log(root);
      //请注意，添加路由并不会触发新的导航。也就是说，除非触发新的导航，否则不会显示所添加的路由。
      router.addRoute(root)
    }
  }
}



