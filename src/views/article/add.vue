<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="container">
          <div class="form-group clearfix">
            <label for="title" class="pull-left">标题</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="标题"
              v-model="addData.title"
            />
          </div>
          <div v-loading="loading">
            <vue-editor v-model="addData.content" :editor-toolbar="customToolbar" />
          </div>

          <button class="btn btn-info pull-right" style="margin: 5px 0;" @click="submit">提交</button>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layout/rbac";
import { aPost } from "@/api/article";
export default {
  data() {
    return {
      content: "",
      loading: false,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ], // 更多工具栏选项在下面
      addData: {}
    };
  },
  components: {
    Layout
  },
  created() {
    console.log(this.$route.params);
  },
  methods: {
    submit() {
      console.log(this.addData);
      if (!this.addData.title) {
        this.$message({
            message: "标题不能为空",
            center: true
          });
      }
      let uid = this.$store.getters.userInfo.id;
      this.addData.user = uid
      aPost(this.addData).then(res=>{
        alert('submit')
        this.$router.push({name:'article'})
      }).catch(err=>{console.log(err)})
    }
  }
};
</script>

<style>
</style>
