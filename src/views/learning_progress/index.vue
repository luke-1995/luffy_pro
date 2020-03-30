<template>

      <div class="luffy-container">
        <div class="container">

          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学生名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学生进度" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.learning_progress||'暂未学习' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import {lpGet} from '@/api/learning_progress'

export default {
  data () {
    return {
      tableData: [],
      onConfirm: 'delete',
      islist: false,
      isedit: false,
      addError: '',
      addform: {
        title: ''
      },
      editform: {
        title: ''
      },
      listform: {},
      formLabelWidth: '100px'
    }
  },
  filters: {
    toStr: function (value) {
      value = value.toString()
      return value
    }
  },
  methods: {
    // add() {
    //   this.islist = true;
    // },

    list (row) {
      this.islist = true
      this.listform = row.student_record_info
    }
  },
  created () {
    lpGet()
      .then(res => {
        this.tableData = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    Layout
  }
}
</script>

<style lang="css" scoped>
</style>
