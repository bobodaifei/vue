<script setup>
import HomeHeader from "./HomeHeader.vue";
</script>

<template>
  <div>
    <el-container>
      <el-header height="30px">
        <HomeHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped>
:deep(.el-header) {
  padding: 0;
}

:deep(.el-main) {
  padding: 0;
}
</style>