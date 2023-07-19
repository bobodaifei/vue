<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const loginOut = () => {
  router.push("/login")
}
</script>
<template>
  <div style="height: 50%;">
    <el-row>
      <el-col :span="4" :offset="10">
        <el-text style="color: rgb(0, 0, 0);font-size: 35px;" class="mx-1">欢迎来到xxx系统</el-text>
      </el-col>
      <el-col :span="3" :offset="5" style="display:flex;align-items: center;">
        <el-dropdown size="large">
          <span class="el-dropdown-link">
            <span style="color: rgb(0, 0, 0);font-size: 25px;">张三丰</span>
            <el-icon class="el-icon--right">
              <ArrowDownBold />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item><el-button @click="loginOut()" type="primary">退出登录</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        </el-col>
        
    </el-row>
    
  </div>
  
</template>

<script>
export default {
  name: "IndexHeader"
}
</script>

<style scoped></style>
