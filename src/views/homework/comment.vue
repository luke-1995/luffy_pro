<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="container">
          <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加角色</el-button>
          </div>
          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作业标题" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学生" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.student }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作业状态" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.homework_status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作业下载" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">
                  <a :href="scope.row.file" download="作业">作业下载</a>
                </span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary " @click="edit(scope.row)">上传批改过程</el-button>
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

      <el-dialog title="批改上传" :visible.sync="isedit">
        <input type="file">
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </el-dialog>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout/rbac";
import { roleGet, rolePost, rolePatch, roleDel } from "@/api/role";

export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          student: "学生",
          title: "111",
          homework_status: "未提交",
          file: "www.baidu.com"
        }
      ],
      onConfirm: "delete",
      isadd: false,
      isedit: false,
      addError: "",
      addform: {
        title: ""
      },
      editform: {
        title: ""
      },
      formLabelWidth: "100px",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    add() {
      this.isadd = true;
    },
    addData() {
      rolePost(this.addform)
        .then(res => {
          alert("submit!");
          this.tableData.push(res);
          this.isadd = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editDate() {
      rolePatch(this.editform)
        .then(res => {
          alert("submit!");
          this.isedit = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "addform") {
            this.addData();
          } else {
            this.editDate();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    edit(row) {
      this.editform = row;
      this.isedit = true;
    },
    del(row) {
      roleDel(row.id)
        .then(res => {
          if (!res) {
            this.delFun(row);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    delFun(i) {
      var index = this.tableData.indexOf(i);
      console.log(index);
      this.tableData.splice(index, 1);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  created() {
    roleGet()
      .then(res => {
        this.tableData = res;
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    Layout
  }
};
</script>

<style lang="css" scoped>
</style>
