<script setup>
import Address from "@/views/Address.vue";
import { ref } from 'vue'

let drawer = ref(false)

const closeDrawer = () => {
  drawer.value = false
}
</script>

<template>
  <div>
    <div class="header">
      <div class="header-box">
        <div>
          <RouterLink :to="{ path: '/Home' }" target="_blank" rel="opener">
            <el-link :underline="false"><span>首页</span></el-link>
          </RouterLink>
        </div>
        <div>
          <RouterLink :to="{ path: '/Info/ShopCar' }" target="_blank" rel="opener">
            <el-link :underline="false"><span>购物车</span></el-link>
          </RouterLink>
          <el-divider direction="vertical" />
          <RouterLink :to="{ path: '/Info/Order' }" target="_blank" rel="opener">
            <el-link :underline="false"><span>我的订单</span></el-link>
          </RouterLink>
          <el-divider direction="vertical" />
          <el-link @click="drawer = true" :underline="false"><span>收货地址</span></el-link>
        </div>

      </div>
    </div>
    <Address @closeDrawer="closeDrawer" :drawer="drawer" />
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
}
</script>
<style scoped>
.header {
  height: 30px;
  width: 100%;
  line-height: 30px;
  color: #808080;
  background-color: rgb(242, 242, 242);
  font-size: 14px;
}

.header span {
  margin: 0 5px;
}

.header-box {
  height: 30px;
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>