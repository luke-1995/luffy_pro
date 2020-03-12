<template>
	<div class="course">
		<div class="container clearfix">
			<ul class="coursebox">
			  <li v-for='(item,index) in categoryList' :key='item.id' :class='{active:categoryIndex===index}' @click='categoryHandler(index,item)'>
			  	{{item.name}}
			  </li>
			
			</ul>

			<div class="courseList" v-for='(courseDetail) in categoryList' :key='courseDetail.id' v-show='isAll'>
				<div class="detail" v-for='(item) in courseDetail.courses' :key='item.id' @click='getCourse(item.id)'>
					<div class="head">
						<img :src='getCourseImg(item.course_img)' alt="" class="backImg">
						<!-- <b class="mask"></b> -->
						<!-- <p>{{item.name}}</p> -->
					</div>
					<div class="content">
						<p>{{item.course_slogan}}</p>
						<div class="content-detail">
							<div>
								<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTFweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTEgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJSZWN0YW5nbGUtMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3LjAwMDAwMCwgLTkxLjAwMDAwMCkiPgogICAgICAgIDxnIGlkPSLkuKrkurrkuK3lv4MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjAwMDAwMCwgOTEuMDAwMDAwKSIgZmlsbD0iIzlCOUI5QiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTYuNzU4MjMwODEsNi42MjU2MzEwOCBMNC4yNDEzMzM5Miw2LjYyNTYzMTA4IEMxLjkwMjMxNTc1LDYuNjI1NjMxMDggMCw4LjQxNDM0Nzg0IDAsMTAuNjEzNjY4OSBMMCwxMC44NTAyOTE3IEMwLDEyIDEuODcxODkwNjUsMTIgNC4yNDEzMzM5MiwxMiBMNi43NTgyNDUzMiwxMiBDOS4wMzQ0NTQ2MSwxMiAxMSwxMiAxMSwxMC44NTAyOTE3IEwxMSwxMC42MTM2Njg5IEMxMSw4LjQxNDc3MDM2IDkuMDk3MTkwOTUsNi42MjU2MzEwOCA2Ljc1ODIzMDgxLDYuNjI1NjMxMDggWiBNNS4zNzQwNDEyNiw2LjMyMTI0MjAyIEM3LjIyNjIxNDM2LDYuMzIxMjQyMDIgOC43MzMxOTI0Nyw0LjkwMzU2Mjg4IDguNzMzMTkyNDcsMy4xNjA2Mjc4MiBDOC43MzMxOTI0NywxLjQxNzc3NDU0IDcuMjI2MjE0MzYsMCA1LjM3NDA0MTI2LDAgQzMuNTIxOTI2MiwwIDIuMDE0ODAzLDEuNDE4MDc0MzkgMi4wMTQ4MDMsMy4xNjA2OTU5NyBDMi4wMTQ4MDMsNC45MDMxODEyNSAzLjUyMTkyNjIsNi4zMjEyNDIwMiA1LjM3NDA0MTI2LDYuMzIxMjQyMDIgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" alt="">
							         <span>{{item.learn_number}}</span>
							         <span>{{getLevel(item.level)}}</span>
							       <!--   <span class="span3">
							         	  <span class="s">¥99.0</span>
							            <span  class="t">免费</span>
							      </span> -->
							      <span class="span4">¥29</span>
								
							</div>
							
						</div>
					</div>
				</div>
			</div>

			<div class="courseList" v-show='!isAll'>
				<div class="detail" v-for='(item) in courseDetail' :key='item.id' @click='getCourse(item.id)'>
					<div class="head">
						<img :src='getCourseImg(item.course_img)' alt="" class="backImg">
						<!-- <b class="mask"></b> -->
						<!-- <p>{{item.name}}</p> -->
					</div>
					<div class="content">
						<p>{{item.course_slogan}}</p>
						<div class="content-detail">
							<div>
								<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTFweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTEgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ4LjIgKDQ3MzI3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJSZWN0YW5nbGUtMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3LjAwMDAwMCwgLTkxLjAwMDAwMCkiPgogICAgICAgIDxnIGlkPSLkuKrkurrkuK3lv4MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjAwMDAwMCwgOTEuMDAwMDAwKSIgZmlsbD0iIzlCOUI5QiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTYuNzU4MjMwODEsNi42MjU2MzEwOCBMNC4yNDEzMzM5Miw2LjYyNTYzMTA4IEMxLjkwMjMxNTc1LDYuNjI1NjMxMDggMCw4LjQxNDM0Nzg0IDAsMTAuNjEzNjY4OSBMMCwxMC44NTAyOTE3IEMwLDEyIDEuODcxODkwNjUsMTIgNC4yNDEzMzM5MiwxMiBMNi43NTgyNDUzMiwxMiBDOS4wMzQ0NTQ2MSwxMiAxMSwxMiAxMSwxMC44NTAyOTE3IEwxMSwxMC42MTM2Njg5IEMxMSw4LjQxNDc3MDM2IDkuMDk3MTkwOTUsNi42MjU2MzEwOCA2Ljc1ODIzMDgxLDYuNjI1NjMxMDggWiBNNS4zNzQwNDEyNiw2LjMyMTI0MjAyIEM3LjIyNjIxNDM2LDYuMzIxMjQyMDIgOC43MzMxOTI0Nyw0LjkwMzU2Mjg4IDguNzMzMTkyNDcsMy4xNjA2Mjc4MiBDOC43MzMxOTI0NywxLjQxNzc3NDU0IDcuMjI2MjE0MzYsMCA1LjM3NDA0MTI2LDAgQzMuNTIxOTI2MiwwIDIuMDE0ODAzLDEuNDE4MDc0MzkgMi4wMTQ4MDMsMy4xNjA2OTU5NyBDMi4wMTQ4MDMsNC45MDMxODEyNSAzLjUyMTkyNjIsNi4zMjEyNDIwMiA1LjM3NDA0MTI2LDYuMzIxMjQyMDIgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" alt="">
							         <span>{{item.learn_number}}</span>
							         <span>{{getLevel(item.level)}}</span>
							       <!--   <span class="span3">
							         	  <span class="s">¥99.0</span>
							            <span  class="t">免费</span>
							      </span> -->
							      <span class="span4">¥29</span>
								
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>


