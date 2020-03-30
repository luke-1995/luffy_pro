<template>
  <el-container style="height: 750px; border: 2px solid #eee;margin: 5px 0 0px">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        :default-openeds="['1']"
        @open="handleOpen"
        @close="handleClose"
        class="el-menu-vertical-demo"
      >
        <el-submenu index="1">
          <template slot="title" v-if="tableData[0]">
            <i class="el-icon-message"></i>
            {{tableData[0].chapter}}
          </template>
          <el-menu-item-group v-if="tableData">
            <el-menu-item
              :index="item.id|toStr"
              v-for="(item) in tableData"
              :key="item.id"
              @click="setVid(item)"
            >{{item.title}}</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>-->
          <!-- <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>-->
          <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>导航二
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>导航三
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>-->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        <span>王小虎</span>-->
      </el-header>

      <el-main>
        <div id="player"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { sGet } from '@/api/section'
export default {
  data () {
    return {
      tableData: []
      // vid:''
    }
  },
  filters: {
    toStr: function (value) {
      if (value) {
        value = '1-' + value.toString()
      }
      return value
    },
    toFix: function (value) {
      if (value) {
        value = value.toFixed(2)
      }
      return value
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setVid (row) {
      if (row.section_type === 2) {
        this.vid = row.section_link
        this.p.changeVid(row.section_link)
      } else if (row.section_type === 1) {
        this.$message({
          message: '这是一个练习',
          center: true
        })
      } else {
        this.$message({
          message: '这是一个文档',
          center: true
        })
      }
    }
  },
  mounted () {
    let id = this.$route.params.cid
    sGet(id)
      .then(res => {
        console.log(res)
        this.tableData = res

        this.vid = res[0].section_link
        console.log(this.vid, typeof this.vid)
        if (this.vid) {
          var player = polyvPlayer({
            wrap: '#player',
            width: 1050,
            height: 620,
            vid: this.vid

          })
          this.p = player
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  beforeCreate () {},
  computed: {
    // vid:function(){
    //   if (this.tableData) {
    //     return this.tableData[0].section_link
    //   }
    //   return ''
    // }
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
