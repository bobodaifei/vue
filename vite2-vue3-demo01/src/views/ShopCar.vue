<script setup>
import { watch, ref, reactive } from "vue";
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

let pageSize = ref(10)
let currentPage = ref(1)
let total = ref(0)
let tableData = ref([])


const load = () => {
  request.post("/shopCar/page", {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  }).then((res) => {
    if (res.code == "200") {
      tableData.value = res.data.list
      total.value = res.data.total
    } else {
      ElMessage.error(res.msg)
    }
  });
}

const handleSizeChange = (_pageSize) => {
  pageSize.value = _pageSize
  load()
}

const handleCurrentChange = (_currentPage) => {
  currentPage.value = _currentPage
  load()
}

load()

const updateNum = (goodsId, num) => {
  request.put("/shopCar", {
    goodsId: goodsId,
    num: num
  }).then((res) => {
    if (res.code == "200") {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
    } else {
      ElMessage.error(res.msg)
    }
  });
}

const deleteShopCar = (goodsId) => {
  request.delete("/shopCar/" + goodsId).then((res) => {
    if (res.code == "200") {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      tableData.value.forEach((item, index) => {
        if (item.goodsId == goodsId) {
          tableData.value.splice(index, 1);
        }
      })
    } else {
      ElMessage.error(res.msg)
    }
  });
}

let totalPrice = ref(0.00)
let tempShopCarIdList = reactive([])

const handleSelectionChange = (shopCarList) => {
  tempShopCarIdList.length = 0;
  tempShopCarIdList.push(...shopCarList)
  // shopCarList.forEach((item) => {
  //   tempShopCarIdList.push(reactive(item))
  // })
}

watch(tempShopCarIdList, () => {
  let _totalPrice = 0;
  tempShopCarIdList.forEach((item) => {
    _totalPrice = _totalPrice + (item.num * item.goodsVO.price)
  })
  totalPrice.value = _totalPrice
}, { deep: true })


const router = useRouter()
const toConfirmOrder = () => {
  let goodsIdList = []
  tempShopCarIdList.forEach((item) => {
    goodsIdList.push(item.goodsId)
  })
  router.push({
    path: '/PayProcedure',
    query: { goodsIdList : goodsIdList }
  })
}
</script>
<template>
  <div class="shopCar-info">
    <div style="height: 1px;"></div>
    <div class="shopCar-box">
      <div class="shopCar-header">
        <div style="height: 70px;">
          <el-text class="shopCar-header-left">购物车（全部{{ total }}）</el-text>
        </div>
        <div style="height: 70px;">
          <el-text class="shopCar-header-right">已选商品</el-text>
          <el-text class="totalPrice">{{ totalPrice.toFixed(2) }}</el-text>
          <el-button class="totalPrice-submit" @click="toConfirmOrder" :type="totalPrice == 0 ? 'info' : 'danger'"
            :disabled="totalPrice != 0 ? false : true" round>结算</el-button>
        </div>
      </div>
      <el-table ref="multipleTableRef" :data="tableData" style="width: 95%;margin: auto;"
        @selection-change="handleSelectionChange">
        <el-table-column label="全选" type="selection" width="55" />
        <el-table-column label="商品信息" width="600">
          <template #default="scope">
            <div class="info-box-1">
              <el-container>
                <el-aside width="100px" style="height: 100px;">
                  <el-image style="width: 80px; height: 80px;margin: 5px;" :src="scope.row.goodsVO.photo" fit="fill" />
                </el-aside>
                <el-main>
                  <div>{{ scope.row.goodsVO.goodsName }}</div>
                </el-main>
              </el-container>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120" align="center">
          <template #default="scope">
            <div class="info-box-2">
              <span>￥ </span>{{ scope.row.goodsVO.price }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template #default="scope">
            <div class="info-box-3">
              <el-input-number v-model="scope.row.num" :min="1" :step="1" :precision="0" size="small"
                @change="updateNum(scope.row.goodsId, scope.row.num)" style="width: 100px;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="金额" width="120" align="center">
          <template #default="scope">
            <div class="info-box-4">
              {{ (scope.row.num * scope.row.goodsVO.price).toFixed(2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template #default="scope">
            <div class="info-box-4">
              <el-link @click="deleteShopCar(scope.row.goodsId)" target="_blank">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right;margin-right: 30px;" v-model:current-page="currentPage"
        v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped>
.shopCar-info {
  background-color: rgb(233, 223, 217);
  width: 100%;
  min-height: calc(100vh - 110px);
}

.shopCar-box {
  border-radius: 40px;
  background-color: rgb(255, 255, 255);
  width: 1200px;
  margin: 20px auto;
  padding-bottom: 40px;
}

.shopCar-header {
  height: 70px;
  width: 1150px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.shopCar-header-left {
  font-size: 18px;
  font-weight: 600;
  line-height: 70px;
  font-family: tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
}

.shopCar-header-right {
  font-size: 14px;
  line-height: 70px;
}

.totalPrice {
  font-weight: 500;
  font-size: 22px;
  color: #FF5000;
  margin-left: 20px;
  line-height: 70px;
}

.totalPrice-submit {
  width: 74px;
  height: 42px;
  margin: auto 20px;
}

.info-box-1 {
  height: 100px;

}

.info-box-2 {
  height: 100px;
  color: #3c3c3c;
  font-weight: 700;
  font-size: 14px;
}

.info-box-3 {
  height: 100px;
}

.info-box-4 {
  height: 100px;
}
</style>