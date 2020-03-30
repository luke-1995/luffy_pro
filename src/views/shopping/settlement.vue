<template>
  <div class="shopping-cart-wrap">
    <!-- <h3 class="shopping-cart-tit">
      我的购物车
      <small>共{{tableData.length}}门课程</small>
    </h3>-->
    <h3></h3>
    <div class="row">
      <template>
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column name="courseName" label="课程" width="450">
            <template slot-scope="scope">
              <img :src="[pre_url+scope.row.course_img]" />
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程优惠卷" width="160">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.default_coupon_id"
                @change="couponChange($event,scope.row)"
                placeholder="请选择优惠卷"
              >
                <el-option value="0" label="-------"></el-option>
                <el-option
                  v-for="(item) in scope.row.course_coupon_dic"
                  :key="item.id|toStr"
                  :label="item.name"
                  :value="item.id|toStr"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="coursePrice" label="课程有效期" show-overflow-tooltip>
            <template slot-scope="scope" style="text-align: center;">
              <!-- {{scope.row.course_coupon_dic[default_coupon_id]}} -->
              {{scope.row.valid_period}}
            </template>
          </el-table-column>
          <el-table-column prop="coursePrice" label="价格" show-overflow-tooltip>
            <template slot-scope="scope" style="text-align: center;">{{scope.row.price}}元</template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="col-md-4 col-md-offset-1">
      <p></p>
      <el-select
        v-model="default_global_coupon_id"
        @change="globalCouponChange"
        placeholder="请选择通用优惠卷"
      >
        <el-option value="0" label="-------"></el-option>
        <el-option
          v-for="item in global_coupon"
          :key="item.id|toStr"
          :label="item.name"
          :value="item.id|toStr"
        ></el-option>
      </el-select>
    </div>
    <div class="col-md-9 col-md-offset-9">
      <p></p>
      <p>商品总额:{{total|toFix}}元</p>
      <p>
        <el-checkbox v-model="checked" @change="isChecked">是否使用贝里</el-checkbox>
      </p>
      <p>优惠卷抵扣:{{couponTotal|toFix}} 元</p>
    </div>
    <div class="col-md-5 col-md-offset-5">
      <p></p>

      <h3>
        实付款:{{actualTotal|toFix}}元
        <el-button type="warning" @click="buy">立即支付</el-button>
      </h3>
    </div>
    <!-- <el-dialog title="支付表(在redis中生成订单,等待支付)" :visible.sync="ispay">
      <img
        src="https://m.qpic.cn/psc?/V13PfEOv10xX31/N6ix9ropXhYRy3eob.4AqyWQh09s46z1Ex2dPmrkTr9MGcu4dzwZrFTgJHiBn2GYwgFYKgn0NkgmUIUCQv4JLA!!/b&bo=OATJBQAAAAADB9I!&rf=viewer_4"
        alt
        style="wight:200px;height:200px;"

      />
      <p>免费获得,已用贝里或抵扣卷抵消</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ispay = false">取 消</el-button>
        <el-button type="primary" @click="payment">模拟完成支付,在数据库生成订单</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { smGet, smPost, smPut } from '@/api/settlement'
