import Config from '@/settings'
import router from './index'

router.beforeEach((to, from, next) => {
  // if (Config.whiteList.indexOf(to.path) !== -1) {
  //     next()
  // } else {
  //     if (!localStorage.getItem('access_token')) {
  //         next(`/login?redirect=${to.path}`)
  //     } else {

  //     }
  // }动态加载路由
  next()
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
