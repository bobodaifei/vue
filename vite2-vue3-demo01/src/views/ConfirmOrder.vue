<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';


let addressData = reactive([])
let checkAddressId = ref()
let checkAddress = ref({})
const loadAddress = () => {
  request.get("/address/list").then((res) => {
    if (res.code == "200") {
      addressData.splice(0, addressData.length)
      addressData.push(...res.data)
      if (addressData.length > 0) {
        checkAddressId.value = addressData[0].addrId
        checkAddress.value = addressData[0]
      }
    } else {
      ElMessage.error(res.msg)
    }
  });
}
loadAddress()

watch(checkAddressId, () => {
  addressData.forEach((item) => {
    if (item.addrId == checkAddressId.value) {
      checkAddress.value = item
    }
  })
}, { deep: true })

const userRoute = useRoute()
let goodsIdList = Array.from(userRoute.query.goodsIdList)
let goodsData = reactive([])
let payMoney = ref(0)
const loadShopCar = () => {
  request.post("/shopCar/getByIds", {
    goodsIds: goodsIdList.join(',')
  }).then((res) => {
    if (res.code == "200") {
      goodsData.splice(0, addressData.length)
      goodsData.push(...res.data)
      goodsData.forEach(item => {
        payMoney.value = payMoney.value + (item.num * item.goodsVO.price)
      });
    } else {
      ElMessage.error(res.msg)
    }
  });
}
loadShopCar()


const router = useRouter()
const submitOrder = () => {
  request.post("/order", {
    goodsIds: goodsIdList.join(','),
    addrId: checkAddressId.value
  }).then((res) => {
    if (res.code == "200") {
      router.push({
        path: '/PayProcedure',
        query: { orderNo: res.data }
      })
    } else {
      ElMessage.error(res.msg)
    }
  });
}


</script>

<template>
  <div style="width: 1200px; margin: auto; padding-top: 30px;">
    <div style="margin-top: 30px;">
      <div>选择收货地址</div>
      <div style="width: 1200px;">
        <el-radio-group v-model="checkAddressId" size="large">
          <el-row style="width: 1200px;" :gutter="40">
            <el-col v-for="item in addressData" style="height: 100px; margin-top: 20px;" :span="6">
              <el-radio :label="item.addrId" style="height: 100%;width: 100%;" border>
                <div style="width: 200px; height: 87px;">
                  <div style="width: 200px; height: 30px;line-height: 30px;">{{ item.consignee }} <el-divider
                      direction="vertical" /> {{ item.phone }}</div>
                  <el-divider style="height: 1px; margin: 0 0 5px 0;" />
                  <div>{{ item.addr }}</div>
                </div>
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </div>

    </div>
    <el-divider />
    <div style="margin-top: 30px;">
      <div>确认订单信息</div>
      <div style="width: 1200px; margin-top: 10px;">
        <el-table :data="goodsData" style="width: 100%;margin: auto;">
          <el-table-column label="商品信息">
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
                {{ scope.row.num }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="120" align="center">
            <template #default="scope">
              <div class="info-box-4">
                {{ (scope.row.num * scope.row.goodsVO.price).toFixed(2) }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 1200px;height: 130px;  margin-top: 10px;">
        <div class="payInfo-box">
          <div style="width: 330px;height: 40px;">
            <span style="font-weight: 700;">实付款：</span>
            <span style="color: #999; font: 700 26px tahoma;">￥</span>
            <span style="color: #ff0036; font: 700 26px tahoma;">{{ payMoney.toFixed(2) }}</span>
          </div>
          <div style="width: 330px;margin-top: 15px; ">
            <span style="font-weight: 700;">寄送至：</span>
            <span style="color: #333;font-size: 12px;">{{ checkAddress.addr }}</span>
          </div>
          <div style="width: 330px;">
            <span style="font-weight: 700;">收货人：</span>
            <span style="color: #333;font-size: 12px;">{{ checkAddress.consignee }} &nbsp; {{ checkAddress.phone }}</span>
          </div>
        </div>
      </div>
      <div style="width: 1200px;height: 40px;">
        <div style="width: 360px; height: 40px;float: right; display: flex;">
          <el-button style="width: 180px; height: 40px;">返回购物车</el-button>
          <el-button @click="submitOrder" style="width: 180px; height: 40px;" type="danger">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>
<style scoped>
.payInfo-box {
  float: right;
  width: 360px;
  height: 130px;

  border: 3px solid #fff0e8;
  min-width: 230px;
  padding: 10px 5px 10px 20px;
  font-size: 12px;

}
</style>