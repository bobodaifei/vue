<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from "vue";
let search = ref()
</script>
<template>
  <div>
    <div class="header-1">
      <div class="header-1-box">
        <div class="logo-box"></div>
        <div class="serach-box">
          <div class="input-box">
            <el-input v-model="search" style="margin-top: 20px;" size="large" placeholder="请输入想要搜索的商品">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoHeader',
}
</script>
<style scoped>
.header-1 {
  height: 80px;
  padding-bottom: 10px;
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.header-1-box {
  height: 80px;
  width: 1300px;
  margin: auto;
  display: flex;
}

.logo-box {
  width: 650px;
  height: 80px;
}

.serach-box {
  width: 650px;
  height: 80px;
}

:deep(.serach-box .el-input-group__prepend) {
  border-radius: 15px 0 0 15px;
}

:deep(.serach-box .el-input__wrapper) {
  border-radius: 0 15px 15px 0;
}

.input-box {
  width: 350px;
  height: 80px;
}
</style>