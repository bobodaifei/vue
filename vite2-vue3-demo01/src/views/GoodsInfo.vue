<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router';
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/counter'

const userRoute = useRoute()
let goodsId = userRoute.query.goodsId
let goodsData = ref({})
const load = () => {
  request.get("/goods/" + goodsId).then((res) => {
    if (res.code == "200") {
      goodsData.value = res.data
    } else {
      ElMessage.error(res.msg)
    }
  });
}

load()

const activeName = ref('first')


let num = ref(1)
const store = useUserStore();
const addShopCar = () => {
  if (num.value > 0) {
    request.post("/shopCar", {
      userId: store.user.userId,
      goodsId: goodsId,
      num: num.value
    }).then((res) => {
      if (res.code == 200) {
        ElMessage({
          message: res.msg,
          type: 'success',
        })
      } else {
        ElMessage({
          message: res.msg,
          grouping: true,
          type: 'error',
        })
      }
    })
  }
}

</script>

<template>
  <div class="goods-info">
    <div style="height: 1px;"></div>
    <div class="goods-box">
      <el-container>
        <el-aside width="540px">
          <div class="image-box">
            <el-image class="goods-image" :key="goodsData.photo" :src="goodsData.photo" fit="contain" />
          </div>
        </el-aside>
        <el-main>
          <div class="info-box">
            <h1 class="goods-title">{{ goodsData.goodsName }}</h1>
            <div style="height: 80px;margin-top: 10px;">
              <span class="goods-price-pre">掌柜推荐</span>
              <span class="goods-price-pre">￥</span>
              <span class="goods-price-after">{{ goodsData.price }}</span>
            </div>
            <div style="height: 230px;">

            </div>
            <div class="stock-box">
              <span>数量：</span>
              <el-input-number v-model="num" :precision="0" :step="1" :min="1" />
              <span style="margin-left: 10px;">{{ goodsData.stock >= 0 ? '有货' : '缺货' }}</span>
            </div>
            <div style="margin-top: 30px;">
              <el-button @click="addShopCar" type="warning" size="large" round>加入购物车</el-button>
              <el-button type="danger" size="large" round>立即购买</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
      <div style="margin: 0 20px 20px 20px;">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="宝贝简介" name="first">{{ goodsData.info }}</el-tab-pane>
          <el-tab-pane label="宝贝评价" name="second">暂无</el-tab-pane>
        </el-tabs>
      </div>
      <div style="height: 1px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsInfo',
}
</script>
<style scoped>
.goods-info {
  background-color: rgb(233, 223, 217);
  width: 100%;
  min-height: calc(100vh - 110px);

}

.goods-box {
  border-radius: 40px;
  background-color: rgb(255, 255, 255);
  width: 1200px;
  margin: 20px auto;
}

.image-box {
  width: 500px;
  height: 500px;
  margin: 20px;
}

.goods-image {
  border-radius: 25px;
  width: 100%;
  height: 100%;
}

.info-box {
  width: 620px;
  height: 500px;
  margin: 20px;
}

.goods-title {
  line-height: 28px;
  color: #000;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 900;
  height: 60px;
}

.goods-price-pre {
  color: rgb(255, 79, 0);
  font-size: 16px;
}

.goods-price-after {
  color: rgb(255, 79, 0);
  font-size: 28px;
}

.stock-box {
  margin-top: 20px;
  font-size: 16px;
  color: #7f7f7f;
}
</style>