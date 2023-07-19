<script setup>
import { reactive } from "vue";
import { useRouter } from 'vue-router';
import request from "@/utils/request";
import { ElMessage } from 'element-plus';
import { activeRouter } from "@/utils/permission";
import { useUserStore } from '@/stores/counter'
const store = useUserStore();
store.$reset();
localStorage.removeItem("token")
let form = reactive({})

const router = useRouter()
const login = () => {
  request.post("/user/login", form).then((res) => {
    if (res.code == "200") {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      store.user = res.data
      activeRouter()
      localStorage.setItem('token', res.data.token);
      router.push('/Home')
    } else {
      ElMessage.error(res.msg)
    }
  });
}




</script>
<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
}
</script>
<style scoped></style>