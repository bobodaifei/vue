<script setup>

// import request from '@/utils/request.js'

let fff = (a, b, e) => {
  console.log(a);
  console.log(b);
  console.log(e);
}

</script>

<template>
  <div>
    员工管理
    <el-button v-permission="'emp:add'" @click="fff(1,2,$event)">新增</el-button>
    <el-button v-permission="'emp:update'">修改</el-button>
    <el-button v-permission="'emp:delete'">删除</el-button>

  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Emp"
}
</script>

<style scoped></style>