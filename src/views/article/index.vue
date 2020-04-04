<template>

      <div class="luffy-container">
        <div class="container">
          <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加文章</el-button>
          </div>
          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="文章名称" width="180">
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
        </div>
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import { aList, aDel } from '@/api/article'

export default {
  data () {
    return {
      tableData: [{id: 0, title: 'title'}],
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
  methods: {
    add () {
      this.$router.push({name: 'article_add'})
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
      this.$router.push({name: 'article_edit', params: {id: row.id}})
    },
    del (row) {
      aDel(row.id)
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
    aList()
      .then(res => {
        this.tableData = res
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    Layout
  }
}
</script>

<style lang="css" scoped>
</style>
