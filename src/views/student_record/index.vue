<template>

      <div class="luffy-container">
        <div class="container">
          <div style="margin: 5px 0" class="clearfix">
            <button class="btn btn-info pull-left" @click="add" type="button">添加学生跟进记录</button>
          </div>
          <div class="panel panel-default" v-for="(row) in tableData" :key='row.id'>
            <div class="panel-body" style="position: relative;" >
              {{ row.note }}
              <div style="margin-top: 5px;" class="clearfix">
                <div style="display: inline-block;margin-right: 15px;" class="pull-left">
                  <i class="fa fa-user-o" aria-hidden="true"></i>
                  {{ row.student_name }}
                </div>
                <div style="display: inline-block;" class="pull-left">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  {{ row.date }}
                </div>
              </div>
              <div class="pull-right">
                <template>
                  <el-popconfirm title="确定删除吗？" @onConfirm="del(row)">
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                  </el-popconfirm>
                </template>
              </div>
              <div class="pull-right">
                <div style="display: inline-block;">
                  <el-button size="mini" type="primary " @click="edit(row)">编辑</el-button>
                </div>
              </div>
            </div>
          </div>

          <el-dialog title="增加表" :visible.sync="isadd">
            <el-form :model="addform" ref="addform" class="demo-dynamic">
              <el-form-item
                label="内容"
                prop="note"
                :label-width="formLabelWidth"
                :rules="[
                  { required: true, message: '请输入内容', trigger: 'blur' }
                ]"
              >
                <el-input v-model="addform.note" autocomplete="off" type="textarea"></el-input>
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
              <el-form-item
                label="内容"
                prop="note"
                :label-width="formLabelWidth"
                :rules="[
                  { required: true, message: '请输入内容', trigger: 'blur' }
                ]"
              >
                <el-input v-model="editform.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isedit = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

</template>

<script>
import Layout from '@/layout/rbac'
import { srGet, srPost, srPatch, srDel } from '@/api/student_record'
export default {
  components: {
    Layout
  },
  data () {
    return {
      tableData: [{id: 1, note: '111', date: 'date', teacher: 'teacher', student: 'student'}],
      addform: {},
      editform: {},
      formLabelWidth: '100px',
      isadd: false,
      isedit: false,
      addError: ''
    }
  },
  methods: {
    add () {
      this.isadd = true
    },
    addData () {
      console.log(this.addform)
      srPost(this.addform)
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
      // delete this.editform.date
      console.log(this.editform)
      srPatch(this.editform)
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
      srDel(row.id)
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
    let sid = this.$route.params.sid
    srGet(sid)
      .then(res => {
        console.log(res)
        this.tableData = res
        let uid = this.$store.getters.userInfo.id
        this.addform.student = sid
        this.addform.teacher = uid
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
