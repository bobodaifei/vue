<script setup>
import IndexHeader from "@/components/IndexHeader.vue";
import IndexAside from "@/components/IndexAside.vue";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

//keep-alive组件
let include = ref([])

//默认tabs
let editableTabsValue = ref("")
let editableTabs = ref([])

onMounted(() => {
  const routerInfo = router.currentRoute.value
  if (routerInfo.path != "/Home") {
    addTab(routerInfo.path, routerInfo.meta.title, routerInfo.name)
  }
})

const addTab = ((path, title, name) => {
  if (editableTabs.value.findIndex(item => item.name == name) == -1) {
    editableTabs.value.push({
      title: title,
      name: name,
      path: path
    })
  }
  editableTabsValue.value = name
  if (!include.value.includes(name)) {
    include.value.push(name)
  }
})

const removeTab = ((name) => {
  let index = editableTabs.value.findIndex(item => item.name == name)
  editableTabs.value.splice(index, 1)
  include.value.splice(index, 1)
  if (editableTabs.value.length == 0) {
    router.push("/Home")
    editableTabsValue.value = ""
    return
  }
  if (name == editableTabsValue.value) {
    editableTabsValue.value = editableTabs.value[index == 0 ? index : index - 1].name
    router.push(editableTabsValue.value)
  }
})

const clickTab = ((pane) => {
  editableTabsValue.value = pane.props.name
  router.push(pane.props.name)
})



</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header height="50px">
        <IndexHeader />
        <el-divider />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <IndexAside @addTab="addTab" />
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-click="clickTab" type="card" class="demo-tabs"
            editable>
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title"
              :name="item.name"></el-tab-pane>
          </el-tabs>
          <router-view v-slot="{ Component }">
            <keep-alive :include="include">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped></style>
