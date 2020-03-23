import request from '@/utils/request'

export function orderGet () {
  return request({
    url: 'order_menu/',
    method: 'get'
  })
}

export function orderPost (params) {
    return request({
      url: 'order_menu/',
      method: 'post',
      data: params
    })
  }

export function orderPatch (params) {
  return request({
    url:  `order_menu/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function orderDel (id) {
    return request({
      url: `order_menu/${id}/`,
      method: 'delete'
    })
  }