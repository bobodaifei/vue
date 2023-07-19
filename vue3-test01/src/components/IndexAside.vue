<script setup>
import { useUserStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
// import { defineEmits } from 'vue'

const store = useUserStore();
let rootMenu = store.user.menu[0]

const router = useRouter()

const emit = defineEmits(["addTab"]);
const addTab = (path, title, name) => {
  emit('addTab', path, title, name)
}
</script>

<template>
  <div>
    <!-- default-active 在element-plus 解释有问题 -->
    <el-menu :default-active="router.currentRoute.value.path" class="el-menu-vertical-demo"
      style="width: 200px; min-height: calc(100vh - 50px)" router>
      <el-menu-item index="/Home">
        <template #title>
          <el-icon>
            <House />
          </el-icon>
          <span>首页</span>
        </template>
      </el-menu-item>
      <template v-for="menus in rootMenu.children">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <el-sub-menu :index="menus.title">
          <template #title>
            <el-icon>
              <component :is="menus.icon"></component>
            </el-icon>
            <span>{{ menus.title }}</span>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-for -->
          <el-menu-item v-for="menu in menus.children" :index="menu.routePath"
            @click="addTab(menu.routePath, menu.title, menu.routeName)">
            <template #title>
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>

  </div>
</template>


<script>
export default {
  name: "IndexAside",
}
</script>

<style scoped></style>
