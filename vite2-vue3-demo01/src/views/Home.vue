<script setup>
import { ref } from "vue";
import { Search } from '@element-plus/icons-vue'
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';
let search = ref()
let pageSize = ref(8)
let currentPage = ref(1)
let total = ref(0)
let tableData = ref([])

let advertList = ref([
  {
    image: "https://gw.alicdn.com/imgextra/i1/O1CN01CBGY8U1aKwcOr1slf_!!6000000003312-2-tps-1190-80.png",
    href: "www.baidu.com"
  },
  {
    image: "https://gw.alicdn.com/imgextra/i1/O1CN01CBGY8U1aKwcOr1slf_!!6000000003312-2-tps-1190-80.png",
    href: "www.baidu.com"
  }
])

const load = () => {
  request.post("/goods/page", {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    search: search.value
  }).then((res) => {
    if (res.code == "200") {
      tableData.value = res.data.list
      total.value = res.data.total
    } else {
      ElMessage.error(res.msg)
    }
  });
}
load()

const handleSizeChange = (_pageSize) => {
  pageSize.value = _pageSize
  load()
}

const handleCurrentChange = (_currentPage) => {
  currentPage.value = _currentPage
  load()
}

</script>

<template>
  <div>
    <div class="advert">
      <div class="advert-box">
        <el-carousel height="80px">
          <el-carousel-item v-for="item in advertList" :key="item">
            <el-image style="width: 1300px; height: 80px" :src="item.image" fit="fill" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="box-1">
      <div style="width: 1200px; margin: auto;">
        <el-container>
          <el-header height="90px">
            <div class="search">
              <div class="input-box">
                <el-input v-model="search" size="large" placeholder="请输入想要搜索的商品">
                  <template #append>
                    <el-button @click="load" :icon="Search" />
                  </template>
                </el-input>
              </div>
            </div>
          </el-header>
          <el-main>
            <div class="goodsList">
              <el-row>
                <el-col v-for="item in tableData " :key="item" :span="6">
                  <div class="goods-box" style="margin: 20px; 10px">
                    <RouterLink :to="{ path: '/Info/GoodsInfo', query: { goodsId: item.goodsId } }" target="_blank"
                      rel="opener">
                      <el-card shadow="hover" :body-style="{ padding: '10px', margin: 'auto' }">
                        <el-image class="goods-image" :src="item.photo" fit="contain" />
                        <div style="margin-top: 2px;">
                          <div class="goods-title-box">
                            <span class="goods-title">{{ item.goodsName }}</span>
                          </div>
                          <div style="height: 30px; margin-top: 10px;">
                            <el-text class="symbol-text">￥</el-text>
                            <el-text class="price-text">{{ item.price }}</el-text>
                            <el-text class="bought-text">92人付款</el-text>
                          </div>
                        </div>
                      </el-card>
                    </RouterLink>
                  </div>
                </el-col>
              </el-row>
              <el-pagination style="float: right;margin-right: 20px;" v-model:current-page="currentPage"
                v-model:page-size="pageSize" :page-sizes="[8, 16, 32, 64]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.advert {
  height: 80px;
  width: 100%;
  background-color: rgb(255, 58, 91);
  ;
}

.advert-box {
  height: 80px;
  width: 1300px;
  margin: auto;
}

.box-1 {
  width: 100%;
  min-height: calc(100vh - 110px);
  background-color: rgb(242, 234, 222);
}

.search {
  width: 600px;
  height: 90px;
  margin: auto;
}

.input-box {
  padding-top: 20px;
}

:deep(.input-box .el-input-group__append ){
  border-radius: 0 15px 15px 0;
}

:deep(.input-box .el-input__wrapper){
  border-radius: 15px 0 0 15px;
}

.goodsList {
  width: 1200px;
  border-radius: 18px;
  background-color: rgb(251, 250, 248);
  overflow: hidden
}

.goods-box{

}

:deep(.goods-box .el-card) {
  --el-card-border-color: rgb(251, 250, 248);
  --el-card-border-radius: 10px;
  --el-card-bg-color: rgb(251, 250, 248);
}

.goods-title-box {
  width: 232px;
  height: 63px;
  padding: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.goods-title {
  font-size: 16px;
  color: #111;
  display: inline;
}

.goods-image {
  width: 235px;
  height: 235px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: white;
}

.price-text {
  font-size: 22px;
  color: #ff5000;
}

.symbol-text {
  font-family: Microsoft Yahei;
  font-size: 14px;
  margin-top: 4px;
  color: #ff5000;
}

.bought-text {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
}
</style>