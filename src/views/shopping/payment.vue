<template>
  <div class="shopping-cart-wrap">
    <h3>
    <img
      src="https://m.qpic.cn/psc?/V13PfEOv10xX31/N6ix9ropXhYRy3eob.4AqyWQh09s46z1Ex2dPmrkTr9MGcu4dzwZrFTgJHiBn2GYwgFYKgn0NkgmUIUCQv4JLA!!/b&bo=OATJBQAAAAADB9I!&rf=viewer_4"
      alt
      style="wight:300px;height:300px;"
    />
    </h3>
    <div class="col-md-5 col-md-offset-5">
      <p></p>

      <h3>
        实付款:{{actualTotal}}元
        <el-button type="warning" @click="buy">模拟完成支付,跳转到订单页面</el-button>
      </h3>
    </div>
  </div>
</template>

<script>
// 模拟第三方支付页面
import {orderPut} from '@/api/order'
export default {
  data () {
    return {

    }
  },
  methods: {
    buy () {
      // 第三方需要提供流水号,支付状态,支付金额
      let payment_number = ''
      for (let index = 0; index < 10; index++) {
        let element = Math.floor(Math.random() * 10)
        payment_number += element
      };
      console.log(11111, payment_number)
      let params = {
        payment_number: payment_number,
        status: 0,
        actual_amount: this.actualTotal,
        order_id: this.$route.params.orderId
      }
      orderPut(params).then(
        res => {
          if (res.code === 1000) {
            this.$router.push({name: 'order'})
          } else {
            this.$message({
              message: res.errors,
              center: true
            })
          }
        }
      ).catch(err => { console.log(err) })
    }
  },
  computed: {
    actualTotal: function () {
      return this.$route.params.actualTotal
    }
  }
}
</script>

<style lang="css" scoped>
.shopping-cart-wrap {
  width: 100%;
}
.shopping-cart-wrap h3,
.row {
  width: 1200px;
  margin: 0 auto;
}
.shopping-cart-wrap h3 {
  padding: 50px 0;
}
</style>
