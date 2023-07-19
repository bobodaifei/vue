<script setup>
import { ref } from "vue";
import request from "@/utils/request";

let tableData = ref()

const load = (row, treeNode, resolve) => {
  if (row) {
    request.post("/menu/getTreeChild?pid=" + row.menuId).then((res) => {
      // tableData.value = res.data
      resolve(res.data)
    })
  } else {
    request.post("/menu/getTreeChild").then((res) => {
      tableData.value = res.data
    })
  }
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

    <!-- lazy不设置会不显示 -->
    <el-table :data="tableData" style="width: 100%" :load="load" row-key="menuId" border lazy
      :tree-props="{ hasChildren: 'hasChildren' }">
      <el-table-column prop="menuId" label="菜单ID" width="100" />
      <el-table-column prop="title" label="菜单名称" width="200" align="center" />
      <el-table-column prop="routeName" label="路由name" width="120" align="center" />
      <el-table-column prop="routePath" label="路由path" width="120" align="center" />
      <!-- <el-table-column prop="pid" label="父菜单" width="120" align="center" /> -->
      <el-table-column prop="sort" label="优先级" width="120" align="center" />
      <el-table-column prop="level" label="层级" width="120" align="center">
        <template #default="scope">
          <el-tag type="danger" v-show="scope.row.level == 1">一级菜单</el-tag>
          <el-tag type="success" v-show="scope.row.level == 2">二级菜单</el-tag>
          <el-tag v-show="scope.row.level == 3">三级菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="200" align="center" />
      <el-table-column label="菜单操作" width="400" align="center">
        <template #default="scope">
          <el-button v-permission="'menu:update'" @click="handleEdit(scope.row)">修改菜单</el-button>
          <el-button v-permission="'menu:delete'" v-if="scope.row.level!=1" @click="handleDelete">删除菜单</el-button>
          <el-button v-permission="'menu:add'" v-if="scope.row.level != 3" @click="handleAdd">新增菜单</el-button>
        </template>
      </el-table-column>
      <el-table-column label="权限操作" width="400" align="center">
          <template #default="scope">
            <el-button v-permission="'menu:add'" v-if="scope.row.level == 3" @click="handleAdd">新增权限</el-button>
          </template>
        </el-table-column>
    </el-table>

    <el-dialog title="菜单信息" v-model="dialogVisible" width="30%" :close="handleClose">
      <el-form :model="form" label-width="120px">
        <el-form-item prop="title" label="菜单名称">
          <el-input v-model="form.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item prop="routeName" label="路由name">
          <el-input v-model="form.routeName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item prop="routePath" label="路由path">
          <el-input v-model="form.routePath" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="父路由">
          <el-input v-model="form.pid" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="优先级">
          <el-input v-model="form.sort" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="图标">
          <el-input v-model="form.icon" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
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

<style scoped>
:deep(.el-table__row--level-0){
  background-color: rgb(197, 197, 197);
}
:deep(.el-table__row--level-1){
  background-color: rgb(221, 221, 221);
}
:deep(.el-table__row--level-2){
  background-color: rgb(240, 240, 240);
}
</style>