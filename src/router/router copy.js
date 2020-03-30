import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    // meta: { title: '登录', noCache: true },
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPages/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPages/401'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/course.vue')

      },
      {
        path: '/course/detail/:cid',
        name: 'course_detail',
        component: () => import('@/views/course/CourseDetail')
      },
      {
        path: '/shopping_cart',
        name: 'shopping_cart',
        component: () => import('@/views/shopping/shopping_cart')
      },
      {
        path: '/settlement',
        name: 'settlement',
        component: () => import('@/views/shopping/settlement')
      },
      {
        path: '/payment/:actualTotal/:orderId',
        name: 'payment',
        component: () => import('@/views/shopping/payment')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/order')
      },
      {
        path: '/classroom',
        name: 'classroom',
        component: () => import('@/views/classroom/index')
      },
      {
        path: '/homework/:cid',
        name: 'homework',
        component: () => import('@/views/homework/index')
      },
      {
        path: '/vide/:cid',
        name: 'video',
        component: () => import('@/views/video/index')
      }

    ]
  },
  {
    path: '/role',
    component: () => import('@/views/role/index')

  },
  {
    path: '/student_record/:sid',
    component: () => import('@/views/student_record/index'),
    name: 'student_record'

  },
  {
    path: '/student_list',
    component: () => import('@/views/student_list/index'),
    name: 'student_list'

  },
  {
    path: '/student_question/answer',
    component: () => import('@/views/student_question/answer')

  },
  {
    path: '/homework/correction',
    component: () => import('@/views/homework/correction')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article/index')

  },
  {
    path: '/article/edit/:id',
    component: () => import('@/views/article/edit'),
    name: 'article_edit'

  },
  {
    path: '/article/add',
    component: () => import('@/views/article/add'),
    name: 'article_add'

  },
  {
    path: '/rbac/course',
    component: () => import('@/views/course/index')
  },
  {
    path: '/dis_stu',
    component: () => import('@/views/dis_stu/index')
  },
  // {
  //   path: '/course',
  //   name:'course',
  //   component: () => import('@/views/course/course.vue')

  // },

  {
    path: '/order_menu',
    component: () => import('@/views/order/index')

  },
  // {
  //   path: '/distribution',
  //   component: () => import('@/views/distribution/index')

  // },
  {
    path: '/report_forms',
    component: () => import('@/views/report_forms/index')

  },
  {
    path: '/teacher_record',
    component: () => import('@/views/teacher_record/index')

  },
  {
    path: '/learning_progress',
    component: () => import('@/views/learning_progress/index')

  }
  // {
  //   path:"/home/light-course",
  //   name:'LightCourse',
  //   component:LightCourse
  // },
  // {
  //   path:"/micro",
  //   name:'Micro',
  //   component:Micro
  // },
  // 课程详情
  // {
  //   path:"/course/detail/:cid",
  //   // name:'course.detail',
  //   component: () => import('@/views/course/CourseDetail')
  // },

  // 购物车的页面
  // {
  //   path:"/purchase/shopping_cart",
  //   name:'purchase.shop',
  //   component:Cart
  // }

  // {
  //   path: '/',
  //   component: () =>import('@/layout')
  // }

]

const router = new Router({
  routes: constantRouterMap,
  linkActiveClass: 'is-active',
  mode: 'history'
})

export default router
