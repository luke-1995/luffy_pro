<template>

      <div class="luffy-container">
        <div class="col-md-6 ">
          <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        </div>
        <div class="col-md-6">
          <div id="orderChart" :style="{width: '300px', height: '300px'}"></div>
        </div>
        <!-- <div class="container">
          <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加角色</el-button>
          </div>
          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="角色名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary " @click="edit(scope.row)">编辑</el-button>
                <template>
                  <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popconfirm>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div> -->
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import { rfGet } from '@/api/report_forms'

export default {
  data () {
    return {
      tableData: [],
      onConfirm: 'delete',
      isadd: false,
      isedit: false,
      addError: '',
      addform: {
        title: ''
      },
      editform: {
        title: ''
      },
      formLabelWidth: '100px'
    }
  },
  mounted () {
    rfGet()
      .then(res => {
        if (res.code = 1000) {
          this.tableData = res.data
          console.log(res)
          this.drawLine()
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let orderChart = this.$echarts.init(document.getElementById('orderChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '用户注册趋势图' },
        tooltip: {},
        xAxis: {

          data: this.tableData.register.x
        },
        yAxis: {},
        series: [{
          name: '注册量',
          type: 'bar',
          data: this.tableData.register.y
        }]
      })
      orderChart.setOption({
        title: { text: '订单量报表' },
        tooltip: {},
        xAxis: {

          data: this.tableData.order.x
        },
        yAxis: {},
        series: [{
          name: '订单量',
          type: 'bar',
          data: this.tableData.order.y
        }]
      })
    },

    add () {
      this.isadd = true
    },
    addData () {
      rolePost(this.addform)
        .then(res => {
          alert('submit!')
          this.tableData.push(res)
          this.isadd = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    editDate () {
      rolePatch(this.editform)
        .then(res => {
          alert('submit!')
          this.isedit = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === 'addform') {
            this.addData()
          } else {
            this.editDate()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    edit (row) {
      this.editform = row
      this.isedit = true
    },
    del (row) {
      roleDel(row.id)
        .then(res => {
          if (!res) {
            this.delFun(row)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    delFun (i) {
      var index = this.tableData.indexOf(i)
      console.log(index)
      this.tableData.splice(index, 1)
    }
  },
  created () {

  },
  components: {
    Layout
  }
}
</script>

<style lang="css" scoped>
</style>
