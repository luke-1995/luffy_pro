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
            <el-table-column label="学生名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="讲师名称" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.teacher_name||'无' }}</span>
              </template>
            </el-table-column> -->
            <el-table-column prop="name" label="分配讲师" width="160">
              <template slot-scope="scope">
                <!-- 默认选中 select 中v-model的值 等于 option中value -->
                <el-select
                  v-model="scope.row.teacher"

                >
                  <el-option value="" label="-------"></el-option>
                  <el-option
                    v-for="(item) in scope.row.teacher_info"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="save(scope.row)">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import { dsGet, dsPatch } from '@/api/dis_stu'

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
  filters: {
    toStr: function (value) {
      value = value.toString()
      return value
    }
  },
  methods: {
    // add() {
    //   this.isadd = true;
    // },

    save (row) {
      delete row.teacher_info
      delete row.teacher_name
      console.log(row)
      dsPatch(row)
        .then(res => {
          this.$message({
            message: '成功',
            center: true
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    dsGet()
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
