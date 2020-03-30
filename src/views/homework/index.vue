<template>
  <div class="luffy-container">
    <div class="container">
      <h2></h2>
      <el-table :data="tableData" style="width: 100%" justify="center">
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
        <el-table-column label="作业内容" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作业状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.homework_record.homework_status || '未提交' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成绩" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.homework_record.mark || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.homework_record.mark && !scope.row.homework_record.comment"
              @click="add(scope.row)"
            >写评价</el-button>
            <span style="margin-left: 10px" v-else>{{ scope.row.homework_record.comment || '未提交' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="作业下载" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <el-button type="text" @click="downloadItem(scope.row.file)">作业下载</el-button>
            </span>
          </template>
        </el-table-column>-->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary "
              @click="downloadItem(scope.row.homework_record.file)"
              v-if="scope.row.homework_record.file"
            >下载作业</el-button>
            <el-button size="mini" type="primary " @click="edit(scope.row)" v-else>上传作业</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="评价表" :visible.sync="isadd">
        <el-form :model="addform" ref="addform" class="demo-dynamic">
          <el-form-item
            label="内容"
            prop="comment"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入内容', trigger: 'blur' }
                ]"
          >
            <el-input v-model="addform.comment" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isadd = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="上传作业" :visible.sync="isedit">
        <div class="uploadBox">
          <h3>上传文件</h3>
          <div class="fileBox">
            <input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)" />
            <label for="myFile">
              <i class="fa fa-cloud-upload" aria-hidden="true"></i>点击上传本地文件
            </label>
          </div>
          <ul class="files">
            <li v-for="(file, index) in files" :key="index">
              <div class="fileInfo">
                <div class="fileName filePart">{{ file.name }}</div>
                <div class="fileSize filePart ml10">{{file.size}}</div>
                <!--进度条-->
                <div class="progress">
                  <span
                    :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"
                  ></span>
                </div>
                <div class="fileStatus">
                  <span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>
                  <span v-if="file.uploadStatus == 2" class="uploadSuccess">已上传</span>
                  <span v-if="file.uploadStatus == 1" class="uploadSuccess">上传中...</span>
                  <span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>
                  <span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>
                  <span v-if="file.uploadStatus == -4" class="uploadFail">出错啦，只能上传一个文件</span>
                  <span v-if="file.uploadStatus == -5" class="uploadFail">出错啦，上传文件为空</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { hwGet, hwPut, filePost } from "@/api/homework";
