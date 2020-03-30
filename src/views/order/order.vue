<template>
  <div class="shopping-cart-wrap">
    <h3></h3>
    <div class="row">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="订单号" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.order_number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生成日期" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date|toDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实付款" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.actual_amount }}元</span>
            </template>
          </el-table-column>
          <el-table-column label="支付状态" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleList(scope.row)" type="primary ">课程详情</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                @click="handleOpera(scope.row)"
                v-text="operation(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="课程详情表" :visible.sync="isList">
        <el-table :data="order_detail_info" style="width: 100%">
          <el-table-column prop="title" label="课程名称" width="180"></el-table-column>
          <el-table-column prop="original_price" label="原价(元)" width="180"></el-table-column>
          <el-table-column prop="price" label="课程优惠卷折后价(元)" width="180"></el-table-column>
          <el-table-column prop="valid_period_display" label="有效期"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
</div>
</div>
</template>

<script>
import { orderGet } from '@/api/order'
export default {
  data () {
    return {
      tableData: [],
      formLabelWidth: 100,
      isList: false,
      order_detail_info: []
    }
  },
  filters: {
    toMoney: function (value) {
      if (value) {
        value = '¥ ' + value
      }
      return value
    },
    toDate: function (value) {
      if (value) {
        let time = new Date(value)
        return time.toLocaleDateString()
      }
      return value
    }
  },
  created () {
    orderGet()
      .then(res => {
        this.tableData = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleList (row) {
      (this.isList = true), console.log(row)
      this.order_detail_info = row.order_detail_info
    },
    operation (row) {
      if (row.status === '待支付') {
        return '去付款'
      } else {
        return '去学习'
      }
    },
    handleOpera (row) {
      if (row.status === '待支付') {
        return this.$router.push({
          name: 'payment',
          params: { actualTotal: row.actual_amount, orderId: row.id }
        })
      } else {
        return this.$router.push({ name: 'home' })
      }
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