export default {

  name: 'Course',
  data(){
  	return{
  		categoryList:'',
  		courseDetail:'',
  		categoryIndex:0,
  		courseId:0,
  		h:'https://',
  		isAll:true,

  	}
  },
  created(){

  	this.$http.category().
  	then(res=>{
  		if (!res.data.error_no) {
  			this.categoryList=res.data.data;
  			
  			let allPro={
  				id:0,
  				name:'所有',
  				category:0,
  			};
  			this.categoryList.unshift(allPro);

  		}}).catch(err=>{});

  	
  	

  
  },
  updated(){
  	
  },
  methods:{
  	categoryHandler(index,item){
  		this.categoryIndex=index;
  		
  		if (item.id===0) {
  			this.isAll=true;
  			
  		}else{
  			this.isAll=false;
  			this.courseDetail=item.courses;
  		}
  		
  	},
  	getCourseImg(src){
  		return 'https://'+src
  	},
  	getLevel(level){
  		if (level===0) {
  			return '初级'
  		}
  		else if(level===1){
  			return '进阶'
  		}else{
  			return '高阶'
  		}
  		
  	},
  	getCourse(courseId){
  		this.$router.push({name:'courseDetail',params:{courseId:courseId}});
  	},

  },
};
</script>

<style lang="css" scoped>
.course{
	width: 100%;
	height: 1000px;
	background: #f3f3f3;
}
.coursebox{
	padding: 24px 0;
	font-size: 16px;
	color: #666;
	letter-spacing: .41px;
	font-family: PingFangSC-Regular;
	overflow: hidden;
}
ul li{
	float: left;
	margin-right: 24px;
	cursor: pointer;
}

ul li.active{
	color: #00b4e4;
}
.courseList{
	width: 100%;
	height: auto;
	overflow: hidden;
}
.detail{
	float: left;
	width: 248px;
	height: auto;
	margin-right: 16px;
	margin-bottom: 30px;
	position: relative;
	padding: 0 20px;
	background: #fff;
   	 box-shadow: 0 2px 6px 0 #e8e8e8;
   	 transition: all .2s linear;
   	 cursor: pointer;
}
.detail:hover{
	box-shadow: 0 8px 15px rgba(0,0,0,.15);
    	transform: translate3d(0,-3px,0);
}
.detail:nth-of-type(4n){
	margin-right: 0;
}
.head{
	width: 100%;

    	height: 144px;
}
.detail .head img{
	   width: 100%;
	    height: 144px; 
	    position: absolute;
	    left: 0;
	    top: 0;
}
.detail .head b{
     width: 100%;
    height: 144px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: .9;
    background: #56CBC4;
}
.detail .head p{
	position: absolute;
	width: 248px;
	height:144px;
	left: 0;
	top: 0;
	text-align: center;
	font-family: PingFangSC-Medium;
	font-size: 24px;
	color: #fff;
	overflow: hidden;
	display: flex;
	align-items:center;
	padding: 0 20px;
	justify-content: space-around;
}
.content{
    width: 248px;

    height: 118px;
    padding-top: 30px;
    
}
.content p{
     width: 100%;
    height: 40px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    letter-spacing: .6px;
    margin-bottom: 20px;
    font-family: PingFangSC-Regular;
    overflow: hidden;
}
.content-detail{
	width: 100%;
	height: 40px;
	line-height: 40px;
	position: relative;

}
.content-detail .span3{
	position: absolute;
	right: 0;
	
}
.content-detail .span3 .s{
	text-decoration: line-through;
}
.content-detail .span4{
	/*margin-left: 100px;*/
	position: absolute;
	right: 0;
	color: #FC0107;
}
.content-detail .span3 .t{
	color: #000;
	margin-left: 5px;
	text-decoration: none !important;
	color: #FC0107;
}

</style>
