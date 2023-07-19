<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import request from '@/utils/request.js'
import ConfirmOrder from "./ConfirmOrder.vue";
import ConfirmPayMethod from "./ConfirmPayMethod.vue";
let active = ref()
const userRoute = useRoute()

const changeActive = (_active) => {
  active.value = _active
}

watch(() => userRoute.query, (newValue, oldValue) => {
  console.log(newValue);
  if (newValue.goodsIdList) {
    changeActive(0)
    return
  }
  if (newValue.orderNo) {
    request.get("/order/getByNo/" + newValue.orderNo).then((res) => {
      if (res.data.status == 1) {
        changeActive(1)
        return
      }
      if (res.data.status == 4 || res.data.status == 5 || res.data.status == 6) {
        changeActive(1)
        return
      }
    })

  }
}, { immediate: true, deep: true })


</script>

<template>
  <div style="width: 1200px; margin: auto; padding-top: 30px;">
    <el-steps :space="300" :active="active" align-center finish-status="success">
      <el-step title="确认订单" />
      <el-step title="选择支付方式" />
      <el-step title="发起付款" />
      <el-step title="确认收货" />
      <el-step title="评价" />
      
    </el-steps>
    <ConfirmOrder v-if="active == 0" />
    <ConfirmPayMethod v-if="active == 1" />
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped></style>