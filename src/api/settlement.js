import request from '@/utils/request'
// 结算中心
export function smGet () {
  return request({
    url: 'settlement/',
    method: 'get'
  })
}

export function smPost (params) {
  return request({
    url: 'settlement/',
    method: 'post',
    data: params
  })
}

export function smPut (params) {
  return request({
    url: 'settlement/',
    method: 'put',
    data: params
  })
}
