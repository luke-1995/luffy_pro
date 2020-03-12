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
          //   setToken(res.token, rememberMe)
          //   commit('SET_TOKEN', res.token)
          //   setUserInfo(res.user, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          //   commit('SET_LOAD_MENUS', true)
          localStorage.setItem('access_token', res.data.data.access_token)
          localStorage.setItem('username', res.data.data.username)
          localStorage.setItem('shop_cart_num', res.data.data.user.shop_cart_num)
          commit('updateUserinfo', res.data.data.user)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
