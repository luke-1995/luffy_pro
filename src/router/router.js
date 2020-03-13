import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export const constantRouterMap = [
  {
    path: '/login',
    // meta: { title: '登录', noCache: true },
    component: () => import('@/views/login/index'),
    name:'login',
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
        name: 'Home',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/role',
    component: () => import('@/views/role/index')

  },
  {
    path: '/student_record',
    component: () => import('@/views/student_record/index')

  },
  {
    path: '/student_question/answer',
    component: () => import('@/views/student_question/answer')

  },
  {
    path: '/homework/comment',
    component: () => import('@/views/homework/comment')

  },
  {
    path: '/article',
    component: () => import('@/views/article/index')

  },
  {
    path: '/article/change',
    component: () => import('@/views/article/change'),
    name: 'article_change'

  },
  {
    path: 'rbac/course',
    component: () => import('@/views/course/index')

  },
  {
    path: 'course',
    component: () => import('@/views/course/Course')

  },
  {
    path: 'course/detail',
    component: () => import('@/views/course/CourseDetail')

  },
  {
    path: '/order',
    component: () => import('@/views/order/index')

  }

  // {
  //   path: '/',
  //   component: () =>import('@/layout')
  // }

]

const router= new Router({
  routes: constantRouterMap,
  linkActiveClass:'is-active',
  mode: 'history'
})




export default router