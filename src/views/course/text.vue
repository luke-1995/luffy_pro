<template>
  <div>
    <el-form-item
      label="课程名称"
      prop="title"
      :label-width="formLabelWidth"
      :rules="[
                  { required: true, message: '请输入课程名', trigger: 'blur' }
                ]"
    >
      <el-input v-model="editform.title" autocomplete="off"></el-input>
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
      <el-select v-model.number="editform.category" placeholder="请选择课程分类">
        <el-option :label="item.title" :value="item.id" v-for="(item) in category" :key="item.id"></el-option>
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
      <input type="file" @change="handlerUpload($event)" />
      <span class="pull-right" style="color:#F56C6C;">{{addError}}</span>
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
      <span class="pull-right" style="color:#F56C6C;">{{addError}}</span>
    </el-form-item>
  </div>
</template>

<script>
export default {
  created () {
    let param = new FormData()
    for (let key in this.editform) {
      param.append(key, this.editform[key])
    }
  }
}
</script>

<style>
</style>
