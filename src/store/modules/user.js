import { login } from '@/api/login'

const user = {
  state: {
    userinfo: {}
  },
  mutations: {
    updateUserinfo (state, val) {
      state.userinfo = val
    }
  },
  actions: {
    updateUserinfo ({ commit }, val) {
      commit('updateUserinfo', val)
    },
    // 登录
    Login ({ commit }, userinfo) {
      return new Promise((resolve, reject) => {
        login(userinfo).then(res => {

          if(res.code===1000){
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('username', res.data.user.username)
          localStorage.setItem('id', res.data.user.id)
          localStorage.setItem('shop_cart_num', res.data.user.shop_cart_num)
          commit('updateUserinfo', res.data.user)
          }

          resolve(res.errors)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default user
