<template>
  <div>
    <Nav />
    <el-container style="height: 500px; border: 1px solid #eee">
      <Aside/>

      <el-container>

        <el-main>
          <el-row>

            <router-view></router-view>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from './components/nav'
import Aside from './components/aside'
export default {
  data () {
    return {}
  },
  components: {
    Nav,
    Aside
  }
}
</script>

<style lang="css" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