import { pPost } from '@/api/payment'
import Config from '@/settings'
export default {
  name: 'ShopCart',
  data () {
    return {
      tableData: [
        // {
        //   title: "我是标题",
        //   price_policy_default_id: 1,
        //   price_policy_dic: {
        //     "1": { id: 1, valid_period: "7000000天", price: "1000000" },
        //     "2": { id: 2, valid_period: "27000000天", price: "12000000" }
        //   }
        // }
      ],
      pre_url: Config.pre_url,
      kk: 1,
      global_coupon: {},
      default_global_coupon_id: '',
      checked: false,
      balance: 0,
      useBalance: 0,
      ispay: false,
      isfree: false
    }
  },
  filters: {
    toStr: function (value) {
      if (value) {
        value = value.toString()
      }
      return value
    },
    toFix: function (value) {
      if (value) {
        value = value.toFixed(2)
      }
      return value
    }
  },
  methods: {
    buy () {
      // 分为两种情况,一种为实付款为0,一种不为0
      let params = {
        balance: this.useBalance,
        total_price: this.actualTotal
      }
      console.log(this.useBalance)
      pPost(params)
        .then(res => {
          console.log(res)
          if (res.code === 1000) {
            if (!this.actualTotal) {
              // 更新贝里
              this.$router.push({
                name: 'order'
              })
            } else {
              this.$router.push({
                name: 'payment',
                params: {
                  actualTotal: this.actualTotal,
                  orderId: res.data.order_id
                }
              })
            }
          } else {
            this.$message({
              message: res.errors,
              center: true
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    createOrder () {
      let payment_type = null
      if (!this.actualTotal) {
        if (!this.useBalance) {
          payment_type = 2
        } else {
          payment_type = 3
        }
        this.isfree = true
      } else {
        payment_type = 0
        // 默认是微信支付
      }

      let params = {
        payment_type: payment_type,
        actual_amount: this.actualTotal
      }
    },

    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    couponChange (val, row) {
      console.log(typeof val, val, 1111111)
      let params = {
        coupon_id: val,
        course_id: row.course_id
      }
      if (!parseInt(val)) {
        smPut(params)
          .then(res => {
            if ((res.code = 1000)) {
              this.$message({
                message: '更改课程优惠卷成功',
                center: true
              })
              let index = this.tableData.indexOf(row)
            } else {
              this.$message({
                message: res.errors,
                center: true
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              message: '更改课程优惠卷失败',
              center: true
            })
          })
        return
      }

      let index = this.tableData.indexOf(row)
      this.tableData[index].default_coupon_id = val
      let price = parseFloat(row.price)
      let minimum_consume = row.course_coupon_dic[val].minimum_consume
      let total = this.discount(row.course_coupon_dic[val], price)
      if (minimum_consume > price) {
        this.tableData[index].default_coupon_id = null
        this.$message({
          message: '优惠卷错误,优惠后商品不满足最低消费',
          center: true
        })
      } else if (total > price) {
        this.tableData[index].default_coupon_id = null
        this.$message({
          message: '优惠卷错误,优惠后商品的价格不能小于0',
          center: true
        })
      } else {
        // let params = {
        //   coupon_id: val,
        //   course_id: row.course_id
        // };
        smPut(params)
          .then(res => {
            if ((res.code = 1000)) {
              this.$message({
                message: '更改课程优惠卷成功',
                center: true
              })
              let index = this.tableData.indexOf(row)
              this.tableData[index].default_coupon_id = val
            } else {
              this.$message({
                message: res.errors,
                center: true
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              message: '结算失败',
              center: true
            })
          })
      }
    },
    globalCouponChange (val) {
      let params = {
        global_coupon_id: val
      }
      if (!parseInt(val)) {
        smPut(params)
          .then(res => {
            if ((res.code = 1000)) {
              this.$message({
                message: '更改通用优惠卷成功',
                center: true
              })
            } else {
              this.$message({
                message: res.errors,
                center: true
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              message: '更改通用优惠卷失败',
              center: true
            })
          })
        return
      }
      this.default_global_coupon_id = val
      let minimum_consume = this.global_coupon[val].minimum_consume
      let global_coupon_total = this.discount(
        this.global_coupon[val],
        this.total
      )
      let discount_total = this.total - this.course_coupon_total
      if (this.total < minimum_consume) {
        this.default_global_coupon_id = null
        this.$message({
          message: '优惠卷错误,优惠后商品不满足最低消费',
          center: true
        })
      } else if (global_coupon_total > discount_total) {
        this.default_global_coupon_id = null
        this.$message({
          message: '优惠卷错误,优惠后商品不能低于经过课程优惠卷后的商品总额',
          center: true
        })
      } else {
        console.log(typeof val, 1111111)

        smPut(params)
          .then(res => {
            if ((res.code = 1000)) {
              this.$message({
                message: '更改通用优惠卷成功',
                center: true
              })
              this.default_global_coupon_id = val
            } else {
              this.$message({
                message: res.errors,
                center: true
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              message: '结算失败',
              center: true
            })
          })
      }
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    del (row) {
      let params = {
        course_list: new Array(row.course_id)
      }
      scDel(params)
        .then(res => {
          if (!res.data) {
            this.delFun(row)
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            message: '移除购物车失败',
            center: true
          })
        })
    },
    delFun (i) {
      var index = this.tableData.indexOf(i)
      console.log(index)
      this.tableData.splice(index, 1)
      this.$message({
        message: '移除购物车成功',
        center: true
      })
      // let Num = this.$store.getters.userInfo.shop_cart_num;
      let num = this.tableData.length
      this.$store.commit('updateShoppingCart', num)
    },
    discount (obj, price) {
      let total = 0
      if (obj.money_equivalent_value) {
        total += obj.money_equivalent_value
      }
      if (obj.off_percent !== 100) {
        total += (price * (100 - obj.off_percent)) / 100
      }
      return total
    },
    clearCoupon () {
      // 清空优惠卷默认选择
      this.tableData.forEach(row => {
        if (parseInt(row.default_coupon_id)) {
          delete row.default_coupon_id
        }
      })
    },
    isChecked (val) {
      if (val) {
        this.balance = parseFloat(this.$store.getters.userInfo.balance)
        // console.log(this.$store.getters.userInfo.balance)
        // console.log(typeof(this.$store.getters.userInfo.balance))
      } else {
        this.balance = 0
      }
    }
  },

  created () {
    smGet()
      .then(res => {
        if (res.code === 1000) {
          // let sD = res.data
          // sD.pop()
          // this.tableData = res.data[0];
          res.data.forEach(row => {
            if (typeof row === 'object' && row.constructor == Array) {
              console.log(row);
              this.tableData = row
            } else {
              this.default_global_coupon_id = row.default_global_coupon_id
              delete row.default_global_coupon_id
              this.global_coupon = row
            }
          })
          // console.log(res.data[0]);
          // console.log(sD);
        } else {
          this.$message({
            message: res.errors,
            center: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    total: function () {
      let total_money = 0
      this.tableData.forEach(row => {
        let money = row.price
        money = parseFloat(money)
        total_money += money
      })
      return total_money
    },
    couponTotal: function () {
      return (
        parseFloat(this.course_coupon_total) +
        parseFloat(this.global_coupon_total)
      )
    },
    actualTotal: function () {
      if (this.total < this.couponTotal) {
        this.clearCoupon()
        return this.total
      } else {
        if (parseFloat(this.balance)) {
          let discount = this.total - this.couponTotal
          if (parseFloat(this.balance) > discount) {
            this.useBalance = discount
            return 0
          } else {
            this.useBalance = this.balance
            return discount - parseFloat(this.balance)
          }
        } else {
          return this.total - this.couponTotal
        }
      }
    },
    course_coupon_total: function () {
      if (!this.tableData) {
        return 0
      } else {
        let total = 0
        this.tableData.forEach(row => {
          if (parseInt(row.default_coupon_id)) {
            let couponPrice = parseFloat(row.price)
            let minimum_consume =
              row.course_coupon_dic[row.default_coupon_id].minimum_consume
            let money = this.discount(
              row.course_coupon_dic[row.default_coupon_id],
              couponPrice
            )
            if (minimum_consume > couponPrice || money > couponPrice) {
              let index = this.tableData.indexOf(row)
              this.tableData[index].default_coupon_id = null
            } else {
              total += money
            }
          }
        })
        return total
      }
    },
    global_coupon_total: function () {
      if (parseInt(this.default_global_coupon_id)) {
        let minimum_consume = this.global_coupon[this.default_global_coupon_id]
          .minimum_consume
        let money = this.discount(
          this.global_coupon[this.default_global_coupon_id],
          this.total - this.course_coupon_total
        )
        let discount_total = this.total - this.course_coupon_total
        if (minimum_consume > discount_total || money > discount_total) {
          this.default_global_coupon_id = null
        } else {
          return money
        }
      }

      return 0
    }
  }
}
</script>

<style lang="css" scoped>
.shopping-cart-wrap {
  width: 80%;
}
.shopping-cart-wrap h3,
.row {
  width: 1200px;
  margin: 0 auto;
}
.shopping-cart-wrap h3 {
  padding: 50px 0;
}
.el-table .warning-row {
  background: #22c8c5;
}
.cell img {
  vertical-align: middle;
  width: 170px;
}
.cell a {
  color: #000;
  margin-left: 30px;
}
select {
  border: 0;
  outline: none;
  font-size: 12px;
  color: #666;
  line-height: 18px;
  width: 117px;
  height: 28px;
  padding-left: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.total {
  width: 1100px;
  margin: 0 auto;
  /*display: flex;*/
  /*justify-content:flex-end;*/
}
.shopping-cart-wrap .total button {
  float: right;
  margin-top: 20px;
}

.shopping-cart-wrap .total h3 {
  padding: 0;
  float: right;
  width: 100px;
  height: 30px;
  margin-top: 30px;
}
</style>
