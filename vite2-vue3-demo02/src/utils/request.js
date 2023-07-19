import axios from 'axios'
import router from "@/router";
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/counter'
// import store from '@/store/index'
const request = axios.create({
  //每次请求路径加上前缀
  baseURL: "/api",
  timeout: 50000
})

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
// const whiteUrls = ["/javaweb04/", "/user/login", '/user/register',"/advert/advertList"]

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  // if (!whiteUrls.includes(config.url)) {  // 校验请求白名单
  //     if (localStorage.token == null) {
  //         store.state.userInfo={}
  //     }else{
  //         config.headers['Access-Token'] = localStorage.token;  // 设置请求头

  //     }
  // }
  config.headers['Access-Token'] = localStorage.token;
  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    //兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    if (res.code == 401) {
      const store = useUserStore();
      store.$reset();
      localStorage.removeItem("token");
      let url = window.location.href
      window.location.href = res.data + "?redirectUrl=" + (url.indexOf('?') > 0 ? url.split('?')[0] : url)
      ElMessage({
        message: res.msg,
        grouping: true,
        type: 'error',
      })
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)


export default request