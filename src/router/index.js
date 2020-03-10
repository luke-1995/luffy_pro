import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouterMap = [
  // { path: '/login',
  //   meta: { title: '登录', noCache: true },
  //   component: () => import('@/views/login'),
  //   hidden: true
  // },
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
    component: () =>import('@/layout'),
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
  // {
  //   path: '/',
  //   component: () =>import('@/layout')
  // }

]

export default new Router({
  routes: constantRouterMap,
  mode: 'history'
})
