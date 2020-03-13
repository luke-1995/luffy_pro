<template>
  <Layout>
    <template #content>
      <div class="luffy-container">
        <div class="container">
          <div class="form-group clearfix">
            <label for="title" class="pull-left">标题</label>
            <input type="email" class="form-control" id="title" placeholder="标题" v-model="editData.title"  />
          </div>
          <vue-editor v-model="editData.content" :editor-toolbar="customToolbar" />

       <button class="btn btn-info pull-right" style="margin: 5px 0;">提交</button>
       </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/layout/rbac'

export default {
  data () {
    return {
      content: '',
      loading: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ], // 更多工具栏选项在下面
      editData: this.$route.params
    }
  },
  components: {
    Layout
  },
  created () {
    console.log(this.$route.params)
  }
}
</script>

<style>
</style>
