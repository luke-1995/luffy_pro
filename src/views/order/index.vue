<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="container">
          <div class="btn-group" style="margin: 5px 0">
            <el-button size="mini" @click="add">添加订单</el-button>
          </div>
          <el-table :data="tableData" style="width: 80%" justify="center">
            <el-table-column label="id" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单号" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.order_number }}</span>
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
      <el-dialog title="订单增加表" :visible.sync="isadd" width="60%">
        <el-form :model="addform" ref="addform" class="demo-dynamic" label-width="150px">
          <el-form-item
            label="支付第三方订单号"
            prop="payment_number"
            :label-width="formLabelWidth"

          >
            <el-input v-model="addform.payment_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="订单号"
            prop="order_number"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入实付金额', trigger: 'blur' },

                ]"
          >
            <el-input v-model="addform.order_number" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="订单支付类型"
            prop="payment_type"
            :rules="[
                  { required: true, message: '请输入订单支付类型', trigger: 'blur' }
                ]"
          >
            <el-select v-model="addform.payment_type" placeholder="请选择订单支付类型">
              <el-option label="微信" :value="0|toStr"></el-option>
              <el-option label="支付宝" :value="1|toStr"></el-option>
              <el-option label="贝里" :value="2|toStr"></el-option>
              <el-option label="优惠卷" :value="3|toStr"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="订单状态"
            prop="status"
            :rules="[
            { required: true, message: '请输入订单状态订单状态', trigger: 'blur' }
              ]"
          >
            <el-select v-model="addform.status" placeholder="请选择订单状态">
              <el-option label="交易成功" :value='0|toStr'></el-option>
              <el-option label="待支付" :value="1|toStr"></el-option>
              <el-option label="退费申请中" :value="2|toStr"></el-option>
              <el-option label="已退费" :value="3|toStr"></el-option>
              <el-option label="主动取消" :value="4|toStr"></el-option>
              <el-option label="超时取消" :value="5|toStr"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="实付金额"
            prop="actual_amount"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入实付金额', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值'}
                ]"
          >
            <el-input v-model.number="addform.actual_amount" autocomplete="off"></el-input>
            <!-- <span class="pull-right" style="color:#F56C6C;">{{addError}}</span> -->
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isadd = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="订单更新表" :visible.sync="isedit" width="60%">
        <el-form :model="editform" ref="editform" class="demo-dynamic" label-width="150px">
          <el-form-item
            label="支付第三方订单号"
            prop="payment_number"
            :label-width="formLabelWidth"
          >
            <el-input v-model="editform.payment_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="订单号"
            prop="order_number"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入实付金额', trigger: 'blur' },
                ]"
          >
            <el-input v-model="editform.order_number" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="订单支付类型"
            prop="payment_type"
            :rules="[
                  { required: true, message: '请输入订单支付类型', trigger: 'blur' }
                ]"
          >
            <el-select v-model="editform.payment_type" placeholder="请选择订单支付类型">
              <el-option label="微信" :value="0|toStr"></el-option>
              <el-option label="支付宝" :value="1|toStr"></el-option>
              <el-option label="贝里" :value="2|toStr"></el-option>
              <el-option label="优惠卷" :value="3|toStr"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="订单状态"
            prop="status"
            :rules="[
            { required: true, message: '请输入订单状态订单状态', trigger: 'blur' }
              ]"
          >
            <el-select v-model="editform.status" placeholder="请选择订单状态">
              <el-option label="交易成功" :value='0|toStr'></el-option>
              <el-option label="待支付" :value="1|toStr"></el-option>
              <el-option label="退费申请中" :value="2|toStr"></el-option>
              <el-option label="已退费" :value="3|toStr"></el-option>
              <el-option label="主动取消" :value="4|toStr"></el-option>
              <el-option label="超时取消" :value="5|toStr"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="实付金额"
            prop="actual_amount"
            :label-width="formLabelWidth"
            :rules="[
                  { required: true, message: '请输入实付金额', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值'}
                ]"
          >
            <el-input v-model="editform.actual_amount" autocomplete="off"></el-input>
            <!-- <span class="pull-right" style="color:#F56C6C;">{{addError}}</span> -->
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
import Layout from "@/layout/rbac";
import { orderGet,orderPost,orderPatch,orderDel} from "@/api/order_menu";

export default {
  data() {
    return {
      tableData: [{ id: 1, title: "title" }],
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
      formLabelWidth: "150px"
    };
  },
  filters: {
    toStr: function(value) {
      if (value) {
        value = value.toString();
      }
      return value;
    },
    toFix: function(value) {
      if (value) {
        value = value.toFixed(2);
      }
      return value;
    }
  },
  methods: {
    add() {
      this.isadd = true;
    },
    addData() {
      let uid = this.$store.getters.userInfo.id;
      this.addform.account = uid
      orderPost(this.addform)
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
      console.log(this.editform)
      orderPatch(this.editform)
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
      orderDel(row.id)
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
    }
  },
  created() {
    orderGet()
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
