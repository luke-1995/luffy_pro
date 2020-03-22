import request from '@/utils/request'

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

// export function scDel (params) {
//   return request({
//     url: 'settlement/',
//     method: 'delete',
//     data: params,
//   })
// }