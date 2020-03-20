import Config from '@/settings'
import router from './router'
import store from '../store'


router.beforeEach((to, from, next) => {
  if (Config.WhiteList.indexOf(to.path) !== -1 && !localStorage.getItem('access_token')) {
    next()
  } else {
    if (!localStorage.getItem('access_token')) {
      next(`/login?redirect=${to.path}`)
    } else {
      if (store.userInfo) {
        next()
      } else {
        let username = localStorage.getItem('username')
        let shop_cart_num = localStorage.getItem('shop_cart_num')
        let id = localStorage.getItem('id')
        let balance = localStorage.getItem('balance')
        let user = {id: id, username: username, shop_cart_num: shop_cart_num,balance:balance}
        store.dispatch('updateUserinfo', user)
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


// const getShoppingCart=()=>{
//   scGet()
//       .then(res => {
//         if (res.code === 1000) {
//           console.log(res.data);
//         } 
//       })
//       .catch(err => {
//         console.log(err);
//       });
// }



export default router
