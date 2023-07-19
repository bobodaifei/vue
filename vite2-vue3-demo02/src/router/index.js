import { createRouter, createWebHistory } from 'vue-router'
import request from "@/utils/request.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/Home"
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import("@/views/Home.vue")
    },

  ]
})

router.beforeEach((to, from, next) => {

  if (window.location.href.indexOf('?') > 0) {
    let ticket = findTarget(window.location.href, "ticket")

    if (ticket) {
      request.post("/token?ticket=" + ticket).then((res) => {
        localStorage.setItem('token', res.data);
        console.log(res);
        next()
        return
      })

    }
  }

  next()


})

const findTarget = (url, ticket) => {
  if (url.indexOf('?') == -1) {
    return null;
  }
  let params = url.split('?')[1];
  if (params.indexOf('&') == -1) {
    let param = params.split('=')
    if (ticket != param[0]) {
      return null;
    }
    return param[1]
  }
  let paramArr = params.split('&');
  for (let i = 0; i < paramArr.length; i++) {
    let param = paramArr[i].split('=');
    if (param[0] == ticket) {
      return param[1];
    }
  }
  return null;
}

export default router
