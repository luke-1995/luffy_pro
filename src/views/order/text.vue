<template>
  <el-dialog title="订单增加表" :visible.sync="isedit" width="60%">
    <el-form :model="editform" ref="editform" class="demo-dynamic" label-width="150px">
      <el-form-item
        label="支付第三方订单号"
        prop="actual_amount"
        :label-width="formLabelWidth"
        :rules="[{ type: 'number', message: '必须为数字值'}]"
      >
        <el-input v-model="editform.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="订单号"
        prop="actual_amount"
        :label-width="formLabelWidth"
        :rules="[
                  { required: true, message: '请输入实付金额', trigger: 'blur' },
                  { type: 'number', message: '必须为数字值'}
                ]"
      >
        <el-input v-model="editform.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        label="订单支付类型"
        prop="payment_type"
        :rules="[
                  { required: true, message: '请输入订单支付类型', trigger: 'blur' }
                ]"
      >
        <el-select v-model="editform.payment_type" placeholder="请选择订单支付类型">
          <el-option label="微信" value="0"></el-option>
          <el-option label="支付宝" value="1"></el-option>
          <el-option label="贝里" value="2"></el-option>
          <el-option label="优惠卷" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="订单状态"
        prop="payment_type"
        :rules="[
            { required: true, message: '请输入订单状态订单状态', trigger: 'blur' }
              ]"
      >
        <el-select v-model="editform.status" placeholder="请选择订单状态">
          <el-option label="交易成功" value="0"></el-option>
          <el-option label="待支付" value="1"></el-option>
          <el-option label="退费申请中" value="2"></el-option>
          <el-option label="已退费" value="3"></el-option>
          <el-option label="主动取消" value="4"></el-option>
          <el-option label="超时取消" value="5"></el-option>
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
        <el-input v-model="editform.title" autocomplete="off"></el-input>
        <!-- <span class="pull-right" style="color:#F56C6C;">{{addError}}</span> -->
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="isedit = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {}
</script>

<style>
</style>
