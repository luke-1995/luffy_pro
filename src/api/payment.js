import request from '@/utils/request'
// 提交支付请求(核对并生成订单)
// export function pGet () {
//   return request({
//     url: 'payment/',
//     method: 'get'
//   })
// }

export function pPost (params) {
  return request({
    url: 'payment/',
    method: 'post',
    data: params
  })
}

// export function pPut (params) {
//   return request({
//     url: 'payment/',
//     method: 'put',
//     data: params
//   })
// }

// export function pDel (params) {
//   return request({
//     url: 'payment/',
//     method: 'delete',
//     data: params,
//   })
// }
