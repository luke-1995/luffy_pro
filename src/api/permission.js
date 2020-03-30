import request from '@/utils/request'
// 动态生成路由,没有录入后端api
export function perGet () {
  return request({
    url: 'permission/',
    method: 'get'
  })
}
