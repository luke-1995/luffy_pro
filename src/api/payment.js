import request from '@/utils/request'
// 提交支付请求(核对并生成订单)

export function pPost (params) {
  return request({
    url: 'payment/',
    method: 'post',
    data: params
  })
}
