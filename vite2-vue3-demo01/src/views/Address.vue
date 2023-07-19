<script setup>
import { ref, reactive } from 'vue'
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';

const props = defineProps({
  drawer: {
    type: Boolean,
    default: false
  },
})

const innerDrawer = ref(false)

const emit = defineEmits(['closeDrawer'])

const handleClose = () => {
  emit("closeDrawer")
}

let addressData = reactive([])

const load = () => {
  request.get("/address/list").then((res) => {
    if (res.code == "200") {
      addressData.splice(0, addressData.length)
      addressData.push(...res.data)
    } else {
      ElMessage.error(res.msg)
    }
  });
}

let form = reactive({})

const edit = () => {
  if (form.addrId) {
    request.put("/address/" + form.addrId, form).then((res) => {
      if (res.code == "200") {
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
        load()
      } else {
        ElMessage.error(res.msg)
      }
    });
  } else {
    request.post("/address", form).then((res) => {
      if (res.code == "200") {
        ElMessage({
          message: '新增成功',
          type: 'success',
        })
        load()
      } else {
        ElMessage.error(res.msg)
      }
    });
  }
  innerDrawer.value = false
  form = reactive({})
}

const handleAdd = () => {
  innerDrawer.value = true
  form = reactive({})
}

const handleEdit = (_row) => {
  innerDrawer.value = true
  form = _row
}

const handleDelete = (addrId) => {
  request.delete("/address/" + addrId).then((res) => {
    if (res.code == "200") {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      load()
    } else {
      ElMessage.error(res.msg)
    }
  });
}

</script>

<template>
  <div>
    <el-drawer @open="load" v-model="props.drawer" @close="handleClose" title="收货地址" size="50%">
      <div>
        <el-button @click="handleAdd">新增</el-button>
        <div>
          <el-table :data="addressData" style="width: 100%">
            <el-table-column prop="consignee" label="收货人" width="150" />
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="addr" label="详细地址" width="470" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button link type="primary" size="small" @click="handleDelete(scope.row.addrId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-drawer v-model="innerDrawer" title="" :append-to-body="true">
          <el-form label-width="100px" :model="form" style="max-width: 460px">
            <el-form-item label="收货人">
              <el-input v-model="form.consignee" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="form.addr" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="edit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped></style>