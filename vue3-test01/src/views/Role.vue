<script setup>
import { ref } from "vue";
import request from "@/utils/request";

let tableData = ref()

const load = () => {
  request.post("/role/page",{
    current:1,
    
  }).then((res) => {
    tableData.value = res.data
  })
}
load()

let dialogVisible = ref(false)
let form = ref({})

const handleEdit = (row) => {
  form.value = row
  dialogVisible.value = true
}

const handleAdd = () => {
  dialogVisible.value = true
  form.value = {}
}

const handleClose = () => {
  dialogVisible.value = false
  form.value = {}
}

const handleDelete = (menuId) => {
  request.delete("/orderItem/" + menuId).then(res => {
    if (res.code === '0') {
      this.$message({
        type: "success",
        message: "删除成功"
      })
    } else {
      this.$message({
        type: "error",
        message: res.msg
      })
    }
    load()  // 删除之后重新加载表格的数据
  })
}

</script>

<template>
  <div>
    <el-button @click="handleAdd" type="primary">新增角色</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="角色ID" width="150" />
      <el-table-column prop="name" label="角色名称" width="120" />
      <el-table-column fixed="right" label="操作" width="300">
        <template #default>
          <el-button @click="handleEdit" type="primary">修改角色</el-button>
          <el-button @click="handleDelete" type="primary">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="角色信息" v-model="dialogVisible" width="30%" :close="handleClose">
      <el-form :model="form" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.title" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index01"
}
</script>

<style