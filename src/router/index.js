import Config from '@/settings'
import router from './router'
import {createRouter} from './router'
import store from '../store'
import { perGet } from '@/api/permission'
import { filterAsyncRouter } from '@/store/modules/permission'

router.beforeEach((to, from, next) => {
  if (Config.WhiteList.indexOf(to.path) !== -1 && !localStorage.getItem('access_token')) {
    next()
  } else {
    if (!localStorage.getItem('access_token')) {
      next(`/login?redirect=${to.path}`)
    } else {
      if (JSON.stringify(store.getters.userInfo) == '{}') {
        let username = localStorage.getItem('username')
        let shop_cart_num = localStorage.getItem('shop_cart_num')
        let id = localStorage.getItem('id')
        let balance = localStorage.getItem('balance')
        let user = { id: id, username: username, shop_cart_num: shop_cart_num, balance: balance }
        store.dispatch('updateUserinfo', user)
      }
      if (store.getters.addRouters.length === 0) {
        loadMenus(next, to)
      } else {
        next()
      }
    }
  }
})

export const getUserinfo = () => {
  if (localStorage.getItem('access_token')) {
    let userInfo = {
      access_token: localStorage.getItem('access_token'),
      username: localStorage.getItem('username'),
      shop_cart_num: localStorage.getItem('shop_cart_num')
    }
    return userInfo
  }
  return false
}

export const loadMenus = (next, to) => {
  perGet().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}


export const resetRouter = () => {
  store.commit('RESET_ADDROUTERS')
}


// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
