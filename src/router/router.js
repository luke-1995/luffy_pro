import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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
    path: '/redirect',
    component: () => import('@/layout'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true },
        hidden: true
      }
    ]
  }
]

// const router = new Router({
  
// })
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  linkActiveClass: 'is-active',
  mode: 'history'
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}



export default router
