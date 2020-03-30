import request from '@/utils/request'
// 课程
export function cmGet () {
  return request({
    url: 'course_menu/',
    method: 'get'
  })
}

export function cmPost (params) {
  return request({
    url: 'course_menu/',
    method: 'post',
    data: params
  })
}

export function cmPatch (params) {
  return request({
    url: `course_menu/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function cmDel (id) {
  return request({
    url: `course_menu/${id}/`,
    method: 'delete'
  })
}
