import request from '@/utils/request'
// 购物车
export function scGet () {
  return request({
    url: 'shopping_cart/',
    method: 'get'
  })
}

export function scPost (params) {
  return request({
    url: 'shopping_cart/',
    method: 'post',
    data: params
  })
}

export function scPut (params) {
  return request({
    url: 'shopping_cart/',
    method: 'put',
    data: params
  })
}

export function scDel (params) {
  return request({
    url: 'shopping_cart/',
    method: 'delete',
    data: params
  })
}
