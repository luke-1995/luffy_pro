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
      placeholder="请选择通用优惠卷">
        <el-option
          v-for="item in global_coupon"
          :key="item.id|toStr"
          :label="item.name"
          :value="item.id|toStr"
          
        ></el-option>
      </el-select>
    </div>
    <div class="col-md-6 col-md-offset-6">
      <p></p>
      <p>商品总额:{{total}}元</p>
      <p>
         <el-checkbox v-model="checked" >是否使用贝里</el-checkbox>
      </p>
      <p>优惠卷抵扣:{{couponTotal}} 元</p>
    </div>
    <div class="col-md-5 col-md-offset-5">
      <p></p>

      <h3>
        实付款:{{actualTotal}}元
        <el-button type="warning" @click="buy">立即支付</el-button>
      </h3>
    </div>
  </div>
</template>

<script>
import { smGet, smPost, smPut } from "@/api/settlement";
import Config from "@/settings";
export default {
  name: "ShopCart",
  data() {
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
      checked: true,
      global_coupon: {},
      // global_coupon_total: 0,
      // course_coupon_total: 0,
      default_global_coupon_id: '',
      checked:false,
    };
  },
  filters: {
    toStr: function(value) {

      if (value) {
        value = value.toString();
      }
      return value;
    }
  },
  methods: {
    useBalance(){

    },
    buy(){

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    couponChange(val, row) {
      
      // this.course_coupon_total=row.course_coupon_dic[val].money_equivalent_value
      let params = {
        coupon_id: val,
        course_id: row.course_id
      };
      smPut(params)
        .then(res => {
          if ((res.code = 1000)) {
            this.$message({
              message: "更改课程优惠卷成功",
              center: true
            });
            let index = this.tableData.indexOf(row);
            this.tableData[index].default_coupon_id=val;
          } else {
            this.$message({
              message: res.errors,
              center: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "结算失败",
            center: true
          });
        });
    },
    globalCouponChange(val) {
      // console.log(val, row, 111);
      // this.course_coupon_total=row.course_coupon_dic[val].money_equivalent_value
      let params = {
        global_coupon_id: val,
      };
      console.log(val,11111)
      smPut(params)
        .then(res => {
          if ((res.code = 1000)) {
            this.$message({
              message: "更改通用优惠卷成功",
              center: true
            });
            this.default_global_coupon_id = val
          } else {
            this.$message({
              message: res.errors,
              center: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "结算失败",
            center: true
          });
        });

    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    del(row) {
      let params = {
        course_list: new Array(row.course_id)
      };
      scDel(params)
        .then(res => {
          if (!res.data) {
            this.delFun(row);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "移除购物车失败",
            center: true
          });
        });
    },
    delFun(i) {
      var index = this.tableData.indexOf(i);
      console.log(index);
      this.tableData.splice(index, 1);
      this.$message({
        message: "移除购物车成功",
        center: true
      });
      // let Num = this.$store.getters.userInfo.shop_cart_num;
      let num = this.tableData.length;
      this.$store.commit("updateShoppingCart", num);
    }
  },

  created() {
    smGet()
      .then(res => {
        if (res.code === 1000) {
          // let sD = res.data
          // sD.pop()
          // this.tableData = res.data[0];
          res.data.forEach(row => {
            if (typeof row == "object" && row.constructor == Array) {
              // console.log(row);
              this.tableData = row;
            } else {
              this.default_global_coupon_id = row.default_global_coupon_id
              delete row.default_global_coupon_id
              this.global_coupon = row;
            }
          });
          // console.log(res.data[0]);
          // console.log(sD);
        } else {
          this.$message({
            message: res.errors,
            center: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    total: function() {
      let total_money = 0;
      this.tableData.forEach(row => {
        let money = row.price;
        money = parseInt(money);
        total_money += money;
      });
      console.log(total_money);
      return total_money;
    },
    couponTotal: function() {
      return (
        parseInt(this.course_coupon_total) + parseInt(this.global_coupon_total)
      );
    },
    actualTotal: function() {
      return this.total - this.couponTotal;
    },
    course_coupon_total:function(){
      if (!this.tableData) {
        return 0
      } else {
        let total = 0
        this.tableData.forEach(
          row=>{
            if (row.default_coupon_id) {
              let money=row.course_coupon_dic[row.default_coupon_id].money_equivalent_value;
              money = parseInt(money);
              total+=money
            } 
            
          }
        )
        return total
      }
    },
    global_coupon_total:function(){
      let total = 0
      if(this.default_global_coupon_id){
        total = this.global_coupon[this.default_global_coupon_id].money_equivalent_value
      }
      return parseInt(total)
    }
  }
  // beforeCreate() {
  //   let condition = this.$route.params;
  //   // let uid = this.$store.getters.userInfo.id
  //   console.log(condition);
  //   console.log(condition.length === 0, 1111);
  //   if (JSON.stringify(condition) !== "{}") {
  //     let obj = {
  //       course_id: condition.cid,
  //       price_policy_id: condition.pid
  //     };

  //     scPost(obj)
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         this.$message({
  //           message: "加入购物车失败,请重新加入",
  //           center: true
  //         });
  //       });
  //   }
  // }
};
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
