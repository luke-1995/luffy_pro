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
        <el-table-column label="问题标题" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问题状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.question_status_info }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学生" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.student_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary " @click="edit(scope.row)">回答问题</el-button>
            <!-- <template>
                  <el-popconfirm title="确定删除吗？" @onConfirm="del(scope.row)">
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popconfirm>
            </template>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="问题增加表" :visible.sync="isadd">
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

    <el-dialog title="更新表" :visible.sync="isedit">
      <el-form :model="editform" ref="editform" class="demo-dynamic">
        <el-form-item label="问题内容" :label-width="formLabelWidth">
          <el-input v-model="editform.content" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="回答"
          prop="answer"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入内容', trigger: 'blur' }
                ]"
        >
          <el-input v-model="editform.answer" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isedit = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Layout from '@/layout/rbac'
import { taGet, taPatch } from '@/api/teacher_answer'

export default {
  data () {
    return {
      tableData: [
        {
          id: 0,
          title: '问题标题',
          question_status: '未回答',
          content: 'xxx',
          answer: ''
        }
      ],
      onConfirm: 'delete',
      isadd: false,
      isedit: false,
      addError: '',
      addform: {
        title: ''
      },
      editform: {
        content: '问题内容'
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
      delete this.editform.student_name
      delete this.editform.question_status_info
      this.editform.question_status = 2
      taPatch(this.editform)
        .then(res => {
          alert('submit!')
          this.editform.question_status_info = '已回答'
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
    taGet()
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
