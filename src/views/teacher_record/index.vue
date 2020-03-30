<template>

      <div class="luffy-container">
        <div class="container">
          <!-- <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加角色</el-button>
          </div>-->
          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="导师名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学生记录">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="list(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="学生记录表" :visible.sync="islist">
            <el-table :data="listform" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="note" label="内容" width="180"></el-table-column>
              <el-table-column prop="student" label="学生"></el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import {trGet} from "@/api/teacher_record";

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
    trGet()
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
