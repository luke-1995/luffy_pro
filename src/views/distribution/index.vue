<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="col-md-3">
          <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <i class="fa fa-book" aria-hidden="true"></i>学生信息
            </div>

            <el-table
              :data="firstTableDate"
              highlight-current-row
              @current-change="handleCurrentChange"
              ref="singleTable"
              width="100"
            >
              <el-table-column label="学生名称" width="300">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="col-md-3">
          <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
              <i class="fa fa-book" aria-hidden="true"></i>教师信息
              <el-button
                        size="mini"
                        type="success"
                        style="padding: 2px 8px;margin: -3px;"
                        class="pull-right"
                        @click="save" v-if="isSave"><i class="fa fa-plus-circle" aria-hidden="true" ></i>保存
              </el-button>
            </div>

            <el-table
              :data="secondTableDate"
              highlight-current-row
              @current-change="handleCurrentChange_2"
              ref="singleTable"
              width="100"
            >
              <el-table-column label="教师名称" width="300">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>


      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout/rbac";

export default {
  name: "Role",
  data() {
    return {
      firstTableDate: [
        { id: 1, username: "title" },
        { id: 2, username: "title" }
      ],
      secondTableDate: [
        { id: 88, username: "title11" },
        { id: 99, username: "title22" }
      ],
      firstArray: [],
      secondArray: [],
      thirdArray: [],
      user: "",
      role: "",
      isSave: false,
      // 当角色改变时,改为true
      isSaveP: false,
      // 当权限改变时,改为true
      checked: false,
      clickId: "",
      multipleSelection: [],
      activeNames: [1],
      isadd: false,
      isedit: false,
      isSecondAdd: false,
      isSecondEdit: false,
      isPerAdd: false,
      isPerEdit: false,
      addform: {},
      editform: {
        title: "title"
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    changeActive(row) {
      this.clickId = row.id;
    },
    handle(row, event, column) {
      console.log(column);
    },

    change() {
      this.isSaveP = true;
    },
    add(data) {
      if (data === this.firstTableDate) {
        this.isadd = true;
      } else if (data === this.secondTableDate) {
        this.isSecondAdd = true;
      } else {
        this.isPerAdd = true;
      }
    },
    edit(data, id) {
      if (data === this.firstTableDate) {
        this.isedit = true;
      } else if (data === this.secondTableDate) {
        this.isSecondEdit = true;
      } else {
        this.isPerEdit = true;
      }
    },
    del(id) {
      console.log(id);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      console.log(row);
    },
    hasPermission(id) {
      this.$http
        .hasPermission(id)
        .then(res => {
          console.log(res);
          if (res.data) {
            console.log(res);
            console.log(res.data.data);
            this.$refs.mychild.setCheckedKeys(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    hasPer(id) {
      this.$http
        .hasPer(id)
        .then(res => {
          console.log(res);
          if (res.data) {
            console.log(res);
            console.log(res.data.data);
            this.$refs.mychild.setCheckedKeys(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    roleChange(val) {
      this.hasPer(val.id);
      this.role = val;
      // 保存权限用的
    },
    handleCurrentChange(val) {
      this.user = val;

      this.toggleSelection();
      // this.checkedBox(this.secondTableDate[1])
      this.hasPermission(val.id);
      // 设置树形控件的key
      this.secondTableDate.forEach(role => {
        if (val.roles.indexOf(role.id) !== -1) {
          this.$refs.multipleTable.toggleRowSelection(role);
        }
      });
      this.$refs.multipleTable.setCurrentRow();
      this.currentRow = val;
    },

    handleSelectionChange(val) {
      this.isSave = true;
      // console.log(22222,val)
      // this.hasPer(val.id);
      this.multipleSelection = val;
    },
    handleCurrentChange_2(val) {
      this.isSave = true;
      this.currentRow = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    checkedBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getRoles() {
      let li = [];
      this.multipleSelection.forEach((item, index) => {
        console.log(item, 6666);
        li.push(item.id);
      });
      return li;
    },
    save() {
      if (!this.user) {
        alert("请选择用户");
      } else {
        console.log(this.getRoles());
        console.log(this.user.roles);
        this.user.roles = this.getRoles();
        this.$http
          .userPatch(this.user)
          .then(res => {
            console.log(res);
            if (res.data) {
              console.log(res);
              console.log(res.data.data);
              alert("ok");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.multipleSelection.forEach((item, index) => {
        console.log(item, 6666);
      });
    },
    save_1() {
      if (!this.role) {
        alert("请选择角色");
      } else {
        let li = this.$refs.mychild.getCheckedKeys();
        console.log(li);
        this.role.permissions = li;
        console.log(this.role);
        this.$http
          .patchPer(this.role)
          .then(res => {
            console.log(res);
            // if (res.data) {
            //     console.log(res)
            //     console.log(res.data.data)
            //     alert("ok")
            // }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleChange(val) {
      console.log(val);
    }
  },
  created() {
    // this.$http
    //   .user()
    //   .then(res => {
    //     console.log(res);

    //     if (res.data) {
    //       console.log(res);
    //       this.firstTableDate = res.data;
    //       // this.tableData=res.data.data.myShopCart
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // this.$http
    //   .role()
    //   .then(res => {
    //     console.log(res);

    //     if (res.data) {
    //       console.log(res);
    //       this.secondTableDate = res.data;
    //       // this.tableData=res.data.data.myShopCart
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  components: {
    Layout,

  }
};
</script>

<style lang="css" scoped>
.active {
  border-left: 3px solid #fdc00f;
}

.menu td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 60px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>