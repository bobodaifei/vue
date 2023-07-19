<template>
  <el-container>
    <el-aside width="200px">
      <el-header style="background: #E9EEF3">Header</el-header>
      <el-col :span="24">
        <el-menu :default-active="active" class="el-menu-vertical-demo">
          <el-menu-item index="1-">首页</el-menu-item>
          <el-submenu v-for="(router, index) in routers" :key="index" :index="index + ''">
            <template slot="title">
              <i :class="router.mate.icon"></i>
              <span>{{ router.mate.name }}</span>
            </template>
            <el-menu-item v-for="(child, cIndex) in router.children" :key="cIndex" :index="router.path + '/' + child.path"
              @click="toPage(router.path + '/' + child.path)">
              {{ child.mate.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-row>
          <el-tag size="medium" effect="plain" v-for="(history, index) in histories" :key="index" closable
            @close="close(index)">
            <span :class="history.active ? 'active' : 'no-active'"></span>
            {{ history.name }}
          </el-tag>
        </el-row>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default { 
  name: "index",
  data() {
    return {
      histories: [],
      routers: [],
      active: "/home/index"
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let index = vm.histories.findIndex((history, index) => {
        return history.path == to.fullPath ? true : false
      })
      if (index == -1) {
        for (let i = 0; i < vm.histories.length; i++) {
          vm.histories[i].active = false
        }
        vm.histories.push({
          path: to.fullPath,
          name: to.name,
          active: true,
        })
        vm.active = vm.$route.path
      } else {
        for (let i = 0; i < vm.histories.length; i++) {
          vm.histories[i].active = false
        }
        vm.histories[index].active = true
        vm.active = vm.$route.path
      }
    });
  },
  created() {
    console.log(this.$router.options.routes)
    this.routers = this.$router.options.routes
    this.active = this.$route.path
    console.log(this.active);
  },
  methods: {
    toPage(path) {
      if (this.$route.path == path) 
        return;
      this.$router.push({ path })
    },
    close(index) {
      if (this.histories.length == 1) {
        return;
      } else {
        let router = this.histories.splice(index, 1)
        if (router[0].active) {
          this.$router.push(this.histories[this.histories.length - 1].path)
        }
      }
    }
  }
}
</script>

<style scoped>
.active {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 5px;
  background: red;
}

.no-active {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 5px;
  background: #d3d4d6;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

#app>.el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>

