import { roleGet } from '@/api/role'

const role = {
  state: {
    tableData: {}
  },
  mutations: {
    updateTableData (state, val) {
      state.tableData = val
    }
  },
  actions: {
    // 获取角色信息
    getTableDate ({ commit }) {
      return new Promise((resolve, reject) => {
        roleGet().then(res => {
          updateTableData(res, commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role
