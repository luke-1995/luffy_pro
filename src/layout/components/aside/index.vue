<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu  v-for="(router,index) in routers" :key="index" router :default-active="activeIndex">
      <el-submenu :index="router.path" v-if="!router.hidden">
        <template slot="title">
          <i class="el-icon-message"></i>
          {{router.meta.title}}
        </template>
        <div v-for="(child_router,index) in router.children" :key="index">
          <el-menu-item-group v-show="!child_router.hidden">
            <el-menu-item :index="child_router.path">{{child_router.meta.title}}</el-menu-item>
          </el-menu-item-group>
        </div>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      routers: this.$store.getters.routers
    }
  },
  created () {
    
  },
  filters: {
    toStr: function (value) {
      value = value.toString()
      return value
    }
  },
  computed: {
    title: function (router) {},
    activeIndex: function () {
      let { fullPath } = this.$route
      console.log(fullPath)
      return fullPath
    }

  }
}
</script>

<style>
</style>
