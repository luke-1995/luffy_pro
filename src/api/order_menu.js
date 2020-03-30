import request from '@/utils/request'
// 订单
export function orderGet (params) {
  return request({
    url: 'order_menu/',
    method: 'get',
    params:params
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
    url: `order_menu/${params.id}/`,
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
