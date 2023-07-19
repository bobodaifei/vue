<script setup>
import { ElLoading } from 'element-plus'
import request from '@/utils/request.js'
import { ref, reactive, onMounted, onDeactivated } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { nextTick } from 'vue'

onMounted(() => { //组件挂载时的生命周期执行的方法
  startCheckOrderPay()
})

onDeactivated(() => { //离开当前组件的生命周期执行的方法
  stopCheckOrderPay()
})

const route = useRoute()
const router = useRouter()

const options = {
  text: "支付查询中..."
}

let icon = ref()

let info = ref()

const loadingInstance = ElLoading.service(options)
const timer = ref(0)

const toPath = (path) => {
  nextTick(() => {
    loadingInstance.close()
  })
  stopCheckOrderPay()
  setTimeout(() => {
    router.push(path)
  }, 2000);
}

var stopCheckOrderPay = () => {
  window.clearInterval(timer.value);
}

var startCheckOrderPay = () => {
 
  timer.value = setInterval(() => {
    request.get("/order/getByNo/" + route.query.orderNo).then((res) => {
      if (res.data.status == 4 || res.data.status == 5 || res.data.status == 6) {
        info.value = "支付成功,即将跳转"
        icon.value = "success"
        toPath('/Home')
      } else if (res.data.status == 2 || res.data.status == 3) {
        info.value = "支付失败,即将跳转"
        icon.value = "error"
        toPath('/Home')
      }
    })
  }, 3000);
}



</script>

<template>
  <div>
    <el-result v-show="icon=='success'" :icon="icon" :title="info" style="margin: auto;"></el-result>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>
<style scoped></style>