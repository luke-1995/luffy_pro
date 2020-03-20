import request from '@/utils/request'

export function orderGet () {
  return request({
    url: 'order/',
    method: 'get'
  })
}

export function orderPut (params) {
  return request({
    url: 'order/',
    method: 'put',
    data: params
  })
}