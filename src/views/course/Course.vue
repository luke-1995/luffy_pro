<template>
  <div class="course">
    <div class="container clearfix">
      <ul class="coursebox">
        <li
          v-for="(item,index) in categoryList"
          :key="item.id"
          :class="{active:categoryIndex===index}"
          @click="categoryHandler(index,item)"
        >{{item.title}}</li>
      </ul>

      <div class="courseList">
        <div
          class="detail"
          v-for="(item) in courseList"
          :key="item.id"
          v-show="item.category===categoryId"
          @click="getCourseDetail(item.course_detail_id)"
        >
          <div class="head">
            <img class="backImg" :src="item.course_img" />
            <b class="mask"></b>
          </div>
          <div class="content pull-right">
            <p>{{item.brief}}</p>
            <div class="content-detail">
              <div>
                <i class="fa fa-user" aria-hidden="true"></i>
                <span style="margin-right: 100px;margin-bottom: 60px;">{{item.study_num}}</span>

                <span class="span4">¥{{item.price_policy[0].price}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryGet, courseGet } from '@/api/course'
export default {
  data () {
    return {
      categoryIndex: 1,
      categoryId: 1,
      categoryList: [],
      courseList: []
    }
  },
  methods: {
    categoryHandler (index, item) {
      this.categoryIndex = index
      this.categoryId = item.id
    },
    getCourseDetail (id) {
      this.$router.push({name: 'course_detail', params: {cid: id}})
    }
  },
  created () {
    categoryGet()
      .then(res => {
        this.categoryList = res
      })
      .catch(err => {})
    courseGet()
      .then(res => {
        this.courseList = res
      })
      .catch(err => {})
  }
}
</script>

<style lang="css" scoped>
.course {
  width: 100%;
  height: 1000px;
  background: #f3f3f3;
}
.coursebox {
  padding: 24px 0;
  font-size: 16px;
  color: #666;
  letter-spacing: 0.41px;
  font-family: PingFangSC-Regular;
  overflow: hidden;
}
ul li {
  float: left;
  margin-right: 24px;
  cursor: pointer;
}

ul li.active {
  color: #00b4e4;
}
.courseList {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.detail {
  float: left;
  width: 248px;
  height: auto;
  margin-right: 16px;
  margin-bottom: 30px;
  position: relative;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 6px 0 #e8e8e8;
  transition: all 0.2s linear;
  cursor: pointer;
}
.detail:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transform: translate3d(0, -3px, 0);
}
.detail:nth-of-type(4n) {
  margin-right: 0;
}
.head {
  width: 100%;

  height: 144px;
}
.detail .head img {
  width: 100%;
  height: 144px;
  position: absolute;
  left: 0;
  top: 0;
}
.detail .head b {
  width: 100%;
  height: 144px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.9;
}
.detail .head p {
  position: absolute;
  width: 248px;
  height: 144px;
  left: 0;
  top: 0;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-around;
}
.content {
  width: 248px;

  height: 118px;
  padding-top: 30px;
}
.content p {
  width: 100%;
  height: 40px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  letter-spacing: 0.6px;
  margin-bottom: 20px;
  font-family: PingFangSC-Regular;
  overflow: hidden;
}
.content-detail {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.content-detail .span3 {
  position: absolute;
  right: 0;
}
.content-detail .span3 .s {
  text-decoration: line-through;
}
.content-detail .span4 {
  /*margin-left: 100px;*/
  position: absolute;
  right: 0;
  color: #fc0107;
}
.content-detail .span3 .t {
  color: #000;
  margin-left: 5px;
  text-decoration: none !important;
  color: #fc0107;
}
</style>
