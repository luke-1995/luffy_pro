import request from '@/utils/request'

export function taGet () {
  return request({
    url: 'teacher_answer/',
    method: 'get'
  })
}

export function taPatch (params) {
  return request({
    url: `teacher_answer/${params.id}/`,
    method: 'patch',
    data: params
  })
}
