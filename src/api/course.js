import request from '@/utils/request'
// 路飞课程
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
// 课程分类
export function categoryGet () {
  return request({
    url: 'category/',
    method: 'get'
  })
}
