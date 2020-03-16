import request from '@/utils/request'

export function courseGet () {
  return request({
    url: 'course/',
    method: 'get'
  })
}

// export function coursePost (params) {
//   return request({
//     url: 'role/',
//     method: 'post',
//     data: params
//   })
// }

export function cdGet (id) {
  return request({
    url: `course_detail/${id}/`,
    method: 'get'
  })
}

// export function courseDel (id) {
//   return request({
//     url: `role/${id}/`,
//     method: 'delete'
//   })
// }

export function categoryGet () {
  return request({
    url: 'category/',
    method: 'get'
  })
}
