import request from '@/utils/request'

export function dsGet () {
  return request({
    url: 'dis_stu/',
    method: 'get'
  })
}

// export function rolePost (params) {
//   return request({
//     url: 'role/',
//     method: 'post',
//     data: params
//   })
// }

export function dsPatch (params) {
  return request({
    url: `dis_stu/${params.id}/`,
    method: 'patch',
    data: params
  })
}

// export function roleDel (id) {
//   return request({
//     url: `role/${id}/`,
//     method: 'delete'
//   })
// }