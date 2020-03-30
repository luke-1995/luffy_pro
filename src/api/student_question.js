import request from '@/utils/request'
// 提问题

export function sqGet () {
  return request({
    url: 'student_question/',
    method: 'get'
  })
}

export function sqPost (params) {
  return request({
    url: 'student_question/',
    method: 'post',
    data: params
  })
}

export function sqPatch (params) {
  return request({
    url: `student_question/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function sqDel (id) {
  return request({
    url: `student_question/${id}/`,
    method: 'delete'
  })
}
