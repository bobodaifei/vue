<script setup>
import { ref } from 'vue'
import request from '@/utils/request.js'
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
let payMethod = ref('支付宝')
let route = useRoute()

const toPay = ()=>{
  request.post("/order/toPay",{
    payMethod: payMethod.value,
    orderNo: route.query.orderNo
  }).then((res) => {
    if (res.code == "200") {
      window.open(res.data)
      //跳转到待支付页面
    } else {
      ElMessage.error(res.msg)
    }
  });
}

</script>

<template>
  <div>
    <el-radio-group v-model="payMethod">
      <el-radio label="支付宝" size="large" border>支付宝</el-radio>
      <el-radio label="微信" size="large" border>微信</el-radio>
    </el-radio-group>
    <el-button @click="toPay">确认</el-button>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped></style>