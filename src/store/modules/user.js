import { login } from '@/api/login'
import { resetRouter } from '@/router'

const user = {
  state: {
    userinfo: {},
    shoppingCart: {}
  },
  mutations: {
    updateUserinfo(state, val) {
      state.userinfo = val
    },
    updateShoppingCart(state, val) {
      state.userinfo.shop_cart_num = val
      localStorage.setItem('shop_cart_num', val)
    }

  },
  actions: {
    updateUserinfo({ commit }, val) {
      commit('updateUserinfo', val)
    },
    // 登录
    Login({ commit }, userinfo) {
      return new Promise((resolve, reject) => {
        login(userinfo).then(res => {
          if (res.code === 1000) {
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('username', res.data.user.username)
            localStorage.setItem('id', res.data.user.id)
            localStorage.setItem('shop_cart_num', res.data.user.shop_cart_num)
            localStorage.setItem('balance', res.data.user.balance)
            resetRouter()
            commit('updateUserinfo', res.data.user)
          }

          resolve(res.errors)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({ commit }) {
      localStorage.removeItem('access_token', res.data.access_token)
      localStorage.removeItem('username', res.data.user.username)
      localStorage.removeItem('id', res.data.user.id)
      localStorage.removeItem('shop_cart_num', res.data.user.shop_cart_num)
      localStorage.removeItem('balance', res.data.user.balance)
      commit('updateUserinfo', '')
    },

  }
}

export default user
