<template>
  <div class="luffy-container">
    <div class="container">
      <div class="btn-group" style="margin: 5px 0">
        <el-button size="mini" @click="add">添加课程</el-button>
      </div>
      <el-table :data="tableData" style="width: 80%" justify="center">
        <el-table-column label="id" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" width="180">
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
    <el-dialog title="课程增加表" :visible.sync="isadd">
      <el-form :model="addform" ref="addform" class="demo-dynamic">
        <el-form-item
          label="课程名称"
          prop="title"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程名', trigger: 'blur' }
                ]"
        >
          <el-input v-model="addform.title" autocomplete="off"></el-input>
          <span class="pull-right" style="color:#F56C6C;">{{addError}}</span>
        </el-form-item>

        <el-form-item
          label="课程分类"
          prop="category"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程分类', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="addform.category" placeholder="请选择课程分类">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in category"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程类型"
          prop="course_type"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程类型', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="addform.course_type" placeholder="请选择课程类型">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in COURSE_TYPE_CHOICES"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程状态"
          prop="status"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程状态', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="addform.status" placeholder="请选择订单状态">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in status_choices"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程顺序"
          prop="order"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程顺序', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值'}
                ]"
        >
          <el-input v-model.number="addform.order" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item
          label="学习人数"
          prop="study_num"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入学习人数', trigger: 'blur' },
                   { type: 'number', message: '必须为数字值'}
                ]"
        >
          <el-input v-model.number="addform.study_num" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="图片文件" prop="course_img" :label-width="formLabelWidth">
          <input
            type="file"
            @change="handlerUpload($event)"
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </el-form-item>

        <el-form-item
          label="课程简介"
          prop="brief"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程简介', trigger: 'blur' }
                ]"
        >
          <el-input v-model="addform.brief" autocomplete="off" type="textarea"></el-input>
          <span class="pull-right" style="color:#F56C6C;">{{addError}}</span>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isadd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="课程更新表" :visible.sync="isedit">
      <el-form :model="editform" ref="editform" class="demo-dynamic">
        <el-form-item
          label="课程名称"
          prop="title"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程名', trigger: 'blur' }
                ]"
        >
          <el-input v-model="editform.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="课程分类"
          prop="category"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程分类', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="editform.category" placeholder="请选择课程分类">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in category"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程类型"
          prop="course_type"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程类型', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="editform.course_type" placeholder="请选择课程类型">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in COURSE_TYPE_CHOICES"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程状态"
          prop="status"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入课程状态', trigger: 'blur' }
              ]"
        >
          <el-select v-model.number="editform.status" placeholder="请选择订单状态">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="(item) in status_choices"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="课程顺序"
          prop="order"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程顺序', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值'}
                ]"
        >
          <el-input v-model.number="editform.order" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item
          label="学习人数"
          prop="study_num"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入学习人数', trigger: 'blur' },
                   { type: 'number', message: '必须为数字值'}
                ]"
        >
          <el-input v-model.number="editform.study_num" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="图片文件" prop="course_img" :label-width="formLabelWidth">
          <input
            type="file"
            @change="editHandlerUpload($event)"
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </el-form-item>

        <el-form-item
          label="课程简介"
          prop="brief"
          :label-width="formLabelWidth"
          :rules="[
                  { required: true, message: '请输入课程简介', trigger: 'blur' }
                ]"
        >
          <el-input v-model="editform.brief" autocomplete="off" type="textarea"></el-input>
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
import { cmGet, cmPost, cmPatch, cmDel } from '@/api/course_menu'
import { categoryGet } from '@/api/course'

export default {
  data () {
    return {
      tableData: [{ id: 1, title: 'title' }],
      onConfirm: 'delete',
      isadd: false,
      isedit: false,
      addError: '',
      category: [],
      files: [],
      editfiles: [],
      COURSE_TYPE_CHOICES: [
        { id: 0, title: '付费' },
        { id: 1, title: 'vip专享' }
      ],
      status_choices: [
        { id: 0, title: '上线' },
        { id: 1, title: '下线' },
        { id: 2, title: '预上线' }
      ],
      addform: {
        title: '',
        study_num: 0
      },
      editform: {
        title: ''
      },
      formLabelWidth: '150px'
    }
  },
  filters: {
    toStr: function (value) {
      if (value) {
        value = value.toString()
      }
      return value
    },
    toFix: function (value) {
      if (value) {
        value = value.toFixed(2)
      }
      return value
    }
  },
  methods: {
    handlePreview (file) {
      console.log(file)
    },
    handlerUpload (e) {
      this.files = e.target.files
      console.log(this.files)
    },
    editHandlerUpload (e) {
      this.editfiles = e.target.files
    },
    add () {
      this.isadd = true
    },
    addData () {
      let param = new FormData()
      for (let key in this.addform) {
        param.append(key, this.addform[key])
      }
      if (!this.files[0]) {
        this.$message({
          message: '请上传图片',
          center: true
        })
        return
      }
      param.append('course_img', this.files[0])

      cmPost(param)
        .then(res => {
          alert('submit!')
          this.tableData.push(res)
          this.isadd = false
          this.files = []
        })
        .catch(error => {
          console.log(error)
        })
    },
    editDate () {
      if (this.editfiles[0]) {
        let param = new FormData()
        for (let key in this.editform) {
          param.append(key, this.editform[key])
        }
        param.append('course_img', this.editfiles[0])
        cmPatch(param)
          .then(res => {
            alert('submit!')
            this.isedit = false
            this.editfiles = []
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        delete this.editform.course_img
        cmPatch(this.editform)
          .then(res => {
            alert('submit!')
            this.isedit = false
          })
          .catch(error => {
            console.log(error)
          })
      }
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
      cmDel(row.id)
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
    cmGet()
      .then(res => {
        this.tableData = res
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
    categoryGet()
      .then(res => {
        this.category = res
      })
      .catch(err => console.log(err))
  },
  components: {
    Layout
  }
}
</script>

<style lang="css" scoped>
</style>
