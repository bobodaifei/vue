<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router';
import request from "@/utils/request";
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/counter'
const store = useUserStore();

const router = useRouter()
const route = useRoute()

let form = reactive({})
let rules = {
  userName: [
    { required: true, message: 'Please input Activity userName', trigger: 'blur' },
    { min: 3, max: 16, message: 'Length should be 3 to 16', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
}
const ruleFormRef = ref()

const login = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      request.post("/user/login", form).then((res) => {
        if (res.code == "200") {
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          store.user = res.data
          localStorage.setItem('token', res.data.token);
          const redirectPath = localStorage.getItem('redirectPath') || '/Home'; // 获取之前保存的重定向路径或者默认路径
          // localStorage.removeItem('redirectPath'); // 删除之前保存的重定向路径
          router.push(redirectPath); // 重定向到指定路径
        } else {
          ElMessage.error(res.msg)
        }
      });
    } else {
      ElMessage.error("表单信息有误")
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>
<template>
  <div style="height: 100vw; width: 100vw;">
    <div class="login-box">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="60px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" value="bobo"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password value="123456"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>
<style scoped>
.login-box {
  width: 600px;
  height: 250px;
  padding: 60px 50px;
  margin: auto;
  margin-top: 200px;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
}
</style>