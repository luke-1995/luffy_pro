<template>
  <div class="luffy-container">
    <div class="container">
      <!-- <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加角色</el-button>
      </div>-->
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
            <span style="margin-left: 10px">{{ scope.row.student_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作业状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.homework_status_info }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作业下载" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <el-button type="text" @click="downloadItem(scope.row.file)">作业下载</el-button>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary " @click="edit(scope.row)">上传批改过程</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="批改上传" :visible.sync="isedit">
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
</template>

<script>
import Layout from "@/layout/rbac";
import { tcGet, filePost } from "@/api/teacher_correction";
import { dhGet } from "@/api/media";
import Config from "@/settings";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      pre_url: Config.pre_url,
      onConfirm: "delete",
      isadd: false,
      isedit: false,
      files: [],
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
    downloadItem(file) {
      let url = this.pre_url + file;
      dhGet(url)
        .then(({ data }) => {
          // 为了简单起见这里blob的mime类型 固定写死了
          let uu = this.pre_url + url;
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
        param.append("correction_file", tFiles[i]);
        // param.append("student", "5");
        // param.append("homework", "1");
        // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // let edit = this.editform
        // delete edit.student
        // for (key in this.editform) {
        //   param.append(key,editform[key])
        // }
        let id = this.editform.id;
        console.log(id);
        console.log(param.get("correction_file"));
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
        console.log(555);

        // tcPatch(param,e,item,id)
        //   .then(res => {
        //     console.log(666)
        //     // this.tableData = res;
        //     console.log(res);
        //     // item.uploadStatus = 2;

        //   })
        //   .catch(error => {
        //     console.log(error);
        //     console.log(777)
        //     // item.uploadStatus = -1;
        //   });
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
        //   .post(`http://127.0.0.1:8000/correction_file/${id}/`, param, config)
        //   .then(function(res) {
        //     console.log(res);
        //     if (res.data.code === 1000) {
        //       item.uploadStatus = 2;
        //     } else if (res.data.code === 1010) {
        //       item.uploadStatus = -5;
        //     } else {
        //       item.uploadStatus = -1;
        //     }
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //     item.uploadStatus = -1;
        //   });

        filePost(id, param, config)
          .then(res => {
            console.log(res);
            if (res.code === 1000) {
              item.uploadStatus = 2;
            } else if (res.code === 1010) {
              item.uploadStatus = -5;
            } else {
              item.uploadStatus = -1;
            }
          })
          .catch(err => {
            console.log(err);
            item.uploadStatus = -1
          });

        // cfPost(param,config,id)
        //   .then(res => {
        //     // this.tableData = res;
        //     console.log(res);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
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
    },
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
    tcGet()
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
