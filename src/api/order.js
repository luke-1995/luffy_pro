import request from '@/utils/request'
// 订单列表查询,以及支付中心付费
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