import { dhGet } from "@/api/media";
import Config from "@/settings";
import axios from "axios";
export default {
  data() {
    return {
      activeNames: ["1"],
      tableData: [],
      editform: {},
      addform: {},
      addError: "",
      isedit: false,
      isadd: false,
      files: [],
      formLabelWidth: "100px"
    };
  },
  created() {
    let cid = this.$route.params.cid;
    hwGet(cid)
      .then(res => {
        this.tableData = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    edit(row) {
      this.editform = row;
      console.log(row);
      // let index = this.tableData.indexOf(this.editform);
      // this.tableData[index].homework_record.file = 1;
      this.isedit = true;
    },
    add(row) {
      this.isadd = true;
      this.addform = row;
    },
    addData() {
      let id = this.addform.id;
      hwPut(id, this.addform)
        .then(res => {
          alert("submit!");
          console.log(res);
          let index = this.tableData.indexOf(this.addform);
          this.tableData[index].homework_record.comment = res.comment;
          // this.tableData.push(res)
          this.isadd = false;
        })
        .catch(error => {
          console.log(error);
          this.addError = error;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "addform") {
            this.addData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    downloadItem(file) {
      let url = Config.pre_url + file;
      dhGet(url)
        .then(({ data }) => {
          // 为了简单起见这里blob的mime类型 固定写死了
          let uu = Config.pre_url + url;
          let blob = new Blob([data], { type: "application/vnd.ms-excel" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = uu.split("/").pop();
          link.click();
        })
        .catch(error => {
          console.error(error);
        });
    },
    handlerUpload: function(e) {
      // 获取选定的文件
      let tFiles = e.target.files;
      let len = tFiles.length;
      for (var i = 0; i < len; i++) {
        // 开始上传每一个文件
        var item = {
          name: tFiles[i].name,
          uploadPercentage: 1,
          size: this.formatFileSize(tFiles[i].size, 0),
          uploadStatus: 0
        };

        console.log(item);
        this.files.push(item);
        // 开始上传文件 新建一个formData
        let param = new FormData();
        // param.append("name", "wiiiiiinney");
        // 通过append向form对象添加数据
        param.append("file", tFiles[i]);
        // param.append("student", "5");
        // param.append("homework", "1");
        // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // let edit = this.editform
        // delete edit.student
        // for (key in this.editform) {
        //   param.append(key,editform[key])
        // }
        let id = this.editform.homework_record.id;
        console.log(param.get("file"));
        if (this.files.length > 1) {
          item.uploadStatus = -4;
          return false;
        }
        // 判断大小
        if (!this.checkFileSize(tFiles[i].size)) {
          item.uploadStatus = -3;
          return false;
        }
        if (!this.checkFileType(tFiles[i].name.split(".")[1])) {
          item.uploadStatus = -2;
          return false;
        }

        // 通过axios上传文件
        // 配置
        let config = {
          // 添加请求头
          headers: {
            "Content-Type": "multipart/form-data"
          },
          // 添加上传进度监听事件
          onUploadProgress: e => {
            var completeProgress = (((e.loaded / e.total) * 100) | 0) + "%";
            // console.log(this.files);
            item.uploadPercentage = completeProgress;
          }
        };
        // axios
        //   .post(`http://127.0.0.1:8000/homework_file/${id}/`, param, config)
        //   .then(res => {
        //     console.log(res)
        //     if (res.data.code === 1000) {
        //       let index = this.tableData.indexOf(this.editform)
        //       this.tableData[index].homework_record.file = res.data.data.file
        //       this.tableData[index].homework_record.homework_status = res.data.data.homework_status

        //       item.uploadStatus = 2
        //     } else if (res.data.code === 1060) {
        //       item.uploadStatus = -5
        //     } else {
        //       item.uploadStatus = -1
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error)
        //     item.uploadStatus = -1
        //   })
        filePost(id, param, config)
          .then(res => {
            console.log(res);
            if (res.code === 1000) {
              let index = this.tableData.indexOf(this.editform);
              this.tableData[index].homework_record.file = res.data.file;
              this.tableData[index].homework_record.homework_status =
                res.data.homework_status;
              item.uploadStatus = 2;
            } else if (res.code === 1010) {
              item.uploadStatus = -5;
            } else {
              item.uploadStatus = -1;
            }
          })
          .catch(err => {
            console.log(err);
            item.uploadStatus = -1;
          });
      }
    },
    formatFileSize: function(fileSize, idx) {
      var units = ["B", "KB", "MB", "GB"];
      idx = idx || 0;
      if (fileSize < 1024 || idx === units.length - 1) {
        return fileSize.toFixed(1) + units[idx];
      }
      return this.formatFileSize(fileSize / 1024, ++idx);
    },
    checkFileType: function(fileType) {
      const acceptTypes = ["txt"];
      for (var i = 0; i < acceptTypes.length; i++) {
        if (fileType === acceptTypes[i]) {
          return true;
        }
      }
      return false;
    },
    checkFileSize: function(fileSize) {
      // 2M
      const MAX_SIZE = 2 * 1024 * 1024;
      if (fileSize > MAX_SIZE) {
        return false;
      }
      return true;
    }
  },
  computed: {
    file: function(row) {
      return row.homework_record.file;
    }
  }
};
</script>

<style lang="css" scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.uploadBox {
  width: 400px;
  border: 1px solid #ccc;
  margin: 100px auto;
}

.fileBox,
.fileInfo {
  margin: 16px;
  height: 60px;
  line-height: 60px;
  border: 1px solid #ccc;
  padding-left: 16px;
  font-size: 16px;
}
.inputfile + label {
  color: #3e97df;
  display: inline-block;
}

.inputfile:focus + label,
.inputfile + label:hover {
  color: #0c89f0;
}

h3 {
  padding: 10px 0 0 16px;
  font-weight: normal;
  font-size: 18px;
  color: #666;
}

.filePart {
  line-height: 30px;
  overflow: hidden;
  float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  height: 30px;
}

.fileStatus {
  overflow: hidden;
  float: left;
  height: 20px;
  font-size: 10px;
  line-height: 20px;
}

.ml10 {
  margin-left: 10px;
}

.fileName {
  width: 200px;
}

.fileSize {
  width: 120px;
  text-align: center;
}

.uploadFail {
  color: #ff0800d3;
}

.uploadSuccess {
  color: #2c832c;
}

/*对应CSS*/

.progress {
  position: relative;
  width: 80%;
  height: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  /*注意这里*/
  box-shadow: 0 0 1px 0px #ddd inset;
}

.progress span {
  position: absolute;
  display: inline-block;
  width: 10%;
  height: 100%;
  background-color: #3e97df;
}
</style>
