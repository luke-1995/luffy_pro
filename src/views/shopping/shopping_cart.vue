<template>
	<div class="shopping-cart-wrap">
		<h3 class="shopping-cart-tit">我的购物车<small>共{{tableData.length}}门课程</small></h3>
		<div class="row">
			<template>
			  <el-table
			    ref="multipleTable"
			    :data="tableData"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			    	name='courseName'
			      label="课程"
			      width="540">
			     <template slot-scope="scope">
			     	<img :src="scope.row.courseImg">
			      {{ scope.row.courseName }}
			  	</template>
			    </el-table-column>
			    <el-table-column
			      prop="validPeriod"
			      label="有效期"
			      width="220">
			    </el-table-column>
			    <el-table-column
			      prop="coursePrice"
			      label="单价"
			      width='160'
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作"
			      width='160'
			      show-overflow-tooltip>
					<template>
					  <el-button type="text" @click="open">删除</el-button>
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
export default {
  name: 'ShopCart',
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    open () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
  	this.$http.myShopCart()
  	.then(res => {
  		if (res.data.error_no === 0) {
  			console.log(res.data.data, 1212121)
  			this.tableData = res.data.data.myShopCart
  		}
  	}).catch(err => {})
  }
}
</script>

<style lang="css" scoped>
.shopping-cart-wrap{
	width: 100%;
}
.shopping-cart-wrap h3,.row{
	width: 1200px;
	margin: 0 auto;
}
.shopping-cart-wrap h3{
	padding: 50px 0 ;
}
.el-table .warning-row {
	background: #22C8C5;
}
.cell img{
	vertical-align: middle;
	width: 170px;
}
.cell a{
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
.total{
	width: 1200px;
	margin: 0 auto;
	/*display: flex;*/
	/*justify-content:flex-end;*/

}
.shopping-cart-wrap .total button{
	float: right;
	margin-top: 20px;
}

.shopping-cart-wrap .total h3{
	padding: 0;
	float: right;
	width: 100px;
	height: 30px;
	margin-top: 30px;
}

</style>
