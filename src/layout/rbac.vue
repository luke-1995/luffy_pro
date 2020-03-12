<template>
  <div>
    <Nav />
    <div class="pg-body">
      <div class="left-menu">
        <div class="menu-body">
          <!--    此处导入菜单(名字为second_menu 参数为request)的标签        -->
          <!-- <Aside></Aside> -->
        </div>
      </div>
      <div class="right-body">
        <!--   此处导入导航路径(名字为nav_path 参数为request)的标签  -->

        <slot name="content"></slot>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import Aside from "./Aside";
import Nav from './components/nav'
export default {
  name: 'Layout',
  data () {
    return {
      username: '',
      password: '',
      getValidate: {},
      roleList: []
    }
  },
  methods: {},
  components: {
    // Aside
    Nav
  },
  created () {}
}
</script>

<style lang="css" scoped>
body {
  margin: 0;
}

.no-radius {
  border-radius: 0;
}

.no-margin {
  margin: 0;
}

.pg-body > .left-menu {
  background-color: #eaedf1;
  position: absolute;
  left: 1px;
  top: 85px;
  bottom: 0;
  width: 220px;
  border: 1px solid #eaedf1;
  overflow: auto;
}

.pg-body > .right-body {
  position: absolute;
  left: 225px;
  right: 0;
  top: 85px;
  bottom: 0;
  overflow: scroll;
  border: 1px solid #ddd;
  border-top: 0;
  font-size: 13px;
  min-width: 755px;
}

.navbar-right {
  float: right !important;
  margin-right: -15px;
}

.luffy-container {
  padding: 15px;
}

.left-menu .menu-body .static-menu .icon-wrap {
  width: 20px;
  display: inline-block;
  text-align: center;
}

.left-menu .menu-body .static-menu a {
  text-decoration: none;
  padding: 8px 15px;
  border-bottom: 1px solid #ccc;
  color: #333;
  display: block;
  background: #efefef;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0, #efefef),
    color-stop(1, #fafafa)
  );
  background: -ms-linear-gradient(bottom, #efefef, #fafafa);
  background: -moz-linear-gradient(center bottom, #efefef 0%, #fafafa 100%);
  background: -o-linear-gradient(bottom, #efefef, #fafafa);
  filter: progid:dximagetransform.microsoft.gradient(startColorStr='#e3e3e3', EndColorStr='#ffffff');
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#fafafa',EndColorStr='#efefef')";
  box-shadow: inset 0px 1px 1px white;
}

.left-menu .menu-body .static-menu a:hover {
  color: #2f72ab;
  border-left: 2px solid #2f72ab;
}

.left-menu .menu-body .static-menu a.active {
  color: #2f72ab;
  border-left: 2px solid #2f72ab;
}
</style>
