<template>
  <div class="shopping-cart-wrap">
    <h3 class="shopping-cart-tit">
      我的购物车
      <small>共{{tableData.length}}门课程</small>
    </h3>
    <div class="row">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column name="courseName" label="课程" width="450">
            <template slot-scope="scope">
              <img :src="[pre_url+scope.row.course_img]" />
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="有效期" width="160">
            <template slot-scope="scope">
              <!-- 默认选中 select 中v-model的值 等于 option中value -->
              <el-select 
              v-model='scope.row.price_policy_default_id'
              @change="selectPriceChange"
              >
                <el-option
                  v-for="(item) in scope.row.price_policy_dic"
                  :key="item.id|toStr"
                  :label="item.valid_period"
                  :value="item.id|toStr"

                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="coursePrice" label="单价" width="190" show-overflow-tooltip>
      
            <template slot-scope="scope" style="text-align: center;">
              {{scope.row.price_policy_dic[scope.row.price_policy_default_id].price}}元
            </template>
          </el-table-column>
          <el-table-column label="操作"  >
              <template slot-scope="scope">
                <template>
                  <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popconfirm>
                </template>
              </template>
            </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="total">
      <el-button type="primary">去结算</el-button>
      <h3>总计: ¥399</h3>
    </div>
  </div>
</template>

<script>
import { scGet, scPost, scPut, scDel } from "@/api/shopping_cart";
import Config from "@/settings";
export default {
  name: "ShopCart",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pre_url: Config.pre_url,
      kk:1
    };
  },
  filters: {
  toStr: function (value) {
    value = value.toString()
    return value
  }
},
  methods: {
    toNum(value) {

        value = parseInt(value)
        return value
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
    selectPriceChange(val){
      console.log(val,11)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    del (row) {
      let params={
        course_list:new Array(row.course_id)
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
          });
        })
    },
    delFun (i) {
      var index = this.tableData.indexOf(i)
      console.log(index)
      this.tableData.splice(index, 1)
      this.$message({
            message: '移除购物车成功',
            center: true
          });
      // let Num = this.$store.getters.userInfo.shop_cart_num;
      let num = this.tableData.length
      this.$store.commit('updateShoppingCart',num)
    }
  },
  created() {
    scGet()
      .then(res => {
        if (res.code === 1000) {
          this.tableData = res.data;
          console.log(res.data);
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
  width: 1200px;
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
