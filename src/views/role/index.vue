<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="container">
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
        </div>
      </div>
      <el-dialog title="角色增加表" :visible.sync="isadd">
        <el-form :model="addform" ref="addform" class="demo-dynamic">
          <el-form-item
            label="角色"
            prop="title"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入角色名', trigger: 'blur' }
                ]"
          >
            <el-input v-model="addform.title" autocomplete="off"></el-input>
            <span class="pull-right" style="color:#F56C6C;">{{addError}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isadd = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="角色更新表" :visible.sync="isedit">
        <el-form :model="editform" ref="editform" class="demo-dynamic">
          <el-form-item
            label="角色"
            prop="title"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入角色名', trigger: 'blur' }
                ]"
          >
            <el-input v-model="editform.title" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isedit = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/layout/rbac'
import { roleGet, rolePost, rolePatch, roleDel } from '@/api/role'

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
  methods: {
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
    roleGet()
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
